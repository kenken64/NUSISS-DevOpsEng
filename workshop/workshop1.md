# S-DOEA - Workshop 2 - Jenkins Installation

## Pre-requisites for Cloud installation
* AWS NUS ISS account
* Jupyter Notebbok Password will be provided during class
* Access to this url (Jump host) : [http://52.64.252.129:8888/login ](http://139.59.244.191:8888/login)
* AWS Region: Sydney (ap-southeast-2)


### Step by step installation
1. Navigate to the AWS services link top left corner beside the AWS logo
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/jenkins24.png"/>
<br>

2. Search/Select EC2 under the compute category
3. Launch a new instance, search 'bitnami jenkins' on the marketplace 
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/aws_ec2.png"/>
<br>

4. Search 'bitnami jenkins' on AWS marketplace click on Select to create the instance
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/aws_ec2_2.png"/>

5. On the next page a pricing details page will be shown. Click continue
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/jenkins3.png"/>
<br>

6. Choose an instance type which is  t2 micro (free tier). Click Next Configure Instance details
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/jenkins4.png"/>
<br>

7. Landed on a configure instance details page and by default nothing is require to be configure on this page. Click Add Storage
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/jenkins5.png"/>
<br>

8. On the configure storage page change 10GB to 15GB. Try not add more mount point overall AWS only give 30GB per instance on free tier.
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/jenkins6.png"/>
<br>

9. Define a tag for your jenkins server click add tag on the key field specify 'server_name' and value as 'project_name_ubuntu_jenkins'. Click Next
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/jenkins7.png"/>
<br>

10.  Configure security group as default no addition configuration is needed on this page
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/jenkins8.png"/>
<br>

11. Review all the configuration and click on Launch
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/jenkins9.png"/>
<br>
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/jenkins10.png"/>
<br>

12. Upon launching the instance AWS require us to create a new pair of private key to be use to access the instance.
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/jenkins11.png"/>
<br>

13. After creating the private key, a new instance will be launch. Kindly wait for a few minutes. Upon successful creation of the instance your instance is now ready to be use
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/jenkins12.png"/>
<br>

14. Click on the instance id, the look out for instance status where it is running.
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/jenkins13.png"/>
<br>

15. Access the Jupyter notebook URL http://52.64.252.129:8888/login  . Upload the pem to the root directory of the jupyter notebook.

<br>
<img style="float: center;" src="./screens/upload_pem.png">
<br> 

<br>
<img style="float: center;" src="./screens/upload_pem2.png">
<br> 


You will need the public DNS and the private key (PEM) file that have been downloaded to SSH into the respective EC2 bitnami instance.
 


<br>
<img style="float: center;" src="./screens/upload_pem3.png">
<br> 

Perform this command to logon into the bitnami server, make sure the pem is on the current directory.

```
$ ls -lrt <pem filename>
$ chmod 400 <pem filename>
$ ssh -i <pem filename> bitnami@<aws ec2 hostname>
```
Upon logging into the EC2 instance, change directory to /home/bitnami
```
$ cd /home/bitnami 
```

16. Server will prompt client to accept fingerprint signature before the terminal is allow to logon. Type 'Yes' and press enter

```
The authenticity of host '52.221.182.172 (52.221.182.172)' can't be established.
ECDSA key fingerprint is SHA256:XHAuxI+mgND3yKJosxgTGXRskXCOehc5kCkA+KztOI4.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '52.221.182.172' (ECDSA) to the list of known hosts.
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.4.0-1085-aws x86_64)
       ___ _ _                   _
      | _ |_) |_ _ _  __ _ _ __ (_)
      | _ \ |  _| ' \/ _` | '  \| |
      |___/_|\__|_|_|\__,_|_|_|_|_|

  *** Welcome to the Bitnami Jenkins 2.176.1-0 ***
  *** Documentation:  https://docs.bitnami.com/aws/apps/jenkins/ ***
  ***                 https://docs.bitnami.com/aws/ ***
  *** Bitnami Forums: https://community.bitnami.com/ ***
```

17. Look for the username and password under the bitnami_credentials file. View the bitnami_credentials file with the following command

```
more bitnami_credentials
```
As result the more command will show the default username and password on your terminal screen

```
Welcome to the Bitnami Jenkins Stack

******************************************************************************
The default username and password is 'user' and 'Dh9b6mi4AQOF'.
******************************************************************************

You can also use this password to access the databases and any other component the stack in
cludes.

Please refer to https://docs.bitnami.com/ for more details.
```

18. Retrieve ip4 public IP address or the DNS name from the AWS jenkins instance console panel
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/jenkins14.png"/>
<br>

19. Launch the web browser then access the jenkins web admin app.
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/jenkins15.png"/>
<br>

20. Login to Jenkins with the username and password retrieve from the bitnami credentials flat file
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/jenkins16.png"/>
<br>

21. Screenshot the jenkins dashboard page with the URL shown on the address bar. Save the screenshot to Luminus submission folder.
