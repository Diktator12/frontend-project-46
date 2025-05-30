#!/usr/bin/env node
import { Command } from "commander";
import { readFileSync } from 'fs';
import path from 'path';

const program = new Command();

program
  .name('gendiff')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const fullPath1 = path.resolve(process.cwd(), filepath1)
    const fullPath2 = path.resolve(process.cwd(), filepath2)

    const data1 = readFileSync(fullPath1, 'utf-8')
    const data2 = readFileSync(fullPath2, 'utf-8')

    console.log(`--- file1 (${fullPath1}) ---`);
    console.log(data1);
    console.log(`--- file2 (${fullPath2}) ---`);
    console.log(data2);
  })

program.parse()