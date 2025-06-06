#!/usr/bin/env node
import { Command } from 'commander'
import genDiff from '../src/gendiff.js'

const program = new Command()

program
  .name('gendiff')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format: stylish, plain, json')
  .action((filepath1, filepath2, options) => {
    try {
      const result = genDiff(filepath1, filepath2, options.format)
      console.log(result)
    }
    catch (err) {
      console.error(err.message)
    }
  })

program.parse()
