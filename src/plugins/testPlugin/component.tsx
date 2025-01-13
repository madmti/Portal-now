import type { tPublicUserData } from '@lib/plugins';

interface TestPluginStorage {
	display_text: string;
}

export default function TestPlugin({
	user,
	storage,
}: {
	user: tPublicUserData;
	storage: TestPluginStorage;
}) {
	return (
		<div class="flex gap-4 w-full items-end justify-center">
			<div class="border rounded-full p-2 grid place-items-center border-neutral-500">
				<span class="icon-[game-icons--portal] text-primary text-4xl" />
			</div>
			<p class="text-xl border rounded-xl rounded-bl-none p-4 flex flex-col gap-2">
				"{storage.display_text}"
				<small class="text-green-500 text-xs self-end">{user.username}</small>
			</p>
		</div>
	);
}
