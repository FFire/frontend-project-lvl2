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

export const hasChildren = (diff) => {
  _.noop();
  return (diff.children.length > 0);
};

export const getChildren = (diff) => {
  _.noop();
  return diff.children;
};
