// @ts-check

import _ from 'lodash';
import * as df from '../diffsAPI.js';
import states from '../states.js';
/*
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
*/

const makePlainStr = (fullPath, state, values) => {
  const result = `${fullPath.join('.')} -- ${state} -- ${values}`;

  return result;
};

const formatPlain = (diffs) => {
  const result = diffs.reduce((acc, diff) => {
    const { fullPath, state, values } = diff;

    if (state !== states.UNCHANGED) {
      const formattedStr = makePlainStr(fullPath, state, values);
      acc.push(formattedStr);
    }

    if (df.hasChildren(diff)) {
      acc.push(...formatPlain(df.getChildren(diff)));
    }

    return acc;
  }, []);

  // console.log('🚀 > acc', result);
  return result;
};

export default formatPlain;
