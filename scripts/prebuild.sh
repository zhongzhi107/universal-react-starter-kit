git remote add touch_client git@gitlab.corp.qunar.com:fe/touch_client.git

git fetch touch_client

diff=`git diff origin/init touch_client/init --name-only`

echo "super_branch: ${super_branch}"
echo "diff: ${diff}"

if [ ! $diff ]; then
  echo "diff结果：client库和server库代码完全一致"
  git remote remove touch_server
  exit 2
else
  echo "diff结果：两个仓库的代码不一致，请同步后再发布。/n存在差异的文件列表如下："
  echo "${diff}"
  exit 1
fi
