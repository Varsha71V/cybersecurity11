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
                    dark: '#030712',
                    navy: '#090d1a',
                    surface: '#0f172a',
                    card: 'rgba(15, 23, 42, 0.75)',
                    border: 'rgba(56, 189, 248, 0.2)',
                    cyan: '#06b6d4',
                    cyanLight: '#22d3ee',
                    purple: '#8b5cf6',
                    purpleLight: '#a855f7',
                    emerald: '#10b981',
                    amber: '#f59e0b',
                    rose: '#f43f5e',
                }
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 3s ease-in-out infinite alternate',
                'scanline': 'scanline 8s linear infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 15px rgba(6, 182, 212, 0.2)' },
                    '100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' },
                },
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(1000%)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-8px)' },
                }
            }
        },
    },
    plugins: [],
}
