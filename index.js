import { Command } from 'commander';
import genDiff from './src/gen-diff.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'text')
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options));
  })
  .parse(process.argv);

export default genDiff;
