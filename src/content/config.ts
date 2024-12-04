import { defineCollection, z } from "astro:content";

const updatePost = defineCollection({
    schema: z.object({
        title: z.string(),
        date: z.string(),
    }),
});

const docPost = defineCollection({
    schema: z.object({
        title: z.string(),
        last_update: z.string(),
    }),
});

export const collections = {
    'updates': updatePost,
    'docs': docPost,
};