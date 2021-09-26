// @ts-check

import _ from 'lodash';
import types from '../nodeTypes.js';
// import { testDiffs } from '../../__fixtures__/testObjects.js';

const renderType = (type) => {
  switch (type) {
    case types.DELETED: return '  - ';
    case types.CREATED: return '  + ';
    case types.UNCHANGED: return '    ';
    default: throw new Error(`Type is undefined: '${type}'`);
  }
};

const renderTabs = (depth) => {
  const tabSize = 4;
  return ' '.repeat(tabSize).repeat(depth);
};

const renderValue = (value, depth = 0) => {
  if (!_.isObject(value)) return String(value);

  const lines = _.keys(value).map((key) => {
    const partKey = `${renderTabs(depth + 1)}${key}: `;
    const partValue = `${renderValue(value[key], depth + 1)}`;
    return `${partKey}${partValue}`;
  });

  return `{\n${lines.join('\n')}\n${renderTabs(depth)}}`;
};

const formatStylish = (diffs) => {
  const iter = (diff, depth = 0) => diff
    .map((item) => {
      const { type } = item;

      switch (type) {
        case types.DELETED:
        case types.CREATED:
        case types.UNCHANGED: {
          const { property, value } = item;
          return `${renderTabs(depth)}${renderType(type)}${property}: ${renderValue(value, depth + 1)}`;
        }
        case types.CHANGED: {
          const { property, oldValue, newValue } = item;
          const partDeleted = `${renderTabs(depth)}${renderType(types.DELETED)}${property}: ${renderValue(oldValue, depth + 1)}`;
          const partCreated = `\n${renderTabs(depth)}${renderType(types.CREATED)}${property}: ${renderValue(newValue, depth + 1)}`;
          return `${partDeleted}${partCreated}`;
        }

        case types.NESTED: {
          const { property, children } = item;
          return `${renderTabs(depth + 1)}${property}: {\n${iter(children, depth + 1)}\n${renderTabs(depth + 1)}}`;
        }
        default:
          throw new Error(`Type is undefined: '${type}'`);
      }
    })
    .join('\n');

  return `{\n${iter(diffs)}\n}`;
};

export default formatStylish;
// const out = formatStylish(testDiffs);
// console.log(out);
