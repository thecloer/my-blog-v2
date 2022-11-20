import { join } from 'path';

const getDataPath = (folder: string) => join(process.cwd(), 'data', folder);

const DATA_PATH = {
  ROOT: join(process.cwd(), 'data'),
  BLOG: getDataPath('blog'),
  COMPONENTS: getDataPath('components'),
} as const;

export default DATA_PATH;
