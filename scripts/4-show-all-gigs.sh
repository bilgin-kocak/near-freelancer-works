#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable"

echo
echo 'Showing all gigs'
near call $CONTRACT getGigs  --accountId bilgin.testnet
echo
