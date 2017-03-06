import os from 'os';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// run dll only in local machine
const hostname = os.hostname();
const isLocal = !/^l-/.test(hostname);

if (isLocal) {
  console.log(execSync('npm run dll').toString());
} else {
  console.log('npm run dll ... skipped');
}

// Copy .env
const { NODE_ENV = 'local' } = process.env;
const dest = path.resolve('.env');
const src = `profiles/${NODE_ENV}.env`;

writeFileSync(dest, readFileSync(src));
console.log('.env copied');
