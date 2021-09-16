// @ts-check

import _ from 'lodash';
import states from './states.js';

const makeDiffs = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  const result = keys.flatMap((key) => {
    if (!_.has(obj1, key)) {
      return {
        property: key,
        state: states.CREATED,
        value: obj2[key],
      };
    }
    if (!_.has(obj2, key)) {
      return {
        property: key,
        state: states.DELETED,
        value: obj1[key],
      };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        property: key,
        state: states.KEY,
        value: makeDiffs(obj1[key], obj2[key]),
      };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        property: key,
        state: states.CHANGED,
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }
    return {
      property: key,
      state: states.UNCHANGED,
      value: obj1[key],
    };
  });

  return result;
};

export default makeDiffs;
