import _ from 'lodash';
import states from './states.js';

export const emptyValues = [undefined, undefined];

export const makeDiff = (propName, children = [], fullPath = '', state = states.UNCHANGED, values = emptyValues, depth = 0) => {
  const diffObject = {
    propName,
    fullPath,
    state,
    values,
    depth,
    children,
  };
  return diffObject;
};

export const hasChildren = (diff) => (diff.children.length > 0)

export const getChildren = (diff) => diff.children;

export const getValue = (diff, path) => _.get(diff, path);

export const hasPath = (diff, path) => _.has(diff, path)

export const getType = (diff) => typeof (diff);

export const isObject = (diff) => _.isPlainObject(diff);

