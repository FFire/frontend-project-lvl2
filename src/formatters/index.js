import formatStylish from './formatStylish.js';
import formatPlain from './fotmatPlain.js';

const getFormatter = (option) => {
  if (option === 'plain') return formatPlain;
  return formatStylish;
};

export default getFormatter;
