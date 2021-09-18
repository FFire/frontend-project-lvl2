// @ts-check

import _ from 'lodash';
import states from '../states.js';
// import { testDiffs } from '../testObjects.js';

const textState = (state) => {
  switch (state) {
    case states.CREATED: return '  + ';
    case states.DELETED: return '  - ';
    case states.UNCHANGED: return '    ';
    case states.CHANGED: return '  - ';
    case states.KEY: return '    ';

    default: return '';
  }
};

const getTabs = (depth) => '    '.repeat(depth);

const renderValue = (value, depth = 0) => {
  if (!_.isObject(value)) return String(value);

  const lines = _.keys(value).map((key) => {
    _.noop();
    return `${getTabs(depth + 1)}${key}: ${renderValue(value[key], depth + 1)}`;
  });

  return `{\n${lines.join('\n')}\n${getTabs(depth)}}`;
};

const renderCommon = (depth, state, property, value) => [
  '\n', getTabs(depth), textState(state), property,
  ': ', renderValue(value, depth + 1),
].join('');

const renderChanged = (depth, property, oldValue, newValue) => [
  '\n', getTabs(depth), textState(states.DELETED), property,
  ': ', renderValue(oldValue, depth + 1),
  '\n', getTabs(depth), textState(states.CREATED), property,
  ': ', renderValue(newValue, depth + 1),
].join('');

const renderKey = (depth, property, values) => [
  '\n', getTabs(depth), property,
  ': {', ...values, '\n', getTabs(depth), '}',
].join('');

const formatStylish = (diffs) => {
  const renderProps = (diff, depth = 0) => diff.map((item) => {
    const {
      property, state, value, oldValue, newValue,
    } = item;

    if (state === states.CREATED || state === states.DELETED || state === states.UNCHANGED) {
      return renderCommon(depth, state, property, value);
    }
    if (state === states.CHANGED) {
      return renderChanged(depth, property, oldValue, newValue);
    }
    if (state === states.KEY) {
      return renderKey(depth + 1, property, renderProps(value, depth + 1));
    }

    return '';
  });

  const lines = renderProps(diffs).join('');
  return `{${lines}\n}`;
};

export default formatStylish;
// const out = formatStylish(testDiffs);
// console.log(out);
