import { useEffect, useState } from 'preact/hooks';
import { getBlock } from './blocks';


export default function BlockClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        setInterval(() => {
            setTime(new Date());
        }, 1000);
    }, []);

    return (
        <div class="flex flex-col items-center justify-center gap-2">
            <h2 class="text-primary text-5xl">{getBlock(time)}</h2>
            <p class="text-neutral-500 text-lg">
                {time.toTimeString().split(':').slice(0, 2).join(':')}
            </p>
        </div>
    );
}
