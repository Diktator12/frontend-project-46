import stylish from './stylish.js'
import plain from './plain.js'

const formatters = {
  stylish,
  plain,
}

const format = (tree, formatName = 'stylish') => {
  const formatter = formatters[formatName]

  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`)
  }

  return formatter(tree)
}

export default format