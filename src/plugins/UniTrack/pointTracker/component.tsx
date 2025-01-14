import type { tPublicUserData } from '@lib/plugins';
import type { UniTrackStorage } from '../storage';
import ProgressCard from './progressCard';

function MissingPlugin() {
	return (
		<div class="flex flex-col items-center justify-center w-full">
			<h2 class="text-lg">
				No has instalado el plugin{' '}
				<span class="text-accent">UniTrack Manager</span>
			</h2>
			<a href="/home/dashboard/plugins/" class="btn btn-primary btn-wide mt-4">
				<span class="icon-[material-symbols--search] text-xl" />
				Buscar
			</a>
		</div>
	);
}

function NoClasses() {
	return (
		<div class="flex flex-col items-center justify-center w-full">
			<h2 class="text-lg">
				No tienes ninguna clase registrada en{' '}
				<span class="text-accent">UniTrack Manager</span>
			</h2>
			<a
				href="/home/settings/unitrack_manager/"
				class="btn btn-primary btn-wide mt-4"
			>
				Agregar una clase
			</a>
		</div>
	);
}

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

	const tracked_classes = Object.keys(point_tracker.track);
	const not_tracked_classes = classes.filter(
		(clase) => !tracked_classes.includes(clase)
	);

	return (
		<div class="flex flex-col gap-4 w-full p-4">
			<h1 class="text-xl">Clases</h1>
			{tracked_classes.map((clase) => (
				<ProgressCard clas={point_tracker.track[clase]} name={clase} />
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
