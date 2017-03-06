# touch_client/touch_server

## Requirements

* [node](https://nodejs.org/en/) >= 4.0
* [npm](https://www.npmjs.com/) >= 3.0


## Getting Started

  ```
  git clone git@gitlab.corp.qunar.com:fe/touch_client.git
  cd touch_client
  cp profiles/local.env .env
  yarn
  yarn run serve
  ```

  Now the app should be running at http://localhost:3000/

## Commands
  ```
  # Build the project
  yarn build

  # Build the project with CDN_ROOT
  CDN_ROOT=//mycdn.com/ yarn build

  # Test
  yarn test

  # JavaScript lint
  yarn run lint

  # CSS lint
  yarn run lint:style

  # Build "dll" bundles
  yarn run dll
  ```

## 约定
* 为了jenkins发布，把前、后端代码分别放在不同库里 [touch_client](http://gitlab.corp.qunar.com/fe/touch_client) [touch_server](http://gitlab.corp.qunar.com/mobile/touch_server)，但2个库的代码完全一样
* 本地开发时，只需拉取 [touch_client](http://gitlab.corp.qunar.com/fe/touch_client) 工程，同时，需要为 [touch_server](http://gitlab.corp.qunar.com/mobile/touch_server)  建立远程链接

  ```
  git remote add touch_server git@gitlab.corp.qunar.com:mobile/touch_server.git
  git fetch touch_server
  ```
* 在做新功能开发时，需要为2个仓库新建同样名称的分支，分支名不一样在发布校验通不过
* 提交代码时需要把修改同步提交到2个仓库

  ```
  git add .
  git commit -m 'xx'
  git push origin/分支名
  git push touch_server HEAD:init
  ```

## 其他说明
* .env中的所有环境变量都可以用过调用是传入参数来覆盖，如

```
# 覆盖.env文件中的 `NODE_ENV` 和 `ENABLE_PROXY`
NODE_ENV=beta ENABLE_PROXY=false yarn run serve
```
