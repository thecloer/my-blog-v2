import type { Syntax } from 'refractor/lib/core';

// language support
import css from 'refractor/lang/css';
import scss from 'refractor/lang/scss';
import bash from 'refractor/lang/bash';
import yaml from 'refractor/lang/yaml';
import json from 'refractor/lang/json';
import sql from 'refractor/lang/sql';
// import markdown from 'refractor/lang/markdown';
// import markup from 'refractor/lang/markup';

import javascript from 'refractor/lang/javascript';
import typescript from 'refractor/lang/typescript';
import jsx from 'refractor/lang/jsx';
import tsx from 'refractor/lang/tsx';
import python from 'refractor/lang/python';
import java from 'refractor/lang/java';
// import go from 'refractor/lang/go';
// import rust from 'refractor/lang/rust';

const languages: Syntax[] = [
  css,
  scss,
  bash,
  yaml,
  json,
  sql,
  // markdown,
  // markup,

  javascript,
  typescript,
  jsx,
  tsx,
  python,
  java,
  // go,
  // rust,
];

export default languages;
