import path from 'path'
import genDiff from '../src/gendiff.js'
import stylish from '../src/formatters/stylish.js'
import { fileURLToPath } from 'url'
import { parseFile } from '../src/parsers.js'
import { readFileSync } from 'fs'
import format from '../src/formatters/index.js'
import plain from '../src/formatters/plain.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', 'nested', filename)
const readFile = filename => readFileSync(getFixturePath(filename), 'utf-8')

const expectedStylish = readFile('expected_stylish.txt')
const expectedPlain = readFile('expected_plain.txt')
const expectedJSON = readFile('expected_json.txt')

const fakeTree = [
  {
    key: 'setting1',
    type: 'unexpected_type',
    value: 'value',
  },
]

const json1Path = getFixturePath('file1.json')
const json2Path = getFixturePath('file2.json')
const yaml1Path = getFixturePath('file1.yaml')
const yml2Path = getFixturePath('file2.yml')

test('gendiff stylish format (JSON)', () => {
  expect(genDiff(json1Path, json2Path, 'stylish')).toEqual(expectedStylish)
})

test('gendiff stylish format (YAML)', () => {
  expect(genDiff(yaml1Path, yml2Path, 'stylish')).toEqual(expectedStylish)
})

test('gendiff plain format (JSON)', () => {
  expect(genDiff(json1Path, json2Path, 'plain')).toEqual(expectedPlain)
})

test('gendiff plain format (YAML)', () => {
  expect(genDiff(yaml1Path, yml2Path, 'plain')).toEqual(expectedPlain)
})

test('gendiff json format (JSON)', () => {
  expect(genDiff(json1Path, json2Path, 'json')).toEqual(expectedJSON)
})

test('gendiff json format (YAML)', () => {
  expect(genDiff(yaml1Path, yml2Path, 'json')).toEqual(expectedJSON)
})

test('gendiff returns stylish by default', () => {
  expect(genDiff(json1Path, json2Path)).toEqual(expectedStylish)
})

test('throws error for unsupported file type', () => {
  expect(() => parseFile(getFixturePath('./invalidFile.txt'))).toThrowError('Unsupported file type: .txt')
})

test('throws error on unknown node type (stylish format)', () => {
  expect(() => stylish(fakeTree)).toThrowError('Unknown type: unexpected_type')
})

test('throws error on unknown node type (plain format)', () => {
  expect(() => plain(fakeTree)).toThrowError('Unknown type: unexpected_type')
})

test('throws error for unknown format', () => {
  expect(() => format(fakeTree, 'unknown')).toThrowError('Unknown format: unknown')
})

test('format returns stylish by default', () => {
  const tree = []
  const result = format(tree)
  expect(typeof result).toBe('string')
})
