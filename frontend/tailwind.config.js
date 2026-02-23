/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#f8fafc',
                    100: '#eef6fc',
                    200: '#dceaf6',
                    300: '#84afde',
                    400: '#6da9dd',
                    500: '#6ba9e0',
                    600: '#4a8ec9',
                    700: '#346b9e',
                    800: '#2b5279',
                    900: '#242a4b',
                    950: '#181d36',
                },
                accent: {
                    DEFAULT: '#242a4b', // Deep navy blue
                    light: '#8da6d1',   // Soft lavender
                    teal: '#6b9c9f'     // Muted slate teal
                }
            },
            fontFamily: {
                sans: ['Inter', 'Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
                'glow': '0 0 20px rgba(107, 169, 224, 0.4)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
            }
        },
    },
    plugins: [],
}
