#!/usr/bin/env node
import { Command } from "commander";
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from "../src/gendiff";

const program = new Command();

const getFileData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  return JSON.parse(readFileSync(fullPath, 'utf-8'))
}

program
  .name('gendiff')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const data1 = getFileData(filepath1)
    const data2 = getFileData(filepath2)
    const result = genDiff(data1, data2)
    console.log(result)
  })

program.parse()