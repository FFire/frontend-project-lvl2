// @ts-check

import _ from 'lodash';
import states from './states.js';

const makeNode = (property, state, value1, value2) => {
  if (value2 === undefined) {
    return { property, state, value: value1 };
  }
  return {
    property, state, oldValue: value1, newValue: value2,
  };
};
const makeNodes = (key, obj1, obj2, iter) => {
  if (!_.has(obj1, key)) return makeNode(key, states.CREATED, obj2[key]);
  if (!_.has(obj2, key)) return makeNode(key, states.DELETED, obj1[key]);
  if (_.isPlainObject(obj1[key])) {
    if (_.isPlainObject(obj2[key])) {
      return makeNode(key, states.KEY, iter(obj1[key], obj2[key]));
    }
  }
  if (!_.isEqual(obj1[key], obj2[key])) return makeNode(key, states.CHANGED, obj1[key], obj2[key]);
  return makeNode(key, states.UNCHANGED, obj1[key]);
};

const makeDiffs = (object1, object2) => {
  const iter = (obj1, obj2) => {
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    const nodes = keys.flatMap((key) => makeNodes(key, obj1, obj2, iter));

    return _.sortBy(nodes, (item) => item.property);
  };

  return iter(object1, object2);
};

export default makeDiffs;
