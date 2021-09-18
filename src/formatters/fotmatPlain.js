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

const formatPlain = (diffs) => {
  const renderProps = (diff, path = []) => diff
    .filter((item) => item.state !== states.UNCHANGED)
    .map((item) => {
      const {
        property, state, value, oldValue, newValue,
      } = item;
      const currPath = [...path, property];

      if (state === states.DELETED) {
        return `${renderPath(currPath)}${renderState(state)}`;
      }
      if (state === states.CREATED) {
        return `${renderPath(currPath)}${renderState(state)}${renderValue(value)}`;
      }
      if (state === states.CHANGED) {
        return `${renderPath(currPath)}${renderState(state)} From${renderValue(oldValue)} to${renderValue(newValue)}`;
      }
      if (state === states.KEY) {
        return renderProps(value, currPath);
      }
      return '';
    })
    .join('\n');

  return renderProps(diffs);
};

export default formatPlain;
// const out = formatPlain(testDiffs);
// console.log(out);
