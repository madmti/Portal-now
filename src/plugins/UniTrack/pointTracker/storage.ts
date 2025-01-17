export type PointTrackerStats = 'Next Minimum Qualification' | 'Tendency' | 'Succes Status';
export type PointSistemAlgorithm = 'all equal minimum';

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

export interface PointTrackerOptions {
    show_qualification_status: boolean;
    visible_stats: PointTrackerStats[];
}

export interface PointTrackerStorage {
    track: {
        [clas: string]: PointTrackerClas;
    };
    options: PointTrackerOptions;
}
export const pointSistemAlgorithms: PointSistemAlgorithm[] = ['all equal minimum'];

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

export const pointtracker_stats: PointTrackerStats[] = ['Next Minimum Qualification', 'Tendency', 'Succes Status'];
export const pointtracker_default_options: PointTrackerOptions = {
    show_qualification_status: true,
    visible_stats: ['Next Minimum Qualification', 'Tendency', 'Succes Status'],
};

export const pointtracker_default_storage: PointTrackerStorage = {
    track: {},
    options: pointtracker_default_options,
};
