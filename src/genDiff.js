// @ts-check

import _ from 'lodash';
import parseFile from './parsers.js';
import formatStylish from './formatStylish.js';
import { getFileAbsPath, getExtName, readFile } from './readFileUtils.js';
import makeDiffs from './makeDiffs.js';

const defaultOptions = {
  format: 'stylish',
};

const getObject = (filePath) => {
  const absFilePath = getFileAbsPath(filePath.toLowerCase());
  const extName = getExtName(filePath);
  const rawFile = readFile(absFilePath);
  return parseFile(rawFile, extName);
};

const formatDiffs = (diffs, options) => {
  _.noop(options);
  console.dir(diffs, { depth: null });
  const result = formatStylish(diffs);

  return result;
};

const checkPathOptions = (options) => {
  Object.entries(options).forEach(([optName, optValue]) => {
    if (optValue === undefined) {
      throw new Error(`Missing required argument ${optName}`);
    }
  });
};

const genDiff = (filepath1, filepath2, options) => {
  checkPathOptions({ filepath1, filepath2 });
  // todo replace with _.defaults
  const actualOptions = { ...defaultOptions, ...options };
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const diffs = makeDiffs(obj1, obj2);
  return formatDiffs(diffs, actualOptions);
};

export const genDiffToConsole = (filepath1, filepath2, options) => {
  const formatedDiffs = genDiff(filepath1, filepath2, options);
  // console.log('--------------------------------');
  console.log(formatedDiffs);
};

genDiff('__fixtures__/file1short.json', '__fixtures__/file2short.json');

export default genDiff;
