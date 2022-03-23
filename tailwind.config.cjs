module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  safelist: [
    {
      pattern: /bg-(red|sky)-(500|600)/,
      variants: ['hover', 'focus'],
    },
  ],
  plugins: [
    require('@tailwindcss/forms'),
  ]
};