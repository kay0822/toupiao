#!/usr/bin/env python
import sys
from web3 import Web3, HTTPProvider                                                         
web3 = Web3(HTTPProvider('https://api.myetherapi.com/eth'))
from ethereum.transactions import Transaction      
import rlp
personal = web3.personal
eth = web3.eth


raw = sys.argv[1]
txid = web3.eth.sendRawTransaction(raw)
print(txid)


