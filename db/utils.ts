import type { tSistemTime, tSistemType } from "./config";

export const getTimeStamp = (hour?: number, minute?: number) => {
    const date = new Date();
    date.setFullYear(1970, 0, 1);
    if (hour) {
        if (!minute) minute = 0;
        date.setHours(hour, minute, 0, 0);
    }
    return date;
};


export const getMilis = (hour: number, minute: number) => {
    return getTimeStamp(hour, minute).getTime();
};

export const getActive = (now: number, key: string, sistem_type: tSistemType, sistem: tSistemTime) => {
    if (sistem_type === 'range') {
        const range = sistem[key].range;
        return now >= range[0] && now <= range[1];
    }
};

export const getGradualActive = (now: number, key: string, sorted_keys: string[], sistem_type: tSistemType, sistem: tSistemTime) => {
    if (sistem_type === 'range') {
        const range = sistem[key].range;
        const index = sorted_keys.indexOf(key);
        if (index > 0) {
            const prevRange = sistem[sorted_keys[index - 1]].range;
            if (now < prevRange[1]) {
                return -1;
            }
        }
        if (now < range[0]) {
            return 0;
        }
        if (now > range[1]) {
            return 2;
        }
        return 1;
    }
}

export const getDiff = (now: number, key: string, sistem_type: tSistemType, sistem: tSistemTime) => {
    if (sistem_type === 'range') {
        const range = sistem[key].range;
        return range[0] - now;
    }
}

export const getValues = (key: string, sistem_type: tSistemType, sistem: tSistemTime) => {
    if (sistem_type === 'range') {
        const start = (new Date(sistem[key].range[0])).toTimeString().split(':').slice(0, 2).join(':');
        const end = new Date(sistem[key].range[1]).toTimeString().split(':').slice(0, 2).join(':');
        return start + ' - ' + end;
    }
}