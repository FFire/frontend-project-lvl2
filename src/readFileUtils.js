import * as path from 'path';
import * as fs from 'fs';

export const getFileAbsPath = (filePath) => {
  const absFilePath = path.resolve(filePath);
  if (!fs.existsSync(absFilePath)) { throw new Error(`File do not exist: ${absFilePath}`); }
  return absFilePath;
};

export const readFile = (absFilepath) => fs.readFileSync(absFilepath, 'utf8');

export const getExtName = (filePath) => path.extname(filePath);
