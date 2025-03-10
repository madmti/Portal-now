export function MissingPlugin() {
	return (
		<div class="flex flex-col items-center justify-center w-full">
			<h2 class="text-lg">
				No has instalado el plugin{' '}
				<span class="text-accent">UniTrack Manager</span>
			</h2>
			<a
				href="/home/plugins/unitrack_manager/"
				class="btn btn-primary btn-wide mt-4"
			>
				<span class="icon-[material-symbols--search] text-xl" />
				Buscar
			</a>
		</div>
	);
}

export function NoClasses() {
	return (
		<div class="flex flex-col items-center justify-center w-full">
			<h2 class="text-lg">
				No tienes ninguna clase registrada en{' '}
				<span class="text-accent">UniTrack Manager</span>
			</h2>
			<a
				href="/home/settings/unitrack_manager/"
				class="btn btn-primary btn-wide mt-4"
			>
				Agregar una clase
			</a>
		</div>
	);
}

export function NoDataYet({
	plugin_name,
	plugin_id,
}: {
	plugin_name: string;
	plugin_id: string;
}) {
	return (
		<div class="flex flex-col items-center justify-center w-full">
			<h2 class="text-lg">
				Aun no has registrado datos en{' '}
				<span class="text-accent">{plugin_name}</span>
			</h2>
			<a
				href={`/home/settings/${plugin_id}/`}
				class="btn btn-primary btn-wide mt-4"
			>
				Configuración de {plugin_name}
			</a>
		</div>
	);
}
