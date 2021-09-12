// @ts-check

import _ from 'lodash';
import * as df from '../diffsAPI.js';
import states from '../states.js';

const tabSize = 4;

const makeSigns = () => {
  const signs = {};
  signs[states.CREATED] = '+';
  signs[states.DELETED] = '-';
  signs[states.UNCHANGED] = ' ';
  signs[states.CHANGED] = '-';
  return signs;
};

const signs = makeSigns();

const makeCloseString = (depth) => {
  const closeBracket = '}';
  const leftMargin = depth * tabSize + 1;
  // todo remove backtickle
  return `${_.padStart(closeBracket, leftMargin)}`;
};

const makeParentStr = (state, propName, depth, drawSign) => {
  const openBracket = '{';
  const sign = (drawSign === 'no')
    ? signs[states.UNCHANGED]
    : signs[state];
  const leftMargin = depth * tabSize - 1;
  const signStr = (depth > 0) ? `${_.padStart(sign, leftMargin)} ` : '';
  const propNameStr = (depth > 0) ? `${propName}: ` : '';
  // todo remove backtickle
  return `${signStr}${propNameStr}${openBracket}`;
};

const makeChildStr = (state, propName, values, depth, drawSign) => {
  const makeSignStr = (currState) => {
    const sign = (drawSign === 'no')
      ? signs[states.UNCHANGED]
      : signs[currState];
    const leftMargin = depth * tabSize - 1;
    // todo remove backtickle
    const signStr = `${_.padStart(sign, leftMargin)} `;
    return signStr;
  };

  const formatString = (sign, property, value) => {
    _.noop();
    return `${sign}${property}: ${value}`;
  };

  const acc = [];
  const [value1, value2] = values;
  if (state === states.CREATED || state === states.UNCHANGED) {
    const signStr = makeSignStr(state);
    acc.push(formatString(signStr, propName, value2));
  }
  if ((state === states.DELETED || state === states.CHANGED) && !df.isObject(value1)) {
    const signStr = makeSignStr(states.DELETED);
    acc.push(formatString(signStr, propName, value1));
  }
  if (state === states.CHANGED) {
    const signStr = makeSignStr(states.CREATED);
    acc.push(formatString(signStr, propName, value2));
  }

  return acc;
};

const formatStylish = (diffs, drawSign = 'yes') => {
  const result = diffs.reduce((acc, diff) => {
    const diffHasChildren = df.hasChildren(diff);
    const {
      propName, state, values, depth,
    } = diff;
    const [, value2] = values;
    const nextDrawSign = (state !== states.UNCHANGED || drawSign !== 'yes') ? 'no' : 'yes';

    if (diffHasChildren) {
      acc.push(makeParentStr(state, propName, depth, drawSign));
      acc.push(formatStylish(df.getChildren(diff), nextDrawSign));
      acc.push(makeCloseString(depth));
      if (!df.isObject(value2) && state === states.CHANGED) {
        acc.push(...makeChildStr(state, propName, values, depth, drawSign));
      }
    } else {
      acc.push(...makeChildStr(state, propName, values, depth, drawSign));
    }
    return _.flattenDeep(acc);
  }, []);

  return result.join('\n');
};

export default formatStylish;
