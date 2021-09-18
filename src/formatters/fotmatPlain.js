// @ts-check

import _ from 'lodash';
import states from '../states.js';
import { testDiffs } from '../testObjects.js';

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

// Property 'common.follow' was added with value: false
// Property 'common.setting2' was removed
// Property 'common.setting3' was updated. From true to null
// Property 'common.setting4' was added with value: 'blah blah'
// Property 'common.setting5' was added with value: [complex value]
// Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
// Property 'common.setting6.ops' was added with value: 'vops'
// Property 'group1.baz' was updated. From 'bas' to 'bars'
// Property 'group1.nest' was updated. From [complex value] to 'str'
// Property 'group2' was removed
// Property 'group3' was added with value: [complex value]

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
const out = formatPlain(testDiffs);
console.log(out);
