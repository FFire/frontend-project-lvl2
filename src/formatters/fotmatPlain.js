// @ts-check

import _ from 'lodash';
import states from '../states.js';

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
  const renderProps = (diff, path = []) => diff.reduce((lines, item) => {
    if (item.state === states.UNCHANGED) return lines;
    const {
      property, state, value, oldValue, newValue,
    } = item;
    const currPath = [...path, property];
    const lineParts = [
      renderPath(currPath), renderState(state),
    ];

    if (state === states.DELETED) {
      lines.push(lineParts.join(''));
    } else if (state === states.CREATED) {
      lineParts.push(renderValue(value));
      lines.push(lineParts.join(''));
    } else if (state === states.CHANGED) {
      lineParts.push(' From', renderValue(oldValue));
      lineParts.push(' to', renderValue(newValue));
      lines.push(lineParts.join(''));
    } else if (state === states.KEY) {
      lines.push(renderProps(value, currPath));
    }

    return _.flattenDeep(lines);
  }, []);

  return renderProps(diffs).join('\n');
};

export default formatPlain;
