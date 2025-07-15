# Herencia Cósmica - Landing Page

A modern and optimized landing page for **Herencia Cósmica**, built with Astro, Tailwind CSS, and TypeScript. This page is designed to convert visitors into users of the main astrology application.

## 🌟 Features

- **Ultra-fast**: Built with Astro for maximum performance
- **Responsive**: Adaptive design for all devices
- **SEO Optimized**: Meta tags, structured data, and automatic sitemap
- **Accessible**: Meets WCAG standards
- **Smooth animations**: Cosmic effects and elegant transitions
- **Integrated analytics**: Google Analytics with Partytown for better performance

## 🚀 Technologies Used

- **[Astro](https://astro.build/)** - Modern web framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript with types
- **[Partytown](https://partytown.builder.io/)** - Optimized third-party scripts
- **[Sharp](https://sharp.pixelplumbing.com/)** - Image optimization
- **[ESLint](https://eslint.org/)** - Code linting

## 📁 Project Structure

```
herencia-cosmica-landing/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── Layout.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── Features.astro
│   │   │   ├── HowItWorks.astro
│   │   │   ├── Testimonials.astro
│   │   │   ├── FAQ.astro
│   │   │   └── CTA.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   └── Badge.astro
│   │   └── seo/
│   │       ├── SEOHead.astro
│   │       └── StructuredData.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── servicios.astro
│   │   └── sobre-nosotros.astro
│   ├── styles/
│   │   ├── global.css
│   │   └── components.css
│   └── utils/
│       ├── seo.ts
│       └── constants.ts
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## 🛠️ Installation and Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/herencia-cosmica-landing.git
cd herencia-cosmica-landing

# Install dependencies
npm install

# Install required dependency for build
npm install lightningcss --save-dev
```

### Local Development

```bash
# Start development server
npm run dev

# Site will be available at http://localhost:4321
```

### Production Build

```bash
# Generate optimized build
npm run build

# Preview the build
npm run preview
```

## 🧞 Available Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run lint`            | Run ESLint to check code quality                |
| `npm run lint:fix`        | Automatically fix linting errors                |

## 🎨 Customization

### Colors and Theme

Theme colors are defined in `tailwind.config.mjs`:

```javascript
colors: {
  mystical: {
    purple: '#8B5CF6',
    indigo: '#6366F1',
    pink: '#EC4899',
    gold: '#F59E0B',
    // ... more colors
  }
}
```

### Fonts

The project uses two main fonts:
- **Cormorant Garamond** - For titles and decorative elements
- **Inter** - For general text and UI

### Animations

Custom animations are defined in `tailwind.config.mjs`:
- `float` - Floating effect for elements
- `twinkle` - Star twinkling effect
- `pulse-glow` - Pulsing glow effect

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Analytics
PUBLIC_GA_ID=your-google-analytics-id

# URLs
PUBLIC_APP_URL=https://app.herenciacosmica.com
PUBLIC_SITE_URL=https://www.herenciacosmica.com
```

### Astro Configuration

Main configuration is in `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://www.herenciacosmica.com',
  integrations: [
    tailwind(),
    sitemap(),
    partytown({
      config: {
        forward: ['gtag', 'fbq', 'dataLayer.push'],
      },
    }),
  ],
  output: 'static',
  // ... more configuration
});
```

## 📊 SEO and Analytics

### SEO Features

- ✅ Optimized meta tags
- ✅ Open Graph and Twitter Cards
- ✅ Structured Data (JSON-LD)
- ✅ Automatic sitemap
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Image optimization

### Analytics

- Google Analytics 4 integrated with Partytown
- Core Web Vitals tracking
- Conversion tracking configured

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: dist
```

### Domain Configuration

1. Configure DNS to point to your hosting provider
2. Set up SSL/TLS
3. Configure redirects if necessary

## 🔍 Testing and Quality Assurance

### Target Lighthouse Scores

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Local Testing

```bash
# Linting
npm run lint

# Build test
npm run build

# Preview test
npm run preview
```

## 📈 Performance Metrics

### Core Web Vitals Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Changelog

### v0.0.1 (Current)
- ✅ Initial project setup with Astro
- ✅ Tailwind CSS configuration with custom theme
- ✅ Layout components (Header, Footer, Layout)
- ✅ Main sections (Hero, Features, Testimonials, FAQ, CTA)
- ✅ SEO optimization with meta tags and structured data
- ✅ Analytics integration with Partytown
- ✅ Optimized build system
- ✅ ESLint configuration for code quality

### Upcoming Features
- [ ] Blog section for SEO content
- [ ] Detailed pricing page
- [ ] A/B testing system
- [ ] CRM integration
- [ ] Chat widget
- [ ] Dark/light mode toggle

## 🐛 Known Issues

- Build requires `lightningcss` as dev dependency (already fixed)
- TypeScript strict mode may require minor adjustments

## 📞 Support

For technical support or project questions:

- **Email**: support@herenciacosmica.com
- **Documentation**: See `ASTRO_LANDING_SETUP_GUIDE.md`
- **Issues**: Use GitHub issues system

## 📄 License

This project is private and proprietary to Herencia Cósmica. All rights reserved.

---

**Made with ✨ and lots of cosmic love to help people reclaim their cosmic heritage.**

## 🔗 Useful Links

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Astro SEO Guide](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Partytown Documentation](https://partytown.builder.io/)
