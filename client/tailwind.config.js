module.exports = {
  content: [
    "./src/**/*.{html,ts,js,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
  ],
};
