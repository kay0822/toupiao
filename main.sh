#!/bin/bash

file=$1
account=$2
privkey=$3


while true; do
    if init_count=$(./get_count.py ${account}); then
        break
    fi
done

echo $(date) account: ${account}, init_count: ${init_count}

nonce=${init_count}
tx_count=1

while read to_address
do
   if echo "${to_address}" | grep "^0x" > /dev/null ;then
       echo $(date) handling to_address: ${to_address}
       sleep 1

       while true; do
           count=$(./get_count.py ${account})
           if [ ${nonce} -eq ${count} ];then
               break
           else
               echo $(date) [warn] "nonce(${nonce}) != count(${count}), sleep then retry"
               sleep 3
           fi
       done

       raw=$(./gen_raw.js ${privkey} ${nonce} ${to_address})
       txid=$(./send_raw.py ${raw})

       echo $(date) sent, to_address: ${to_address}, txid: ${txid}, tx_count: ${tx_count}

       (( nonce += 1 ))
       (( tx_count += 1 ))

   else
      echo $(date) invalid to_address: ${to_address}, break
      break
   fi
done  < ${file}
    

