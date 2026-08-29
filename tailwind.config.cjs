/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // The Instrument Panel — see DESIGN.md
        'bg-primary': '#0F172A', // Ink Slate: the chassis
        'bg-surface': '#1E293B', // Panel Slate: raised surfaces
        'text-primary': '#F8FAFC', // Signal White: headings
        'accent-success': '#10B981', // Live Emerald: state only
        'accent-tech': '#3B82F6', // Instrument Blue: navigable

        'bg-primary-light': '#1E293B',
        'bg-surface-light': '#334155', // Panel Slate Raised: chips, second lift
        'text-secondary': '#E2E8F0', // Readout Grey: body copy
        'text-muted': '#94A3B8', // Metadata and dates on the chassis

        'accent-success-light': '#34D399', // emerald as text on dark
        'accent-success-dark': '#059669',

        'accent-tech-light': '#60A5FA', // blue as text on chassis/panel
        'accent-tech-pale': '#93C5FD', // blue as text on the raised panel tone
        'accent-tech-dark': '#2563EB', // primary action fill
        'accent-tech-deep': '#1D4ED8', // primary action pressed/hover
      },
      boxShadow: {
        // Always paired with a hairline border — The Border-and-Shadow Rule
        'resting': '0 1px 3px rgba(0,0,0,0.4)',
        'lifted': '0 10px 25px -5px rgba(0,0,0,0.5)',
        'overlay': '0 20px 40px -10px rgba(0,0,0,0.65)',
      },
    }
  },
  plugins: [require('@tailwindcss/typography')],
}
