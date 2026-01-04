import { createClient, type ClientConfig } from '@sanity/client';

// Check if Sanity is configured
export const isSanityConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET
  );
};

// Sanity client configuration
const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_READ_TOKEN,
};

// Create the Sanity client
export const sanityClient = isSanityConfigured()
  ? createClient(config)
  : null;

// Helper to fetch from Sanity or return mock data
export async function fetchFromSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
  mockData: T
): Promise<T> {
  if (!sanityClient) {
    console.log('Sanity not configured, using mock data');
    return mockData;
  }

  try {
    const data = await sanityClient.fetch<T>(query, params);
    return data;
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    console.log('Falling back to mock data');
    return mockData;
  }
}
