import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import * as srcPackageJSON from '../package.json';

const EXCLUDED_PROPS = ['scripts', 'devDependencies'];
const DIST_PACKAGE_JSON = resolve(__dirname, '../dist/package.json');

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
