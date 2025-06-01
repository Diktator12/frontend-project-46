#!/usr/bin/env node
import { Command } from "commander";
import { readFileSync } from 'fs';
import _ from "lodash";
import path from 'path';

const program = new Command();

program
  .name('gendiff')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const absolutePath1 = path.resolve(process.cwd(), filepath1)
    const absolutePath2 = path.resolve(process.cwd(), filepath2)

    const data1 = JSON.parse(readFileSync(absolutePath1, 'utf-8'))
    const data2 = JSON.parse(readFileSync(absolutePath2, 'utf-8'))

    const result = genDiff(data1, data2)
    console.log(result)
  })

  const genDiff = (data1, data2) => {
    const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))

    const diff = keys.flatMap((key) => {
      const val1 = data1[key]
      const val2 = data2[key]

      if (!_.has(data2, key)) {
        return [`  - ${key}: ${val1}`]
      }
      if (!_.has(data1, key)) {
        return [`  + ${key}: ${val2}`]
      }
      if (!_.isEqual(val1, val2)) {
        return [`  - ${key}: ${val1}`,`  + ${key}: ${val2}`]
      }

      return [`    ${key}: ${val1}`]
    })
    
    return `{\n${diff.join('\n')}\n}`;
  }

  program.parse()

export default genDiff