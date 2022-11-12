import { join } from 'path';

const getDataPath = (folder: string) => join(process.cwd(), 'data', folder);

const dataPath = {
  blog: getDataPath('blog'),
} as const;

export default dataPath;
