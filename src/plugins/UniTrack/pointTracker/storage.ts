
export type PointSistemAlgorithm = 'all equal minimum' | 'final minimum';
export const pointSistemAlgorithms: PointSistemAlgorithm[] = ['all equal minimum', 'final minimum'];

export interface PointSistemVariable {
    name: string;
    current_value: number;
    multiplier: number;
}

export interface PointSistem {
    qualifications: PointSistemVariable[];
    ethas?: PointSistemVariable[];
    algorithm: PointSistemAlgorithm;
}

export interface PointTrackerClas {
    goal: number;
    min: number;
    current: number;
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
    point_sistem: {
        qualifications: [],
        algorithm: 'all equal minimum',
    },
};

export const pointtracker_default_storage: PointTrackerStorage = {
    track: {},
};