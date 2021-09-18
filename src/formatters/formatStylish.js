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

  const lines = _.keys(value).map((key) => [
    getTabs(depth + 1), key, ': ', renderValue(value[key], depth + 1),
  ].join(''));

  return [
    '{\n', lines.join('\n'), '\n', getTabs(depth), '}',
  ].join('');
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

const renderLines = (item, depth, renderProps) => {
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
      return renderKey(depth + 1, property, renderProps(value, depth + 1));

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

// const formatStylish = (diffs) => {
//   const renderProps = (diff, depth = 0) => diff
//     .map((item) => {
//       const { property, state, value } = item;

//       switch (state) {
//         case states.CREATED:
//         case states.DELETED:
//         case states.UNCHANGED:
//           return renderCommon(depth, state, property, value);

//         case states.CHANGED: {
//           const { oldValue, newValue } = item;
//           return renderChanged(depth, property, oldValue, newValue);
//         }

//         case states.KEY:
//           return renderKey(depth + 1, property, renderProps(value, depth + 1));

//         default: throw new Error(`State is undefined: '${state}'`);
//       }
//     })
//     .join('');

//   return ['{', renderProps(diffs), '\n}'].join('');
// };

export default formatStylish;
// const out = formatStylish(testDiffs);
// console.log(out);
