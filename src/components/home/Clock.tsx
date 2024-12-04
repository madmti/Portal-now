import { useEffect, useState } from 'preact/hooks';

export default function Clock() {
	const [date, setDate] = useState(new Date());
	function tick() {
		setDate(new Date());
	}

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return function cleanup() {
			clearInterval(timerID);
		};
	}, []);

	return (
		<div className="flex flex-col gap-2 items-center">
			<span className="text-2xl">{date.toTimeString().split(' ')[0]}</span>
		</div>
	);
}
