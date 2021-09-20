// @ts-check

import _ from 'lodash';
import types from '../nodeTypes.js';
// import { testDiffs } from '../testObjects.js';

const renderPath = (path) => `Property '${path.join('.')}'`;

const renderType = (type) => {
  switch (type) {
    case types.DELETED: return ' was removed';
    case types.CREATED: return ' was added with value:';
    case types.CHANGED: return ' was updated.';
    default: throw new Error(`Type is undefined: '${type}'`);
  }
};

const renderValue = (value) => {
  if (_.isString(value)) return ` '${value}'`;
  if (_.isPlainObject(value)) return ' [complex value]';
  return ` ${value}`;
};

const renderLines = (item, path, iter) => {
  const { property, type, value } = item;
  const currPath = [...path, property];

  switch (type) {
    case types.DELETED:
      return `${renderPath(currPath)}${renderType(type)}`;

    case types.CREATED:
      return `${renderPath(currPath)}${renderType(type)}${renderValue(value)}`;

    case types.CHANGED: {
      const { oldValue, newValue } = item;

      const strBefore = `${renderPath(currPath)}${renderType(type)} From`;
      const strAfter = `${renderValue(oldValue)} to${renderValue(newValue)}`;
      return `${strBefore}${strAfter}`;
    }

    case types.KEY:
      return iter(value, currPath);

    default:
      throw new Error(`Type is undefined: '${type}'`);
  }
};

const formatPlain = (diffs) => {
  const iter = (diff, path = []) => diff
    .filter((item) => item.type !== types.UNCHANGED)
    .map((item) => renderLines(item, path, iter))
    .join('\n');

  return iter(diffs);
};

export default formatPlain;

// const out = formatPlain(testDiffs);
// console.log(out);
