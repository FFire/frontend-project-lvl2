import _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';

const getAbsolutePath = (filePath) => {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) throw new Error('File do not exist.');
  return absolutePath;
};
const getFileFromDisk = (absolutePath) => fs.readFileSync(absolutePath, 'utf8');
const parseJson = (rawFile) => JSON.parse(rawFile);
const getObject = (filePath) => {
  const absolutePath = getAbsolutePath(filePath);
  const rawFile = getFileFromDisk(absolutePath);
  const data = parseJson(rawFile);
  return data;
};

const mainAction = (filepath1, filepath2, options = { format: 'text' }) => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  console.log('🚀 > rawFile1', obj1);
  console.log('🚀 > rawFile2', obj2);

  _.noop(options);
};

export default mainAction;
