import { defineCollection, z } from 'astro:content';

const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(),
    author: z.string(),
    news_date: z.string(), // YYYY-MM-DD format
    image: z.array(z.string()).optional(),
  }),
});

const eventsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(),
    status: z.enum(['upcoming', 'ongoing', 'completed']),
    event_date: z.string(),
    description: z.string(),
    link: z.string().optional(),
    image: z.array(z.string()).optional(),
    icon: z.string().optional(),
    organizer: z.string().optional(),
    benefits: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
    show_register: z.boolean().optional().default(true),
  }),
});

export const collections = {
  news: newsCollection,
  events: eventsCollection,
};
