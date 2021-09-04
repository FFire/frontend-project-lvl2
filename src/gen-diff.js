import _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import parseFile from './parsers.js';

const getFileAbsPath = (filePath) => {
  const absFilePath = path.resolve(filePath);
  if (!fs.existsSync(absFilePath)) throw new Error(`File do not exist: ${absFilePath}`);
  return absFilePath;
};

const readFile = (absFilepath) => fs.readFileSync(absFilepath, 'utf8');

const getObject = (filePath) => {
  const absFilePath = getFileAbsPath(filePath.toLowerCase());
  const extName = path.extname(filePath);
  const rawFile = readFile(absFilePath);
  return parseFile(rawFile, extName);
};

const states = {
  CREATED: 'created',
  DELETED: 'deleted',
  CHANGED: 'changed',
  UNCHANGED: 'unchanged',
};

const makeDiff = (propName, state, values, children = []) => {
  _.noop();
  const diffObject = {
    propName,
    state,
    values,
    children,
  };
  return diffObject;
};

const getState = (obj1, obj2, treePath) => {
  if (!_.has(obj1, treePath)) return states.CREATED;
  if (!_.has(obj2, treePath)) return states.DELETED;
  if (_.get(obj1, treePath) !== _.get(obj2, treePath)) return states.CHANGED;
  return states.UNCHANGED;
};

const makeDiffs = (obj1, obj2) => {
  const fullTree = _.merge({}, obj1, obj2);

  const differences = (tree = {}, treePath = []) => {
    const entries = Object.entries(tree).sort();
    const result = entries.reduce((acc, [treeKey, treeValue]) => {
      const currPath = [...treePath, treeKey];
      if (_.isPlainObject(treeValue)) {
        const state = states.UNCHANGED;
        const values = [undefined, undefined];
        acc.push(makeDiff(treeKey, state, values, differences(treeValue, currPath)));
      } else {
        const value1 = _.get(obj1, currPath);
        const value2 = _.get(obj2, currPath);
        const state = getState(obj1, obj2, currPath);
        const values = [value1, value2];
        acc.push(makeDiff(treeKey, state, values));
      }
      return acc;
    }, []);

    return result;
  };

  return differences(fullTree);
};

// #region output format (first version)
/*
const makeSigns = () => {
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

const formatAsText = (diffs) => {
  const signs = makeSigns();

  const diffStrings = diffs.reduce((acc, diff) => {
    const {
      value1, value2, state, property,
    } = diff;
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
*/
// #endregion

const genDiff = (filepath1, filepath2, options) => {
  if (filepath1 === undefined) throw new Error("error: missing required argument 'filepath1'");
  if (filepath2 === undefined) throw new Error("error: missing required argument 'filepath2'");
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const diffs = makeDiffs(obj1, obj2, options);
  console.log('--------------------------------');
  console.dir(diffs, { depth: null });
  // return formatAsText(diffs);
};

// genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
export default genDiff;
