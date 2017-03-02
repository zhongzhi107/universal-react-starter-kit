import { hostname } from 'os';
import { execSync } from 'child_process';

// run dll only in local machine
const isLocal = !/^l-/.test(hostname);
console.log(hostname);
console.log('isLocal: ', isLocal);
if (isLocal) {
  console.log(execSync('npm run dll').toString());
}
