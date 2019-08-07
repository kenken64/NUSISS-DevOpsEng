# Jenkins CI Setup

## Pre-requisite
* AWS Account 
* Oracle Account
* Github Account 

## Setup Jenkins before creating new build job

1. Launch internet browser, navigate to the <bitnami jenkins Public DNS>. Login using the credential retrieve from the credential file

<br>
<img style="float: center;" src="./screens/jenkinsci2.png">
<br>

2. Go to Manage Jenkins then Global Tool configuration -> Configure JDK. Input name as 'JDK', prepare with your Oracle credential to login so that the installer can download JDK From Oracle website, tick agree with the T&E. Click Save

<br>
<img style="float: center;" src="./screens/jenkinsci1.png">
<br>

3. Go to Manage Jenkins then Global Tool configuration -> Install & Configure Ant. 

<br>
<img style="float: center;" src="./screens/jenkinsci3.png">
<br>

4. Install & Configure Maven under the Global Tool configuration

<br>
<img style="float: center;" src="./screens/jenkinsci4.png">
<br>

5. Install & Configure Docker under the Global Tool configuration

<br>
<img style="float: center;" src="./screens/jenkinsci5.png">
<br>

6. Restart Jenkins, copy and paste the URL on your browser's address bar

http://ec2-52-221-182-172.ap-southeast-1.compute.amazonaws.com/jenkins/safeRestart

## Create an Ant Project Job 

1. Fork the following git repository https://github.com/kenken64/StackAnnotation to your own Github Account

2. Clone the codes down to your local working directory
```
git clone https://github.com/<your username>/StackAnnotation
```

3. Branch it as development, check it into the remote repository

```
git checkout -b development
git add .
git commit -m "new development branch"
git push origin development
```

<br>
<img style="float: center;" src="./screens/jenkinsci6.png">
<br>

2. Go to Jenkins, configure a new freestyle job


3. Enter task description as 'This is a StackAnnotation ant build'

4. Tick the Github Project option then enter the url as <your StackAnnotation github repo url>

5. Under source code management, select Git ten enter the repository URL as <your StackAnnotation github repo url>. Change the branch to be build to '*/development'

6. Configure poll interval for the source code retrieval to be used as new build. Check Github hook trigger for GITScm polling and pilling SCM


