import { db } from 'astro:db';

const user_uid = process.env.PUBLIC_TEST_USER_UID ?? import.meta.env.PUBLIC_TEST_USER_UID;

export default async function seed() {}
