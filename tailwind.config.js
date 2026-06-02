/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Cyberpunk Surveillance HUD palette
        ink: '#020408', // background noir absolu
        cyan: '#00f5ff',
        magenta: '#ff006e',
        neon: '#00ff41', // vert néon
        steel: '#0a121a',
        haze: '#5b7080',
      },
      fontFamily: {
        display: ['Orbitron', 'system-ui', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        cyan: '0 0 12px rgba(0,245,255,0.45), 0 0 32px rgba(0,245,255,0.18)',
        magenta: '0 0 12px rgba(255,0,110,0.45), 0 0 32px rgba(255,0,110,0.18)',
        neon: '0 0 12px rgba(0,255,65,0.45), 0 0 32px rgba(0,255,65,0.18)',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.4' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.7' },
          '97%': { opacity: '1' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(0,255,65,0.6)' },
          '50%': { opacity: '0.6', boxShadow: '0 0 0 6px rgba(0,255,65,0)' },
        },
      },
      animation: {
        scan: 'scan 3.5s linear infinite',
        flicker: 'flicker 9s linear infinite',
        pulseDot: 'pulseDot 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
