type tBlock = '1-2' | '3-4' | '5-6' | '7-8' | '9-10' | '11-12' | '13-14' | '15-16' | '17-18' | '19-20';

const bloques = {
    '1-2': [{ h: 8, m: 15 }, { h: 9, m: 25 }],
    '3-4': [{ h: 9, m: 35 }, { h: 10, m: 45 }],
    '5-6': [{ h: 10, m: 55 }, { h: 12, m: 5 }],
    '7-8': [{ h: 12, m: 15 }, { h: 13, m: 25 }],
    '9-10': [{ h: 14, m: 30 }, { h: 15, m: 40 }],
    '11-12': [{ h: 15, m: 50 }, { h: 17, m: 0 }],
    '13-14': [{ h: 17, m: 10 }, { h: 18, m: 20 }],
    '15-16': [{ h: 18, m: 30 }, { h: 19, m: 40 }],
    '17-18': [{ h: 19, m: 50 }, { h: 21, m: 0 }],
    '19-20': [{ h: 21, m: 10 }, { h: 22, m: 20 }]
};

export const getBlock = (time: Date): string => {
    const keys = Object.keys(bloques) as tBlock[];
    const currentMinutes = time.getHours() * 60 + time.getMinutes();

    if (currentMinutes < bloques[keys[0]][0].h * 60 + bloques[keys[0]][0].m) {
        return 'Temprano';
    }

    for (let i = 0; i < keys.length; i++) {
        const [start, end] = bloques[keys[i]];
        const startMinutes = start.h * 60 + start.m;
        const endMinutes = end.h * 60 + end.m;

        if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
            return keys[i];
        }

        if (i < keys.length - 1) {
            const [nextStart] = bloques[keys[i + 1]];
            const nextStartMinutes = nextStart.h * 60 + nextStart.m;

            if (currentMinutes > endMinutes && currentMinutes < nextStartMinutes) {
                return `${keys[i]} ~ ${keys[i + 1]}`;
            }
        }
    }

    return 'Tarde';
};

/**
function resolveTransitionKey(
	time: Date,
	key_start: string,
	key_end: string,
	period_start: tPeriod[],
	period_end: tPeriod[],
	transition_resolver: tTransitionResolver
) {
	switch (transition_resolver) {
		case 'transition':
			return `${key_start} ~ ${key_end}`;
		case 't+':
			const delta_min_from_start =
				time.getHours() * 60 +
				time.getMinutes() -
				(period_start[0].h * 60 + period_start[0].m);
			return `${key_start}+${delta_min_from_start}`;
		case 't-':
			const delta_min_from_end =
				period_end[1].h * 60 +
				period_end[1].m -
				(time.getHours() * 60 + time.getMinutes());
			return `${key_end}-${delta_min_from_end}`;
		default:
			return '-';
	}
}

function getKey(time: Date, sistem: tSistem, options: tOptions) {
	const keys = Object.keys(sistem) as string[];
	const currentMinutes = time.getHours() * 60 + time.getMinutes();

	if (currentMinutes < sistem[keys[0]][0].h * 60 + sistem[keys[0]][0].m) {
		return 'Temprano';
	}

	for (let i = 0; i < keys.length; i++) {
		const [start, end] = sistem[keys[i]];
		const startMinutes = start.h * 60 + start.m;
		const endMinutes = end.h * 60 + end.m;

		if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
			return keys[i];
		}

		if (i < keys.length - 1) {
			const [nextStart] = sistem[keys[i + 1]];
			const nextStartMinutes = nextStart.h * 60 + nextStart.m;

			if (currentMinutes > endMinutes && currentMinutes < nextStartMinutes) {
				if (options.transition_keys_allowed) {
					return resolveTransitionKey(
						time,
						keys[i],
						keys[i + 1],
						sistem[keys[i]],
						sistem[keys[i + 1]],
						options.transition_resolver
					);
				} else {
					return '-';
				}
			}
		}
	}

	return 'Tarde';
}
 */