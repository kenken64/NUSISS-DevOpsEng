#!/bin/bash
echo "Cleaning S3 for CodeStar"
`/usr/local/bin/aws s3 ls >> files.txt` 
cat files.txt | while read line
do
   echo $line
   bucketname=$(echo $line | /usr/bin/cut -d" " -f 3)
   echo $bucketname
   $(/usr/local/bin/aws s3 rm s3://$bucketname --recursive)
done
