// GROQ queries for fetching content from Sanity

// Event queries
export const eventsListQuery = `
  *[_type == "event" && published == true] | order(startDate desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    description,
    startDate,
    endDate,
    location,
    mainImage,
    tags,
    eventType,
    organizer,
    published,
    url
  }
`;

export const eventBySlugQuery = `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    description,
    excerpt,
    startDate,
    endDate,
    location,
    mainImage,
    tags,
    eventType,
    organizer,
    capacity,
    registrationUrl,
    published,
    url
  }
`;

// Blog post queries
export const blogPostsListQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    author {
      name,
      image
    },
    categories,
    mainImage,
    featured,
    readTime
  }
`;

export const blogPostBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    author {
      name,
      image,
      bio
    },
    categories,
    mainImage,
    body,
    featured,
    readTime
  }
`;

// Featured/recent queries
export const featuredEventsQuery = `
  *[_type == "event" && published == true] | order(startDate desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    startDate,
    location,
    mainImage,
    tags
  }
`;

export const featuredBlogPostsQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    author {
      name
    },
    mainImage,
    categories
  }
`;
