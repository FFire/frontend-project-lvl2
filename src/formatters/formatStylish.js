// @ts-check

import _ from 'lodash';
import states from '../nodeTypes.js';
// import { testDiffs } from '../testObjects.js';

const renderState = (state) => {
  switch (state) {
    case states.DELETED: return '  - ';
    case states.CREATED: return '  + ';
    case states.UNCHANGED: return '    ';
    default: throw new Error(`State is undefined: '${state}'`);
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

const renderCommon = (depth, state, property, value) => [
  '\n', renderTabs(depth), renderState(state), property,
  ': ', renderValue(value, depth + 1),
].join('');

const renderChanged = (depth, property, oldValue, newValue) => [
  '\n', renderTabs(depth), renderState(states.DELETED), property,
  ': ', renderValue(oldValue, depth + 1),
  '\n', renderTabs(depth), renderState(states.CREATED), property,
  ': ', renderValue(newValue, depth + 1),
].join('');

const renderKey = (depth, property, values) => [
  '\n', renderTabs(depth), property,
  ': {', ...values, '\n', renderTabs(depth), '}',
].join('');

const renderLines = (item, depth, iter) => {
  const { property, state, value } = item;

  switch (state) {
    case states.DELETED:
    case states.CREATED:
    case states.UNCHANGED:
      return renderCommon(depth, state, property, value);

    case states.CHANGED: {
      const { oldValue, newValue } = item;
      return renderChanged(depth, property, oldValue, newValue);
    }

    case states.KEY:
      return renderKey(depth + 1, property, iter(value, depth + 1));

    default:
      throw new Error(`State is undefined: '${state}'`);
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
