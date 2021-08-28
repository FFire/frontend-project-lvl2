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
  UPDATED: 'updated',
  DELETED: 'deleted',
  UNCHANGED: 'unchanged',
};

const makeDiff = (key, value1, value2, state) => ({
  path: [key],
  value1,
  value2,
  state,
});

const objectsDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2).sort();
  const state = states.CREATED;

  return keys.map((key) => makeDiff(key, obj1[key], obj2[key], state));
};

const mainAction = (filepath1, filepath2, options = { format: 'text' }) => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);

  const diffObjects = objectsDiff(obj1, obj2);
  console.log('🚀 > diffObject', diffObjects);

  return _.noop(options);
};

export default mainAction;
