## Example of Automation

``` bash
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
```

``` Python
#!/anaconda3/bin/python3
import boto3
import argparse
import sys

s3_client = boto3.client('s3')
s3_resource = boto3.resource('s3')

def disable_bucket_versioning(bucket_name):
    bkt_versioning = s3_resource.BucketVersioning(bucket_name)
    bkt_versioning.suspend()
    print(bkt_versioning.status)


def delete_all_objects(bucket_name):
    res = []
    bucket=s3_resource.Bucket(bucket_name)
    for obj_version in bucket.object_versions.all():
        res.append({'Key': obj_version.object_key,
                    'VersionId': obj_version.id})
    print(res)
    bucket.delete_objects(Delete={'Objects': res})

def delete_bucket(bucket_name):
    bucket = s3_resource.Bucket(bucket_name)
    bucket.delete()

parser = argparse.ArgumentParser(description='Bucket name')
parser.add_argument(
    '--bucketname',
    help='provide aws s3 bucket name'
)
my_namespace = parser.parse_args()
if my_namespace.bucketname == None:
  print('Usage : ./cleanupS3.py --bucketname=hello')
  sys.exit()

print(my_namespace.bucketname)
disable_bucket_versioning(my_namespace.bucketname)
delete_all_objects(my_namespace.bucketname)
delete_bucket(my_namespace.bucketname)

```
## Manage AWS EC2

### Python Scripts

https://github.com/awsdocs/aws-doc-sdk-examples/tree/master/python/example_code/ec2

## Manage AWS S3

### Python Scripts

https://github.com/awsdocs/aws-doc-sdk-examples/tree/master/python/example_code/s3

## Manage AWS SNS

### Python Scripts

https://github.com/awsdocs/aws-doc-sdk-examples/tree/master/python/example_code/sns

## Manage AWS IAM

### Python Scripts

https://github.com/awsdocs/aws-doc-sdk-examples/tree/master/python/example_code/iam

## Manage AWS CloudWatch

### Python Scripts

https://github.com/awsdocs/aws-doc-sdk-examples/tree/master/python/example_code/cloudwatch
