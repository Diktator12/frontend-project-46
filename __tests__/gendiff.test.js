import path from 'path';
import genDiff from '../src/gendiff.js';
import stylish from '../src/formatters/stylish.js';
import { fileURLToPath } from 'url';
import { parseFile } from '../src/parsers.js';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', 'nested', filename)
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const expected = readFile('expected_stylish.txt')

test('gendiff stylish format (JSON)', () => {
  const data1 = parseFile(getFixturePath('file1.json'))
  const data2 = parseFile(getFixturePath('file2.json'))

  expect(genDiff(data1, data2)).toEqual(expected)
})

test('gendiff stylish format (YAML)', () => {
  const data1 = parseFile(getFixturePath('file1.yaml'))
  const data2 = parseFile(getFixturePath('file2.yml'))

  expect(genDiff(data1, data2)).toEqual(expected)
})

test('throws error for unsupported file type', () => {
  expect(() => parseFile(getFixturePath('./invalidFile.txt'))).toThrowError('Unsupported file type: .txt');
});

test('throws error for unknown format', () => {
  const data1 = parseFile(getFixturePath('file1.json'))
  const data2 = parseFile(getFixturePath('file2.json'))
  const format = 'unknown format'

  expect(() => genDiff(data1, data2, format)).toThrowError(`Unknown format: ${format}`)
})

test('throws error on unknown node type', () => {
  const fakeTree = [
    {
      key: 'setting1',
      type: 'unexpected_type',
      value: 'value',
    },
  ];

  expect(() => stylish(fakeTree)).toThrowError("Unknown type: unexpected_type");
});