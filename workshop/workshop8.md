# S-DOEA - Workshop 8 - Scalability and Reliability DevOps Engineering and Automation

## Pre-requisite 

### Create a keypair
* Login into the AWS console and launch EC2 dashboard ```https://console.aws.amazon.com/ec2```
* Click on the KeyPair function under the Network and Security section. Left navigation

<br>
<img src="screens/eks1.png" width="200px" height="500px"/>
<br>

* Upon landing on the create screen, click on the Create Key Pair button

<br>
<img src="screens/eks2.png"/>
<br>

* Provide a name for your keypair ```eks-nusiss-<your initial>``` and click on Create.

* Download the pem file immediately

### Create API Access key/secret

* In order to create the API access key, look for the IAM service select the logon user then under the security credentials tab create access key.

<br>
<img src="screens/eks3.png"/>
<br>

<br>
<img src="screens/eks4.png"/>
<br>

<br>
<img src="screens/eks5.png"/>
<br>

### Install <b>AWSCLI</b> (Launch new ubuntu based free tier EC2 instance)

* Install the python based AWS command line interface tools on the newly created EC2 instance

```bash
pip install --user awscli
export PATH=$PATH:/home/$(whoami)/.local/bin
```

_--user_ is used to install the awscli under your home directory, not to interfere with any existing libraries/installations

* Create file _~/.aws/credentials_

```bash
[default]
aws_access_key_id=<copy from the previous screen>
aws_secret_access_key=<copy from the previous screen>
region=ap-southeast-1
output=json
```

### Verify setup was done correctly

```
aws --version
```