##
# 检查 client 代码仓库与 server 代码仓库是否完全一致
# 只有完全一致的情况下才会继续发布，防止开发时忘记同时往 2 个库里提交代码而导致线上故障
# 该脚本只beta发布时执行，prod发布不执行
# 因为保证了beta也就保证了prod，没必要重复执行
# 而且prod发布时用的是beta发布产生的tag，并不是branch
##

# 检查是否同时发布两个模块
only_one_module=`echo ${modules} | grep ","`
if [ "${only_one_module}" == "" ]; then
  echo "该job不支持单模块发布，请同时发布job中所有模块"
  exit 1
fi

# 跳过线上
target_skip=prod
result=`echo ${target} | grep "${target_skip}"`
if [ "${result}" != "" ]; then
  echo "当前是线上发布，跳过版本检查prebuild.sh，直接进入build.sh"
fi

echo "target: ${target}"
echo "super_branch: ${super_branch}"

# 解析 super_branch，原始格式如下
# super_branch='fe.touch_client=init
# mobile.touch_server=init'
index=1
for line in $super_branch
do
  # echo line $line
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

# 输入检查
if [ ! -n ${c1} ]; then
  echo "${a1}.${b1}分支名不能为空"
  exit 1
fi

if [ ! -n ${c2} ]; then
  echo "${a2}.${b2}分支名不能为空"
  exit 1
fi

if [ "${c1}" != "$c2" ]; then
  echo "${a1}.${b1}和${a2}.${b2}发布使用的分支名称不一致"
  exit 1
fi

# 因为前端工程先于后端工程编译，所以只需要对前端工程做代码校验即可
# 当前工程类型是通过调用脚本时传递的第一个参数来标识的
if [ -n "$1" ] ;then
  if [ "${a1}" == "fe" ]; then
    server_group=${a2}
    server_project=${b2}
    server_branch=${c2}
  else
    server_group=${a1}
    server_project=${b1}
    server_branch=${c1}
  fi

  # 以下是一系列 git 操作

  # git remote add touch_server git@gitlab.corp.qunar.com:mobile/touch_server.git
  git remote add ${server_project} git@gitlab.corp.qunar.com:${server_group}/${server_project}.git

  # git fetch touch_server
  git fetch ${server_project}

  # diff=`git diff origin/init touch_server/init --name-only`
  diff=`git diff origin/${server_branch} ${server_project}/${server_branch} --name-only`

  # git remote remove touch_server
  git remote remove ${server_project}

  echo -e "diff结果：\n${diff}"

  if [ ! $diff ]; then
    echo "代码检查通过：client库和server库代码完全一致"
  else
    echo "代码检查失败：client库和server库代码不一致，请同步代码后再发布"
    exit 1
  fi
fi
