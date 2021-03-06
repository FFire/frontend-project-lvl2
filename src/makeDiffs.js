// @ts-check

import _ from 'lodash';
import types from './nodeTypes.js';

const makeDiffs = (obj1, obj2) => {
  const unsortedKeys = _.union(_.keys(obj1), _.keys(obj2));
  const keys = _.sortBy(unsortedKeys);
  const nodes = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        property: key,
        type: types.CREATED,
        value: obj2[key],
      };
    }
    if (!_.has(obj2, key)) {
      return {
        property: key,
        type: types.DELETED,
        value: obj1[key],
      };
    }
    if (_.isPlainObject(obj1[key])
      && _.isPlainObject(obj2[key])) {
      return {
        property: key,
        type: types.NESTED,
        children: makeDiffs(obj1[key], obj2[key]),
      };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        property: key,
        type: types.CHANGED,
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }
    return {
      property: key,
      type: types.UNCHANGED,
      value: obj1[key],
    };
  });

  return nodes;
};

export default makeDiffs;
