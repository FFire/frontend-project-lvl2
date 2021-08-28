import _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';

const getAbsFilePath = (filePath) => {
  const absFilePath = path.resolve(filePath);
  if (!fs.existsSync(absFilePath)) throw new Error('File do not exist.');
  return absFilePath;
};

const readFilePath = (absFilepath) => fs.readFileSync(absFilepath, 'utf8');

const parseJson = (rawFile) => JSON.parse(rawFile);

const getObject = (filePath) => {
  const absFilePath = getAbsFilePath(filePath);
  const rawFile = readFilePath(absFilePath);
  return parseJson(rawFile);
};

const states = {
  CREATED: 'created',
  DELETED: 'deleted',
  CHANGED: 'changed',
  UNCHANGED: 'unchanged',
};

const makeDiff = (value1, value2, key, state) => ({
  value1,
  value2,
  keys: [key],
  state,
});

const getState = (obj1, obj2, key) => {
  if (!_.has(obj1, key)) return states.CREATED;
  if (!_.has(obj2, key)) return states.DELETED;
  if (obj1[key] !== obj2[key]) return states.CHANGED;
  return states.UNCHANGED;
};

const makeDiffs = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2).sort();

  return keys.map((key) => {
    const state = getState(obj1, obj2, key);
    return makeDiff(obj1[key], obj2[key], key, state);
  });
};

const makeSigns = () => {
  const signs = {};
  signs[states.CREATED] = '+';
  signs[states.DELETED] = '-';
  signs[states.UNCHANGED] = ' ';
  return signs;
};

const diffToString = (sign, keys, value) => {
  _.noop();
  return `  ${sign} ${keys}: ${value}`;
};

const formatAsText = (diffs) => {
  const signs = makeSigns();

  const diffStrings = diffs.reduce((acc, diff) => {
    const { value1, value2, state } = diff;
    const keys = diff.keys.join('');
    if (state === states.CREATED || state === states.UNCHANGED) {
      const sign = signs[state];
      acc.push(diffToString(sign, keys, value2));
    }
    if (state === states.DELETED || state === states.CHANGED) {
      const sign = signs[states.DELETED];
      acc.push(diffToString(sign, keys, value1));
    }
    if (state === states.CHANGED) {
      const sign = signs[states.CREATED];
      acc.push(diffToString(sign, keys, value2));
    }
    return acc;
  }, []);

  return ['{', ...diffStrings, '}'].join('\n');
};

const mainAction = (filepath1, filepath2, options) => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);

  const diffs = makeDiffs(obj1, obj2, options);
  const result = formatAsText(diffs);
  console.log(result);

  return result;
};

export default mainAction;
