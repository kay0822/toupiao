#!/usr/bin/env python
import sys
from web3 import Web3, HTTPProvider                                                         
web3 = Web3(HTTPProvider('https://api.myetherapi.com/eth'))
from ethereum.transactions import Transaction      
import rlp
personal = web3.personal
eth = web3.eth


account = sys.argv[1]
count = web3.eth.getTransactionCount(account)
print(count)


