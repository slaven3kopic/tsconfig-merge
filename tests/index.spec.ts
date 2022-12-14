import { resolve } from 'path';
import { merge2TSConfigs } from '../src/index';
import * as result from './result.json';

describe('merge2TSConfigs test', () => {
  test('self', () => {
    const tsConfigA = resolve(__dirname, './tsConfigA.json');
    const tsConfigB = resolve(__dirname, './tsConfigB.json');
    expect(merge2TSConfigs(tsConfigA, tsConfigB)).toEqual(result);
  });
});
