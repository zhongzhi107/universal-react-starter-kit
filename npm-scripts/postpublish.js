#!/usr/bin/env babel-node

import {execSync} from 'child_process';
import fs from 'fs';
import pkg from '../package.json';

const cmd = `git tag v${pkg.version} && git push origin --tags`;
console.log(cmd);
execSync(cmd);
