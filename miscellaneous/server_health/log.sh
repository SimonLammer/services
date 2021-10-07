timestamp=`printf '%(%s)T'`
timestamp=`date +%s`
health=ok

# Secrets
webApp=`jq ".webApp" secrets.json -r`

curl -sS -L "$webApp?timestamp=$timestamp&health=$health&data="

