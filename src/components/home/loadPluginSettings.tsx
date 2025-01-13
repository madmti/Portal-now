import type { tPlugin } from '@lib/plugins';
import { useEffect, useState } from 'preact/hooks';

export default function PluginSettings({ plugin }: { plugin: tPlugin }) {
	const [settings, setComponent] = useState<null | preact.ComponentType>(null);

	const loadComponent = async () => {
		if (!plugin.settings) {
			return;
		}

		const { default: Component } = await import(
			/* @vite-ignore */ `../../plugins/${plugin.settings}`
		);
		setComponent(Component);
	};

	useEffect(() => {
		loadComponent();
	}, []);

	return settings ?? <p>Settings not found</p>;
}
