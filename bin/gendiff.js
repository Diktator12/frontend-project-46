#!/usr/bin/env node
import { Command } from "commander";
import genDiff from "../src/gendiff.js";
import { parseFile } from "../src/parsers.js";

const program = new Command();

program
  .name('gendiff')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    try {
      const data1 = parseFile(filepath1)
      const data2 = parseFile(filepath2)
      const result = genDiff(data1, data2)
      console.log(result)
    } catch (err) {
      console.error(err.message)
    }
  })

program.parse()