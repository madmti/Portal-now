import { bloques, days } from '@lib/time';
import { useState } from 'preact/hooks';

interface Field {
	sched_day: number;
	sched_type: string;
	sched_place: string;
	sched_block_mode: boolean;
	sched_time: string;
}

export default function EditSchedule({
	initial_fields,
	class_name,
}: {
	initial_fields: Field[];
	class_name: string;
}) {
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState('');
	const [show, setShow] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [fields, setFields] = useState<Array<Field>>(initial_fields);

	function addField() {
		const type = (document.getElementById('type') as HTMLSelectElement).value;
		const day = Number(
			(document.getElementById('day') as HTMLSelectElement).value
		);
		const block = (document.getElementById('block') as HTMLSelectElement).value;
		const place = (document.getElementById('place') as HTMLInputElement).value;
		if (!place) return;
		const field = {
			sched_type: type,
			sched_day: day,
			sched_time: block,
			sched_place: place,
			sched_block_mode: true,
		};
		setFields((prev) => [...prev, field]);
		setShow(false);
	}

	function removeField(index: number) {
		setFields((prev) => prev.filter((_, i) => i !== index));
	}

	async function saveSched() {
		setEditMode(false);
		setSaving(true);
		try {
			const response = await fetch('/api/home/updatesched/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					class_name: class_name,
					fields,
				}),
			});
			if (response.redirected) {
				window.location.assign(response.url);
			}
			if (!response.ok) {
				setSaving(false);
				setError(await response.text());
				setTimeout(() => {
					setError('');
				}, 2500);
			}
		} catch (error: any) {
			setSaving(false);
			setError(error.message);
			setTimeout(() => {
				setError('');
			}, 2500);
		}
	}

	return (
		<>
			<label
				class="text-base flex justify-between items-center gap-2 w-full"
				for="horario"
			>
				<h1 class="text-2xl">Horarios</h1>
				{saving && <span class="loading"></span>}
				{!saving && (
					<div class="flex items-center gap-2">
						{editMode && (
							<button
								type="button"
								class="btn btn-sm btn-primary"
								onClick={saveSched}
							>
								<span className="icon-[bx--save] text-xl" />
							</button>
						)}
						<button
							type="button"
							class={`btn btn-sm ${
								editMode ? 'btn-error' : 'btn-primary btn-outline'
							}`}
							onClick={() => {
								if (editMode) {
									setFields(initial_fields);
								}
								setEditMode(!editMode);
							}}
						>
							{editMode ? (
								<span class="icon-[ix--cancel] text-lg" />
							) : (
								<span class="icon-[material-symbols--edit]" />
							)}
						</button>
					</div>
				)}
			</label>
			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							<th>Tipo</th>
							<th>Día</th>
							<th>Bloque</th>
							<th>Lugar</th>
							{editMode && <th />}
						</tr>
					</thead>
					<tbody>
						{fields.map((f, i) => (
							<tr>
								<th>{f.sched_type}</th>
								<th>{days[f.sched_day].substring(0, 3)}</th>
								<th>{f.sched_time}</th>
								<th>{f.sched_place}</th>
								{editMode && (
									<th>
										<button
											type="button"
											className="btn btn-outline btn-sm btn-error sm:btn-wide max-w-20"
											onClick={() => removeField(i)}
										>
											<span class="icon-[material-symbols--delete]" />
										</button>
									</th>
								)}
							</tr>
						))}
						{editMode && (
							<tr>
								<th>-</th>
								<th>-</th>
								<th>-</th>
								<th>-</th>
								<th>
									<button
										type="button"
										className="btn btn-sm btn-outline btn-primary sm:btn-wide max-w-20"
										onClick={() => setShow(!show)}
									>
										<span class="text-lg icon-[material-symbols--add]" />
									</button>
								</th>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<div
				id="add-schedule"
				class={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col p-8 gap-4 bg-neutral rounded-lg ${
					show ? '' : 'hidden'
				}`}
			>
				<h1 className="text-2xl mb-2">Horario</h1>
				<div className="flex items-center gap-2 justify-between">
					<label htmlFor="type">Tipo</label>
					<select
						id="type"
						name="type"
						className="input input-bordered hover:input-primary max-w-full"
					>
						<option value="Catedra">Cátedra</option>
						<option value="Laboratorio">Laboratorio</option>
						<option value="Ayudantia">Ayudantia</option>
						<option value="Taller">Taller</option>
					</select>
				</div>
				<div className="flex items-center gap-2 justify-between">
					<label htmlFor="day">Día</label>
					<select
						id="day"
						name="day"
						className="input input-bordered hover:input-primary max-w-full"
					>
						{days.map((d, i) => (
							<option value={i}>{d}</option>
						))}
					</select>
				</div>
				<div className="flex items-center gap-2 justify-between">
					<label htmlFor="block">Bloque</label>
					<select
						id="block"
						name="block"
						className="input input-bordered hover:input-primary max-w-full"
					>
						{bloques.map((b) => (
							<option value={b}>{b}</option>
						))}
					</select>
				</div>
				<div className="flex items-center gap-2 justify-between">
					<label htmlFor="place">Lugar</label>
					<input
						type="text"
						id="place"
						name="place"
						placeholder="Ej: Sala 1, P101, etc."
						className="input input-bordered hover:input-primary max-w-full ml-4"
					/>
				</div>
				<button type="button" className="btn btn-primary" onClick={addField}>
					Agregar
				</button>
			</div>
			<span
				onClick={() => setShow(false)}
				className={`absolute w-full h-full top-0 left-0 z-20 bg-black bg-opacity-70 cursor-pointer ${
					show ? '' : 'hidden'
				}`}
			/>
		</>
	);
}
