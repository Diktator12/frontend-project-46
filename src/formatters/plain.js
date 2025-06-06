const formatValue = (value) => {
  if (value === null) return 'null'
  if (typeof value === 'object') return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

const iter = (tree, path = []) => tree
  .flatMap((node) => {
    const propertyPath = [...path, node.key].join('.')

    switch (node.type) {
      case 'added':
        return `Property '${propertyPath}' was added with value: ${formatValue(node.value)}`
      case 'removed':
        return `Property '${propertyPath}' was removed`
      case 'changed':
        return `Property '${propertyPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
      case 'nested':
        return iter(node.children, [...path, node.key])
      case 'unchanged':
        return []
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })

const plain = (tree) => iter(tree).join('\n')

export default plain
