import os from 'os';
import { execSync } from 'child_process';

// run dll only in local machine
const hostname = os.hostname();
const isLocal = !/^l-/.test(hostname);
if (isLocal) {
  console.log(execSync('npm run dll').toString());
} else {
  console.log('npm run dll ... skipped');
}
