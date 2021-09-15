// @ts-check

import * as path from 'path';
import * as fs from 'fs';
import parseFile from './src/parsers.js';
import makeDiffs from './src/makeDiffs.js';
import getFormatter from './src/formatters/index.js';

const getObject = (filePath) => {
  const absFilePath = path.resolve(filePath.toLowerCase());
  const extName = path.extname(filePath);
  const rawFile = fs.readFileSync(absFilePath, 'utf8');
  return parseFile(rawFile, extName);
};

const genDiff = (filepath1, filepath2, option = 'stylish') => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const diffs = makeDiffs(obj1, obj2);
  const formatter = getFormatter(option);

  return formatter(diffs);
};

export default genDiff;
