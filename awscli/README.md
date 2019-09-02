## Install AWS CLI

## Install AWS CLI on the Slave Server via Jupyter Notebook

1. Execute the command line below

```
pip3 install awscli --upgrade --user
```

2. Verify whether aws cli is installed properly

```
aws --version
```

3. Configure the aws cli https://docs.aws.amazon.com/general/latest/gr/rande.html. Always default to Sydney region for house keeping purpose.

```
aws configure 

AWS Access Key ID [****************ZLWC]: <Will be provided in class> 
Secret Access Key [****************/oyY]: <Will be provided in class>
Default region name [SG]: ap-southeast-2
Default output format [SG]: json
```

## Create AWS EC2 security group

The below command will create securty group 

```
aws ec2 create-security-group \
 --group-name "test123" \
 --description "Private: $securityGroupName" \
 --vpc-id "$vpcId" --output json
```

```
{
    "GroupId": "sg-04369d1c4faa5df74"
}
```

## Create security group rules 

E.g. create a port 22 rules

```
aws ec2 update-security-group-rule-descriptions-ingress --group-id sg-04369d1c4faa5df74 --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 22, "ToPort": 22, "IpRanges": [{"CidrIp": "0.0.0.0/0", "Description": "SSH access"}]}]'
```





E.g. create a port 80 rules

```
aws ec2 update-security-group-rule-descriptions-ingress --group-id sg-04369d1c4faa5df74 --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 80, "ToPort": 80, "IpRanges": [{"CidrIp": "0.0.0.0/0", "Description": "SSH access"}]}]'

```

E.g. create a port 443 rules

```
aws ec2 update-security-group-rule-descriptions-ingress --group-id sg-04369d1c4faa5df74 --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 443, "ToPort": 443, "IpRanges": [{"CidrIp": "0.0.0.0/0", "Description": "SSH access"}]}]'
```

## Create key pair using AWS CLI

To create a key pair

```
aws ec2 create-key-pair --key-name MyKeyPair >> mykey.pem
```



## List all the buckets from AWS S3

List all the current available s3 bucket

```
aws s3 list
```

## Empty s3 bucket

Empty the s3 bucket 

```
aws s3 rb s3://$bucketname --force
```

## Delete s3 bucket

```
aws s3 rm s3://$bucketname --recursive

```
