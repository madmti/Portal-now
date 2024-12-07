import { useEffect, useState } from 'preact/hooks';
import { obtenerBloqueActual } from '@lib/time';

export default function BlockClock() {
	const [ahora, setAhora] = useState(new Date());
	const [bloqueActual, setBloqueActual] = useState(obtenerBloqueActual(ahora));

	useEffect(() => {
		const interval = setInterval(() => {
			const nuevaHora = new Date();
			const nuevoBloque = obtenerBloqueActual(nuevaHora);
			if (nuevoBloque !== bloqueActual) {
				setAhora(nuevaHora);
				setBloqueActual(nuevoBloque);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [bloqueActual]);

	return <p className="text-primary">{bloqueActual}</p>;
}
