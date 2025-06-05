import buildDiff from "./buildDiff.js"
import stylish from "./formatters/stylish.js"

const genDiff = (data1, data2, format = 'stylish') => {
  const diff = buildDiff(data1, data2);

  switch (format) {
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default genDiff;