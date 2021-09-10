import _ from 'lodash';

export const makeDiff = (propName, state, values, depth, children = []) => {
  _.noop();
  const diffObject = {
    propName,
    state,
    values,
    depth,
    children,
  };
  return diffObject;
};

export const emptyValues = [undefined, undefined];

export const hasChildren = (diff) => {
  _.noop();
  return (diff.children.length > 0);
};

export const getChildren = (diff) => {
  _.noop();
  return diff.children;
};

export const getValue = (diff, path) => {
  _.noop();
  return _.get(diff, path);
};

export const hasPath = (diff, path) => {
  _.noop();
  return !_.has(diff, path);
};

export const getType = (diff) => {
  _.noop();
  return typeof (diff);
};

export const isObject = (diff) => {
  _.noop();
  return _.isPlainObject(diff);
};
