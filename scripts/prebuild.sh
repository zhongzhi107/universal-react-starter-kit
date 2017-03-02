git remote add touch_server git@gitlab.corp.qunar.com:mobile/touch_server.git

git fetch touch_server

diff=`git diff origin/init touch_server/init --name-only`

if [ ! $diff ]; then
  git remote remove touch_server
else
  exit 1
fi
