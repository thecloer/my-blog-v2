import urlPath from './urlPath';

const headerNavLinks = [
  { title: 'Blog', href: urlPath.blog.index },
  { title: 'Tag', href: urlPath.blog.tags.index },
  { title: 'Category', href: urlPath.blog.categories.index },
  // {title: 'Projects' ,href: urlPath.projects.index},
] as const;

export default headerNavLinks;
