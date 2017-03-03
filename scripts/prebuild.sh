echo "super_branch: ${super_branch}"

# 解析 super_branch，让下面的代码变成通用代码
# super_branch='fe.touch_client=init
# mobile.touch_server=init'

index=1
for line in $super_branch
do
    echo line $line
    str=$line
    tmp=${str%=*}
    aa=${str%.*}
    bb=${tmp#*.}
    cc=${str#*=}
    eval "a${index}=$aa"
    eval "b${index}=$bb"
    eval "c${index}=$cc"
    let index++
done

if [ ! -n $c1 ]; then
  echo "${a1}.${b1} 分支名不能为空"
  exit 1
fi

if [ ! -n $c2 ]; then
  echo "${a2}.${b2} 分支名不能为空"
  exit 1
fi

if [ "${c1}" != "$c2" ]; then
  echo "${a1}.${b1} 和 ${a2}.${b2} 的分支名不一致"
  exit 1
fi

if [ "${a1}" == "fe" ]; then
  client_group=a1
  client_project=b1
  client_branch=c1
else
  client_group=a2
  client_project=b2
  client_branch=c2
fi

# git remote add touch_client git@gitlab.corp.qunar.com:fe/touch_client.git
git remote add ${client_project} git@gitlab.corp.qunar.com:${client_group}/${client_project}.git

# git fetch touch_client
git fetch ${client_project}

# diff=`git diff origin/init touch_client/init --name-only`
diff=`git diff origin/${client_branch} ${client_project}/${client_branch} --name-only`

echo "diff: ${diff}"

if [ ! $diff ]; then
  echo "diff结果：client库和server库代码完全一致"
  # git remote remove touch_client
  git remote remove ${client_project}
else
  echo "diff结果：存在不同文件："
  echo "${diff}"
  echo "请同步后再发布"
  exit 1
fi
exit 1
