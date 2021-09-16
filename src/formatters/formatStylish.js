// @ts-check

import _ from 'lodash';
import { testDiffs } from '../testObjects.js';
import states from '../states.js';

const getTabs = (depth) => {
  const tab = '    ';
  return `${tab.repeat(depth)}`;
};

const getTextState = (state) => {
  const textState = {};
  textState[states.CREATED] = '+';
  textState[states.DELETED] = '-';
  textState[states.UNCHANGED] = ' ';
  textState[states.CHANGED] = '-';
  textState[states.KEY] = ' ';
  return textState[state];
};

// const signs = makeSigns();

// const makeCloseString = (depth) => {
//   const closeBracket = '}';
//   const leftMargin = depth * tabSize + 1;
//   return `${_.padStart(closeBracket, leftMargin)}`;
// };

// const makeParentStr = (state, propName, depth, drawSign) => {
//   const openBracket = '{';
//   const sign = (drawSign === 'no')
//     ? signs[states.UNCHANGED]
//     : signs[state];
//   const leftMargin = depth * tabSize - 1;
//   const signStr = (depth > 0) ? `${_.padStart(sign, leftMargin)} ` : '';
//   const propNameStr = (depth > 0) ? `${propName}: ` : '';
//   return `${signStr}${propNameStr}${openBracket}`;
// };

// const makeChildStr = (state, propName, values, depth, drawSign) => {
//   const makeSignStr = (currState) => {
//     const sign = (drawSign === 'no')
//       ? signs[states.UNCHANGED]
//       : signs[currState];
//     const leftMargin = depth * tabSize - 1;
//     const signStr = `${_.padStart(sign, leftMargin)} `;
//     return signStr;
//   };

//   const formatString = (sign, property, value) => {
//     _.noop();
//     return `${sign}${property}: ${value}`;
//   };

//   const acc = [];
//   const [value1, value2] = values;
//   if (state === states.CREATED || state === states.UNCHANGED) {
//     const signStr = makeSignStr(state);
//     acc.push(formatString(signStr, propName, value2));
//   }
//   if ((state === states.DELETED || state === states.CHANGED) && !df.isObject(value1)) {
//     const signStr = makeSignStr(states.DELETED);
//     acc.push(formatString(signStr, propName, value1));
//   }
//   if (state === states.CHANGED) {
//     const signStr = makeSignStr(states.CREATED);
//     acc.push(formatString(signStr, propName, value2));
//   }

//   return acc;
// };
// {
//   common: {
//     + follow: false
//       setting1: Value 1
//     - setting2: 200
//     - setting3: true
//     + setting3: null
//     + setting4: blah blah
//     + setting5: {
//           key5: value5
//       }
//       setting6: {
//           doge: {
//             - wow:
//             + wow: so much
//           }
//           key: value
//         + ops: vops
//       }
//   }
//   group1: {
//     - baz: bas
//     + baz: bars
//       foo: bar
//     - nest: {
//           key: value
//       }
//     + nest: str
//   }
// - group2: {
//       abc: 12345
//       deep: {
//           id: 45
//       }
//   }
// + group3: {
//       deep: {
//           id: {
//               number: 45
//           }
//       }
//       fee: 100500
//   }
// }
const formatStylish = (diffs) => {
  const drawLines = (diff, depth = 0) => {
    const acc = diff.map((item) => {
      const { property, state, value } = item;
      _.noop();
      console.log(item);
      if (state === states.CREATED || state === states.DELETED || state === states.UNCHANGED) {
        return `${getTabs(depth)}${getTextState(state)} ${property}: ${value}`;
      }
      if (state === states.CHANGED) {
        return `${getTabs(depth)}${getTextState(states.DELETED)} ${property}: ${value}\n${getTabs(depth)}${getTextState(states.CREATED)} ${property}: ${value}`;
      }
      if (state === states.KEY) {
        return `${getTabs(depth)}${getTextState(state)} ${property}: ${drawLines(value, depth + 1)}`;
      }

      return '';
    });
    return acc;
  };
  return drawLines(diffs);
};

export default formatStylish;
console.log(formatStylish(testDiffs));
