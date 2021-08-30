import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import genDiff from '../src/gen-diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesPath = path.resolve(__dirname, '../__fixtures__');
const readFilePath = (absFilepath) => fs.readFileSync(absFilepath, 'utf8');
const expected1 = readFilePath(path.resolve(fixturesPath, 'expect1.txt'));
const expected2 = readFilePath(path.resolve(fixturesPath, 'expect2.txt'));

test('Without params', () => {
  expect(() => genDiff()).toThrow("error: missing required argument 'filepath1'");
  expect(() => genDiff('filepath1')).toThrow("error: missing required argument 'filepath2'");
});

test('File do not exist', () => {
  expect(() => genDiff('filepath1', 'filepath2')).toThrow('File do not exist');
});

test('JSON Absolute and relative paths', () => {
  const filName1 = '__fixtures__/file1.json';
  const filName2 = '__fixtures__/file2.json';
  const absFilePath1 = path.resolve(__dirname, '..', filName1);
  const absFilePath2 = path.resolve(__dirname, '..', filName2);
  expect(genDiff(absFilePath1, absFilePath2)).toEqual(expected1);
  expect(genDiff(filName1, filName2)).toEqual(expected1);
});

test('YAML Absolute and relative paths', () => {
  const filName1 = '__fixtures__/file1.yaml';
  const filName2 = '__fixtures__/file2.yaml';
  const absFilePath1 = path.resolve(__dirname, '..', filName1);
  const absFilePath2 = path.resolve(__dirname, '..', filName2);
  expect(genDiff(absFilePath1, absFilePath2)).toEqual(expected1);
  expect(genDiff(filName1, filName2)).toEqual(expected1);
});

test('only file1', () => {
  const filName1 = 'file1.json';
  const absFilePath1 = path.resolve(fixturesPath, filName1);
  expect(genDiff(absFilePath1, absFilePath1)).toEqual(expected2);
});
