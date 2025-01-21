import type { tPlugin } from '@lib/plugins';
import { useState } from 'preact/hooks';

export default function SubmitStorageForm({ plugin }: { plugin: tPlugin }) {
	const [state, setState] = useState({ status: 'idle', error: '' });

	const onClick = async () => {
		setState({ status: 'loading', error: '' });
		const form = document.getElementById('settings') as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		const res = await fetch('/api/plugins/storage_update/', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				data,
				storage_group: plugin.storage_group,
			}),
		});

		if (res.ok) {
			setState({ status: 'success', error: '' });
			location.pathname = '/home/settings/';
		} else {
			setState({ status: 'error', error: await res.text() });
		}
	};

	return (
		<>
			<button
				onClick={onClick}
				type="button"
				class={`btn btn-wide btn-primary ${
					state.status == 'loading' ? 'btn-disabled' : ''
				}`}
			>
				Save
				<span class={state.status == 'loading' ? 'loading' : ''} />
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
