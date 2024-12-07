import { Classes, db, Schedules } from 'astro:db';

const user_uid = process.env.PUBLIC_TEST_USER_UID ?? import.meta.env.PUBLIC_TEST_USER_UID;

export default async function seed() {
	await db.delete(Schedules);
	await db.delete(Classes);

	await db.insert(Classes).values([
		{
			id: 1,
			user_uid: user_uid,
			name: 'MAT024'
		},
		{
			id: 2,
			user_uid: user_uid,
			name: 'INF155'
		},
		{
			id: 3,
			user_uid: user_uid,
			name: 'FIS130'
		},
	]);
	await db.insert(Schedules).values([
		{
			class_id: 1,
			user_uid: user_uid,
			type: 'Catedra',
			day: 1,
			place: 'P101',
			block_mode: true,
			time: {
				blocks: ['1-2'],
			}
		},
		{
			class_id: 1,
			user_uid: user_uid,
			type: 'Ayudantia',
			day: 2,
			place: 'P101',
			block_mode: true,
			time: {
				blocks: ['3-4'],
			}
		},
		{
			class_id: 2,
			user_uid: user_uid,
			type: 'Catedra',
			day: 2,
			place: 'P101',
			block_mode: true,
			time: {
				blocks: ['1-2'],
			}
		},
		{
			class_id: 2,
			user_uid: user_uid,
			type: 'Ayudantia',
			day: 3,
			place: 'P101',
			block_mode: true,
			time: {
				blocks: ['3-4'],
			}
		},
		{
			class_id: 3,
			user_uid: user_uid,
			type: 'Catedra',
			day: 3,
			place: 'P101',
			block_mode: true,
			time: {
				blocks: ['1-2'],
			}
		},
		{
			class_id: 3,
			user_uid: user_uid,
			type: 'Ayudantia',
			day: 4,
			place: 'P101',
			block_mode: true,
			time: {
				blocks: ['3-4'],
			}
		},
	]);
}