#!/bin/bash
# 该文件是后端编译使用的脚本，前端工程不需要

# export PATH=/usr/local/n/versions/node/6.2.1/bin:$PATH

# 获取 super_branch，格式如下：
#   fe.dzs_touch=init
#   mobile.dzs_touch_node=init
$super_branch

# 与前端工程建立 remote 关联
git remote add dzs_touch git@gitlab.corp.qunar.com:fe/dzs_touch.git

# fetch remote
git fetch dzs_touch init

# 检查两个库对应分支的代码是否一致
# 允许 `pom.xml` 存在差异
git diff origin/init dzs_touch/init --name-only

exit(1)
