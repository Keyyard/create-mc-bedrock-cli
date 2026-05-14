/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Palette tokens. Values resolve to CSS variables defined in
      // src/styles/globals.css. RGB-channel form lets `<alpha-value>` substitute
      // for opacity modifiers like `bg-secondary/20` or `border-dark/40`.
      colors: {
        light: 'rgb(var(--light) / <alpha-value>)',
        lightgray: 'rgb(var(--lightgray) / <alpha-value>)',
        gray: 'rgb(var(--gray) / <alpha-value>)',
        darkgray: 'rgb(var(--darkgray) / <alpha-value>)',
        dark: 'rgb(var(--dark) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--tertiary) / <alpha-value>)',
        highlight: 'rgb(var(--highlight-rgb) / var(--highlight-alpha, 1))',
        textHighlight:
          'rgb(var(--text-highlight-rgb) / var(--text-highlight-alpha, 1))',
      },
      fontFamily: {
        // Semantic names. Use these in components.
        header: ['var(--font-be-vietnam-pro)', 'var(--font-inter)', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        code: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        // Tailwind defaults aliased to the same stacks so prose, Nextra,
        // and any third-party `font-sans` / `font-mono` use the right fonts.
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
