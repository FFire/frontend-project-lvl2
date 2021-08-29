import { fileURLToPath } from 'url';
import * as path from 'path';
import genDiff from '../src/gen-diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesPath = path.resolve(__dirname, '../__fixtures__');

test('Without params', () => {
  expect(() => genDiff()).toThrow("error: missing required argument 'filepath1'");
  expect(() => genDiff('filepath1')).toThrow("error: missing required argument 'filepath2'");
});

test('File do not exist', () => {
  expect(() => genDiff('filepath1', 'filepath2')).toThrow('File do not exist');
});

test('Absolute and relative paths', () => {
  const expected = [
    '{',
    '  - follow: false',
    '    host: hexlet.io',
    '  - proxy: 123.234.53.22',
    '  - timeout: 50',
    '  + timeout: 20',
    '  + verbose: true',
    '}',
  ].join('\n');

  const filName1 = '__fixtures__/file1.json';
  const filName2 = '__fixtures__/file2.json';
  const absFilePath1 = path.resolve(__dirname, '..', filName1);
  const absFilePath2 = path.resolve(__dirname, '..', filName2);
  expect(genDiff(absFilePath1, absFilePath2)).toEqual(expected);
  expect(genDiff(filName1, filName2)).toEqual(expected);
});

test('only file1', () => {
  const expected = [
    '{',
    '    follow: false',
    '    host: hexlet.io',
    '    proxy: 123.234.53.22',
    '    timeout: 50',
    '}',
  ].join('\n');

  const filName1 = 'file1.json';
  const absFilePath1 = path.resolve(fixturesPath, filName1);
  expect(genDiff(absFilePath1, absFilePath1)).toEqual(expected);
});
