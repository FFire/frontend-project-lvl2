// @ts-check

import _ from 'lodash';
import { getChildren, hasChildren } from './diffsAPI.js';
import states from './states.js';

const tabSize = 4;

const makeSigns = () => {
  const signs = {};
  signs[states.CREATED] = '+';
  signs[states.DELETED] = '-';
  signs[states.UNCHANGED] = ' ';
  signs[states.CHANGED] = ' ';
  return signs;
};

const signs = makeSigns();

// const zeroPad = (num, places) => String(num).padStart(places, ' ');
const makeCloseString = (depth) => {
  const closeBracket = '}';
  const leftMargin = depth * tabSize + 1;
  return `${_.padStart(closeBracket, leftMargin)}`;
};

const makeParentStr = (state, propName, depth) => {
  const openBracket = '{';
  const sign = signs[state];
  const leftMargin = depth * tabSize - 1;
  const signStr = (depth > 0) ? `${_.padStart(sign, leftMargin)} ` : '';
  const propNameStr = (depth > 0) ? `${propName}: ` : '';
  return `${signStr}${propNameStr}${openBracket}`;
};

const makeChildStr = (state, propName, values, depth) => {
  const makeSignStr = (currState) => {
    const sign = signs[currState];
    const leftMargin = depth * tabSize - 1;
    const signStr = `${_.padStart(sign, leftMargin)} `;
    return signStr;
  };
  const acc = [];
  const [value1, value2] = values;
  // const signStr = makeSignStr();
  if (state === states.CREATED || state === states.UNCHANGED) {
    const signStr = makeSignStr(state);
    acc.push(`${signStr}${propName}: ${value2}`);
    // acc.push(diffToString(sign, property, value2));
  }
  if (state === states.DELETED || state === states.CHANGED) {
    const signStr = makeSignStr(states.DELETED);
    acc.push(`${signStr}${propName}: ${value1}`);
    // const sign = signs[states.DELETED];
    // acc.push(diffToString(sign, property, value1));
  }
  if (state === states.CHANGED) {
    const signStr = makeSignStr(states.CREATED);
    acc.push(`${signStr}${propName}: ${value2}`);
    // const sign = signs[states.CREATED];
    // acc.push(diffToString(sign, property, value2));
  }

  return acc;
};

const formatStylish = (diffs) => {
  const result = diffs.reduce((acc, diff) => {
    const diffHasChildren = hasChildren(diff);
    const {
      propName, state, values, depth,
    } = diff;

    if (diffHasChildren) {
      const formattedString = makeParentStr(state, propName, depth);
      acc.push(formattedString);
      acc.push(formatStylish(getChildren(diff)));
      acc.push(makeCloseString(depth));
    } else {
      acc.push(...makeChildStr(state, propName, values, depth));
    }
    return _.flattenDeep(acc);
  }, []);

  return result.join('\n');
};

export default formatStylish;
