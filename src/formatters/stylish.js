const INDENT_SIZE = 4
const SIGN_OFFSET = 2

const getIndent = (depth) => ' '.repeat(depth * INDENT_SIZE)
const getLinePrefix = (sign, depth) => `${' '.repeat(depth * INDENT_SIZE - SIGN_OFFSET)}${sign} `

const stringify = (value, depth) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return String(value);
  }

  const currentIndent = getIndent(depth + 1);
  const closingIndent = getIndent(depth);

  const lines = Object.entries(value).map(
    ([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`
  );

  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

const stylish = (tree, depth = 1) => {
  const lines = tree.flatMap((node) => {
    const {
      key, type, value, oldValue, newValue, children,
    } = node;

    switch (type) {
      case 'added':
        return getLinePrefix('+', depth) + `${key}: ${stringify(value, depth)}`;
      case 'removed':
        return getLinePrefix('-', depth) + `${key}: ${stringify(value, depth)}`;
      case 'unchanged':
        return getLinePrefix(' ', depth) + `${key}: ${stringify(value, depth)}`;
      case 'changed':
        return [
          getLinePrefix('-', depth) + `${key}: ${stringify(oldValue, depth)}`,
          getLinePrefix('+', depth) + `${key}: ${stringify(newValue, depth)}`
        ].join('\n');
      case 'nested':
        return getLinePrefix(' ', depth) + `${key}: ${stylish(children, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  const closingIndent = getIndent(depth - 1)
  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

export default stylish;