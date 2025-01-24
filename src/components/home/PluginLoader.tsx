import { useEffect, useState } from 'preact/hooks';
import { type tPlugin, type tPublicUserData } from '@lib/plugins';

interface tPluginLoaded {
	data: tPlugin;
	component?: preact.ComponentType<any>;
}

export default function PluginLoader({
	mode,
	public_user_data,
	plugins_storage,
	user_plugins,
	show_plugins_names,
	plugins_path,
}: {
	mode: 'development' | 'production';
	public_user_data: tPublicUserData;
	plugins_storage: any;
	user_plugins: tPlugin[];
	show_plugins_names: boolean;
	plugins_path: Record<string, string>;
}) {
	const [plugins, setPlugins] = useState<tPluginLoaded[]>([]);

	const loadPlugins = async () => {
		const loadedPlugins = await Promise.all(
			user_plugins.map(async (plugin) => {
				if (!plugin.component) {
					return { data: plugin };
				}

				let Component;
				if (mode === 'production') {
					const { default: com } = await import(
						/* @vite-ignore */ plugins_path[plugin.id]
					);
					Component = com;
				} else {
					const { default: com } = await import(
						/* @vite-ignore */ `../../plugins/${plugin.component}`
					);
					Component = com;
				}

				return { data: plugin, component: Component };
			})
		);
		setPlugins(loadedPlugins);
	};

	useEffect(() => {
		loadPlugins();
	}, []);

	return (
		<ul class="w-full flex flex-col gap-4">
			{!plugins.length && (
				<div class="flex flex-col items-center justify-center gap-2">
					<p class="text-lg text-neutral-500 mt-10">
						No as agregado plugins aun?
					</p>
					<a class="btn btn-primary" href="/home/plugins/">
						Ver plugins
					</a>
				</div>
			)}
			{plugins.map((plugin, index) => {
				return (
					!!plugin.component && (
						<li
							key={index}
							class={index !== 0 ? 'border-t border-neutral-800 pt-4' : 'pt-4'}
						>
							{show_plugins_names && (
								<div class="flex flex-row items-center gap-2 justify-start w-full opacity-50 hover:opacity-100 transition-all">
									<img
										width={20}
										height={20}
										src={`/icons/${plugin.data.icon}`}
										alt={plugin.data.name}
									/>
									<h3>{plugin.data.name}</h3>
								</div>
							)}
							<plugin.component
								user={public_user_data}
								storage={
									plugin.data.storage_group
										? plugins_storage[plugin.data.storage_group]
										: null
								}
							/>
						</li>
					)
				);
			})}
		</ul>
	);
}
