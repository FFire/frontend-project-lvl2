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

  const lines = _.keys(value).map((key) => [
    renderTabs(depth + 1), key, ': ', renderValue(value[key], depth + 1),
  ].join(''));

  return [
    '{\n', lines.join('\n'), '\n', renderTabs(depth), '}',
  ].join('');
};

const renderCommon = (depth, type, property, value) => [
  '\n', renderTabs(depth), renderType(type), property,
  ': ', renderValue(value, depth + 1),
].join('');

const renderChanged = (depth, property, oldValue, newValue) => [
  '\n', renderTabs(depth), renderType(types.DELETED), property,
  ': ', renderValue(oldValue, depth + 1),
  '\n', renderTabs(depth), renderType(types.CREATED), property,
  ': ', renderValue(newValue, depth + 1),
].join('');

const renderKey = (depth, property, values) => [
  '\n', renderTabs(depth), property,
  ': {', ...values, '\n', renderTabs(depth), '}',
].join('');

const renderLines = (item, depth, iter) => {
  const { property, type, value } = item;

  switch (type) { // ?
    case types.DELETED:
    case types.CREATED:
    case types.UNCHANGED:
      return renderCommon(depth, type, property, value);

    case types.CHANGED: {
      const { oldValue, newValue } = item;
      return renderChanged(depth, property, oldValue, newValue);
    }

    case types.KEY:
      return renderKey(depth + 1, property, iter(value, depth + 1));

    default:
      throw new Error(`Type is undefined: '${type}'`);
  }
};

const formatStylish = (diffs) => {
  const iter = (diff, depth = 0) => diff
    .map((item) => renderLines(item, depth, iter))
    .join('');

  return ['{', iter(diffs), '\n}'].join('');
};

export default formatStylish;
// const out = formatStylish(testDiffs);
// console.log(out);
