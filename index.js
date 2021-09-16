// @ts-check

import * as path from 'path';
import * as fs from 'fs';
import parseFile from './src/parsers.js';
import makeDiffs from './src/makeDiffs.js';
import getFormatter from './src/formatters/index.js';

const getObject = (filePath) => {
  const absFilePath = path.resolve(filePath.toLowerCase());
  const fileType = path.extname(filePath);
  const rawFile = fs.readFileSync(absFilePath, 'utf8');
  return parseFile(rawFile, fileType);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const diffs = makeDiffs(obj1, obj2);
  const formatter = getFormatter(format);

  return formatter(diffs);
};

console.dir(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json'), { depth: null });
export default genDiff;
