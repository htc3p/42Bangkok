count=$(find . -type f | wc -l | xargs echo -n)
echo "$count"

