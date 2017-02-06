#!/usr/bin/env babel-node

import piping from 'piping';

if (process.env.NODE_ENV !== 'production') {
  piping({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i
  });
}
require('../api/api');
