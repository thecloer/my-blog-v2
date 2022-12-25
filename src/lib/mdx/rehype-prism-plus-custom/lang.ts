import type { Syntax } from 'refractor/lib/core';

// language support
import markdown from 'refractor/lang/markdown';
import css from 'refractor/lang/css';
import scss from 'refractor/lang/scss';
import bash from 'refractor/lang/bash';
import markup from 'refractor/lang/markup';
import yaml from 'refractor/lang/yaml';
import json from 'refractor/lang/json';
import sql from 'refractor/lang/sql';

import javascript from 'refractor/lang/javascript';
import typescript from 'refractor/lang/typescript';
import jsx from 'refractor/lang/jsx';
import tsx from 'refractor/lang/tsx';
import python from 'refractor/lang/python';
import go from 'refractor/lang/go';
import java from 'refractor/lang/java';
import rust from 'refractor/lang/rust';

const languages: Record<string, Syntax> = {
  markdown,
  css,
  scss,
  bash,
  markup,
  yaml,
  json,
  sql,

  javascript,
  typescript,
  jsx,
  tsx,
  python,
  go,
  java,
  rust,
};

export default languages;
