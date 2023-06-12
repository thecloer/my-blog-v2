/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: require('./package.json').homepage || 'https://www.thecloer.com',
  changefreq: 'monthly',
  generateRobotsTxt: true,
};
