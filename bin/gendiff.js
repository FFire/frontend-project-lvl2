#!/usr/bin/env node

import { Command } from 'commander';
import mainAction from '../src/mainAction.js';

const program = new Command();

// const genDiff = (filepath1, filepath2) => {
//   const fileFromDisk1 = getFileFromDisk(filepath1);
//   const fileFromDisk2 = getFileFromDisk(filepath2);
//   const data1 = JSON.parse(fileFromDisk1);
//   const data2 = JSON.parse(fileFromDisk2);
//   const keys1 = _.keys(data1);
//   const keys2 = _.keys(data2);
//   const keys = _.union(keys1, keys2).sort();

//   // todo make main diff
//   const sign = { added: '  + ', deleted: '  - ', unchanged: '    ' };

//   const diff = keys.reduce((result, key) => {
//     if (!_.has(data1, key)) {
//       // eslint-disable-next-line no-param-reassign
//       result[`${sign.added}${key}`] = data2[key];
//     } else if (!_.has(data2, key)) {
//       // eslint-disable-next-line no-param-reassign
//       result[`${sign.deleted}${key}`] = data1[key];
//     } else if (data1[key] !== data2[key]) {
//       // eslint-disable-next-line no-param-reassign
//       result[`${sign.deleted}${key}`] = data1[key];
//       // eslint-disable-next-line no-param-reassign
//       result[`${sign.added}${key}`] = data2[key];
//     } else {
//       // eslint-disable-next-line no-param-reassign
//       result[`${sign.unchanged}${key}`] = data2[key];
//     }
//     return result;
//   }, {});

//   // todo make formatter
//   const diffFormated = [];
//   diffFormated.push('{');
//   Object.entries(diff).forEach(([key, val]) => {
//     diffFormated.push(`${key}: ${val}`);
//   });
//   diffFormated.push('}');
//   console.log(diffFormated.join('\n'));
// };

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'text')
  .action((filepath1, filepath2, options) => {
    mainAction(filepath1, filepath2, options);
  })
  .parse(process.argv);

// export default genDiff;
