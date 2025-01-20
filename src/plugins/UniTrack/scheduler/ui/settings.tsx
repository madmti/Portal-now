import type { tPublicUserData } from '@lib/plugins';
import { MissingPlugin, NoClasses } from '@plugins/UniTrack/components';
import type { UniTrackStorage } from '@plugins/UniTrack/config';
import { scheduler_sistems } from '../storage';
import { SchedulerSistemsData } from '../sistems';
import EditEvents from './EditEvents';
import EditSchedule from './EditSchedule';

export default function SchedulerSettings({
	user,
	storage,
}: {
	user: tPublicUserData;
	storage: UniTrackStorage;
}) {
	const { installed_plugins } = user;
	const { scheduler, classes } = storage;

	if (!installed_plugins.has('unitrack_manager')) return <MissingPlugin />;

	if (!classes.length) return <NoClasses />;

	const selected_sistem = SchedulerSistemsData[scheduler.sistem];

	return (
		<>
			<div class="flex flex-col gap-4 w-full p-4">
				<h1 class="text-2xl">Opciones</h1>
				<div class="flex flex-col gap-4 w-full p-4 bg-base-200 rounded-lg">
					<h1 class="text-xl">General</h1>
					<div class="flex items-center justify-between gap-2">
						<label for="scheduler_interval" class="text-lg">
							Sistema de tiempo
						</label>
						<select class="input input-bordered">
							{scheduler_sistems.map((s) => (
								<option value={s}>{s}</option>
							))}
						</select>
					</div>
					<div class="flex items-center justify-between gap-2">
						<label class="text-lg">Claves del sistema</label>
						<div class="flex gap-2 flex-wrap items-center max-w-xs">
							{Object.keys(selected_sistem).map((key) => (
								<span class="badge badge-outline">{key}</span>
							))}
						</div>
					</div>
				</div>
				<h1 class="text-2xl">Eventos</h1>
				<EditEvents
					classes={classes}
					schedule_by_event_code={scheduler.schedule_by_event_code}
				/>
				<h1 class="text-2xl">Horarios</h1>
				<EditSchedule 
					schedule_by_event_code={scheduler.schedule_by_event_code}
					schedule_by_day={scheduler.schedule_by_day}
					sorted_keys={scheduler.sorted_keys}
				/>
			</div>
		</>
	);
}
