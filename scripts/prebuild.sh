git remote add touch_server git@gitlab.corp.qunar.com:mobile/touch_server.git

git fetch touch_server

diff=`git diff origin/init touch_server/init --name-only`

echo "diff: ${diff}"

if [ ! $diff ]; then
  git remote remove touch_server
  exit 2
else
  echo "两个仓库的代码不一致，请同步后再发布"
  echo "存在差异的文件列表如下："
  echo "${diff}"
  exit 1
fi
