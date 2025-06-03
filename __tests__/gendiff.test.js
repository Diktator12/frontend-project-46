import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '../__fixtures__', filename);
const readJSON = (filename) => JSON.parse(readFileSync(getFixturePath(filename), 'utf-8'));

test('gendiff flat JSON', () => {
  const data1 = readJSON('file1.json');
  const data2 = readJSON('file2.json');

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(data1, data2)).toBe(expected);
});