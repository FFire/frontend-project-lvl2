import formatJSON from './formatJSON.js';
import formatStylish from './formatStylish.js';
import formatPlain from './fotmatPlain.js';

const getFormatter = (option) => {
  if (option === 'plain') return formatPlain;
  if (option === 'json') return formatJSON;
  return formatStylish;
};

export default getFormatter;
