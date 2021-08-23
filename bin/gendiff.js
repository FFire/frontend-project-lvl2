import { Command } from 'commander';

const program = new Command();
program
  .addHelpCommand(false)
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .parse(process.argv);
