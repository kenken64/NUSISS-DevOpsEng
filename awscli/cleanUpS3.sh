#!/bin/bash
echo "Cleaning S3 for CodeStar"
`/usr/local/bin/aws s3 ls >> files.txt` 
cat files.txt | while read line
do
   echo $line
   bucketname=$(echo $line | /usr/bin/cut -d" " -f 3)
   echo $bucketname
   #$(aws s3api put-bucket-versioning --bucket $bucketname --versioning-configuration '{"MFADelete":"Enabled","Status":"Enabled"}')
   $(/usr/local/bin/aws s3 rb s3://$bucketname --force)
done
