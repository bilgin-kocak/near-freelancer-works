#!/usr/bin/env bash

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable"

echo "deleting $CONTRACT"
echo
near delete $CONTRACT $OWNER


echo --------------------------------------------
echo
echo "rebuilding the contract (release build)"
echo "redeploying the contract"
echo
yarn dev


echo --------------------------------------------
echo "run the following commands"
echo
export CONTRACT=dev-1650531737505-19542435019744
echo 'export CONTRACT=dev-1650531737505-19542435019744'
echo 'export OWNER=<your own account>' 
echo
echo

exit 0