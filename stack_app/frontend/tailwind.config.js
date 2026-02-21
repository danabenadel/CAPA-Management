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
                    50: '#f0f7fc',
                    100: '#e0eff9',
                    200: '#bce0f3',
                    300: '#86c6eb',
                    400: '#6da9dd', // Requested color
                    500: '#2b84ca',
                    600: '#1e66a3',
                    700: '#195283',
                    800: '#17456d',
                    900: '#173a5a',
                }
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'glow': '0 0 15px rgba(109, 169, 221, 0.3)',
            }
        },
    },
    plugins: [],
}
