const siteMetadata = {
  author: 'Seokgyu Choi',
  title: "Thecloer's blog",
  description: 'A blog about web development, programming, and more.',
  siteUrl: 'https://www.thecloer.com',
  ogImage: '/images/og/dev-memoji.png',

  email: 'chltjrrb97@gmail.com',
  github: 'https://github.com/thecloer',
  twitter: 'https://twitter.com/the_cloer',
  instagram: 'https://www.instagram.com/thecloer',
  linkedin: 'https://www.linkedin.com/in/thecloer',

  theme: 'system', // system, dark or light

  comment: {
    repo: 'thecloer/my-blog-v2-comment',
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
} as const;

export default siteMetadata;
