import buildDiff from './buildDiff.js'
import format from './formatters/index.js'
import { parseFile } from './parsers.js'

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const diff = buildDiff(data1, data2)
  return format(diff, formatName)
}

export default genDiff
