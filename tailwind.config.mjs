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