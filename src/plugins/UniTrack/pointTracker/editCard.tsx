import { useState } from 'preact/hooks';
import {
	getAlgorithmFunction,
	pointSistemAlgorithms,
	type PointTrackerClas,
} from './storage';
import { requestStorageAPI } from '@lib/plugins';
import { unitrack_storage_group } from '../storage';

type deattachingClasFunc = (input: string) => Promise<void>;

export default function EditCard({
	deattachClass,
	name,
	clase,
}: {
	deattachClass: deattachingClasFunc;
	name: string;
	clase: PointTrackerClas;
}) {
	const [error, setError] = useState('');
	const [dataState, setDataState] = useState(clase);

	function updateEvaluationName(index: number, value: string) {
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
	function updateEvaluationMultiplier(index: number, value: number) {
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
	function updateEvaluationCurrentValue(index: number, value: number) {
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
	function updateEthaName(index: number, value: string) {
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
	function updateEthaMultiplier(index: number, value: number) {
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
	function updateEthaCurrentValue(index: number, value: number) {
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

	function dataIsOk() {
		if (
			dataState.goal < 0 ||
			dataState.min < 0 ||
			dataState.min > dataState.goal
		)
			return false;

		for (const etha of dataState.point_sistem.ethas ?? []) {
			if (etha.multiplier <= 0 || !etha.name) return false;
			etha.current_value = etha.current_value ?? -1;
			if (etha.current_value < 0) etha.current_value = -1;
		}
		for (const evaluation of dataState.point_sistem.qualifications) {
			if (evaluation.multiplier < 0 || !evaluation.name) return false;
			evaluation.current_value = evaluation.current_value ?? -1;
			if (evaluation.current_value < 0) evaluation.current_value = -1;
		}

		return true;
	}

	function calculateRestOfData() {
		const copy = { ...dataState };

		let qual_sum = 0;
		let flat_sum = 0;
		let last_qual = 0;
		let n_qual = 0;
		for (const evaluation of copy.point_sistem.qualifications) {
			if (evaluation.current_value === -1) continue;
			qual_sum += evaluation.multiplier * evaluation.current_value;
			flat_sum += evaluation.current_value;
			last_qual = evaluation.current_value;
			n_qual++;
		}
		let etha_mul = 1;
		for (const etha of copy.point_sistem.ethas ?? []) {
			if (etha.current_value === -1) continue;
			etha_mul *= etha.multiplier * etha.current_value;
		}
		copy.current = qual_sum * etha_mul;
		copy.average = n_qual ? qual_sum / n_qual : 0;
		copy.tendency =
			n_qual > 0
				? 1 - (n_qual * (flat_sum - last_qual)) / (flat_sum * (n_qual - 1))
				: 0;
		copy.tendency =
			isNaN(copy.tendency) || !isFinite(copy.tendency) ? 0 : copy.tendency;
		const algorithm = getAlgorithmFunction(copy.point_sistem.algorithm);
		copy.point_sistem.target_qualification = algorithm(copy);
		return copy;
	}

	async function updateClas() {
		if (!dataIsOk()) {
			setError('Campos invalidos');
			setTimeout(() => setError(''), 3000);
			return;
		}

		const new_data = calculateRestOfData();

		const res = await requestStorageAPI({
			storage_group: unitrack_storage_group,
			data: [
				{
					action: 'set',
					path: ['point_tracker', 'track', name],
					value: new_data,
				},
			],
		});
		if (res.ok) {
			location.reload();
		} else {
			setError('Error al guardar');
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
						onClick={() => deattachClass(name)}
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
														updateEthaName(index, e.currentTarget.value)
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
															parseFloat(e.currentTarget.value) * 100
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
															parseFloat(e.currentTarget.value)
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
															updateEvaluationName(index, e.currentTarget.value)
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
																parseFloat(e.currentTarget.value) * 100
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
																parseFloat(e.currentTarget.value)
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
