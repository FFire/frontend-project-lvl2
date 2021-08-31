import _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import parseFile from './parsers.js';

export const getAbsFilePath = (filePath) => {
  const absFilePath = path.resolve(filePath);
  if (!fs.existsSync(absFilePath)) throw new Error(`File do not exist: ${absFilePath}`);
  return absFilePath;
};

export const readFilePath = (absFilepath) => fs.readFileSync(absFilepath, 'utf8');

export const getObject = (filePath) => {
  const absFilePath = getAbsFilePath(filePath.toLowerCase());
  const extName = path.extname(filePath);
  const rawFile = readFilePath(absFilePath);
  return parseFile(rawFile, extName);
};

export const states = {
  CREATED: 'created',
  DELETED: 'deleted',
  CHANGED: 'changed',
  UNCHANGED: 'unchanged',
};

export const makeDiff = (value1, value2, property, state) => ({
  value1,
  value2,
  property,
  state,
  children: {},
});

export const getState = (obj1, obj2, key) => {
  if (!_.has(obj1, key)) return states.CREATED;
  if (!_.has(obj2, key)) return states.DELETED;
  if (obj1[key] !== obj2[key]) return states.CHANGED;
  return states.UNCHANGED;
};

export const makeDiffs = (obj1, obj2) => {
  const keys = { ...obj1, ...obj2 };

  return keys.map((key) => {
    const state = getState(obj1, obj2, key);
    const value1 = obj1[key];
    const value2 = obj2[key];

    return makeDiff(value1, value2, key, state);
  });
};

export const makeSigns = () => {
  const signs = {};
  signs[states.CREATED] = '+';
  signs[states.DELETED] = '-';
  signs[states.UNCHANGED] = ' ';
  return signs;
};

const diffToString = (sign, property, value) => {
  _.noop();
  return `  ${sign} ${property}: ${value}`;
};

export const formatAsText = (diffs) => {
  const signs = makeSigns();

  const diffStrings = diffs.reduce((acc, diff) => {
    const { value1, value2, state, property } = diff;
    if (state === states.CREATED || state === states.UNCHANGED) {
      const sign = signs[state];
      acc.push(diffToString(sign, property, value2));
    }
    if (state === states.DELETED || state === states.CHANGED) {
      const sign = signs[states.DELETED];
      acc.push(diffToString(sign, property, value1));
    }
    if (state === states.CHANGED) {
      const sign = signs[states.CREATED];
      acc.push(diffToString(sign, property, value2));
    }
    return acc;
  }, []);

  return ['{', ...diffStrings, '}'].join('\n');
};

const genDiff = (filepath1, filepath2, options) => {
  if (filepath1 === undefined) throw new Error("error: missing required argument 'filepath1'");
  if (filepath2 === undefined) throw new Error("error: missing required argument 'filepath2'");
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const diffs = makeDiffs(obj1, obj2, options);
  return formatAsText(diffs);
};

console.log(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json'));
export default genDiff;
