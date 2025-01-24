import type { tPlugin, tPublicUserData } from '@lib/plugins';
import { useEffect, useState } from 'preact/hooks';

export default function PluginSettings({
	plugin,
	public_user_data,
	plugins_storage,
}: {
	plugin: tPlugin;
	public_user_data: tPublicUserData;
	plugins_storage: any;
}) {
	const [settings, setComponent] = useState<{
		component: preact.ComponentType<any>;
	} | null>(null);

	const loadComponent = async () => {
		if (!plugin.settings) {
			return;
		}

		const { default: Component } = await import(
			/* @vite-ignore */ `/${plugin.settings}`
		);
		setComponent({ component: Component });
	};

	useEffect(() => {
		loadComponent();
	}, []);

	return (
		<>
			{settings && (
				<settings.component
					user={public_user_data}
					storage={
						plugin.storage_group ? plugins_storage[plugin.storage_group] : null
					}
				/>
			)}
			{!settings && <p>Settings not found</p>}
		</>
	);
}
