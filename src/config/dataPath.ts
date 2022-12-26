import { join } from 'path';

const ROOT = join(process.cwd(), 'data');
const MDX_COMPONENTS = join(process.cwd(), 'dataComponents');

const getDataPath = (folder: string) => join(ROOT, folder);

const DATA_PATH = {
  ROOT,
  BLOG: getDataPath('blog'),
  MDX_COMPONENTS,
} as const;

export default DATA_PATH;
