import { useEffect, useState } from 'preact/hooks';

export default function Clock() {
	const [date, setDate] = useState(new Date());
	let header: HTMLElement | null;
	let section: HTMLElement | null;
	function fixHeaderSpacing() {
		if (header && section) {
			const height = header.clientHeight;
			section.style.marginTop = `${height}px`;
		}
	}
	function tick() {
		setDate(new Date());
	}

	useEffect(() => {
		header = document.getElementById('dashboard-header');
		section = document.getElementById('dashboard-section');

		const timerID = setInterval(() => tick(), 1000);
		const fixInterval = setInterval(() => fixHeaderSpacing(), 500);
		return function cleanup() {
			clearInterval(timerID);
			clearInterval(fixInterval);
		};
	}, []);

	return (
		<span className="text-2xl ml-3">{date.toTimeString().split(' ')[0]}</span>
	);
}
