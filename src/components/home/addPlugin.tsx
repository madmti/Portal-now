import { useState } from 'preact/hooks';

export default function AddPlugin({
	id,
	storage_group,
	default_storage,
	user_sections,
	plugins,
}: {
	id: string;
	storage_group?: string;
	default_storage?: any;
	user_sections: string[];
	plugins: Record<string, string[]>;
}) {
	const [state, setState] = useState({ status: 'idle', error: '' });
	const addPlugin = async (section: string) => {
		if (plugins[section]?.includes(id)) {
			return;
		}
		setState({ status: 'loading', error: '' });
		const res = await fetch('/api/plugins/add/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id, storage_group, default_storage, section }),
		});
		if (res.ok) {
			setState({ status: 'success', error: '' });
			location.reload();
		} else {
			setState({ status: 'error', error: await res.text() });
		}
	};

	const is_fully_installed = user_sections.every((section) =>
		plugins[section]?.includes(id)
	);

	return (
		<>
			<div className="dropdown dropdown-end">
				<button
					tabIndex={0}
					role="button"
					class={`btn btn-outline btn-primary btn-square ${
						is_fully_installed || state.status == 'loading'
							? 'btn-disabled'
							: ''
					}`}
				>
					<span
						class={`w-6 h-6 ${
							state.status == 'idle' ? 'icon-[gg--extension-add]' : 'loading'
						}`}
					/>{' '}
				</button>
				<ul
					tabIndex={0}
					className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow"
				>
					{user_sections.map((section) => (
						<li>
							<a
								class={plugins[section]?.includes(id) ? 'btn btn-disabled' : ''}
								onClick={() => addPlugin(section)}
							>
								{section !== '_!$dashboard' ? section : 'Dashboard'}
							</a>
						</li>
					))}
				</ul>
			</div>
			{state.status === 'error' && (
				<div class="toast toast-center">
					<div role="alert" class="alert alert-error">
						<span class="icon-[codicon--error] text-2xl text-base-content"></span>
						<span>{state.error}</span>
					</div>
				</div>
			)}
		</>
	);
}
