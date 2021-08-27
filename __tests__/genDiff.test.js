// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import { test, expect } from '@jest/globals';
import add from '../src/add';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

test('hello', () => {
  expect('hello').toEqual('hello');
});

test('add', () => {
  expect(add(2, 2)).toEqual(4);
  expect(add(8, 8)).toEqual(16);
});
