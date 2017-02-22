# !/bin/sh

git filter-branch --env-filter '

an="$GIT_AUTHOR_NAME"
am="$GIT_AUTHOR_EMAIL"

if [ "$GIT_AUTHOR_EMAIL" = "xianming.zxm@alibaba-inc.com" ]
then
    an="sanyueyu"
    am="sanyueyu@gmail.com"
fi

export GIT_AUTHOR_NAME="$an"
export GIT_AUTHOR_EMAIL="$am"
'
