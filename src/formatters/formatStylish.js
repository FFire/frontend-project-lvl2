// @ts-check

import _ from 'lodash';
import types from '../nodeTypes.js';
// import { testDiffs } from '../testObjects.js';

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
    _.noop();
    return `${renderTabs(depth + 1)}${key}: ${renderValue(value[key], depth + 1)}`;
  });

  return `{\n${lines.join('\n')}\n${renderTabs(depth)}}`;
};

const formatStylish = (diffs) => {
  const iter = (diff, depth = 0) => diff
    .map((item) => {
      const { property, type, value } = item;

      switch (type) {
        case types.DELETED:
        case types.CREATED:
        case types.UNCHANGED:
          return `\n${renderTabs(depth)}${renderType(type)}${property}: ${renderValue(value, depth + 1)}`;

        case types.CHANGED: {
          const { oldValue, newValue } = item;
          const strBefore = `\n${renderTabs(depth)}${renderType(types.DELETED)}${property}: ${renderValue(oldValue, depth + 1)}`;
          const strAfter = `\n${renderTabs(depth)}${renderType(types.CREATED)}${property}: ${renderValue(newValue, depth + 1)}`;
          return `${strBefore}${strAfter}`;
        }

        case types.KEY:
          return `\n${renderTabs(depth + 1)}${property}: {${iter(value, depth + 1)}\n${renderTabs(depth + 1)}}`;

        default:
          throw new Error(`Type is undefined: '${type}'`);
      }
    })
    .join('');

  return `{${iter(diffs)}\n}`;
};

export default formatStylish;
// const out = formatStylish(testDiffs);
// console.log(out);
