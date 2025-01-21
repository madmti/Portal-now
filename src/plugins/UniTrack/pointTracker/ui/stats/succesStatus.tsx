import type { PointTrackerClas, PointTrackerOptions } from '../../storage';

function getSuccesStatus(
	current: number,
	min: number,
	next_qualification: number
) {
	if (current >= min * 100) return 'success';
	if (current < min * 100 && next_qualification !== -1) return 'waiting';
	if (current < min * 100 && next_qualification === -1) return 'fail';
}
export default function SuccesStatus({
	current,
	min,
    point_sistem,
}: PointTrackerOptions & PointTrackerClas) {
	const next_qualification = point_sistem.qualifications.findIndex(
		(qualification) => qualification.current_value === -1
	);
	const success_status = getSuccesStatus(current, min, next_qualification);
    const points_until_success = (min * 100 - current) / 100;
    return (
		<div className="stat place-items-center">
			<div className="stat-title">Exito</div>
			<div className="stat-value">
				{success_status === 'success' && (
					<span class="icon-[tabler--check] text-success" />
				)}
				{success_status === 'waiting' && (
					<span class="icon-[tabler--clock] text-accent" />
				)}
				{success_status === 'fail' && (
					<span class="icon-[topcoat--cancel] text-error" />
				)}
			</div>
			<div className="stat-desc">
				Faltan{' '}
				<strong
					class={
						success_status === 'success'
							? 'text-success'
							: success_status === 'waiting'
							? 'text-accent'
							: 'text-error'
					}
				>
					{points_until_success} pts
				</strong>{' '}
				para el min.
			</div>
		</div>
	);
}
