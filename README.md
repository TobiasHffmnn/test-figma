# The Place 2B - Landing Page

Eine moderne Landing Page gebaut mit **Vite + React + TypeScript**. Zeigt Events und Blog-Posts mit responsivem Design für Mobile und Desktop.

## 🚀 Features

- **Vite** für schnelles Development und optimierte Builds
- **React 18** mit React Router für Navigation
- **TypeScript** für Type-Safety
- **Material-UI (MUI)** für professionelle UI-Komponenten
- **Tailwind CSS** für zusätzliches Styling
- **Responsive Design** mit Mobile-First-Ansatz
- **Mock-Daten** für Events und Blog-Posts

## 📋 Voraussetzungen

- Node.js 20 LTS oder höher (siehe `.nvmrc`)
- npm 10 oder höher

## 🛠️ Installation

1. **Repository klonen**

```bash
git clone https://github.com/TobiasHffmnn/test-figma.git
cd test-figma
```

2. **Node.js Version verwenden** (optional mit nvm)

```bash
nvm use
```

3. **Dependencies installieren**

```bash
npm install
```

## 🏃 Lokales Development

### Development Server starten

Der Development Server nutzt Vite's Hot Module Replacement (HMR) für sofortige Updates:

```bash
npm run dev
```

Die App ist dann unter [http://localhost:3000](http://localhost:3000) verfügbar.

**Was passiert:**
- Vite startet einen lokalen Development Server
- Änderungen am Code werden sofort im Browser sichtbar
- TypeScript-Fehler werden in der Konsole angezeigt

### Production Build erstellen

Für ein optimiertes Production Build:

```bash
npm run build
```

**Was passiert:**
- TypeScript kompiliert und prüft den Code
- Vite erstellt optimierte Bundles im `dist/` Ordner
- Assets werden minimiert und optimiert

### Production Build testen

Um den Production Build lokal zu testen:

```bash
npm run preview
```

Die App ist dann unter [http://localhost:4173](http://localhost:4173) verfügbar.

**Hinweis:** Dies simuliert eine Production-Umgebung und ist nützlich, um das finale Ergebnis vor dem Deployment zu testen.

## 📁 Projekt-Struktur

```
test-figma/
├── public/                    # Statische Assets
├── src/                       # Quellcode
│   ├── components/            # React-Komponenten
│   │   ├── blog/              # Blog-Komponenten
│   │   ├── events/            # Event-Komponenten
│   │   ├── layout/            # Layout (Header, Footer)
│   │   └── providers/         # Context Provider
│   ├── data/mock/             # Mock-Daten
│   ├── lib/                   # Utilities
│   ├── pages/                 # Seiten
│   ├── theme/                 # MUI Theme
│   ├── types/                 # TypeScript Types
│   ├── App.tsx                # Main App mit Routing
│   ├── main.tsx               # Entry Point
│   └── index.css              # Global Styles
├── index.html                 # HTML Entry
├── vite.config.ts             # Vite Config
├── tsconfig.json              # TypeScript Config
└── package.json               # Dependencies
```

## 🎨 Design System

- **Primärfarbe:** Blau (#2563eb)
- **Sekundärfarbe:** Lila (#8b5cf6)
- **Typography:** Inter Font-Familie
- **Responsive:** Mobile-First mit MUI Breakpoints

## 📱 Responsive Design

- **Mobile (< 768px):** Einspaltiges Layout, Hamburger-Menü
- **Tablet (768px - 1024px):** Zweispaltiges Grid
- **Desktop (> 1024px):** Dreispaltiges Grid

## 🧪 Scripts

```bash
npm run dev          # Dev Server (Port 3000)
npm run build        # Production Build
npm run preview      # Preview Build (Port 4173)
npm run type-check   # TypeScript Check
npm run lint         # ESLint
```

## 📦 Wichtige Dependencies

- **react** & **react-dom**: UI Framework
- **react-router-dom**: Routing
- **@mui/material**: UI Components
- **date-fns**: Datums-Formatierung
- **tailwindcss**: Utility CSS

## 🎯 Seiten

1. **Home (/)**: Hero, Featured Events & Blog Posts, CTA
2. **Events (/events)**: Alle Events im Grid
3. **Blog (/blog)**: Alle Blog Posts im Grid

## 💡 Development-Tipps

### Neue Komponente erstellen

```tsx
import { Box, Typography } from '@mui/material';

interface MyComponentProps {
  title: string;
}

export function MyComponent({ title }: MyComponentProps) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">{title}</Typography>
    </Box>
  );
}
```

### Daten anpassen

Mock-Daten in `src/data/mock/`:
- `events.json`: Event-Daten
- `blog.json`: Blog-Post-Daten

## 🚢 Deployment

```bash
npm run build
```

Deploy den `dist/` Ordner auf:
- Vercel
- Netlify
- GitHub Pages
- Jeden Static Hosting Service

## 📝 Lizenz

ISC

---

**Happy Coding! 🎉**
