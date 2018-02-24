#!/usr/bin/node

var assert = require('assert') 
var Tx = require('ethereumjs-tx')

var privkey = process.argv[2]
var nonce = process.argv[3]
var to = process.argv[4]
nonce = parseInt(nonce)
//console.error('privkey: ' + privkey + ', nonce: ' + nonce + ', to: ' + to)

var privateKey = new Buffer(privkey, 'hex')

assert(to.startsWith('0x'))
to = to.replace('0x', '')

//data = '0xa9059cbb00000000000000000000000052be2477d69cb53dc331004054517ab96555ed1e000000000000000000000000000000000000000000000000016345785d8a0000'
/*
10Gwei 000000000000000000000000000000000000000000000000016345785d8a0000
13Gwei 0000000000000000000000000000000000000000000000022b1c8c1227a00000
*/
data = '0xa9059cbb000000000000000000000000'+to+'000000000000000000000000000000000000000000000000016345785d8a0000'

var rawTx = {
  nonce: nonce,
  gasPrice: '0x02540be400', 
  gasLimit: '0xea60',
  to: '0xb8c77482e45f1f44de1745f52c74426c631bdd52', 
  value: '0x00', 
  data: data,
  chainId: 1,
}

var tx = new Tx(rawTx)
tx.sign(privateKey)

var serializedTx = tx.serialize()
var raw = '0x' + serializedTx.toString('hex')
console.log(raw)

process.exit(0)

/*

var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("https://api.myetherapi.com/eth"));
web3.eth.sendSignedTransaction(raw).once('receipt', function(receipt){
    console.log('receipt: ' + receipt)
}).on('error', function(error, receipt){
    console.error('error: ' + error)
    process.exit(-1)
}).then(function(receipt){
    // will be fired once the receipt its mined
    console.log('then: ' + receipt)
}).delay()

process.exit(0)
*/
