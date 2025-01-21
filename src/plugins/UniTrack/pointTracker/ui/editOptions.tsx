import { useRef, useState } from 'preact/hooks';
import { pointtracker_stats, type PointTrackerOptions } from '../storage';
import { requestUpdateOptions } from '../funcs';

export default function EditOptions({
	options,
}: {
	options: PointTrackerOptions;
}) {
	const [error, setError] = useState<string | null>(null);
	const [optionsState, setOptionsState] = useState(options);
	const rest_of_stats = pointtracker_stats.filter(
		(stat) => !optionsState.visible_stats.includes(stat)
	);
	const dragStat = useRef<number>(0);
	const dragOverStat = useRef<number>(0);
	const handleDragEnd = () => {
		const newStats = [...optionsState.visible_stats];
		const [draggedStat] = newStats.splice(dragStat.current, 1);
		newStats.splice(dragOverStat.current, 0, draggedStat);
		setOptionsState({
			...optionsState,
			visible_stats: newStats,
		});
	};

	async function UpdateOptions() {
		const res = await requestUpdateOptions(optionsState);
		if (res.ok) {
			location.reload();
		} else {
			setError('Error al intentar actualizar las opciones');
			setTimeout(() => setError(null), 3000);
		}
	}

	return (
		<div class="flex flex-col gap-4 w-full p-4 bg-base-200 rounded-lg">
			<h1 class="text-xl">General</h1>
			<div class="flex items-center justify-between pl-8 gap-2">
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						class="toggle toggle-primary"
						onChange={(e) =>
							setOptionsState({
								...optionsState,
								show_qualification_status: e.currentTarget.checked,
							})
						}
						checked={optionsState.show_qualification_status}
					/>
					<span>Mostrar estado de calificación</span>
				</label>
			</div>
			<div class="flex items-center justify-between pl-8 gap-2">
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						class="toggle toggle-primary"
						onChange={(e) =>
							setOptionsState({
								...optionsState,
								show_unattached_class_alert: e.currentTarget.checked,
							})
						}
						checked={optionsState.show_unattached_class_alert}
					/>
					<span>Mostrar alerta de clases sin seguimiento</span>
				</label>
			</div>
			<h1 class="text-xl">Estadisticas</h1>
			<div class="flex flex-col justify-center gap-2">
				{optionsState.visible_stats.map((stat, index) => (
					<div
						class="flex items-center justify-between gap-2 w-full p-2 pl-4 bg-base-300 rounded-lg"
						draggable
						onDragStart={() => {
							dragStat.current = index;
						}}
						onDragEnter={() => {
							dragOverStat.current = index;
						}}
						onDragEnd={handleDragEnd}
						onDragOver={(e) => e.preventDefault()}
					>
						<header class="flex items-center gap-2">
							<span class="icon-[uil--draggabledots]" />
							<h3>{stat}</h3>
						</header>
						<button
							onClick={() =>
								setOptionsState({
									...optionsState,
									visible_stats: optionsState.visible_stats.filter(
										(s) => s !== stat
									),
								})
							}
							class="btn btn-error btn-outline btn-square"
						>
							<span class="icon-[gg--trash] text-xl" />
						</button>
					</div>
				))}
				{!!rest_of_stats.length && (
					<div class="dropdown dropdown-top">
						<div
							tabindex={0}
							role="button"
							class="btn btn-primary btn-outline m-1"
						>
							Agregar estadistica
						</div>
						<ul
							tabindex={0}
							class="dropdown-content menu bg-base-100 rounded-box z-[1] w-72 p-2 shadow"
						>
							{rest_of_stats.map((stat) => (
								<li>
									<button
										onClick={() =>
											setOptionsState({
												...optionsState,
												visible_stats: [...optionsState.visible_stats, stat],
											})
										}
									>
										{stat}
									</button>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
			{optionsState !== options && (
				<div class="grid grid-cols-2 gap-2">
					<button onClick={UpdateOptions} class="btn btn-primary mt-4">
						Guardar
					</button>
					<button
						onClick={() => setOptionsState(options)}
						class="btn btn-accent mt-4"
					>
						Descartar
					</button>
				</div>
			)}
			{error && (
				<div class="toast toast-bot toast-center">
					<div class="alert alert-error">
						<span>{error}</span>
					</div>
				</div>
			)}
		</div>
	);
}
