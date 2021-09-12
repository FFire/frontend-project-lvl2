import { Command } from 'commander';
import genDiff, { genDiffToConsole } from './src/genDiff.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'Output format ["plain", "stylish" , "json"]', 'stylish')
  .action((filepath1, filepath2, options) => {
    genDiffToConsole(filepath1, filepath2, options);
  })
  .parse(process.argv);

export default genDiff;
