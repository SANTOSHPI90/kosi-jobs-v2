import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://kosi-jobs-v2.vercel.app', // Replace with your actual URL
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}