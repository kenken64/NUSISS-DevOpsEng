#!/bin/bash
rm -rf buckets.txt
echo "Cleaning S3 for CodeStar"
`/usr/local/bin/aws s3 ls >> buckets.txt` 
cat buckets.txt | while read line
do
  echo $line
  bucketname=$(echo $line | /usr/bin/cut -d" " -f 3)
  echo $bucketname
  ./cleanupS3.py --bucketname=$bucketname
done
