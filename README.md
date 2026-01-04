# The Place 2B - Production-Ready Frontend

A modern, production-ready Next.js application featuring a full design system migrated from Vite+React, integrated with Sanity CMS for content management. Built with TypeScript, MUI, and Radix UI components.

## 🚀 Features

- **Next.js 15** with App Router for optimal SSR/SSG/ISR performance
- **TypeScript** for type-safe development
- **Material-UI (MUI) 7** for comprehensive UI components
- **Radix UI** components for accessible, unstyled primitives
- **Sanity CMS** integration with graceful fallback to mock data
- **Portable Text** rendering for rich blog content
- **Responsive Design** with mobile-first approach
- **SEO Optimized** with proper meta tags and semantic HTML
- **Vercel Deployment Ready**

## 📋 Prerequisites

- Node.js 20 LTS (specified in `.nvmrc`)
- npm 10 or higher
- (Optional) A Sanity project for CMS functionality

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/TobiasHffmnn/test-figma.git
cd test-figma
```

2. **Use the correct Node.js version**

```bash
nvm use
# or if nvm is not installed:
# node -v should show 20.x.x
```

3. **Install dependencies**

```bash
npm install
```

4. **Set up environment variables**

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Sanity project details (optional - mock data will be used if not configured):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## 🏃 Running Locally

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
test-figma/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   ├── events/              # Events section
│   │   ├── page.tsx         # Events list with filters
│   │   └── [slug]/          # Event detail pages
│   └── blog/                # Blog section
│       ├── page.tsx         # Blog list
│       └── [slug]/          # Blog post detail pages
├── components/              # React components
│   ├── providers/           # Context providers (Theme, etc.)
│   ├── layout/              # Layout components (Header, Footer)
│   ├── portable/            # Portable Text renderer
│   ├── events/              # Event-specific components
│   ├── blog/                # Blog-specific components
│   └── ui/                  # Reusable UI components
├── lib/                     # Utility functions
│   ├── sanity.ts           # Sanity client configuration
│   ├── queries.ts          # GROQ queries
│   └── image.ts            # Image URL helpers
├── theme/                   # MUI theme configuration
├── types/                   # TypeScript type definitions
├── data/mock/              # Mock data for development
│   ├── events.json         # Sample events
│   └── blog.json           # Sample blog posts
├── sanity-studio/          # (Optional) Sanity Studio
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Design System

The application uses a carefully crafted design system based on the original Figma design:

### Theme
- Primary Color: Blue (#2563eb)
- Secondary Color: Purple (#8b5cf6)
- Typography: Inter font family
- Responsive font sizes with MUI's `responsiveFontSizes`

### Components
- **MUI Components**: Cards, Buttons, Typography, Grid, etc.
- **Radix UI**: Accordion, Dialog, Tabs, Select, Tooltip, Navigation Menu
- **Custom Components**: EventCard, BlogCard, EventFilters, PortableTextRenderer

## 🗄️ Content Management

### Using Mock Data (Default)

The application works out of the box with mock data stored in `data/mock/`:
- `events.json`: Sample events with various types and tags
- `blog.json`: Sample blog posts with authors and categories

### Connecting to Sanity

1. **Create a Sanity project** at [sanity.io](https://sanity.io)

2. **Set up Sanity Studio** (optional):

```bash
cd sanity-studio
npm install
npm run dev
```

3. **Configure environment variables** in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

4. **Create schemas** in Sanity Studio for:
   - **Event**: title, slug, description, dates, location, images, tags, etc.
   - **BlogPost**: title, slug, excerpt, body (Portable Text), author, categories, etc.

5. The application will automatically fetch from Sanity when configured, with graceful fallback to mock data on errors.

## 🚢 Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TobiasHffmnn/test-figma)

### Manual Deployment

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Deploy**

```bash
vercel
```

3. **Configure Environment Variables** in Vercel Dashboard:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`

4. **Redeploy** for environment variables to take effect:

```bash
vercel --prod
```

### Vercel Configuration

The project is optimized for Vercel with:
- Automatic ISR (Incremental Static Regeneration) for events and blog posts
- Optimized image handling with Next.js Image component
- Edge-ready API routes (if needed in future)

## 📄 Routes

- `/` - Home page with featured events and blog posts
- `/events` - Events list with filtering by type, tags, and search
- `/events/[slug]` - Individual event detail page
- `/blog` - Blog posts list
- `/blog/[slug]` - Individual blog post with Portable Text rendering

## 🔄 Data Fetching

The application uses Next.js App Router with:
- **Server Components** for initial data fetching
- **ISR** with revalidation periods (30 minutes for lists, 1 hour for home)
- **Client Components** for interactive features (filters, navigation)

## 🧪 Development Tips

### Adding New Components

1. Create component in appropriate directory under `components/`
2. Use TypeScript for props
3. Follow MUI theming patterns
4. Make components responsive

### Modifying the Theme

Edit `theme/theme.ts` to customize:
- Colors
- Typography
- Component overrides
- Spacing

### Adding New Pages

1. Create directory/file in `app/` following App Router conventions
2. Add metadata for SEO
3. Implement data fetching if needed
4. Add to navigation in `components/layout/Header.tsx`

## 📦 Key Dependencies

- **Framework**: Next.js 15, React 19
- **UI**: @mui/material 6, @emotion/react, @emotion/styled
- **Radix UI**: Multiple component packages
- **CMS**: @sanity/client, @portabletext/react
- **Utilities**: date-fns, lucide-react, framer-motion
- **Forms**: react-hook-form
- **Carousel**: embla-carousel-react

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- The Place 2B Team

## 🙏 Acknowledgments

- Design migrated from [theplace2b.org-Figma-Design](https://github.com/TobiasHffmnn/theplace2b.org-Figma-Design)
- Built with [Next.js](https://nextjs.org/)
- UI components from [Material-UI](https://mui.com/) and [Radix UI](https://www.radix-ui.com/)
- CMS powered by [Sanity](https://www.sanity.io/)

## 📞 Support

For issues and questions, please open an issue on GitHub or contact the team.

---

**Happy Coding! 🎉**