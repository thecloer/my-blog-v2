import rehypePrismGenerator from 'rehype-prism-plus/generator';
import { refractor } from 'refractor/lib/core';

// language support
import languages from './lang';

languages.forEach((language) => refractor.register(language));

export default rehypePrismGenerator(refractor);
