#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable"

echo
echo 'Changing the validity of a gig'
near call $CONTRACT changeValidityGig '{"gigId":"0"}' --accountId bilgin.testnet
echo
