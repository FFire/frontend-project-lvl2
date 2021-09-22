// @ts-check

import yaml from 'js-yaml';

const parseData = (rawFile, dataType) => {
  switch (dataType) {
    case '.json':
      return JSON.parse(rawFile);

    case '.yaml':
    case '.yml':
      return yaml.load(rawFile);

    default: throw new Error(`File type is undefined: '${dataType}'`);
  }
};

export default parseData;
