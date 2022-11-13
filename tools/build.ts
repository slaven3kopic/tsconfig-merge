import { execSync } from 'child_process';
import { copyFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import * as srcPackageJSON from '../package.json';

const EXCLUDED_PROPS = ['scripts', 'devDependencies'];
const DIST = resolve(__dirname, '../dist');
const DIST_PACKAGE_JSON = resolve(DIST, 'package.json');
const SRC_README = resolve(__dirname, '../README.md');
const DIST_README = resolve(DIST, 'README.md');

execSync('npm run tsc');

const distPackageJSONContent = Object.keys(srcPackageJSON).reduce(
  (acc, key) => {
    if (!EXCLUDED_PROPS.includes(key)) {
      acc[key] = srcPackageJSON[key];
    }
    return acc;
  },
  {}
);

writeFileSync(DIST_PACKAGE_JSON, JSON.stringify(distPackageJSONContent));
copyFileSync(SRC_README, DIST_README);
