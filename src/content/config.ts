import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    demoUrl: z.string().url().optional(),
    sourceUrl: z.string().url().optional(),
    techStack: z.array(z.string()).default([])
  })
});

const aboutCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    role: z.string(),
    introduction: z.string(),
    highlights: z.array(z.object({
      value: z.string(),
      label: z.string()
    })),
    expertise: z.array(z.object({
      title: z.string(),
      description: z.string(),
      tools: z.array(z.string()).default([])
    })),
    experience: z.object({
      summary: z.string(),
      focus: z.array(z.string()).default([])
    }),
    education: z.object({
      summary: z.string(),
      foundation: z.array(z.string()).default([])
    }),
    cvUrl: z.string().url(),
    githubUrl: z.string().url(),
    linkedinUrl: z.string().url()
  })
});

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
  about: aboutCollection
};
