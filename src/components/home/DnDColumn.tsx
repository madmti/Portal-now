import { plugins } from '@lib/plugins';
import { useState, useRef } from 'preact/hooks';

export default function DnDColumn({
	section,
	plugins_ids,
}: {
	section: string;
	plugins_ids: string[];
}) {
	const [sortedPlugins, setPlugins] = useState(plugins_ids);
	const dragPlugin = useRef<number>(0);
	const dragOverPlugin = useRef<number>(0);

	const handleDragEnd = () => {
		const newPlugins = [...sortedPlugins];
		const [draggedPlugin] = newPlugins.splice(dragPlugin.current, 1);
		newPlugins.splice(dragOverPlugin.current, 0, draggedPlugin);
		setPlugins(newPlugins);
	};

	return (
		<>
			<header class="flex items-center justify-between gap-2">
				<h1 class="text-3xl font-bold">
					{section !== '_!$dashboard' ? section : 'Dashboard'}
				</h1>
				<div class="flex gap-2 items-center">
					{sortedPlugins != plugins_ids && (
						<form action="/api/plugins/reorder/" method="POST">
							<input type="hidden" name="section_name" value={section} />
							<input
								type="hidden"
								name="plugins"
								value={sortedPlugins.join(',')}
							/>
							<button
								type="submit"
								class="btn btn-outline btn-primary btn-square"
							>
								<span class="icon-[uil--save] text-xl" />
							</button>
						</form>
					)}
					{section !== '_!$dashboard' && (
						<form action="/api/plugins/del_section/" method="POST">
							<input type="hidden" name="section_name" value={section} />
							<button
								type="submit"
								class="btn btn-outline btn-error btn-square"
							>
								<span class="icon-[gg--trash] text-xl" />
							</button>
						</form>
					)}
				</div>
			</header>
			{!plugins_ids.length && (
				<p class="text-lg text-neutral-500 text-center">
					Aun no tienes plugins en esta seccion
				</p>
			)}
			{sortedPlugins.map((plugin_id, index) => (
				<div
					class="flex flex-wrap items-center justify-between gap-2 p-4 border rounded-lg"
					draggable
					onDragStart={() => {
						dragPlugin.current = index;
					}}
					onDragEnter={() => {
						dragOverPlugin.current = index;
					}}
					onDragEnd={handleDragEnd}
					onDragOver={(e) => e.preventDefault()}
				>
					<header class="flex items-center gap-2">
						<img
							src={`/icons/${plugins[plugin_id].icon}`}
							class="w-8 h-8"
							alt={plugins[plugin_id].name}
						/>
						<h2 class="text-xl font-bold">{plugins[plugin_id].name}</h2>
					</header>
					<div class="flex gap-2 items-center">
						{!!plugins[plugin_id].settings && (
							<a
								href={`/home/settings/${plugin_id}/`}
								class="btn btn-outline btn-primary btn-square"
							>
								<span class="icon-[grommet-icons--configure]" />
							</a>
						)}
						<form action="/api/plugins/remove/" method="POST">
							<input type="hidden" name="plugin_id" value={plugin_id} />
							<input type="hidden" name="section_name" value={section} />
							<input
								type="hidden"
								name="storage_group"
								value={plugins[plugin_id].storage_group}
							/>
							<button
								type="submit"
								class="btn btn-outline btn-error btn-square"
							>
								<span class="icon-[gg--trash] text-xl" />
							</button>
						</form>
					</div>
				</div>
			))}
		</>
	);
}
