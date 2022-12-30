import { join } from 'path';

const DATA = join(process.cwd(), 'data');
const MDX_COMPONENTS = join(process.cwd(), 'dataComponents');

const getDataPath = (folder: string) => join(DATA, folder);

const DATA_PATH = {
  MDX_COMPONENTS,
  DATA,
  BLOG: getDataPath('blog'),
} as const;

export default DATA_PATH;
