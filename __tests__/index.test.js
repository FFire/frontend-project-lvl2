import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesPath = path.resolve(__dirname, '../__fixtures__');
const readFilePath = (absFilepath) => fs.readFileSync(absFilepath, 'utf8');
const expectedStylish = readFilePath(path.resolve(fixturesPath, 'expectStylish.txt'));
const expectedPlain = readFilePath(path.resolve(fixturesPath, 'expectPlain.txt'));
const expectJSON = readFilePath(path.resolve(fixturesPath, 'expectJSON.txt'));

test.each([
  {},
  { fileName1: 'filepath1' },
  { fileName1: 'filepath1', fileName2: 'filepath2' },
  { fileName1: '__fixtures__/file1.json', fileName2: '__fixtures__/file2.jso' },
])('Broken params File-1: [$fileName1] File-2: [$filepath2]', ({ fileName1, fileName2 }) => {
  expect(() => genDiff(fileName1, fileName2)).toThrow();
});

test.each([
  { format: 'plain', expected: expectedPlain },
  { format: 'json', expected: expectJSON },
  { format: 'stylish', expected: expectedStylish },
  { expected: expectedStylish },
])('JSON with [$format] Format', ({ format, expected }) => {
  const fileName1 = '__fixtures__/file1.json';
  const fileName2 = '__fixtures__/file2.json';
  expect(genDiff(fileName1, fileName2, format)).toEqual(expected);
  const absFilePath1 = path.resolve(__dirname, '..', fileName1);
  const absFilePath2 = path.resolve(__dirname, '..', fileName2);
  expect(genDiff(absFilePath1, absFilePath2)).toEqual(expectedStylish);
});

test.each([
  { format: 'plain', expected: expectedPlain },
  { format: 'json', expected: expectJSON },
  { format: 'stylish', expected: expectedStylish },
  { expected: expectedStylish },
])('YAML with [$format] Format', ({ format, expected }) => {
  const fileName1 = '__fixtures__/file1.yaml';
  const fileName2 = '__fixtures__/file2.yaml';
  expect(genDiff(fileName1, fileName2, format)).toEqual(expected);
  const absFilePath1 = path.resolve(__dirname, '..', fileName1);
  const absFilePath2 = path.resolve(__dirname, '..', fileName2);
  expect(genDiff(absFilePath1, absFilePath2)).toEqual(expectedStylish);
});
