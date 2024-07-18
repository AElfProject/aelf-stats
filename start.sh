set -u

BASEDIR=$(pwd)
rm -rf $BASEDIR/temp
git clone https://github.com/$REPO $BASEDIR/temp/repo
cd $BASEDIR/temp/repo
git log --format=fuller --stat | jc --git-log > $BASEDIR/temp/history.json
cd $BASEDIR

node $BASEDIR/import.js