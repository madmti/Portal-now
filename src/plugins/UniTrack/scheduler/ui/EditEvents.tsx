import { useState } from 'preact/hooks';
import type { SchedulerEventData, SchedulerSistemData } from '../storage';
import { requestUpdateEvents } from '../funcs';

export default function EditEvents({
	classes,
	schedule_by_event_code,
}: {
	classes: string[];
	schedule_by_event_code: Record<string, SchedulerEventData>;
}) {
	const [error, setError] = useState('');
	const [eventState, setEventState] = useState(schedule_by_event_code);
	const event_keys = Object.keys(eventState);

	async function UpdateEvents() {
		const res = await requestUpdateEvents(eventState);
		if (res.ok) {
			location.reload();
		} else {
			setError('Error al guardar los eventos');
			setTimeout(() => setError(''), 3000);
		}
	}

	return (
		<>
			<div class="flex flex-col gap-4 w-full p-4 bg-base-200 rounded-lg">
				<div className="overflow-x-auto">
					<table className="table">
						<thead>
							<tr>
								<th>N°</th>
								<th>Clase</th>
								<th>Lugar</th>
								<th>Tipo</th>
							</tr>
						</thead>
						<tbody>
							{event_keys.map((key) => {
								const { class_name, class_type, place } = eventState[key];
								return (
									<tr>
										<td>
											<span class="badge badge-neutral p-4">{key}</span>
										</td>
										<td>
											<select
												class="input input-bordered input-md max-w-36"
												onChange={(e) => {
													setEventState({
														...eventState,
														[key]: {
															...eventState[key],
															class_name: (e.target as HTMLInputElement).value,
														},
													});
												}}
											>
												{classes.map((c) => (
													<option selected={c === class_name}>{c}</option>
												))}
											</select>
										</td>
										<td>
											<input
												type="text"
												className="input input-bordered input-md max-w-36"
												placeholder={place}
												onInput={(e) => {
													setEventState({
														...eventState,
														[key]: {
															...eventState[key],
															place: (e.target as HTMLInputElement).value,
														},
													});
												}}
											/>
										</td>
										<td>
											<input
												type="text"
												className="input input-bordered input-md max-w-36"
												placeholder={class_type}
												onInput={(e) => {
													setEventState({
														...eventState,
														[key]: {
															...eventState[key],
															class_type: (e.target as HTMLInputElement).value,
														},
													});
												}}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<div class="flex gap-4 m-4 justify-end">
						<button
							type="button"
							class="btn btn-primary btn-sm w-36"
							onClick={() => {
								setEventState({
									...eventState,
									[event_keys.length + 1]: {
										class_name: classes[0],
										class_type: 'Catedra',
										place: 'Lugar ' + (event_keys.length + 1),
									},
								});
							}}
						>
							+
						</button>
						<button
							onClick={() =>
								setEventState(
									Object.fromEntries(
										Object.entries(eventState).filter(
											([key]) => key !== event_keys[event_keys.length - 1]
										)
									)
								)
							}
							type="button"
							class="btn btn-error btn-sm w-36"
						>
							<span class="icon-[gg--trash] text-xl" />
						</button>
					</div>
				</div>
				<div class="grid grid-cols-2 gap-4">
					{eventState !== schedule_by_event_code && (
						<>
							<button
								onClick={UpdateEvents}
								type="button"
								class="btn btn-primary"
							>
								Guardar
							</button>
							<button
								type="button"
								class="btn btn-error"
								onClick={() => setEventState(schedule_by_event_code)}
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
