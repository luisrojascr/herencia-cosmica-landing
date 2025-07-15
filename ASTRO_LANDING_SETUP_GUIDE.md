# Guía Completa: Landing Page Herencia Cósmica con Astro

## Arquitectura del Proyecto

### Dominios
- **Landing**: `www.herenciacosmica.com` (Astro - Estático)
- **App**: `app.herenciacosmica.com` (React - Actual)

### Flujo de Usuario
1. Usuario llega → `www.herenciacosmica.com` (landing ultra-rápido)
2. Hace clic en CTA → Redirección a `app.herenciacosmica.com/ver-reporte-gratuito`
3. Completa el flujo en la app React existente

---

## 1. Setup Inicial del Proyecto

### Crear Nuevo Repositorio
```bash
# Crear nuevo directorio
mkdir herenciacosmica-landing
cd herenciacosmica-landing

# Inicializar proyecto Astro
npm create astro@latest . -- --template minimal --typescript --yes

# Instalar integraciones de Astro (método recomendado)
# Esto instalará las dependencias y configurará los archivos necesarios automáticamente.
npx astro add tailwind
npx astro add sitemap
npx astro add partytown

# Instalar dependencias adicionales para Tailwind y fuentes
npm install @tailwindcss/typography
npm install @fontsource/cormorant-garamond @fontsource/inter

# (Opcional pero recomendado) Añadir ESLint para calidad de código
# El comando `astro add` puede fallar en algunos entornos. Usar instalación manual:
npm install --save-dev eslint eslint-plugin-astro @typescript-eslint/parser eslint-plugin-jsx-a11y
```

### Estructura de Archivos Propuesta
```
herenciacosmica-landing/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
│       ├── hero-bg.jpg
│       ├── testimonial-1.jpg
│       ├── testimonial-2.jpg
│       └── features/
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
│   │   │   ├── Pricing.astro
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
│   │   ├── precios.astro
│   │   ├── sobre-nosotros.astro
│   │   └── blog/
│   │       └── [...slug].astro
│   ├── styles/
│   │   ├── global.css
│   │   └── components.css
│   └── utils/
│       ├── seo.ts
│       └── constants.ts
```

---

## 2. Configuración de Astro

### astro.config.mjs
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

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
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
```

### tailwind.config.mjs
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        mystical: {
          purple: '#8B5CF6',
          indigo: '#6366F1',
          pink: '#EC4899',
          gold: '#F59E0B',
          'light-purple': '#C084FC',
          'deep-purple': '#6B46C1',
          'cosmic-blue': '#1E40AF',
          'star-gold': '#FCD34D'
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'mystical-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)',
        'star-field': 'radial-gradient(2px 2px at 20px 30px, #eee, transparent), radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent), radial-gradient(1px 2px at 130px 80px, rgba(255,255,255,0.6), transparent), radial-gradient(2px 1px at 160px 30px, rgba(255,255,255,0.8), transparent)'
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'twinkle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' }
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
```

---

## 3. Estilos Globales

### src/styles/global.css
```css
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
  }
  
  .font-serif {
    font-family: 'Cormorant Garamond', serif;
  }
}

@layer components {
  /* Mystical text gradient */
  .mystical-text {
    background: linear-gradient(135deg, #8B5CF6, #EC4899, #F59E0B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Cosmic background */
  .cosmic-bg {
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #4c1d95 50%, #581c87 75%, #3b0764 100%);
    position: relative;
    overflow: hidden;
  }

  .cosmic-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.8), transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.6), transparent),
      radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.9), transparent),
      radial-gradient(1px 2px at 130px 80px, rgba(255,255,255,0.4), transparent),
      radial-gradient(2px 1px at 160px 30px, rgba(255,255,255,0.7), transparent);
    background-size: 200px 200px;
    animation: twinkle 4s ease-in-out infinite;
    pointer-events: none;
  }

  /* Glass card effect */
  .glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }

  /* Mystical button */
  .mystical-button {
    background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    border: none;
    color: white;
    font-weight: 600;
    padding: 1rem 2rem;
    border-radius: 9999px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  .mystical-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
  }

  .mystical-button:hover::before {
    left: 100%;
  }

  .mystical-button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
  }

  /* Section spacing */
  .section-padding {
    padding: 5rem 0;
  }

  @media (max-width: 768px) {
    .section-padding {
      padding: 3rem 0;
    }
  }
}
```

---

## 4. Componentes Base

### src/components/layout/Layout.astro
```astro
---
import SEOHead from '../seo/SEOHead.astro';
import Header from './Header.astro';
import Footer from './Footer.astro';

export interface Props {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalURL?: string;
}

const { 
  title, 
  description, 
  keywords = "carta natal, astrología, propósito de vida, horóscopo personalizado",
  ogImage = "/images/og-default.jpg",
  canonicalURL = Astro.url.href
} = Astro.props;
---

<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
  <head>
    <SEOHead 
      title={title}
      description={description}
      keywords={keywords}
      ogImage={ogImage}
      canonicalURL={canonicalURL}
    />
  </head>
  <body class="cosmic-bg min-h-screen">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
    
    <!-- Analytics Scripts -->
    <script type="text/partytown" src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
    <script type="text/partytown">
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    </script>
  </body>
</html>

<style>
  body {
    margin: 0;
    padding: 0;
  }
</style>
```

### src/components/seo/SEOHead.astro
```astro
---
export interface Props {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonicalURL: string;
}

const { title, description, keywords, ogImage, canonicalURL } = Astro.props;

const fullTitle = title.includes('Herencia Cósmica') ? title : `${title} | Herencia Cósmica`;
const fullOgImage = ogImage.startsWith('http') ? ogImage : `${Astro.site}${ogImage}`;
---

<!-- Basic Meta Tags -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content={description} />
<meta name="keywords" content={keywords} />
<meta name="author" content="Herencia Cósmica" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href={canonicalURL} />

<!-- Title -->
<title>{fullTitle}</title>

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={fullOgImage} />
<meta property="og:site_name" content="Herencia Cósmica" />
<meta property="og:locale" content="es_ES" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={canonicalURL} />
<meta property="twitter:title" content={fullTitle} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={fullOgImage} />

<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

<!-- Preload Critical Resources -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" as="style" />

<!-- Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Herencia Cósmica",
  "url": "https://www.herenciacosmica.com",
  "logo": "https://www.herenciacosmica.com/images/logo.png",
  "description": "Reclama tu herencia cósmica a través de la astrología ancestral. Carta natal gratuita, interpretaciones personalizadas.",
  "sameAs": [
    "https://www.facebook.com/herenciacosmica",
    "https://www.instagram.com/herenciacosmica"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Spanish"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Costa Rica"
  },
  "serviceType": "Astrological Services"
}
</script>
```

### src/components/layout/Header.astro
```astro
---
// Header component
---

<header class="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
  <nav class="container mx-auto px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <h1 class="text-2xl font-serif font-bold mystical-text">
          Herencia Cósmica
        </h1>
      </div>

      <!-- Navigation Links (Desktop) -->
      <div class="hidden md:flex items-center space-x-8">
        <a href="#inicio" class="text-white/80 hover:text-white transition-colors">Inicio</a>
        <a href="#servicios" class="text-white/80 hover:text-white transition-colors">Servicios</a>
        <a href="#testimonios" class="text-white/80 hover:text-white transition-colors">Testimonios</a>
        <a href="#precios" class="text-white/80 hover:text-white transition-colors">Precios</a>
        <a href="https://app.herenciacosmica.com" class="mystical-button text-sm px-6 py-2">
          Iniciar Sesión
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button class="md:hidden text-white" id="mobile-menu-button">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="md:hidden hidden" id="mobile-menu">
      <div class="pt-4 pb-2 space-y-2">
        <a href="#inicio" class="block text-white/80 hover:text-white py-2">Inicio</a>
        <a href="#servicios" class="block text-white/80 hover:text-white py-2">Servicios</a>
        <a href="#testimonios" class="block text-white/80 hover:text-white py-2">Testimonios</a>
        <a href="#precios" class="block text-white/80 hover:text-white py-2">Precios</a>
        <a href="https://app.herenciacosmica.com" class="block mystical-button text-center mt-4">
          Iniciar Sesión
        </a>
      </div>
    </div>
  </nav>
</header>

<script>
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuButton?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
</script>
```

---

## 5. Secciones Principales

### src/components/sections/Hero.astro
```astro
---
// Hero section - Main landing area
---

<section id="inicio" class="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
  <!-- Background Elements -->
  <div class="absolute inset-0 cosmic-bg"></div>
  
  <!-- Content -->
  <div class="relative z-10 text-center px-6 py-20 max-w-4xl mx-auto">
    <!-- Logo/Brand -->
    <div class="mb-8">
      <h1 class="text-5xl md:text-7xl font-serif font-bold mystical-text mb-4 animate-float">
        Herencia Cósmica
      </h1>
      <div class="w-24 h-1 bg-mystical-gradient mx-auto mb-6"></div>
    </div>

    <!-- Main Headline -->
    <h2 class="text-3xl md:text-5xl font-serif font-semibold text-white mb-6 leading-tight">
      Reclama tu <span class="mystical-text">Herencia Cósmica</span>
    </h2>
    
    <p class="text-xl md:text-2xl text-white/90 mb-8 font-light">
      Los secretos que el cosmos te heredó
    </p>

    <!-- Description -->
    <p class="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
      El universo te dejó una herencia única el día que naciste. Tu carta natal 
      es el mapa del tesoro que revela los dones ancestrales escritos en las estrellas. 
      Es hora de reclamar lo que siempre fue tuyo por derecho cósmico.
    </p>

    <!-- CTA Button -->
    <a 
      href="https://app.herenciacosmica.com/ver-reporte-gratuito" 
      class="mystical-button text-lg px-12 py-6 inline-block animate-pulse-glow mb-4"
    >
      ✨ Reclamar Mi Herencia Cósmica ✨
    </a>

    <p class="text-white/60 text-sm mb-8">
      Sin compromisos • Tu legado estelar • Resultados inmediatos
    </p>

    <!-- Login link -->
    <div class="mb-16">
      <a 
        href="https://app.herenciacosmica.com" 
        class="text-white/70 hover:text-white text-sm transition-colors"
      >
        ¿Ya tienes cuenta? Iniciar sesión
      </a>
    </div>

    <!-- Trust indicators -->
    <div class="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
      <div class="text-white/80">
        <div class="text-2xl font-bold mystical-text">+10,000</div>
        <div class="text-sm">Lecturas realizadas</div>
      </div>
      <div class="text-white/80">
        <div class="text-2xl font-bold mystical-text">4.9★</div>
        <div class="text-sm">Calificación promedio</div>
      </div>
      <div class="text-white/80">
        <div class="text-2xl font-bold mystical-text">24/7</div>
        <div class="text-sm">Disponible siempre</div>
      </div>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
    </svg>
  </div>
</section>
```

### src/components/sections/Features.astro
```astro
---
// Features section
---

<section id="servicios" class="section-padding bg-gradient-to-b from-purple-900/20 to-indigo-900/20">
  <div class="container mx-auto px-6">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
        ¿Qué Descubrirás en tu <span class="mystical-text">Carta Natal</span>?
      </h2>
      <p class="text-xl text-white/80 max-w-3xl mx-auto">
        Tu fecha, hora y lugar de nacimiento revelan secretos únicos sobre tu personalidad, 
        propósito y destino. Descubre las respuestas que has estado buscando.
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Feature 1: Amor -->
      <div class="glass-card p-8 text-center rounded-2xl hover:scale-105 transition-transform duration-300">
        <div class="w-16 h-16 mx-auto mb-6 bg-mystical-gradient rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-serif font-semibold text-white mb-4">Amor</h3>
        <p class="text-white/80">
          Descubre tu compatibilidad amorosa, patrones en relaciones y cómo atraer 
          el amor verdadero según tu carta natal.
        </p>
      </div>

      <!-- Feature 2: Abundancia -->
      <div class="glass-card p-8 text-center rounded-2xl hover:scale-105 transition-transform duration-300">
        <div class="w-16 h-16 mx-auto mb-6 bg-mystical-gradient rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-serif font-semibold text-white mb-4">Abundancia</h3>
        <p class="text-white/80">
          Identifica tus talentos naturales, oportunidades de crecimiento profesional 
          y el camino hacia la prosperidad económica.
        </p>
      </div>

      <!-- Feature 3: Salud -->
      <div class="glass-card p-8 text-center rounded-2xl hover:scale-105 transition-transform duration-300">
        <div class="w-16 h-16 mx-auto mb-6 bg-mystical-gradient rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM6 9.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm.5 2.5a.5.5 0 000 1h7a.5.5 0 000-1h-7z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-serif font-semibold text-white mb-4">Salud</h3>
        <p class="text-white/80">
          Comprende tu constitución energética, áreas de fortaleza y aspectos 
          a cuidar para mantener el equilibrio físico y mental.
        </p>
      </div>

      <!-- Feature 4: Futuro -->
      <div class="glass-card p-8 text-center rounded-2xl hover:scale-105 transition-transform duration-300">
        <div class="w-16 h-16 mx-auto mb-6 bg-mystical-gradient rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.828A1 1 0 0014 13h-4V9a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-serif font-semibold text-white mb-4">Futuro</h3>
        <p class="text-white/80">
          Conoce los ciclos planetarios que influirán en tu vida, momentos clave 
          para tomar decisiones importantes y tu potencial de crecimiento.
        </p>
      </div>
    </div>

    <!-- Secondary CTA -->
    <div class="text-center mt-16">
      <a 
        href="https://app.herenciacosmica.com/ver-reporte-gratuito" 
        class="mystical-button text-lg px-10 py-4 inline-block"
      >
        Reclama tu Herencia Cósmica Ahora
      </a>
    </div>
  </div>
</section>
```

---

## 6. Componentes Adicionales

### src/components/sections/HowItWorks.astro
```astro
---
// How it works section
---

<section class="section-padding bg-gradient-to-b from-indigo-900/20 to-purple-900/20">
  <div class="container mx-auto px-6">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
        ¿Cómo <span class="mystical-text">Funciona</span>?
      </h2>
      <p class="text-xl text-white/80 max-w-3xl mx-auto">
        En solo 3 pasos simples, tendrás acceso a tu carta natal personalizada 
        y las revelaciones que camiarán tu perspectiva de vida.
      </p>
    </div>

    <!-- Steps -->
    <div class="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
      <!-- Step 1 -->
      <div class="text-center">
        <div class="w-20 h-20 mx-auto mb-6 bg-mystical-gradient rounded-full flex items-center justify-center text-white text-2xl font-bold">
          1
        </div>
        <h3 class="text-2xl font-serif font-semibold text-white mb-4">
          Ingresa tus Datos
        </h3>
        <p class="text-white/80">
          Proporciona tu fecha, hora exacta y lugar de nacimiento. 
          Estos datos son esenciales para calcular tu carta natal única.
        </p>
      </div>

      <!-- Step 2 -->
      <div class="text-center">
        <div class="w-20 h-20 mx-auto mb-6 bg-mystical-gradient rounded-full flex items-center justify-center text-white text-2xl font-bold">
          2
        </div>
        <h3 class="text-2xl font-serif font-semibold text-white mb-4">
          Generamos tu Carta
        </h3>
        <p class="text-white/80">
          Nuestro sistema calcula las posiciones planetarias exactas 
          en el momento de tu nacimiento usando tecnología astronómica avanzada.
        </p>
      </div>

      <!-- Step 3 -->
      <div class="text-center">
        <div class="w-20 h-20 mx-auto mb-6 bg-mystical-gradient rounded-full flex items-center justify-center text-white text-2xl font-bold">
          3
        </div>
        <h3 class="text-2xl font-serif font-semibold text-white mb-4">
          Recibe tu Interpretación
        </h3>
        <p class="text-white/80">
          Obtén una interpretación detallada y personalizada que revela 
          tu propósito, fortalezas y el camino hacia tu mejor versión.
        </p>
      </div>
    </div>

    <!-- Trust Badge -->
    <div class="text-center mt-16">
      <div class="glass-card inline-block px-8 py-4 rounded-full">
        <p class="text-white/90">
          <span class="mystical-text font-semibold">100% Gratuito</span> • 
          Sin tarjeta de crédito • Resultados inmediatos
        </p>
      </div>
    </div>
  </div>
</section>
```

### src/components/sections/Testimonials.astro
```astro
---
// Testimonials section
---

<section id="testimonios" class="section-padding bg-gradient-to-b from-purple-900/20 to-pink-900/20">
  <div class="container mx-auto px-6">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
        Lo que Dicen Nuestros <span class="mystical-text">Usuarios</span>
      </h2>
      <p class="text-xl text-white/80 max-w-3xl mx-auto">
        Miles de personas han reclamado su herencia cósmica a través de Herencia Cósmica. 
        Lee sus experiencias transformadoras.
      </p>
    </div>

    <!-- Testimonials Grid -->
    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <!-- Testimonial 1 -->
      <div class="glass-card p-8 rounded-2xl">
        <div class="flex items-center mb-4">
          <div class="flex text-mystical-gold">
            ★★★★★
          </div>
        </div>
        <p class="text-white/90 mb-6 italic">
          "Mi carta natal me ayudó a entender por qué siempre me sentía atraída 
          a las artes. Ahora trabajo como diseñadora y nunca he sido más feliz. 
          ¡Increíble precisión!"
        </p>
        <div class="flex items-center">
          <div class="w-12 h-12 bg-mystical-gradient rounded-full flex items-center justify-center text-white font-semibold mr-4">
            M
          </div>
          <div>
            <p class="text-white font-semibold">María González</p>
            <p class="text-white/60 text-sm">Diseñadora Gráfica</p>
          </div>
        </div>
      </div>

      <!-- Testimonial 2 -->
      <div class="glass-card p-8 rounded-2xl">
        <div class="flex items-center mb-4">
          <div class="flex text-mystical-gold">
            ★★★★★
          </div>
        </div>
        <p class="text-white/90 mb-6 italic">
          "La interpretación sobre mi vida amorosa fue sorprendentemente exacta. 
          Me ayudó a entender patrones en mis relaciones y ahora tengo una 
          relación más sana y consciente."
        </p>
        <div class="flex items-center">
          <div class="w-12 h-12 bg-mystical-gradient rounded-full flex items-center justify-center text-white font-semibold mr-4">
            C
          </div>
          <div>
            <p class="text-white font-semibold">Carlos Mendoza</p>
            <p class="text-white/60 text-sm">Psicólogo</p>
          </div>
        </div>
      </div>

      <!-- Testimonial 3 -->
      <div class="glass-card p-8 rounded-2xl">
        <div class="flex items-center mb-4">
          <div class="flex text-mystical-gold">
            ★★★★★
          </div>
        </div>
        <p class="text-white/90 mb-6 italic">
          "Como empresaria, la información sobre abundancia y prosperidad 
          me dio claridad sobre las mejores decisiones financieras. 
          Mi negocio ha crecido un 300% este año."
        </p>
        <div class="flex items-center">
          <div class="w-12 h-12 bg-mystical-gradient rounded-full flex items-center justify-center text-white font-semibold mr-4">
            A
          </div>
          <div>
            <p class="text-white font-semibold">Ana Rodríguez</p>
            <p class="text-white/60 text-sm">Empresaria</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
      <div class="text-center">
        <div class="text-3xl font-bold mystical-text mb-2">98%</div>
        <div class="text-white/80 text-sm">Satisfacción</div>
      </div>
      <!-- <div class="text-center">
        <div class="text-3xl font-bold mystical-text mb-2">+90</div>
        <div class="text-white/80 text-sm">Usuarios Activos</div>
      </div> -->
      <div class="text-center">
        <div class="text-3xl font-bold mystical-text mb-2">4.9★</div>
        <div class="text-white/80 text-sm">Calificación</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold mystical-text mb-2">24/7</div>
        <div class="text-white/80 text-sm">Disponible</div>
      </div>
    </div>
  </div>
</section>
```

### src/components/sections/FAQ.astro
```astro
---
// FAQ section
---

<section class="section-padding bg-gradient-to-b from-pink-900/20 to-purple-900/20">
  <div class="container mx-auto px-6">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
        Preguntas <span class="mystical-text">Frecuentes</span>
      </h2>
      <p class="text-xl text-white/80 max-w-3xl mx-auto">
        Resolvemos las dudas más comunes sobre la astrología y nuestros servicios.
      </p>
    </div>

    <!-- FAQ Items -->
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- FAQ 1 -->
      <div class="glass-card rounded-2xl overflow-hidden">
        <button class="w-full px-8 py-6 text-left flex items-center justify-between text-white hover:bg-white/5 transition-colors faq-toggle">
          <h3 class="text-xl font-semibold">¿Qué tan precisa es la carta natal?</h3>
          <svg class="w-6 h-6 transform transition-transform faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div class="px-8 pb-6 text-white/80 hidden faq-content">
          <p>
            Nuestra carta natal utiliza cálculos astronómicos precisos basados en tu fecha, 
            hora y lugar exacto de nacimiento. Trabajamos con la API de AstrologyAPI.com, 
            que es utilizada por astrólogos profesionales en todo el mundo para garantizar 
            la máxima precisión en los cálculos planetarios.
          </p>
        </div>
      </div>

      <!-- FAQ 2 -->
      <div class="glass-card rounded-2xl overflow-hidden">
        <button class="w-full px-8 py-6 text-left flex items-center justify-between text-white hover:bg-white/5 transition-colors faq-toggle">
          <h3 class="text-xl font-semibold">¿Necesito saber mi hora exacta de nacimiento?</h3>
          <svg class="w-6 h-6 transform transition-transform faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div class="px-8 pb-6 text-white/80 hidden faq-content">
          <p>
            Sí, la hora exacta es fundamental para una interpretación precisa, especialmente 
            para determinar tu signo ascendente y las casas astrológicas. Si no conoces tu 
            hora exacta, puedes encontrarla en tu acta de nacimiento o consultar con el 
            registro civil de tu país.
          </p>
        </div>
      </div>

      <!-- FAQ 3 -->
      <div class="glass-card rounded-2xl overflow-hidden">
        <button class="w-full px-8 py-6 text-left flex items-center justify-between text-white hover:bg-white/5 transition-colors faq-toggle">
          <h3 class="text-xl font-semibold">¿La lectura gratuita incluye todo?</h3>
          <svg class="w-6 h-6 transform transition-transform faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div class="px-8 pb-6 text-white/80 hidden faq-content">
          <p>
            La lectura gratuita incluye tu carta natal completa con interpretaciones básicas 
            de tu personalidad, propósito de vida y características principales. Para análisis 
            más profundos sobre amor, carrera, salud y predicciones futuras, ofrecemos reportes 
            premium con interpretaciones extendidas.
          </p>
        </div>
      </div>

      <!-- FAQ 4 -->
      <div class="glass-card rounded-2xl overflow-hidden">
        <button class="w-full px-8 py-6 text-left flex items-center justify-between text-white hover:bg-white/5 transition-colors faq-toggle">
          <h3 class="text-xl font-semibold">¿Puedo generar cartas para mi familia?</h3>
          <svg class="w-6 h-6 transform transition-transform faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div class="px-8 pb-6 text-white/80 hidden faq-content">
          <p>
            ¡Absolutamente! Puedes generar cartas natales para todos los miembros de tu familia. 
            Además, ofrecemos reportes especiales de compatibilidad familiar que analizan las 
            dinámicas entre diferentes miembros y cómo pueden mejorar su comunicación y comprensión mutua.
          </p>
        </div>
      </div>

      <!-- FAQ 5 -->
      <div class="glass-card rounded-2xl overflow-hidden">
        <button class="w-full px-8 py-6 text-left flex items-center justify-between text-white hover:bg-white/5 transition-colors faq-toggle">
          <h3 class="text-xl font-semibold">¿Cómo se diferencia de otros servicios de astrología?</h3>
          <svg class="w-6 h-6 transform transition-transform faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div class="px-8 pb-6 text-white/80 hidden faq-content">
          <p>
            Herencia Cósmica combina cálculos astronómicos profesionales con interpretaciones 
            personalizadas en español. No ofrecemos horóscopos genéricos, sino análisis únicos 
            basados en tu información natal específica. Además, nuestro enfoque se centra en 
            el crecimiento personal y la toma de decisiones conscientes.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  // FAQ Toggle functionality
  document.addEventListener('DOMContentLoaded', function() {
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('.faq-icon');
        
        // Toggle content visibility
        content.classList.toggle('hidden');
        
        // Rotate icon
        icon.classList.toggle('rotate-180');
        
        // Close other open FAQs
        faqToggles.forEach(otherToggle => {
          if (otherToggle !== this) {
            const otherContent = otherToggle.nextElementSibling;
            const otherIcon = otherToggle.querySelector('.faq-icon');
            otherContent.classList.add('hidden');
            otherIcon.classList.remove('rotate-180');
          }
        });
      });
    });
  });
</script>
```

### src/components/sections/CTA.astro
```astro
---
// Final CTA section
---

<section class="section-padding bg-gradient-to-b from-purple-900/30 to-indigo-900/30">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Main CTA Content -->
      <h2 class="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
        Tu <span class="mystical-text">Destino</span> te Espera
      </h2>
      
      <p class="text-xl md:text-2xl text-white/90 mb-8">
        No dejes que otro día pase sin conocer tu verdadero propósito
      </p>
      
      <p class="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
        Miles de personas ya han transformado sus vidas descubriendo los secretos 
        de su carta natal. Es tu momento de brillar con tu luz única.
      </p>

      <!-- CTA Button -->
      <a 
        href="https://app.herenciacosmica.com/ver-reporte-gratuito" 
        class="mystical-button text-xl px-16 py-6 inline-block animate-pulse-glow mb-8"
      >
        ✨ Reclamar Mi Herencia Cósmica Ahora ✨
      </a>

      <!-- Urgency/Scarcity -->
      <div class="glass-card inline-block px-8 py-4 rounded-full mb-8">
        <p class="text-white/90">
          <span class="mystical-text font-semibold">Oferta Limitada:</span> 
          Lectura completa gratuita por tiempo limitado
        </p>
      </div>

      <!-- Final Trust Indicators -->
      <div class="flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          100% Seguro
        </div>
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          Sin Compromisos
        </div>
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.828a1 1 0 101.414-1.414L11 9.586V6z" clip-rule="evenodd"></path>
          </svg>
          Resultados Inmediatos
        </div>
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
          </svg>
          +15K Usuarios Satisfechos
        </div>
      </div>
    </div>
  </div>
</section>
```

### src/components/layout/Footer.astro
```astro
---
// Footer component
---

<footer class="bg-black/40 border-t border-white/10 py-12">
  <div class="container mx-auto px-6">
    <div class="grid md:grid-cols-4 gap-8">
      <!-- Brand -->
      <div class="md:col-span-2">
        <h3 class="text-2xl font-serif font-bold mystical-text mb-4">
          Herencia Cósmica
        </h3>
        <p class="text-white/80 mb-6 max-w-md">
          Reclama tu herencia cósmica a través de la sabiduría ancestral de la astrología. 
          Tu carta natal revela el camino hacia tu verdadero potencial.
        </p>
        <div class="flex space-x-4">
          <a href="#" class="text-white/60 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
          <a href="#" class="text-white/60 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
            </svg>
          </a>
          <a href="#" class="text-white/60 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.99C24.009 5.367 18.641.001 12.017.001z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <h4 class="text-white font-semibold mb-4">Enlaces Rápidos</h4>
        <ul class="space-y-2">
          <li><a href="#inicio" class="text-white/60 hover:text-white transition-colors">Inicio</a></li>
          <li><a href="#servicios" class="text-white/60 hover:text-white transition-colors">Servicios</a></li>
          <li><a href="#testimonios" class="text-white/60 hover:text-white transition-colors">Testimonios</a></li>
          <li><a href="https://app.herenciacosmica.com" class="text-white/60 hover:text-white transition-colors">Iniciar Sesión</a></li>
        </ul>
      </div>

      <!-- Services -->
      <div>
        <h4 class="text-white font-semibold mb-4">Servicios</h4>
        <ul class="space-y-2">
          <li><a href="https://app.herenciacosmica.com/ver-reporte-gratuito" class="text-white/60 hover:text-white transition-colors">Carta Natal Gratuita</a></li>
          <li><a href="https://app.herenciacosmica.com/reporte-familiar" class="text-white/60 hover:text-white transition-colors">Reporte Familiar</a></li>
          <li><a href="https://app.herenciacosmica.com/consulta-personal" class="text-white/60 hover:text-white transition-colors">Consulta Personal</a></li>
          <li><a href="/sobre-nosotros" class="text-white/60 hover:text-white transition-colors">Sobre Nosotros</a></li>
        </ul>
      </div>

      <!-- Legal -->
      <div>
        <h4 class="text-white font-semibold mb-4">Legal</h4>
        <ul class="space-y-2">
          <li><a href="/privacidad" class="text-white/60 hover:text-white transition-colors">Política de Privacidad</a></li>
          <li><a href="/terminos" class="text-white/60 hover:text-white transition-colors">Términos de Servicio</a></li>
          <li><a href="/cookies" class="text-white/60 hover:text-white transition-colors">Política de Cookies</a></li>
          <li><a href="/contacto" class="text-white/60 hover:text-white transition-colors">Contacto</a></li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-white/10 mt-12 pt-8 text-center">
      <p class="text-white/60 text-sm">
        © 2024 Herencia Cósmica. Todos los derechos reservados. 
        Hecho con ✨ para ayudarte a reclamar tu herencia cósmica.
      </p>
    </div>
  </div>
</footer>
```

---

## 7. Página Principal

### src/pages/index.astro
```astro
---
import Layout from '../components/layout/Layout.astro';
import Hero from '../components/sections/Hero.astro';
import Features from '../components/sections/Features.astro';
import HowItWorks from '../components/sections/HowItWorks.astro';
import Testimonials from '../components/sections/Testimonials.astro';
import FAQ from '../components/sections/FAQ.astro';
import CTA from '../components/sections/CTA.astro';
import '../styles/global.css';

const seoData = {
  title: "Herencia Cósmica - Reclama tu Herencia Cósmica | Carta Natal Gratuita",
  description: "Reclama tu herencia cósmica a través de la astrología ancestral. Carta natal gratuita, interpretaciones personalizadas. Los secretos que el cosmos te heredó.",
  keywords: "herencia cósmica, carta natal, astrología, propósito de vida, horóscopo personalizado, carta astral, astrología gratis, interpretación astrológica, signos zodiacales, planetas, casas astrológicas",
  ogImage: "/images/og-home.jpg"
};
---

<Layout {...seoData}>
  <Hero />
  <Features />
  <HowItWorks />
  <Testimonials />
  <FAQ />
  <CTA />
</Layout>
```

---

## 8. Archivos de Configuración Adicionales

### public/robots.txt
```
User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.herenciacosmica.com/sitemap.xml

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /api/

# Allow important pages
Allow: /
Allow: /servicios
Allow: /precios
Allow: /sobre-nosotros
Allow: /blog/
```

### src/utils/constants.ts
```typescript
export const SITE_CONFIG = {
  name: 'Herencia Cósmica',
  description: 'Reclama tu herencia cósmica a través de la astrología ancestral',
  url: 'https://www.herenciacosmica.com',
  appUrl: 'https://app.herenciacosmica.com',
  social: {
    twitter: '@herenciacosmica',
    facebook: 'herenciacosmica',
    instagram: 'herenciacosmica'
  }
};

export const NAVIGATION = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Testimonios', href: '#testimonios' },
  { name: 'Precios', href: '#precios' }
];

export const CTA_LINKS = {
  primary: 'https://app.herenciacosmica.com/ver-reporte-gratuito',
  login: 'https://app.herenciacosmica.com',
  familyReport: 'https://app.herenciacosmica.com/reporte-familiar'
};
```

---

## 9. Comandos de Desarrollo

### package.json Scripts
```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx,.astro",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx,.astro --fix"
  }
}
```

### Comandos de Desarrollo
```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
npm run lint:fix
```

---

## 10. Deployment y Configuración

### Vercel Deployment
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Netlify Deployment
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 11. Optimizaciones de Performance

### Configuración de Imágenes
```javascript
// astro.config.mjs - Añadir optimización de imágenes
import { defineConfig } from 'astro/config';
import image from '@astrojs/image';

export default defineConfig({
  // ... configuración existente
  integrations: [
    // ... integraciones existentes
    image() // Sharp is the default image service
  ]
});
```

### Lazy Loading Implementation
```astro
---
// Ejemplo de uso en componentes
---
<img 
  src="/images/hero-bg.jpg" 
  alt="Fondo cósmico" 
  loading="lazy"
  decoding="async"
  width="1920"
  height="1080"
/>
```

---

## 12. Checklist de Implementación

### Fase 1: Setup Básico ✅
- [ ] Crear repositorio nuevo
- [ ] Instalar Astro y dependencias
- [ ] Configurar Tailwind CSS
- [ ] Setup estructura de archivos

### Fase 2: Componentes Core ✅
- [ ] Layout base y SEO
- [ ] Header con navegación
- [ ] Hero section
- [ ] Features section
- [ ] Footer

### Fase 3: Contenido Completo ✅
- [ ] How It Works section
- [ ] Testimonials
- [ ] FAQ con funcionalidad
- [ ] CTA final
- [ ] Página principal completa

### Fase 4: Optimización ✅
- [ ] SEO meta tags
- [ ] Structured data
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Analytics setup

### Fase 5: Deployment 🚀
- [ ] Configurar dominio www.orbitaholistica.com
- [ ] Deploy a producción
- [ ] Configurar SSL
- [ ] Testing completo
- [ ] Configurar redirects desde app actual

---

## 13. Métricas de Éxito Esperadas

### Performance
- **Lighthouse Score**: 95+ en todas las categorías
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### SEO
- **Core Web Vitals**: Todos en verde
- **Mobile Usability**: 100%
- **Structured Data**: Sin errores
- **Page Speed**: 90+ móvil y desktop

### Conversión
- **Bounce Rate**: < 40%
- **Time on Page**: > 2 minutos
- **Click-through Rate**: > 15%
- **Conversion Rate**: > 8%

---

## 14. Mantenimiento y Actualizaciones

### Actualizaciones Regulares
- Contenido de testimonials
- FAQ basado en preguntas reales
- Blog posts para SEO
- A/B testing de headlines y CTAs

### Monitoreo
- Google Analytics 4
- Google Search Console
- Core Web Vitals
- Conversion tracking

---

¡Con esta guía completa tienes todo lo necesario para crear un landing page de alto rendimiento que convertirá visitantes en usuarios de tu aplicación Órbita Holística! 🚀✨
