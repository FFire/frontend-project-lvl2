// @ts-check

import formatJSON from './formatJSON.js';
import formatPlain from './fotmatPlain.js';
import formatStylish from './formatStylish.js';

const getFormatter = (format) => {
  switch (format) {
    case 'json':
      return formatJSON;

    case 'plain':
      return formatPlain;

    default:
      return formatStylish;
  }
};

export default getFormatter;
