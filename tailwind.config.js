/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Home Theme
                'sakura-pink': '#FFB7C5',
                'deep-sakura': '#FF91A4',
                'zen-green': '#98FB98',
                'sky-vibrant': '#87CEFA',
                'paper-cream': '#FFFDF0',
                'ink-dark': '#2D2926',
                'path-grey': '#C0C0C0',

                // Comic Theme
                'comic-bg': '#ffffff',
                'comic-frame': '#000000',
                'tone-light': '#e8e8e8',
                'tone-dark': '#c0c0c0',
                'action-lime': '#ccff00',
                'action-orange': '#ffaa00',
                'action-pink': '#ff99cc',
                'action-sky': '#66ccff',
                'nature-green': '#4caf50',
                'nature-dark-green': '#2e7d32',

                // Console Theme
                'console-body': '#d0d0d0',
                'console-dark': '#707070',
                'console-screen-bg': '#9bbc0f',
                'console-screen-off': '#8bac0f',
                'console-screen-dark': '#306230',
                'console-screen-light': '#9bbc0f',
                'console-screen-black': '#0f380f',
                'btn-a': '#ff4757',
                'btn-b': '#ff6b81',
                'cottage-roof': '#8d6e63',
                'cottage-wall': '#ffe0b2',

                // Login Wood Theme
                'primary': '#f47b25',
                'primary-hover': '#d6661a',
                'wood-light': '#e4a672',
                'wood-dark': '#8d5e32',
                'wood-border': '#5c3a1e',
                'wood-shadow': '#3e2613',
                'grass': '#7ec850',
                'sky': '#5bc2e7',
                'input-bg': '#f8f1e9',
            },
            fontFamily: {
                // Home
                'pixel-title': ['"ZCOOL KuaiLe"', 'cursive'],
                'pixel-body': ['"Noto Sans SC"', 'sans-serif'],
                'hand-drawn': ['"Ma Shan Zheng"', 'cursive'],
                // Comic
                'pixel': ['"DotGothic16"', 'sans-serif'],
                'manga-title': ['"ZCOOL QingKe HuangYou"', 'cursive'],
                'mono': ['"VT323"', 'monospace'],
                // Console
                'console-pixel': ['"Press Start 2P"', 'cursive'],
                'retro': ['"VT323"', 'monospace'],
                'chinese-pixel': ['"ZCOOL KuaiLe"', '"Press Start 2P"', 'cursive'],
            },
            boxShadow: {
                'pixel': '4px 4px 0px 0px rgba(0,0,0,0.15)',
                'comic': '6px 6px 0px 0px #000000',
                'comic-sm': '3px 3px 0px 0px #000000',
                'comic-hover': '8px 8px 0px 0px #000000',
                'pixel-lg': '4px 4px 0px 0px rgba(0,0,0,1)',
                'pixel-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
                'console-depth': 'inset -5px -5px 10px rgba(0,0,0,0.1), 10px 20px 0px rgba(0,0,0,0.3)',
                'screen-inner': 'inset 4px 4px 10px rgba(0,0,0,0.4)',
                'btn-press': 'inset 2px 2px 5px rgba(0,0,0,0.3)',
            },
            backgroundImage: {
                'halftone': 'radial-gradient(#c0c0c0 1px, transparent 1px)',
                'speed-lines': 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.05) 4px, rgba(0,0,0,0.05) 5px)',
            }
        },
    },
    plugins: [],
}
