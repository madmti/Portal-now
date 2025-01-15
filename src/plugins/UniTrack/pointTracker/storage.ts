
export type PointSistemAlgorithm = 'all equal minimum';
export const pointSistemAlgorithms: PointSistemAlgorithm[] = ['all equal minimum'];

export interface PointSistemVariable {
    name: string;
    current_value: number;
    multiplier: number;
}

export interface PointSistem {
    qualifications: PointSistemVariable[];
    ethas?: PointSistemVariable[];
    algorithm: PointSistemAlgorithm;
    target_qualification: number;
}

export interface PointTrackerClas {
    goal: number;
    min: number;
    current: number;
    average: number;
    tendency: number;
    point_sistem: PointSistem;
}

export interface PointTrackerStorage {
    track: {
        [clas: string]: PointTrackerClas;
    }
}

export const pointtracker_default_clas: PointTrackerClas = {
    goal: 100,
    min: 55,
    current: 0,
    average: 0,
    tendency: 0,
    point_sistem: {
        qualifications: [],
        algorithm: 'all equal minimum',
        target_qualification: 0,
    },
};

export const pointtracker_default_storage: PointTrackerStorage = {
    track: {},
};

export function getAlgorithmFunction(algorithm: PointSistemAlgorithm): (qualifications: PointTrackerClas) => number {
    switch (algorithm) {
        case 'all equal minimum':
            return AllEqualMinimumAlgorithm;
    }
}

export function AllEqualMinimumAlgorithm({ min, current, point_sistem }: PointTrackerClas): number {
    const { ethas, qualifications } = point_sistem;
    let target_qualification = min;
    for (const etha of ethas ?? []) {
        if (etha.current_value !== -1)
            target_qualification /= etha.current_value ? etha.current_value * etha.multiplier : 0.0000000001;
    }
    target_qualification -= current / 100;
    let fact_mul = 0;
    for (const qualification of qualifications) {
        if (qualification.current_value === -1)
            fact_mul += qualification.multiplier;
    }
    return fact_mul ? target_qualification / fact_mul : 0;
}