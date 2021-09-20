// @ts-check

import _ from 'lodash';
import nodeTypes from './nodeTypes.js';

const makeDiffs = (object1, object2) => {
  const iter = (obj1, obj2) => {
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    const nodes = keys.map((key) => {
      if (!_.has(obj1, key)) {
        return {
          property: key,
          state: nodeTypes.CREATED,
          value: obj2[key],
        };
      }
      if (!_.has(obj2, key)) {
        return {
          property: key,
          state: nodeTypes.DELETED,
          value: obj1[key],
        };
      }
      if (_.isPlainObject(obj1[key])
        && _.isPlainObject(obj2[key])) {
        return {
          property: key,
          state: nodeTypes.KEY,
          value: iter(obj1[key], obj2[key]),
        };
      }
      if (!_.isEqual(obj1[key], obj2[key])) {
        return {
          property: key,
          state: nodeTypes.CHANGED,
          oldValue: obj1[key],
          newValue: obj2[key],
        };
      }
      return {
        property: key,
        state: nodeTypes.UNCHANGED,
        value: obj1[key],
      };
    });

    return _.sortBy(nodes, (item) => item.property);
  };

  return iter(object1, object2);
};

export default makeDiffs;
