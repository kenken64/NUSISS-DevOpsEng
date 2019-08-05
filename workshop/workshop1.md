# Jenkins Installation

1. Use bitnami instance
2. Get the password 
3. Learn how to setup jenkins project
4. Familiar with the configuration


## Pre-requisites for cloud installation
* AWS account

### Step by step installation
1. Navigate to the services link
2. Select EC2
3. Launch a new instance
4. Choose Ubuntu 18.04 free tier
5. Generate a new key for the ssh login
6. 

## Pre-requisites for local workstatio installation
* Java JDK 9

### Step by step installation
1. Navigate the Jenkins official website. Download the WAR file from the LTS link. By default, the latest release and the Long-Term support release will be available for download. The past releases are also available for download. Click the Long-Term Support Release tab in the download section. 

<img style="width:650px;height:400px; float: right;" src="./screens/jenkins.png">

<br>

<img style="width:650px;height:400px; float: right;" src="./screens/jenkins2.png">

2. Open the terminal/command prompt. From the command prompt browse to the directory where the jenkins.war is saved. Run the following command

```
$ java -jar jenkins.war
```

