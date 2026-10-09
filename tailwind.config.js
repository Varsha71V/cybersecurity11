/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#070a13',
          canvas: '#090d18',
          card: '#0d1527',
          surface: '#111b33',
          elevated: '#162240',
          border: 'rgba(51, 65, 85, 0.5)',
          borderSubtle: 'rgba(30, 41, 59, 0.8)',
          borderHover: 'rgba(56, 189, 248, 0.4)',
          cyan: '#0ea5e9',
          cyanLight: '#38bdf8',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          purpleLight: '#a855f7',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.4)',
        'elevated': '0 10px 30px -5px rgba(0, 0, 0, 0.6)',
        'cyan-glow-sm': '0 0 15px -2px rgba(14, 165, 233, 0.25)',
        'rose-glow-sm': '0 0 15px -2px rgba(244, 63, 94, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
