/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ai-indigo-500': '#6366f1',
        'ai-indigo-600': '#4f46e5',
        'ai-cyan-500': '#06b6d4',
        'ai-gray-500': '#6b7280',
      }
    }
  },
  plugins: [],
}