import type { PointTrackerClas } from './storage';

export default function ProgressCard({
	clas,
	name,
}: {
	clas: PointTrackerClas;
	name: string;
}) {
	const { goal, min, current, average, tendency, point_sistem } = clas;
	const progress_value = goal != 0 ? current / goal : 100;
	const next_qualification = point_sistem.qualifications.findIndex(
		(qualification) => qualification.current_value === -1
	);
	return (
		<div class="flex flex-col gap-2 w-full p-4 bg-base-200 rounded-lg">
			<header class="flex flex-wrap gap-2 w-full items-center justify-between">
				<h2 class="text-xl text-primary">{name}</h2>
				{next_qualification === -1 && <p class="text-neutral-500">Cerrado</p>}
				<div class="flex flex-wrap gap-2 items-center w-full max-w-56">
					<p class="text-sm text-neutral-500 w-full">
						{current / 100} / {goal}
					</p>
					<progress
						className="progress progress-primary w-full max-w-56"
						value={progress_value}
						max="100"
					/>
				</div>
			</header>
			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							<th></th>
							<th>Evaluacion</th>
							<th>Ponderacion</th>
							<th>Nota</th>
						</tr>
					</thead>
					<tbody>
						{point_sistem.qualifications.map((qualification, index) => (
							<tr
								className={
									index === next_qualification
										? 'bg-primary text-primary-content'
										: ''
								}
							>
								<th>{index}</th>
								<td>{qualification.name}</td>
								<td>{qualification.multiplier / 100}</td>
								<td>
									{qualification.current_value === -1
										? '-'
										: qualification.current_value}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div id="stats-wrap" className="stats shadow">
				<div className="stat place-items-center">
					<div className="stat-title">Sigte. Nota min.</div>
					<div className="stat-value">{point_sistem.target_qualification.toFixed(3)}</div>
					<div className="stat-desc">
						Calculada usando "{point_sistem.algorithm}"
					</div>
				</div>

				<div className="stat place-items-center">
					<div className="stat-title">Tendencia</div>
					<div className="stat-value text-secondary">
						{tendency >= 0 ? '+' : ''}
						{(tendency * 100).toPrecision(4)}%
					</div>
					<div className="stat-desc text-secondary">
						Comparado con tu promedio
					</div>
				</div>

				<div className="stat place-items-center">
					<div className="stat-title">Exito</div>
					<div className="stat-value">
						{current >= min * 100 && (
							<span class="icon-[tabler--check] text-success" />
						)}
						{current < min * 100 && next_qualification !== -1 && (
							<span class="icon-[tabler--clock] text-accent" />
						)}
						{current < min * 100 && next_qualification === -1 && (
							<span class="icon-[topcoat--cancel] text-error" />
						)}
					</div>
					<div className="stat-desc">
						Faltan {(min * 100 - current) / 100} pts para el min.
					</div>
				</div>
			</div>
		</div>
	);
}
