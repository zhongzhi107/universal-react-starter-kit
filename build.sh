#!/bin/bash

export PATH=/usr/local/n/versions/node/6.2.1/bin:$PATH

if [ ! -n "$1" ] ;then
  echo 参数错误
  echo usage: build.sh cdn_root
else
  echo hostname: `hostname`
  echo node version: `node -v`
  echo npm version: `npm -v`
  echo CDN_ROOT: $1
  # npm-cache install --cacheDirectory /home/q/prj/npm/fe/dzs_touch --clearInvalidCache true npm --registry http://registry.npm.corp.qunar.com --disturl=https://npm.taobao.org/dist --sass-binary-site=http://npm.taobao.org/mirrors/node-sass --production
  CDN_ROOT=$1 npm run build
fi
