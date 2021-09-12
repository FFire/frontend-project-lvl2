// @ts-check

import _ from 'lodash';
import * as df from '../diffsAPI.js';
import states from '../states.js';

const makeTextPath = (fullPath) => {
  const path = `Property '${fullPath.join('.')}'`;
  return path;
};

const makeTextState = (state) => {
  const textState = {};
  textState[states.DELETED] = ' was removed';
  textState[states.CREATED] = ' was added with value:';
  textState[states.UNCHANGED] = '';
  textState[states.CHANGED] = ' was updated.';
  return textState[state];
};

const formatValue = (value) => {
  if (_.isString(value)) return `'${value}'`;
  if (_.isPlainObject(value)) return '[complex value]';

  return value;
};

const makeTextValues = (values, state) => {
  const [value1, value2] = values;

  switch (state) {
    case states.CHANGED:
      return ` From ${formatValue(value1)} to ${formatValue(value2)}`;

    case states.CREATED:
      return ` ${formatValue(value2)}`;

    default:
      return '';
  }
};

const makePlainStr = (fullPath, state, values) => {
  const textPath = makeTextPath(fullPath);
  const textState = makeTextState(state);
  const textValues = makeTextValues(values, state);

  return `${textPath}${textState}${textValues}`;
};

const formatPlain = (diffs) => {
  const result = diffs.reduce((acc, diff) => {
    const { fullPath, state, values } = diff;
    const isChangedDiff = (state !== states.UNCHANGED);
    const diffHasChildren = df.hasChildren(diff);

    if (isChangedDiff) {
      const formattedStr = makePlainStr(fullPath, state, values);
      acc.push(formattedStr);
    }

    if (diffHasChildren && !isChangedDiff) {
      acc.push(formatPlain(df.getChildren(diff)));
    }

    return _.flattenDeep(acc);
  }, []);

  return result.join('\n');
};

export default formatPlain;
