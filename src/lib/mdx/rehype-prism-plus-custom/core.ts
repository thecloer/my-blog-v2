import rehypePrismGenerator from 'rehype-prism-plus/generator';
import { refractor } from 'refractor/lib/core';

// language support
import languages from './lang';

for (const key in languages) {
  const language = key in languages ? languages[key] : null;
  if (language !== null) refractor.register(language);
}

export default rehypePrismGenerator(refractor);
