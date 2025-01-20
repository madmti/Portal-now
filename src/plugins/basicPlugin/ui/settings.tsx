export default function BasicPluginSettings() {
	return (
		<form class="w-full" id="settings" onSubmit={(e) => e.preventDefault()}>
			<label
				for="display_text"
				class="flex gap-2 items-center justify-center w-full"
			>
				Display Text:
				<input
					id="display_text"
					name="display_text"
					type="text"
					class="bg-neutral text-base-content p-2 rounded-lg"
					placeholder="Enter text to display"
					required
				/>
			</label>
		</form>
	);
}
