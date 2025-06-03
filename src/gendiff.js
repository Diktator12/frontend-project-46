import _ from "lodash";

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

export default genDiff