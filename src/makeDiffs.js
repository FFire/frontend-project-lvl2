import _ from 'lodash';
import states from './states.js';
import * as df from './diffsAPI.js';

const getState = (obj1, obj2, treePath) => {
  const value1 = df.getValue(obj1, treePath);
  const value2 = df.getValue(obj2, treePath);
  if (!df.hasPath(obj1, treePath)) { return states.CREATED; }
  if (!df.hasPath(obj2, treePath)) { return states.DELETED; }
  if (df.isObject(value1) && df.isObject(value2)) { return states.UNCHANGED; }
  if (df.isObject(value1) && !df.isObject(value2)) { return states.CHANGED; }
  if (value1 !== value2) { return states.CHANGED; }
  return states.UNCHANGED;
};

const makeDiffs = (obj1, obj2) => {
  const fullTree = _.defaultsDeep({}, obj1, obj2);

  const differences = (tree = {}, treePath = []) => {
    const entries = Object.entries(tree).sort();
    const result = entries.reduce((acc, [treeKey, treeValue]) => {
      const currPath = [...treePath, treeKey];
      const depth = currPath.length;
      const value1 = df.getValue(obj1, currPath);
      const value2 = df.getValue(obj2, currPath);
      const values = [value1, value2];
      const state = getState(obj1, obj2, currPath);
      if (df.isObject(treeValue)) {
        acc.push(
          df.makeDiff(treeKey, differences(treeValue, currPath), currPath, state, values, depth),
        );
      } else {
        acc.push(df.makeDiff(treeKey, [], currPath, state, values, depth));
      }
      return acc;
    }, []);

    return result;
  };

  const result = df.makeDiff('root', differences(fullTree));
  return [result];
};

export default makeDiffs;