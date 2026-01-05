// Simplified type definition for Portable Text blocks (not using @portabletext/react)
export interface PortableTextBlock {
  _type: string;
  children?: Array<{
    _type: string;
    text: string;
  }>;
  [key: string]: unknown;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

export interface Author {
  name: string;
  image?: SanityImage;
  bio?: string;
}

export interface Event {
  _id: string;
  _type: 'event';
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  excerpt?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  mainImage?: SanityImage;
  tags?: string[];
  published: boolean;
  url?: string;
  // Additional fields for filtering/display
  eventType?: string;
  organizer?: string;
  capacity?: number;
  registrationUrl?: string;
}

export interface BlogPost {
  _id: string;
  _type: 'post';
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  publishedAt: string;
  author?: Author;
  categories?: string[];
  mainImage?: SanityImage;
  body: PortableTextBlock[];
  // Additional fields
  featured?: boolean;
  readTime?: number;
}

export interface Category {
  title: string;
  slug: string;
}
