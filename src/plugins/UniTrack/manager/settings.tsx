import { useRef, useState } from 'preact/hooks';
import {
	getUniTrackPlugins,
	requestAddClass,
	requestDeleteClass,
} from '../funcs';
import type { tPlugin, tPublicUserData } from '@lib/plugins';
import type { UniTrackStorage } from '../config';

function AddClass() {
	const [error, setError] = useState<string | null>(null);
	const classnameRef = useRef<HTMLInputElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	const addClass = async () => {
		const classname = classnameRef.current?.value;
		if (!classname) return;

		const res = await requestAddClass(classname);

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

function DeleteClass({
	classname,
	unitrack_plugins,
}: {
	classname: string;
	unitrack_plugins: tPlugin[];
}) {
	const [error, setError] = useState<string | null>(null);

	const deleteClass = async () => {
		const res = await requestDeleteClass(classname, unitrack_plugins);

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
							class="flex gap-2 items-center justify-center badge bg-base-200 hover:badge-primary p-4 m-1"
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
						<div class="flex flex-wrap w-full items-center justify-between gap-2 p-4 bg-base-200 rounded-lg">
							<header class="flex items-center gap-2">
								<h2 class="text-xl font-bold">{clas}</h2>
							</header>
							<div class="flex gap-2 items-center">
								<DeleteClass
									classname={clas}
									unitrack_plugins={unitrackPlugins}
								/>
							</div>
						</div>
					);
				})}
				<AddClass />
			</div>
		</>
	);
}
