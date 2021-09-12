// @ts-check

import parseFile from './parsers.js';
import { getFileAbsPath, getExtName, readFile } from './readFileUtils.js';
import makeDiffs from './makeDiffs.js';
import getFormatter from './formatters/index.js';

const getObject = (filePath) => {
  const absFilePath = getFileAbsPath(filePath.toLowerCase());
  const extName = getExtName(filePath);
  const rawFile = readFile(absFilePath);
  return parseFile(rawFile, extName);
};

const checkPathOptions = (options) => {
  Object.entries(options).forEach(([optName, optValue]) => {
    if (optValue === undefined) {
      throw new Error(`Missing required argument ${optName}`);
    }
  });
};

const genDiff = (filepath1, filepath2, option = 'stylish') => {
  checkPathOptions({ filepath1, filepath2 });

  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const diffs = makeDiffs(obj1, obj2);
  const formatter = getFormatter(option);
  return formatter(diffs);
};

export const genDiffToConsole = (filepath1, filepath2, options) => {
  const formatedDiffs = genDiff(filepath1, filepath2, options.format);
  console.log(formatedDiffs);
};

export default genDiff;
