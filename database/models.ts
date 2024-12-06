/**
 * @type {string} - Collections name
 */
export type tCollection = 'Preferences' | 'Classes';

/**
 * @type {string} - Subcollections name
 */
export type tSubCollection = 'Schedule';

/**
 * @type {Object} - Preferences model
 * @param {string} user_uid - User uid from Firebase Auth
 * @param {boolean} block_mode - Block mode (Hours in blocks)
 */
export type tPreferences = {
    user_uid: string;
    block_mode: boolean;
};

/**
 * @type {Object} - Classes model
 * @param {string} user_uid - User uid from Firebase Auth
 * @param {string} name - Class name
 * @param {string} alias - Class alias
 * @external collection - Subcollection Schedule
 */
export type tClasses = {
    user_uid: string;
    name: string;
    alias?: string;
};

/**
 * @type {Object} - Schedule model
 * @param {string} type - Class type (Lecture, Lab, etc)
 * @param {boolean} block_mode - Info is in Block mode (Hours in blocks)
 * @param {string[]} blocks - Blocks of the class
 * @param {number} day - Day of the week (0-6)
 * @param {string} place - Place of the class
 */
export type tSchedule = {
    type: string;
    block_mode: boolean;
    blocks: string[];
    day: number;
    place: string;
};
