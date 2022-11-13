# tsconfig-merge

NodeJS package without any dependencies that merges two provided tsconfig.json files into a single object. Package merges all properties of `tsconfig.json` files, including the `extends` property.

[![TypeScript](https://img.shields.io/badge/--3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/)

## Installation

```
npm i tsconfig-merge -D
```

## Usage

```typescript
import { resolve } from 'path';
import { merge2TSConfigs } from 'tsconfig-merge';

const tsConfigA = resolve(__dirname, './tsConfigA.json');
const tsConfigB = resolve(__dirname, './tsConfigB.json');
const mergedTSConfigs = merge2TSConfigs(tsConfigA, tsConfigB);
```
