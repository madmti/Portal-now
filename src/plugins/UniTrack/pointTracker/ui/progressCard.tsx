import type {
	PointTrackerClas,
	PointTrackerOptions,
	PointTrackerStats,
} from '../storage';
import NextMinQual from './stats/nextMinQual';
import SuccesStatus from './stats/succesStatus';
import Tendency from './stats/tendency';

function getQualificationState(
	qualification: number,
	min: number,
	is_next: boolean
) {
	if (is_next) return <span class="icon-[streamline--target] text-lg" />;
	if (qualification === -1) return '';

	if (qualification >= min)
		return <span class="icon-[uil--smile] text-lg text-primary" />;
	if (qualification < min)
		return <span class="icon-[mingcute--sad-line] text-lg text-error" />;
}

function getStatComponent(
	stat_name: PointTrackerStats,
	clas: PointTrackerClas,
	options: PointTrackerOptions
) {
	const props = { ...clas, ...options };
	switch (stat_name) {
		case 'Next Minimum Qualification':
			return <NextMinQual {...props} />;
		case 'Tendency':
			return <Tendency {...props} />;
		case 'Succes Status':
			return <SuccesStatus {...props} />;
		default:
			return null;
	}
}

export default function ProgressCard({
	options,
	clas,
	name,
}: {
	options: PointTrackerOptions;
	clas: PointTrackerClas;
	name: string;
}) {
	const { goal, min, current, point_sistem } = clas;
	const { show_qualification_status, visible_stats } = options;
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
							{show_qualification_status && <th>Estado</th>}
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
								{show_qualification_status && (
									<th>
										{getQualificationState(
											qualification.current_value,
											min,
											index === next_qualification
										)}
									</th>
								)}
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
				{visible_stats.map((stat_name) =>
					getStatComponent(stat_name, clas, options)
				)}
			</div>
		</div>
	);
}
