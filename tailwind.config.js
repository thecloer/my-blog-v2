/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './data/**/*.{mdx,tsx,ts}', './dataComponents/**/*.{mdx,tsx,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.teal,
        bgDark: colors.zinc,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
              '&::before': {
                content: '"#"',
                color: theme('colors.gray.500'),
                paddingRight: '0.5rem',
              },
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
              '&::before': {
                content: '"#"',
                color: theme('colors.gray.500'),
                paddingRight: '0.5rem',
              },
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
              '&::before': {
                content: '"-"',
                color: theme('colors.gray.500'),
                paddingRight: '0.5rem',
              },
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900'),
              '&::before': {
                content: '"-"',
                color: theme('colors.gray.500'),
                paddingRight: '0.5rem',
              },
            },
            'h1,h2,h3,h4,h5,h6': {
              scrollMarginTop: 'var(--header-height)',
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              color: theme('colors.pink.600'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '0.25em',
              paddingRight: '0.25em',
              paddingTop: '0.125em',
              paddingBottom: '0.125em',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            details: {
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '0.25em',
              paddingRight: '0.25em',
              paddingTop: '0.125em',
              paddingBottom: '0.125em',
              borderRadius: '0.25rem',
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.500'),
            },
            strong: { color: theme('colors.gray.600') },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
            p: {
              textIndent: '0.5rem',
            },

            '.footnotes': {
              fontSize: theme('fontSize.sm'),
              lineHeight: '1.5rem',
              color: theme('colors.gray.600'),
              p: {
                margin: 0,
              },
            },
            'a[data-footnote-backref],a[data-footnote-ref]': {
              scrollMarginTop: 'var(--header-height)',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
              '&::before': {
                color: theme('colors.gray.400'),
              },
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
              '&::before': {
                color: theme('colors.gray.400'),
              },
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.100'),
              '&::before': {
                color: theme('colors.gray.400'),
              },
            },
            'h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.gray.800'),
            },
            details: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.400'),
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')],
};
