import { Command } from 'commander';
import genDiff, { genDiffToConsole } from './src/genDiff.js';

const program = new Command();

program
  // todo get version from ENV
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'Output format "plain" or "stylish" as default ', 'stylish')
  .action((filepath1, filepath2, options) => {
    genDiffToConsole(filepath1, filepath2, options);
  })
  .parse(process.argv);

export default genDiff;
