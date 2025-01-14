import { useState } from 'preact/hooks';
import { pointSistemAlgorithms, type PointTrackerClas } from './storage';

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
	const [dataState, setDataState] = useState(clase);

	const fake_ethas = [
		{ name: 'Etha 1', current_value: -1, multiplier: 100 },
		{ name: 'Etha 2', current_value: -1, multiplier: 100 },
	];

	const fake_evaluations = [
		{ name: 'Evaluacion 1', current_value: 75, multiplier: 25 },
		{ name: 'Evaluacion 2', current_value: -1, multiplier: 30 },
		{ name: 'Evaluacion 3', current_value: -1, multiplier: 35 },
	];

	async function updateClas() {}

	return (
		<div tabIndex={0} className="collapse bg-base-200">
			<input type="checkbox" />
			<div className="collapse-title pr-[18px] flex gap-2 w-full items-center justify-between">
				<h2 class="text-xl text-primary">{name}</h2>
				<button
					onClick={() => deattachClass(name)}
					type="button"
					class="btn btn-square btn-accent btn-outline"
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
							{fake_ethas.map((etha, index) => (
								<>
									<span class="divider divider-neutral h-0 m-0 p-0"></span>
									<tr class="flex flex-wrap justify-between">
										<td>
											<input
												type="text"
												placeholder={etha.name}
												className="input input-bordered input-md max-w-36"
											/>
										</td>
										<td>
											<input
												type="text"
												placeholder={`x ${etha.multiplier / 100}`}
												className="input input-bordered input-md max-w-36"
											/>
										</td>
										<td>
											<input
												type="text"
												placeholder={
													etha.current_value === -1
														? '-'
														: etha.current_value.toString()
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
						<button type="button" class="btn btn-primary btn-sm w-36">
							+
						</button>
						<button type="button" class="btn btn-error btn-sm w-36">
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
							{fake_evaluations.map((evaluation, index) => (
								<>
									<span class="divider divider-neutral h-0 m-0 p-0"></span>
									<tr class="flex flex-wrap justify-between">
										<td>
											<input
												type="text"
												placeholder={evaluation.name}
												className="input input-bordered input-md max-w-36"
											/>
										</td>
										<td>
											<input
												type="text"
												placeholder={`x ${evaluation.multiplier / 100}`}
												className="input input-bordered input-md max-w-36"
											/>
										</td>
										<td>
											<input
												type="text"
												placeholder={
													evaluation.current_value === -1
														? '-'
														: evaluation.current_value.toString()
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
						<button type="button" class="btn btn-primary btn-sm w-36">
							+
						</button>
						<button type="button" class="btn btn-error btn-sm w-36">
							<span class="icon-[gg--trash] text-xl" />
						</button>
					</div>
				</div>
				{dataState != clase && (
					<button type="button" onClick={updateClas} class="btn btn-primary">
						Guardar
					</button>
				)}{' '}
			</div>
		</div>
	);
}
