// @ts-check

import _ from 'lodash';

const formatJSON = (diffs) => {
  _.noop(diffs);
  // const result = 'test JSON output';
  const result = JSON.stringify(diffs);

  return result;
};

export default formatJSON;
