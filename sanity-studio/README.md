# Sanity Studio for The Place 2B

This directory contains the optional Sanity Studio configuration for managing content (Events and Blog Posts) for The Place 2B application.

## Prerequisites

- Node.js 20 LTS
- npm 10 or higher
- A Sanity account and project

## Setup

1. **Create a Sanity project** at [sanity.io](https://sanity.io/manage)

2. **Configure environment variables**

Create a `.env` file in this directory:

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

Or update `sanity.config.ts` directly with your project details.

3. **Install dependencies**

```bash
npm install
```

4. **Start the studio**

```bash
npm run dev
```

The studio will be available at `http://localhost:3333`

## Schemas

The studio includes two content types:

### Event Schema
- Title
- Slug
- Main Image
- Excerpt
- Description
- Start Date / End Date
- Location
- Event Type (Conference, Workshop, Meetup, Webinar)
- Organizer
- Capacity
- Tags
- Event URL
- Registration URL
- Published status

### Blog Post Schema
- Title
- Slug
- Author (name, image, bio)
- Main Image
- Categories
- Published Date
- Excerpt
- Body (Portable Text with images, code blocks, etc.)
- Featured status
- Read Time

## Deployment

To deploy your Sanity Studio:

```bash
npm run build
```

Then deploy using Sanity CLI or your preferred hosting platform.

## Connecting to Frontend

Make sure the frontend's `.env.local` has the same project configuration:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

The frontend will automatically fetch content from Sanity when configured.
