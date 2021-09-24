import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesAbsPath = path.resolve(__dirname, '..', '__fixtures__');
const readFilePath = (absFilepath) => fs.readFileSync(absFilepath, 'utf8');
const getRelFileName = (fileName) => `__fixtures__/${fileName}`;
const getAbsFileName = (fileName) => path.resolve(fixturesAbsPath, fileName);
const expectedStylish = readFilePath(getAbsFileName('expectStylish.txt'));
const expectedPlain = readFilePath(getAbsFileName('expectPlain.txt'));
const expectJSON = readFilePath(getAbsFileName('expectJSON.txt'));
const fileJSON1 = 'file1.json';
const fileJSON2 = 'file2.json';
const fileYAML1 = 'file1.yaml';
const fileYAML2 = 'file2.yaml';

test.each([
  {},
  { fileName1: 'filepath1' },
  { fileName1: 'filepath1', fileName2: 'filepath2' },
  { fileName1: getRelFileName(fileJSON1), fileName2: getRelFileName('file1.jso') },
])('Broken params File-1: [$fileName1] File-2: [$filepath2]', ({ fileName1, fileName2 }) => {
  expect(() => genDiff(fileName1, fileName2)).toThrow();
});

test.each([
  { format: 'plain', expected: expectedPlain },
  { format: 'json', expected: expectJSON },
  { format: 'stylish', expected: expectedStylish },
  { expected: expectedStylish },
])('Run with [$format] Format', ({ format, expected }) => {
  const relFileJSON1 = getRelFileName(fileJSON1);
  const relFileJSON2 = getRelFileName(fileJSON2);
  expect(genDiff(relFileJSON1, relFileJSON2, format)).toEqual(expected);

  const absFileJSON1 = getAbsFileName(fileJSON1);
  const absFileJSON2 = getAbsFileName(fileJSON2);
  expect(genDiff(absFileJSON1, absFileJSON2, format)).toEqual(expected);

  const relFileYAML1 = getRelFileName(fileYAML1);
  const relFileYAML2 = getRelFileName(fileYAML2);
  expect(genDiff(relFileYAML1, relFileYAML2, format)).toEqual(expected);

  const absFileYAML1 = getAbsFileName(fileYAML1);
  const absFileYAML2 = getAbsFileName(fileYAML2);
  expect(genDiff(absFileYAML1, absFileYAML2, format)).toEqual(expected);
});
