import _ from 'lodash';

const c = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const d = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

const o1 = {
  a: false,
  b: 5,
  d: {
    aa: 11,
    ff: { fff: 1 },
    ee: {
      aaa: 111,
      ddd: {
        gggg: 1111,
      },
    },
  },
  g: { m: 1 },
};

const o2 = {
  a: true,
  d: {
    dd: 44,
    ff: { fff: 2 },
    ee: {
      aaa: 333,
      ccc: 777,
      ddd: {
        aaa: 333,
        bbb: {
          eeee: 444,
        },
      },
    },
  },
  f: { m: 1 },
  g: { m: 1 },
};
// object recursive dive
const deepKeys = (obj) => {
  const keys = _.keys(obj);
  const result = keys.flatMap((key) => {
    if (!_.isObject(obj[key])) return key;
    return [key, deepKeys(obj[key])];
  });
  return result;
};

const merge = (target, source) => {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  Object.keys(source).forEach((key) => {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], merge(target[key], source[key]));
    }
  });

  // Join `target` and modified `source`
  Object.assign(target || {}, source);
  return target;
};

// console.log(deepKeys(c));
// console.dir(_.merge({}, o1, o2), { depth: null });

const propsToArray = (obj = {}, objPath = []) => {
  _.noop();
  const result = Object
    .entries(obj)
    .reduce((acc, [key, value]) => {
      const currPath = [...objPath, key];
      if (_.isPlainObject(value)) {
        acc.push(...propsToArray(value, currPath));
      } else {
        acc.push(currPath);
      }
      return acc;
    }, []);
  return result;
};

console.dir(propsToArray(o1), { depth: null });
// const a = merge(o1, o2);
// console.dir(o1, { depth: null });
// console.dir(o2, { depth: null });
// console.dir(a, { depth: null });
