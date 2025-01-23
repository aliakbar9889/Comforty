import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'ssms9fkz',       // Apna Sanity Project ID yahan dalen
  dataset: 'production',       // Apna Sanity dataset yahan dalen
  apiVersion: '2025-01-21',    // API version specify karein
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
});
