import type { PointTrackerClas } from './storage';

export default function ProgressCard({
	clas,
	name,
}: {
	clas: PointTrackerClas;
	name: string;
}) {
	const { goal, min, current, point_sistem } = clas;
	const progress_value = goal != 0 ? (current / goal) * 100 : 100;

	return (
		<div class="flex flex-col gap-2 w-full p-4 bg-base-200 rounded-lg">
			<header class="flex gap-2 w-full items-center justify-between">
				<h2 class="text-xl text-primary">{name}</h2>
				<progress
					className="progress progress-primary w-56"
					value={progress_value}
					max="100"
				/>
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
						<tr>
							<th>12/04</th>
							<td>Certamen 1</td>
							<td>0.25</td>
							<td class="text-accent">75</td>
						</tr>
						<tr className="bg-primary text-primary-content">
							<th>22/06</th>
							<td>Certamen 2</td>
							<td>0.30</td>
							<td>-</td>
						</tr>
						<tr>
							<th>03/11</th>
							<td>Certamen 3</td>
							<td>0.35</td>
							<td>-</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="stats shadow">
				<div className="stat place-items-center">
					<div className="stat-title">Nota min</div>
					<div className="stat-value">31</div>
					<div className="stat-desc">
						Calculada usando "{point_sistem.algorithm}"
					</div>
				</div>

				<div className="stat place-items-center">
					<div className="stat-title">Tendencia</div>
					<div className="stat-value text-secondary">+32.8%</div>
					<div className="stat-desc text-secondary">
						Comparado con tu promedio
					</div>
				</div>

				<div className="stat place-items-center">
					<div className="stat-title">Exito</div>
					<div className="stat-value">
						<span class="icon-[tabler--clock] text-accent" />
					</div>
					<div className="stat-desc">faltan 55.2 pts</div>
				</div>
			</div>
		</div>
	);
}
