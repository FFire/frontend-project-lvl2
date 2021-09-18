#!/usr/bin/env node
// @ts-check

import { Command } from 'commander';
import genDiff from '../index.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'Output format ["plain", "stylish" , "json"]', 'stylish')
  .action((filepath1, filepath2) => {
    const { format } = program.opts();
    console.log(genDiff(filepath1, filepath2, format));
  })
  .parse(process.argv);
