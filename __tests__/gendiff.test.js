import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/gendiff.js';
import { parseFile } from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '../__fixtures__', filename)

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('gendiff flat JSON', () => {
  const data1 = parseFile(getFixturePath('JSON/file1.json'))
  const data2 = parseFile(getFixturePath('JSON/file2.json'))

  expect(genDiff(data1, data2)).toBe(expected)
})

test('gendiff flat YAML', () => {
  const data1 = parseFile(getFixturePath('YAML/file1.yaml'))
  const data2 = parseFile(getFixturePath('YAML/file2.yml'))

  expect(genDiff(data1, data2)).toBe(expected)
})

test('throws error for unsupported file type', () => {
  expect(() => parseFile(getFixturePath('./invalidFile.txt'))).toThrow('Unsupported file type: .txt');
});