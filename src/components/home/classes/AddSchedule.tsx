import { bloques, days } from '@lib/time';
import { useState } from 'preact/hooks';

interface Field {
	type: string;
	block: string;
	day: number;
	place: string;
}

export default function AddSchedule() {
	const [show, setShow] = useState(false);
	const [fields, setFields] = useState<Array<Field>>([]);

	function addField() {
		const type = (document.getElementById('type') as HTMLSelectElement).value;
		const day = Number(
			(document.getElementById('day') as HTMLSelectElement).value
		);
		const block = (document.getElementById('block') as HTMLSelectElement).value;
		const place = (document.getElementById('place') as HTMLInputElement).value;
		if (!place) return;
		const field = { type, day, block, place };
		setFields((prev) => [...prev, field]);
		setShow(false);
	}

	function removeField(index: number) {
		setFields((prev) => prev.filter((_, i) => i !== index));
	}

	return (
		<>
			<input
				type="hidden"
				id="schedules"
				name="schedules"
				value={JSON.stringify(fields)}
			/>
			<input type="hidden" value="true" id="block_mode" name="block_mode" />
			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							<th>Tipo</th>
							<th>Día</th>
							<th>Bloque</th>
							<th>Lugar</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{fields.map((f, i) => (
							<tr>
								<th>{f.type}</th>
								<th>{days[f.day].substring(0, 3)}</th>
								<th>{f.block}</th>
								<th>{f.place}</th>
								<th>
									<button
										type="button"
										className="btn btn-sm btn-error sm:btn-wide max-w-20"
										onClick={() => removeField(i)}
									>
										<span class="icon-[material-symbols--delete]" />
									</button>
								</th>
							</tr>
						))}
						<tr>
							<th>-</th>
							<th>-</th>
							<th>-</th>
							<th>-</th>
							<th>
								<button
									type="button"
									className="btn btn-sm btn-primary sm:btn-wide max-w-20"
									onClick={() => setShow(!show)}
								>
									<span class="text-lg icon-[material-symbols--add]" />
								</button>
							</th>
						</tr>
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
