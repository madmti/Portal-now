import {
	plugins,
	requestStorageAPI,
	type tPlugin,
	type tPublicUserData,
} from '@lib/plugins';
import {
	unitrack_extension_group,
	unitrack_storage_group,
	type UniTrackStorage,
} from '../storage';
import { useRef, useState } from 'preact/hooks';

function AddClass() {
	const [error, setError] = useState<string | null>(null);
	const classnameRef = useRef<HTMLInputElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const addClass = async () => {
		const classname = classnameRef.current?.value;
		if (!classname) return;

		const res = await requestStorageAPI({
			storage_group: unitrack_storage_group,
			data: [
				{
					path: ['classes'],
					path_resolver: 'reject',
					action: 'add if not exists',
					value: classname,
				},
			],
		});

		if (res.ok) {
			location.reload();
		} else {
			setError('Error al agregar la clase');
			setTimeout(() => {
				setError(null);
			}, 3000);
		}
		closeButtonRef.current?.click();
	};

	return (
		<>
			{error && (
				<div class="toast toast-bot toast-center">
					<div class="alert alert-error">
						<span>{error}</span>
					</div>
				</div>
			)}
			<button
				class="btn btn-wide btn-outline self-center mt-4"
				//@ts-ignore
				onClick={() => document.getElementById('my_modal_2').showModal()}
			>
				Agregar Clase
			</button>
			<dialog id="my_modal_2" class="modal">
				<div class="modal-box">
					<div class="flex flex-col gap-4">
						<h1 class="text-xl">Clase</h1>
						<input
							ref={classnameRef}
							type="text"
							placeholder="Nombre de la clase"
							class="input input-bordered w-full"
							name="class_name"
							id="class_name"
						/>
						<button onClick={addClass} type="button" class="btn btn-primary">
							Agregar
						</button>
					</div>
				</div>
				<form method="dialog" class="modal-backdrop">
					<button ref={closeButtonRef}>close</button>
				</form>
			</dialog>
		</>
	);
}

function DeleteClass({ classname }: { classname: string }) {
	const [error, setError] = useState<string | null>(null);

	const deleteClass = async () => {
		const res = await requestStorageAPI({
			storage_group: unitrack_storage_group,
			data: [
				{
					path: ['classes'],
					path_resolver: 'reject',
					action: 'splice',
					value: classname,
				},
			],
		});

		if (res.ok) {
			location.reload();
		} else {
			setError('Error al eliminar la clase');
			setTimeout(() => {
				setError(null);
			}, 3000);
		}
	};

	return (
		<>
			{error && (
				<div class="toast toast-bot toast-center">
					<div class="alert alert-error">
						<span>{error}</span>
					</div>
				</div>
			)}
			<button
				onClick={deleteClass}
				type="button"
				class="btn btn-outline btn-error btn-square"
			>
				<span class="icon-[gg--trash] text-xl" />
			</button>
		</>
	);
}

function getUniTrackPlugins(plugins_ids: Set<string>) {
	const unitrackPlugins: (tPlugin & { id: string })[] = [];
	plugins_ids.forEach((plugin_id) => {
		const plugin = plugins[plugin_id];
		if (plugin.extension_group === unitrack_extension_group) {
			unitrackPlugins.push({ ...plugin, id: plugin_id });
		}
	});

	return unitrackPlugins;
}

export default function UniTrackManagerSettings({
	user,
	storage,
}: {
	user: tPublicUserData;
	storage: UniTrackStorage;
}) {
	const { installed_plugins } = user;
	const { classes } = storage;

	const unitrackPlugins = getUniTrackPlugins(installed_plugins);

	return (
		<>
			<h1 class="text-3xl">UniTrack</h1>
			<div class="flex flex-wrap items-center justify-center w-full">
				{unitrackPlugins.map((plugin) => {
					return (
						<a
							href={`/home/settings/${plugin.id}/`}
							class="flex gap-2 items-center justify-center badge badge-outline p-4 m-1"
						>
							<img src={`/icons/${plugin.icon}`} class="w-6 h-6" />
							<h2 class="text-lg">{plugin.name}</h2>
						</a>
					);
				})}
			</div>
			<h1 class="text-3xl">Clases</h1>
			<div class="flex flex-col items-center justify-center w-full px-8">
				{!classes.length && (
					<h2 class="text-lg text-neutral-500">No hay clases registradas</h2>
				)}
				{classes.map((clas) => {
					return (
						<div class="flex flex-wrap w-full items-center justify-between gap-2 p-4 border rounded-lg">
							<header class="flex items-center gap-2">
								<h2 class="text-xl font-bold">{clas}</h2>
							</header>
							<div class="flex gap-2 items-center">
								<DeleteClass classname={clas} />
							</div>
						</div>
					);
				})}
				<AddClass />
			</div>
		</>
	);
}
