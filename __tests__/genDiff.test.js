import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesPath = path.resolve(__dirname, '../__fixtures__');
const readFilePath = (absFilepath) => fs.readFileSync(absFilepath, 'utf8');
const expectedStylish = readFilePath(path.resolve(fixturesPath, 'expectStylish.txt'));
const expectedPlain = readFilePath(path.resolve(fixturesPath, 'expectPlain.txt'));
const expectJSON = readFilePath(path.resolve(fixturesPath, 'expectJSON.txt'));

test('Without params', () => {
  expect(() => genDiff()).toThrow();
  expect(() => genDiff('filepath1')).toThrow();
});

test('File do not exist', () => {
  expect(() => genDiff('filepath1', 'filepath2')).toThrow('File do not exist');
});

test('JSON Absolute and relative paths', () => {
  const filName1 = '__fixtures__/file1.json';
  const filName2 = '__fixtures__/file2.json';
  const absFilePath1 = path.resolve(__dirname, '..', filName1);
  const absFilePath2 = path.resolve(__dirname, '..', filName2);
  expect(genDiff(absFilePath1, absFilePath2)).toEqual(expectedStylish);
  expect(genDiff(filName1, filName2)).toEqual(expectedStylish);
});

test('YAML Absolute and relative paths', () => {
  const filName1 = '__fixtures__/file1.yaml';
  const filName2 = '__fixtures__/file2.yaml';
  const absFilePath1 = path.resolve(__dirname, '..', filName1);
  const absFilePath2 = path.resolve(__dirname, '..', filName2);
  expect(genDiff(absFilePath1, absFilePath2)).toEqual(expectedStylish);
  expect(genDiff(filName1, filName2)).toEqual(expectedStylish);
});

test('Plain format', () => {
  const filName1 = '__fixtures__/file1.json';
  const filName2 = '__fixtures__/file2.json';
  expect(genDiff(filName1, filName2, 'plain')).toEqual(expectedPlain);
});

test('JSON format', () => {
  const filName1 = '__fixtures__/file1.json';
  const filName2 = '__fixtures__/file2.json';
  expect(genDiff(filName1, filName2, 'json')).toEqual(expectJSON);
});
