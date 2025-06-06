import fs from 'fs'
import path from 'path'
import { load } from 'js-yaml'

export const parseFile = (filepath) => {
  const fileExt = path.extname(filepath)

  const fileContext = fs.readFileSync(filepath, 'utf-8')

  switch (fileExt) {
    case '.json':
      return JSON.parse(fileContext)
    case '.yaml':
    case '.yml':
      return load(fileContext)
    default: 
      throw new Error(`Unsupported file type: ${fileExt}`)
  }
}