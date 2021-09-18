export const testObj1 = {
  cmn: {
    s1: 'Value 1',
    s2: 200,
    s3: true,
    s6: {
      k: 'value',
      d: {
        w: '',
      },
    },
  },
  g1: {
    b: 'bas',
    f: 'bar',
    n: {
      k: 'value',
    },
  },
  g2: {
    abc: 12345,
    d: {
      id: 45,
    },
  },
};

export const testObj2 = {
  cmn: {
    follow: false,
    s1: 'Value 1',
    s3: null,
    s4: 'blah blah',
    s5: {
      k5: 'value5',
    },
    s6: {
      k: 'value',
      o: 'vops',
      d: {
        w: 'so much',
      },
    },
  },
  g1: {
    f: 'bar',
    b: 'bars',
    n: 'str',
  },
  g3: {
    d: {
      id: {
        nbr: 45,
      },
    },
    fee: 100500,
  },
};

export const testDiffs = [
  {
    property: 'common',
    state: 'key',
    value: [
      { property: 'follow', state: 'created', value: false },
      { property: 'setting1', state: 'unchanged', value: 'Value 1' },
      { property: 'setting2', state: 'deleted', value: 200 },
      {
        property: 'setting3',
        state: 'changed',
        oldValue: true,
        newValue: null,
      },
      { property: 'setting4', state: 'created', value: 'blah blah' },
      {
        property: 'setting5',
        state: 'created',
        value: { key5: 'value5' },
      },
      {
        property: 'setting6',
        state: 'key',
        value: [
          {
            property: 'doge',
            state: 'key',
            value: [
              {
                property: 'wow',
                state: 'changed',
                oldValue: '',
                newValue: 'so much',
              },
            ],
          },
          { property: 'key', state: 'unchanged', value: 'value' },
          { property: 'ops', state: 'created', value: 'vops' },
        ],
      },
    ],
  },
  {
    property: 'group1',
    state: 'key',
    value: [
      {
        property: 'baz',
        state: 'changed',
        oldValue: 'bas',
        newValue: 'bars',
      },
      { property: 'foo', state: 'unchanged', value: 'bar' },
      {
        property: 'nest',
        state: 'changed',
        oldValue: { key: 'value' },
        newValue: 'str',
      },
    ],
  },
  {
    property: 'group2',
    state: 'deleted',
    value: { abc: 12345, deep: { id: 45 } },
  },
  {
    property: 'group3',
    state: 'created',
    value: { deep: { id: { number: 45 } }, fee: 100500 },
  },
];
