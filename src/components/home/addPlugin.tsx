import { useState } from 'preact/hooks';

export default function AddPlugin({
	id,
	storage_group,
	default_storage,
	is_installed,
}: {
	id: string;
	storage_group?: string;
	default_storage?: any;
	is_installed: boolean;
}) {
	const [state, setState] = useState({ status: 'idle', error: '' });
	const onClick = async () => {
		if (is_installed) {
			return;
		}
		setState({ status: 'loading', error: '' });
		const res = await fetch('/api/plugins/add/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id, storage_group, default_storage }),
		});
		if (res.ok) {
			setState({ status: 'success', error: '' });
			location.reload();
		} else {
			setState({ status: 'error', error: await res.text() });
		}
	};

	return (
		<>
			<button
				onClick={onClick}
				class={`btn btn-outline btn-primary btn-square ${
					is_installed || state.status == 'loading' ? 'btn-disabled' : ''
				}`}
			>
				<span
					class={`w-6 h-6 ${
						state.status == 'idle' ? 'icon-[gg--extension-add]' : 'loading'
					}`}
				/>
			</button>
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
