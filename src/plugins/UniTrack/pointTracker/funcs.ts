import { requestStorageAPI } from "@lib/plugins";
import type { PointSistemAlgorithm, PointTrackerClas, PointTrackerOptions } from "./storage";
import { unitrack_storage_group } from "../config";
import { PointTrackerConfig } from "./config";

// ==================================================
// ==================== CALCULOUS ===================
// ==================================================
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
    const result = fact_mul ? target_qualification / fact_mul * 100 : 0;
    return result;
}
export function dataIsOk(data: PointTrackerClas): boolean {
    if (
        data.goal < 0 ||
        data.min < 0 ||
        data.min > data.goal
    )
        return false;

    for (const etha of data.point_sistem.ethas ?? []) {
        if (etha.multiplier <= 0 || !etha.name) return false;
        etha.current_value = etha.current_value ?? -1;
        if (etha.current_value < 0) etha.current_value = -1;
    }
    for (const evaluation of data.point_sistem.qualifications) {
        if (evaluation.multiplier < 0 || !evaluation.name) return false;
        evaluation.current_value = evaluation.current_value ?? -1;
        if (evaluation.current_value < 0) evaluation.current_value = -1;
    }

    return true;
}
export function calculateRestOfData(last_data: PointTrackerClas) {
    const copy = { ...last_data };

    let qual_sum = 0;
    let flat_sum = 0;
    let last_qual = 0;
    let n_qual = 0;
    for (const evaluation of copy.point_sistem.qualifications) {
        if (evaluation.current_value === -1) continue;
        qual_sum += evaluation.multiplier * evaluation.current_value;
        flat_sum += evaluation.current_value;
        last_qual = evaluation.current_value;
        n_qual++;
    }
    let etha_mul = 1;
    for (const etha of copy.point_sistem.ethas ?? []) {
        if (etha.current_value === -1) continue;
        etha_mul *= etha.multiplier * etha.current_value;
    }
    copy.current = qual_sum * etha_mul;
    copy.average = n_qual ? qual_sum / n_qual : 0;
    copy.tendency =
        n_qual > 0
            ? 1 - (n_qual * (flat_sum - last_qual)) / (flat_sum * (n_qual - 1))
            : 0;
    copy.tendency =
        isNaN(copy.tendency) || !isFinite(copy.tendency) ? 0 : copy.tendency;
    const algorithm = getAlgorithmFunction(copy.point_sistem.algorithm);
    copy.point_sistem.target_qualification = algorithm(copy);
    return copy;
}

// ==================================================
// ==================== REQUESTS ====================
// ==================================================
export async function requestAttachClass(clas: string) {
    return requestStorageAPI({
        storage_group: unitrack_storage_group,
        data: PointTrackerConfig.can_attach_class
            ? PointTrackerConfig.get_class_attaching_data(clas)
            : [],
    });
}

export async function requestDeattachClass(clas: string) {
    return requestStorageAPI({
        storage_group: unitrack_storage_group,
        data: PointTrackerConfig.can_attach_class
            ? PointTrackerConfig.get_class_deattaching_data(clas)
            : [],
    });
}

export async function requestUpdateClass(clas: string, new_data: PointTrackerClas) {
    return requestStorageAPI({
        storage_group: unitrack_storage_group,
        data: [{
            action: 'set',
            path: ['point_tracker', 'track', clas],
            value: new_data,
        },],
    });
}

export async function requestUpdateOptions(new_options: PointTrackerOptions) {
    return requestStorageAPI({
        storage_group: unitrack_storage_group,
        data: [{
            action: 'set',
            path: ['point_tracker', 'options'],
            value: new_options,
        },],
    });
}