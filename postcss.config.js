module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    ...(process.env.NODE_ENV === 'production'
      ? {
          '@fullhuman/postcss-purgecss': {
            content: ['./components/**/*.tsx', './pages/**/*.tsx'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            whitelistPatterns: [/^fa-/, /^svg-inline--fa/],
            whitelist: ['svg:not(:root).svg-inline--fa'],
          },
        }
      : {}),
  },
};
