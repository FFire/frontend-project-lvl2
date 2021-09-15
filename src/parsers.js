import yaml from 'js-yaml';

const parseFile = (rawFile, extName) => {
  switch (extName) {
    case '.json': return JSON.parse(rawFile);
    case '.yaml': return yaml.load(rawFile);
    case '.yml': return yaml.load(rawFile);

    default: throw new Error(`File type is undefined: '${extName}'`);
  }
};

export default parseFile;
