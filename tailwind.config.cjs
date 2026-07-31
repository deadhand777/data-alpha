/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom AI Engineering Color Palette
        'bg-primary': '#0F172A', // Background: Slate 900
        'bg-surface': '#1E293B', // Surface/Cards: Slate 800
        'text-primary': '#F8FAFC', // Primary Text: Slate 50
        'accent-success': '#10B981', // Accent/Highlight: Emerald Green
        'accent-tech': '#3B82F6', // Secondary Accent: Tech Blue

        // Optional: Add shade variations for more flexibility
        'bg-primary-light': '#1E293B', // Slate 800 (lighter variant)
        'bg-surface-light': '#334155', // Slate 700
        'text-secondary': '#E2E8F0', // Slate 100 (secondary text)

        'accent-success-light': '#34D399', // Emerald 300
        'accent-success-dark': '#059669', // Emerald 800

        'accent-tech-light': '#60A5FA', // Blue 400
        'accent-tech-dark': '#2563EB', // Blue 700
      }
    }
  },
  plugins: [],
}