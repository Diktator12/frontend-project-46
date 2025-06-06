import buildDiff from './buildDiff.js'
import format from './formatters/index.js'

const genDiff = (data1, data2, formatName = 'stylish') => {
  const diff = buildDiff(data1, data2)
  return format(diff, formatName)
}

export default genDiff