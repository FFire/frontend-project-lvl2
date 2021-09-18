// @ts-check

import _ from 'lodash';
import states from '../states.js';
// import { testDiffs } from '../testObjects.js';

const renderPath = (path) => `Property '${path.join('.')}'`;

const renderState = (state) => {
  switch (state) {
    case states.DELETED: return ' was removed';
    case states.CREATED: return ' was added with value:';
    case states.UNCHANGED: return '';
    case states.CHANGED: return ' was updated.';
    case states.KEY: return '';
    default: return '';
  }
};

const renderValue = (value) => {
  if (_.isString(value)) return ` '${value}'`;
  if (_.isPlainObject(value)) return ' [complex value]';
  return ` ${value}`;
};

const renderLines = (item, path, renderProps) => {
  const { property, state, value } = item;
  const currPath = [...path, property];
  switch (state) {
    case states.DELETED:
      return [renderPath(currPath), renderState(state)].join('');

    case states.CREATED:
      return [renderPath(currPath), renderState(state), renderValue(value)].join('');

    case states.CHANGED: {
      const { oldValue, newValue } = item;
      return [
        renderPath(currPath), renderState(state), ' From',
        renderValue(oldValue), ' to', renderValue(newValue),
      ].join('');
    }

    case states.KEY:
      return renderProps(value, currPath);

    default:
      throw new Error(`State is undefined: '${state}'`);
  }
};

const formatPlain = (diffs) => {
  const iter = (diff, path = []) => diff
    .filter((item) => item.state !== states.UNCHANGED)
    .map((item) => renderLines(item, path, iter))
    .join('\n');

  return iter(diffs);
};

export default formatPlain;

// const out = formatPlain(testDiffs);
// console.log(out);
