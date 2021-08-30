import yaml from 'js-yaml';

const parseFile = (rawFile, extName) => {
  if (['.yaml', '.yml'].includes((extName))) {
    return yaml.load(rawFile);
  }

  return JSON.parse(rawFile);
};

export default parseFile;
