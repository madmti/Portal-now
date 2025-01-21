import type { PointTrackerClas, PointTrackerOptions } from '../../storage';

export default function Tendency({
	tendency,
}: PointTrackerOptions & PointTrackerClas) {
	return (
		<div className="stat place-items-center">
			<div className="stat-title">Tendencia</div>
			<div className="stat-value text-secondary">
				{tendency >= 0 ? '+' : ''}
				{(tendency * 100).toPrecision(4)}%
			</div>
			<div className="stat-desc text-secondary">Comparado con tu promedio</div>
		</div>
	);
}
