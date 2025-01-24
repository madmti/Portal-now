import { useState } from 'preact/hooks';
import { pointSistemAlgorithms, type PointTrackerClas } from '../storage';
import {
	calculateRestOfData,
	dataIsOk,
	requestDeattachClass,
	requestUpdateClass,
} from '../funcs';
import type { UniTrackStorage } from '@plugins/UniTrack/config';

function updateEvaluationName(
	index: number,
	value: string,
	dataState: PointTrackerClas,
	setDataState: (data: PointTrackerClas) => void
) {
	const evaluations = [...dataState.point_sistem.qualifications];
	evaluations[index].name = value;
	setDataState({
		...dataState,
		point_sistem: {
			...dataState.point_sistem,
			qualifications: evaluations,
		},
	});
}
function updateEvaluationMultiplier(
	index: number,
	value: number,
	dataState: PointTrackerClas,
	setDataState: (data: PointTrackerClas) => void
) {
	const evaluations = [...dataState.point_sistem.qualifications];
	evaluations[index].multiplier = value;
	setDataState({
		...dataState,
		point_sistem: {
			...dataState.point_sistem,
			qualifications: evaluations,
		},
	});
}
function updateEvaluationCurrentValue(
	index: number,
	value: number,
	dataState: PointTrackerClas,
	setDataState: (data: PointTrackerClas) => void
) {
	const evaluations = [...dataState.point_sistem.qualifications];
	evaluations[index].current_value = value;
	setDataState({
		...dataState,
		point_sistem: {
			...dataState.point_sistem,
			qualifications: evaluations,
		},
	});
}
function updateEthaName(
	index: number,
	value: string,
	dataState: PointTrackerClas,
	setDataState: (data: PointTrackerClas) => void
) {
	const ethas = [...(dataState.point_sistem.ethas ?? [])];
	ethas[index].name = value;
	setDataState({
		...dataState,
		point_sistem: {
			...dataState.point_sistem,
			ethas,
		},
	});
}
function updateEthaMultiplier(
	index: number,
	value: number,
	dataState: PointTrackerClas,
	setDataState: (data: PointTrackerClas) => void
) {
	const ethas = [...(dataState.point_sistem.ethas ?? [])];
	ethas[index].multiplier = value;
	setDataState({
		...dataState,
		point_sistem: {
			...dataState.point_sistem,
			ethas,
		},
	});
}
function updateEthaCurrentValue(
	index: number,
	value: number,
	dataState: PointTrackerClas,
	setDataState: (data: PointTrackerClas) => void
) {
	const ethas = [...(dataState.point_sistem.ethas ?? [])];
	ethas[index].current_value = value;
	setDataState({
		...dataState,
		point_sistem: {
			...dataState.point_sistem,
			ethas,
		},
	});
}

export default function EditCard({
	name,
	clase,
	storage,
}: {
	name: string;
	clase: PointTrackerClas;
	storage: UniTrackStorage;
}) {
	const [error, setError] = useState('');
	const [dataState, setDataState] = useState(clase);

	async function updateClas() {
		if (!dataIsOk(dataState)) {
			setError('Campos invalidos');
			setTimeout(() => setError(''), 3000);
			return;
		}

		const new_data = calculateRestOfData(dataState);
		const res = await requestUpdateClass(name, new_data);

		if (res.ok) {
			location.reload();
		} else {
			setError('Error al guardar');
			setTimeout(() => setError(''), 3000);
		}
	}

	async function deAttach(clase: string) {
		const res = await requestDeattachClass(clase, storage);
		if (res.ok) {
			location.reload();
		} else {
			setError('Error al intentar desadjuntar la clase');
			setTimeout(() => setError(''), 3000);
		}
	}

	return (
		<>
			{error && (
				<div className="toast toast-bot toast-center absolute">
					<div className="alert alert-error">
						<span>{error}</span>
					</div>
				</div>
			)}
			<div tabIndex={0} className="collapse bg-base-200">
				<input type="checkbox" />
				<div className="collapse-title pr-[18px] flex gap-2 w-full items-center justify-between">
					<h2 class="text-xl text-primary">{name}</h2>
					<button
						onClick={() => deAttach(name)}
						type="button"
						class="btn btn-square btn-accent btn-outline z-50"
					>
						<span class="icon-[meteor-icons--unlink] text-lg" />
					</button>
				</div>
				<div className="collapse-content flex flex-col gap-2 w-full">
					<h3 class="text-lg">General</h3>
					<div class="flex flex-col gap-2 text-lg">
						<div class="flex items-center justify-between pl-8 gap-2">
							<span>Meta:</span>
							<input
								type="text"
								placeholder={dataState.goal.toString()}
								className="input input-bordered w-full max-w-xs"
							/>
						</div>
						<div class="flex items-center justify-between pl-8 gap-2">
							<span>Mínimo:</span>
							<input
								type="text"
								placeholder={dataState.min.toString()}
								className="input input-bordered w-full max-w-xs"
							/>
						</div>
						<div class="flex items-center justify-between pl-8 gap-2">
							<span>Actual:</span>
							<input
								type="text"
								placeholder={dataState.current.toString()}
								className="input input-bordered w-full max-w-xs"
								disabled
							/>
						</div>
						<div class="flex items-center justify-between pl-8 gap-2">
							<span>Promedio:</span>
							<input
								type="text"
								placeholder={dataState.average.toString()}
								className="input input-bordered w-full max-w-xs"
								disabled
							/>
						</div>
						<div class="flex items-center justify-between pl-8 gap-2">
							<span>Tendencia:</span>
							<input
								type="text"
								placeholder={dataState.tendency.toString()}
								className="input input-bordered w-full max-w-xs"
								disabled
							/>
						</div>
					</div>
					<h3 class="text-lg">Calculo de nota necesaria</h3>
					<div class="flex flex-col gap-2 text-lg">
						<div class="flex items-center justify-between pl-8 gap-2">
							<span>Algoritmo:</span>
							<select class="select select-bordered w-full max-w-xs">
								{pointSistemAlgorithms.map((algorithm) => (
									<option
										value={algorithm}
										selected={algorithm === dataState.point_sistem.algorithm}
									>
										{algorithm}
									</option>
								))}
							</select>
						</div>
						<div class="flex items-center justify-between pl-8 gap-2">
							<span>Sigte. Nota min:</span>
							<input
								type="text"
								placeholder={dataState.point_sistem.target_qualification.toString()}
								className="input input-bordered w-full max-w-xs"
								disabled
							/>
						</div>
					</div>
					<h3 class="text-lg">Ethas</h3>
					<div className="overflow-x-auto">
						<table className="table">
							<thead>
								<tr class="flex flex-wrap justify-between">
									<th class="w-20">Nombre</th>
									<th class="w-20">Multiplicador</th>
									<th class="w-20">Actual</th>
								</tr>
							</thead>
							<tbody>
								{dataState.point_sistem.ethas?.map((etha, index) => (
									<>
										<span class="divider divider-neutral h-0 m-0 p-0"></span>
										<tr class="flex flex-wrap justify-between">
											<td>
												<input
													type="text"
													placeholder={etha.name}
													onChange={(e) =>
														updateEthaName(
															index,
															e.currentTarget.value,
															dataState,
															setDataState
														)
													}
													className="input input-bordered input-md max-w-36"
												/>
											</td>
											<td>
												x{' '}
												<input
													type="number"
													placeholder={`${etha.multiplier / 100}`}
													onChange={(e) =>
														updateEthaMultiplier(
															index,
															parseFloat(e.currentTarget.value) * 100,
															dataState,
															setDataState
														)
													}
													className="input input-bordered input-md max-w-36"
												/>
											</td>
											<td>
												<input
													type="number"
													placeholder={
														etha.current_value === -1
															? '-'
															: etha.current_value.toString()
													}
													onChange={(e) =>
														updateEthaCurrentValue(
															index,
															parseFloat(e.currentTarget.value),
															dataState,
															setDataState
														)
													}
													className="input input-bordered input-md max-w-36"
												/>
											</td>
										</tr>
									</>
								))}
								<span class="divider divider-neutral h-0 m-0 p-0"></span>
							</tbody>
						</table>
						<div class="flex gap-4 m-4 justify-end">
							<button
								onClick={() =>
									setDataState({
										...dataState,
										point_sistem: {
											...dataState.point_sistem,
											ethas: [
												...(dataState.point_sistem.ethas ?? []),
												{ name: '', current_value: -1, multiplier: 100 },
											],
										},
									})
								}
								type="button"
								class="btn btn-primary btn-sm w-36"
							>
								+
							</button>
							<button
								onClick={() =>
									setDataState({
										...dataState,
										point_sistem: {
											...dataState.point_sistem,
											ethas: dataState.point_sistem.ethas?.slice(0, -1),
										},
									})
								}
								type="button"
								class="btn btn-error btn-sm w-36"
							>
								<span class="icon-[gg--trash] text-xl" />
							</button>
						</div>
					</div>
					<h3 class="text-lg">Evaluaciones</h3>
					<div className="overflow-x-auto">
						<table className="table">
							<thead>
								<tr class="flex flex-wrap justify-between">
									<th class="w-20">Nombre</th>
									<th class="w-20">Multiplicador</th>
									<th class="w-20">Actual</th>
								</tr>
							</thead>
							<tbody>
								{dataState.point_sistem.qualifications.map(
									(evaluation, index) => (
										<>
											<span class="divider divider-neutral h-0 m-0 p-0"></span>
											<tr class="flex flex-wrap justify-between">
												<td>
													<input
														type="text"
														placeholder={evaluation.name}
														onChange={(e) =>
															updateEvaluationName(
																index,
																e.currentTarget.value,
																dataState,
																setDataState
															)
														}
														className="input input-bordered input-md max-w-36"
													/>
												</td>
												<td>
													x{' '}
													<input
														type="number"
														placeholder={`${evaluation.multiplier / 100}`}
														onChange={(e) =>
															updateEvaluationMultiplier(
																index,
																parseFloat(e.currentTarget.value) * 100,
																dataState,
																setDataState
															)
														}
														className="input input-bordered input-md max-w-36"
													/>
												</td>
												<td>
													<input
														type="number"
														placeholder={
															evaluation.current_value === -1
																? '-'
																: evaluation.current_value.toString()
														}
														onChange={(e) =>
															updateEvaluationCurrentValue(
																index,
																parseFloat(e.currentTarget.value),
																dataState,
																setDataState
															)
														}
														className="input input-bordered input-md max-w-36"
													/>
												</td>
											</tr>
										</>
									)
								)}
								<span class="divider divider-neutral h-0 m-0 p-0"></span>
							</tbody>
						</table>
						<div class="flex gap-4 m-4 justify-end">
							<button
								onClick={() =>
									setDataState({
										...dataState,
										point_sistem: {
											...dataState.point_sistem,
											qualifications: [
												...dataState.point_sistem.qualifications,
												{ name: '', current_value: -1, multiplier: 100 },
											],
										},
									})
								}
								type="button"
								class="btn btn-primary btn-sm w-36"
							>
								+
							</button>
							<button
								onClick={() =>
									setDataState({
										...dataState,
										point_sistem: {
											...dataState.point_sistem,
											qualifications:
												dataState.point_sistem.qualifications.slice(0, -1),
										},
									})
								}
								type="button"
								class="btn btn-error btn-sm w-36"
							>
								<span class="icon-[gg--trash] text-xl" />
							</button>
						</div>
					</div>
					<div class="grid grid-cols-2 gap-4">
						{dataState != clase && (
							<button
								type="button"
								onClick={updateClas}
								class="btn btn-primary"
							>
								Guardar
							</button>
						)}
						{dataState != clase && (
							<button
								type="button"
								onClick={() => setDataState(clase)}
								class="btn btn-accent"
							>
								Descartar
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
