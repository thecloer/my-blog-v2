import { join } from 'path';

const ROOT = join(process.cwd(), 'data');
const getDataPath = (folder: string) => join(ROOT, folder);

const DATA_PATH = {
  ROOT,
  BLOG: getDataPath('blog'),
  MDX_COMPONENTS_ROOT: getDataPath('components'),
} as const;

export default DATA_PATH;
