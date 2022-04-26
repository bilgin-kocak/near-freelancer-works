#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable"

echo
echo 'Adding a new gig'
near call $CONTRACT addGig '{"text":"Go Developer","description":"2 Years Experienced","price":"1,00"}' --accountId bilgin.testnet  
echo
