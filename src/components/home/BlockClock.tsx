import { obtenerBloqueActual } from '../../lib/time';

export default function BlockClock() {
	const ahora = new Date();
	const bloqueActual = obtenerBloqueActual(ahora);
	return <p className="text-primary">{bloqueActual}</p>;
}
