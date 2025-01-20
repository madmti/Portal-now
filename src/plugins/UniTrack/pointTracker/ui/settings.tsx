import { type tPublicUserData } from '@lib/plugins';
import { useState } from 'preact/hooks';
import EditCard from './editCard';
import type { UniTrackStorage } from '@plugins/UniTrack/config';
import { requestAttachClass } from '../funcs';
import EditOptions from './editOptions';
import { MissingPlugin, NoClasses } from '@plugins/UniTrack/components';


export default function PointTrackerSettings({
	user,
	storage,
}: {
	user: tPublicUserData;
	storage: UniTrackStorage;
}) {
	const { installed_plugins } = user;
	const { point_tracker, classes } = storage;
	const { options } = point_tracker;

	if (!installed_plugins.has('unitrack_manager')) return <MissingPlugin />;

	if (!classes.length) return <NoClasses />;

	const [error, setError] = useState<string | null>(null);

	const tracked_classes = Object.keys(point_tracker.track);
	const not_tracked_classes = classes.filter(
		(clase) => !tracked_classes.includes(clase)
	);

	async function attachClass(clase: string) {
		const res = await requestAttachClass(clase);
		if (res.ok) {
			location.reload();
		} else {
			setError('Error al intentar adjuntar la clase');
			setTimeout(() => setError(null), 3000);
		}
	}

	return (
		<>
			<div class="flex flex-col gap-4 w-full p-4">
				<h1 class="text-2xl">Opciones</h1>
				<EditOptions options={options} />

				<h1 class="text-2xl">Clases</h1>
				{!tracked_classes.length && (
					<div class="flex flex-col gap-2 w-full p-4 bg-base-200 rounded-lg">
						<header class="flex gap-2 w-full items-center justify-between">
							<h2 class="text-lg">No hay clases en seguimiento</h2>
						</header>
					</div>
				)}
				{tracked_classes.map((clase) => (
					<EditCard name={clase} clase={point_tracker.track[clase]} />
				))}
				<h1 class="text-2xl">Sin seguimiento</h1>
				{not_tracked_classes.map((clase) => (
					<div class="flex flex-col gap-2 w-full p-4 bg-base-200 rounded-lg">
						<header class="flex gap-2 w-full items-center justify-between">
							<h2 class="text-lg">{clase}</h2>
							<button
								onClick={() => attachClass(clase)}
								type="button"
								class="btn btn-square btn-accent btn-outline"
							>
								<span class="icon-[proicons--attach] text-xl" />
							</button>
						</header>
					</div>
				))}
			</div>
			{error && (
				<div class="toast toast-bot toast-center">
					<div class="alert alert-error">
						<span>{error}</span>
					</div>
				</div>
			)}
		</>
	);
}
