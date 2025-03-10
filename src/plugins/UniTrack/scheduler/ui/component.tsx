import type { tPublicUserData } from '@lib/plugins';
import type { UniTrackStorage } from '@plugins/UniTrack/config';
import { type SchedulerEventData, type tDay } from '../storage';
import { SchedulerSistemsData } from '../sistems';
import { getKey } from '../funcs';
import { MissingPlugin, NoDataYet } from '@plugins/UniTrack/components';

function EmptyScheduleKey({
	isActual,
	timeRange,
}: {
	isActual: boolean;
	timeRange: string;
}) {
	return (
		<div
			tabIndex={0}
			class={`group timeline-end timeline-box collapse collapse-close p-0 bg-base-200 max-w-[350px] ${isActual ? 'border-primary' : 'border-neutral-500'
				}`}
		>
			<div className="collapse-title flex justify-between items-center">
				<h1 class="text-lg text-neutral-500">Libre</h1>
				<span class="text-base text-accent group-hover:opacity-100 opacity-0 transition-all">
					{timeRange}
				</span>
			</div>
		</div>
	);
}

function OneScheduleKey({
	timeRange,
	isActual,
	data,
}: {
	timeRange: string;
	isActual: boolean;
	data: SchedulerEventData;
}) {
	const { class_name, place, class_type } = data;
	return (
		<div
			tabIndex={0}
			class={`group timeline-end timeline-box collapse p-0 bg-base-200 max-w-[350px] ${isActual ? 'border-primary' : 'border-neutral-500'
				}`}
		>
			<div className="collapse-title flex justify-between items-center">
				<h1 class={`text-lg ${isActual ? 'text-primary' : ''}`}>
					{class_name}
				</h1>
				<span class="text-base text-accent group-hover:opacity-100 opacity-0 transition-all">
					{timeRange}
				</span>
			</div>{' '}
			<div className="collapse-content">
				<span class="divider m-0 mb-2 h-0"></span>
				<p>
					{class_type} - <strong class="text-accent">{place}</strong>
				</p>
			</div>
		</div>
	);
}

function MultipleScheduleKey({
	timeRange,
	isActual,
	datas,
}: {
	timeRange: string;
	isActual: boolean;
	datas: SchedulerEventData[];
}) {
	const first_data = datas[0];
	return (
		<div
			tabIndex={0}
			class={`group timeline-end timeline-box collapse p-0 bg-base-200 max-w-[350px] ${isActual ? 'border-primary' : 'border-neutral-500'
				}`}
		>
			<div className="collapse-title flex justify-between items-center">
				<h1 class="text-lg text-warning">
					{first_data.class_name}{' '}
					<span class="badge badge-warning ml-2">+{datas.length - 1}</span>
				</h1>
				<span class="text-base text-accent group-hover:opacity-100 opacity-0 transition-all">
					{timeRange}
				</span>
			</div>{' '}
			<div className="collapse-content">
				{datas.map((data, index) => (
					<>
						<span
							class={`divider m-0 ${index === 0 ? 'h-0 mb-2' : 'h-4'}`}
						></span>
						<h3>{data.class_name}</h3>
						<p>
							{data.class_type} -{' '}
							<strong class="text-accent">{data.place}</strong>
						</p>
					</>
				))}
			</div>
		</div>
	);
}

export default function Scheduler({
	user,
	storage,
}: {
	user: tPublicUserData;
	storage: UniTrackStorage;
}) {
	const { installed_plugins } = user;
	const { scheduler } = storage;
	const {
		sistem: sistem_name,
		sorted_keys,
		schedule_by_day,
		schedule_by_event_code,
	} = scheduler;

	if (!installed_plugins.has('unitrack_manager')) return <MissingPlugin />;
	if (!Object.keys(schedule_by_event_code).length) return <NoDataYet plugin_name="Scheduler" plugin_id="scheduler" />;

	const time = new Date();
	const day = time.getDay() as tDay;
	const sistem = SchedulerSistemsData[sistem_name];
	const actual_keys_indexes = getKey(time, sistem, sorted_keys);
	const today_schedule = schedule_by_day[day];

	return (
		<div class="flex flex-col justify-center h-full">
			<h1 class="text-xl text-neutral-500">Sistema "{sistem_name}"</h1>
			<ul className="timeline timeline-vertical ml-[-325px]">
				{sorted_keys.map((key, index) => {
					const isPast = index <= actual_keys_indexes[0];
					const isActual =
						actual_keys_indexes.length === 1 &&
						index === actual_keys_indexes[0];
					const nextInComming =
						actual_keys_indexes.length > 1 &&
						index + 1 === actual_keys_indexes[1];

					const key_events_codes = today_schedule?.[key] || [];
					const key_events_data = key_events_codes.map(
						(ev_code) => schedule_by_event_code[ev_code]
					);
					const time_range = sistem[key]
						.map(({ h, m }) => `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`)
						.join(' - ');

					return (
						<li>
							{index !== 0 && (
								<hr
									class={isPast || isActual ? 'bg-primary' : 'bg-neutral-500'}
								/>
							)}
							<div className="timeline-middle text-lg min-w-[50px] flex justify-center">
								<p
									class={
										isPast || isActual ? 'text-primary' : 'text-neutral-500'
									}
								>
									{key}
								</p>
							</div>
							{!key_events_data.length && (
								<EmptyScheduleKey isActual={isActual} timeRange={time_range} />
							)}
							{key_events_data.length === 1 && (
								<OneScheduleKey
									isActual={isActual}
									data={key_events_data[0]}
									timeRange={time_range}
								/>
							)}
							{key_events_data.length > 1 && (
								<MultipleScheduleKey
									isActual={isActual}
									datas={key_events_data}
									timeRange={time_range}
								/>
							)}
							{index !== sorted_keys.length - 1 && (
								<hr
									class={
										isPast || nextInComming ? 'bg-primary' : 'bg-neutral-500'
									}
								/>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
