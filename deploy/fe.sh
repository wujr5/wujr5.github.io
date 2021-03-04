rm docs/CNAME
echo "wujr5.cn" >> docs/CNAME
git add -A
git commit -m $1
git push origin master
