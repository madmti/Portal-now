import { useRef, useState } from 'preact/hooks';
import type {
	SchedulerEventData,
	SchedulerSchedByDay,
	SchedulerSistems,
	tDay,
} from '../storage';
import { requestUpdateSchedule } from '../funcs';

const daysNames = [
	'Domingo',
	'Lunes',
	'Martes',
	'Miercoles',
	'Jueves',
	'Viernes',
	'Sabado',
];

export default function EditSchedule({
	schedule_by_event_code,
	schedule_by_day,
	sorted_keys,
}: {
	schedule_by_event_code: Record<string, SchedulerEventData>;
	schedule_by_day: SchedulerSchedByDay;
	sorted_keys: string[];
}) {
	const [error, setError] = useState('');
	const [selectedDay, setSelectedDay] = useState<tDay>(new Date().getDay() as tDay);
	const [schedState, setSchedState] = useState(schedule_by_day);
	const selected_event_ref = useRef<HTMLSelectElement | null>(null);
	const selected_schedule_ref = useRef<HTMLSelectElement | null>(null);
	const schedule_by_event_keys = Object.keys(schedule_by_event_code);

	function addEvent() {
		const event_key = selected_event_ref.current?.value;
		const schedule_key = selected_schedule_ref.current?.value;
		if (!event_key || !schedule_key) return;
		setSchedState({
			...schedState,
			[selectedDay]: {
				...schedState[selectedDay],
				[schedule_key]: [
					...(schedState[selectedDay]?.[schedule_key] || []),
					event_key,
				],
			},
		});
	}

	async function UpdateSched() {
		const res = await requestUpdateSchedule(schedState);
		if (res.ok) {
			location.reload();
		} else {
			setError('Error al guardar los horarios');
			setTimeout(() => setError(''), 3000);
		}
	}

	return (
		<>
			<div class="flex flex-col gap-4 w-full p-4 bg-base-200 rounded-lg">
				<header class="flex items-center justify-between">
					<h1 class="text-xl">Horario del dia</h1>
					<select
						class="input input-bordered"
						onChange={(e) =>
							setSelectedDay(parseInt(e.currentTarget.value) as tDay)
						}
					>
						{[1, 2, 3, 4, 5, 6, 0].map((day, index) => (
							<option value={day} selected={day === selectedDay}>
								{daysNames[day]}
							</option>
						))}
					</select>
				</header>
				<div className="overflow-x-auto">
					<table className="table">
						<thead>
							<tr>
								<th>Clave</th>
								<th>Eventos</th>
							</tr>
						</thead>
						<tbody>
							{sorted_keys.map((key) => {
								const events = schedState[selectedDay]?.[key] || [];
								return (
									<tr>
										<td>
											<span class="badge badge-neutral p-4">{key}</span>
										</td>
										<td class="flex items-center flex-wrap gap-2">
											{events.map((event) => (
												<button
													onClick={() => {
														setSchedState({
															...schedState,
															[selectedDay]: {
																...schedState[selectedDay],
																[key]: events.filter((e) => e !== event),
															},
														});
													}}
													class="btn btn-neutral btn-sm"
												>
													{`${event} - ${schedule_by_event_code[event].class_name}`}{' '}
													<span class="icon-[topcoat--cancel] text-error" />
												</button>
											))}
											{!events.length && (
												<span class="badge badge-warning">Libre</span>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<div class="flex justify-end">
						<button
							class="btn btn-primary btn-wide"
							onClick={() =>
								// @ts-ignore
								document.getElementById('my_modal_2')!.showModal()
							}
						>
							+
						</button>
						<dialog id="my_modal_2" className="modal">
							<div className="modal-box">
								<h3 className="font-bold text-lg">
									Agregar evento para el dia "{daysNames[selectedDay]}"
								</h3>
								{!schedule_by_event_keys.length && (
									<p class="text-lg text-neutral-500 py-4">
										No hay eventos disponibles para agregar
									</p>
								)}
								{!!schedule_by_event_keys.length && (
									<div class="flex flex-col gap-4 py-4">
										<label class="text-lg">Evento</label>
										<select
											class="input input-bordered"
											ref={selected_event_ref}
										>
											{schedule_by_event_keys.map((key) => (
												<option
													value={key}
													selected={schedule_by_day[selectedDay]?.[
														key
													]?.includes(key)}
												>
													{`${key} - ${schedule_by_event_code[key].class_name} - ${schedule_by_event_code[key].place}`}
												</option>
											))}
										</select>
										<label class="text-lg">Horario</label>
										<select
											class="input input-bordered"
											ref={selected_schedule_ref}
										>
											{sorted_keys.map((key) => (
												<option value={key}>{key}</option>
											))}
										</select>
										<div class="flex justify-end gap-4">
											<button
												class="btn btn-primary"
												onClick={() => {
													// @ts-ignore
													document.getElementById('my_modal_2')!.close();
													addEvent();
												}}
											>
												Agregar
											</button>
											<button
												class="btn btn-error"
												onClick={() =>
													// @ts-ignore
													document.getElementById('my_modal_2')!.close()
												}
											>
												Cancelar
											</button>
										</div>
									</div>
								)}
							</div>
							<form method="dialog" className="modal-backdrop">
								<button>close</button>
							</form>
						</dialog>
					</div>
				</div>
				<div class="grid grid-cols-2 gap-4">
					{schedState !== schedule_by_day && (
						<>
							<button
								onClick={UpdateSched}
								type="button"
								class="btn btn-primary"
							>
								Guardar
							</button>
							<button
								type="button"
								class="btn btn-error"
								onClick={() => setSchedState(schedule_by_day)}
							>
								Cancelar
							</button>
						</>
					)}
				</div>
			</div>
			{error && (
				<div class="toast toast-bot toast-center">
					<div class="alert alert-error">
						<span>{error}</span>
					</div>
				</div>
			)}
		</>
	);
}
