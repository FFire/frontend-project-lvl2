// @ts-check

import formatJSON from './formatJSON.js';
import formatPlain from './formatPlain.js';
import formatStylish from './formatStylish.js';

const getFormatter = (format) => {
  switch (format) {
    case 'json': return formatJSON;
    case 'plain': return formatPlain;
    case 'stylish': return formatStylish;
    default:
      throw new Error(`Output format is undefined: '${format}'`);
  }
};

const formatDiffs = (diffs, format) => {
  const formatter = getFormatter(format);
  return formatter(diffs);
};

export default formatDiffs;
