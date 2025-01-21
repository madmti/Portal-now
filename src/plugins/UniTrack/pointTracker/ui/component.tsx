import type { tPublicUserData } from '@lib/plugins';
import type { UniTrackStorage } from '@plugins/UniTrack/config';
import ProgressCard from './progressCard';
import { MissingPlugin, NoClasses } from '@plugins/UniTrack/components';


export default function PointTracker({
	user,
	storage,
}: {
	user: tPublicUserData;
	storage: UniTrackStorage;
}) {
	const { installed_plugins } = user;
	const { point_tracker, classes } = storage;

	if (!installed_plugins.has('unitrack_manager')) return <MissingPlugin />;

	if (!classes.length) return <NoClasses />;

	const { track, options } = point_tracker;
	const tracked_classes = Object.keys(track);
	const not_tracked_classes = options.show_unattached_class_alert
		? classes.filter((clase) => !tracked_classes.includes(clase))
		: [];

	return (
		<div class="flex flex-col gap-4 w-full p-4">
			<h1 class="text-xl">Clases</h1>
			{tracked_classes.map((clase) => (
				<ProgressCard
					options={options}
					clas={point_tracker.track[clase]}
					name={clase}
				/>
			))}
			{not_tracked_classes.map((clase) => (
				<span class="alert alert-info opacity-70 hover:opacity-100 transition-all">
					<span class="icon-[lucide--info] text-xl" />"{clase}" no está siendo
					rastreada por "Point Tracker". Revisa la configuración del plugin.
				</span>
			))}
		</div>
	);
}
