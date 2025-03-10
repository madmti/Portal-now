import type { PointTrackerClas, PointTrackerOptions } from '../../storage';

export default function NextMinQual({
	point_sistem,
}: PointTrackerOptions & PointTrackerClas) {
	return (
		<div className="stat place-items-center">
			<div className="stat-title">Sigte. Nota min.</div>
			<div className="stat-value">
				{point_sistem.target_qualification.toFixed(3)}
			</div>
			<div className="stat-desc">
				Calculada usando "{point_sistem.algorithm}"
			</div>
		</div>
	);
}
