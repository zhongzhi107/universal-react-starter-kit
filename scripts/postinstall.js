import os from 'os';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Copy .env
const { NODE_ENV = 'local' } = process.env;
console.log(`[postinstall] NODE_ENV: ${NODE_ENV}`);
const dest = path.resolve('.env');
const src = `profiles/${NODE_ENV}.env`;

console.log(`[postinstall] Copy .env file: ${src} ---> ${dest}`);
writeFileSync(dest, readFileSync(src));

// run dll only in local machine
const hostname = os.hostname();
const isLocal = !/^(l|APPVYR)-/.test(hostname);

if (isLocal) {
  console.log(execSync('npm run dll').toString());
} else {
  console.log('[postinstall] npm run dll ... skipped');
}
