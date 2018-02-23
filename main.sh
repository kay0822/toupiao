#!/bin/bash

file=$1
account=$2
privkey=$3


while true; do
    if init_count=$(./get_count.py ${account}); then
        break
    fi
done

echo account: ${account}, init_count: ${init_count}

nonce=${init_count}

while read to
do
   if echo "${to}" | grep "^0x" > /dev/null ;then
      echo ${to}

      raw=$(./gen_raw.js ${privkey} ${nonce} ${to})
      txid=$(./send_raw.py ${raw})

      (( nonce += 1 ))

      while true; do
          count=$(./get_count.py ${account})
          if [ ${nonce} -eq ${count} ];then
              break
          else
              sleep 3
          fi
   else
      echo 'invalid to: ${to}
      break
   fi
done  < ${file}
    

