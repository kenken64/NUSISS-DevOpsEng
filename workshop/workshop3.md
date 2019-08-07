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

<br>
<img style="float: center;" src="./screens/jenkinsci6.png">
<br>

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


4. Go to Jenkins, configure a new freestyle job

<br>
<img style="float: center;" src="./screens/jenkinsci7.png">
<br>

5. Enter task description as 'This is a StackAnnotation ant build'

6. Tick the Github Project option then enter the url as <your StackAnnotation github repo url>

<br>
<img style="float: center;" src="./screens/jenkinsci8.png">
<br>

7. Under source code management, select Git ten enter the repository URL as <your StackAnnotation github repo url>. Change the branch to be build to '*/development'

<br>
<img style="float: center;" src="./screens/jenkinsci11.png">
<br>

8. Configure poll interval for the source code retrieval to be used as new build. Check Github hook trigger for GITScm polling and pilling SCM.

<br>
<img style="float: center;" src="./screens/jenkinsci10.png">
<br>

9. configure the pre build step, add invoke ant step then select Ant version as 'Ant' follow by targets as build

<br>
<img style="float: center;" src="./screens/jenkinsci13.png">
<br>


10. Lastly, configure the post build action where it will generate Junit published report from the ant build

<br>
<img style="float: center;" src="./screens/jenkinsci14.png">
<br>

11. The build will trigger automatically

<br>
<img style="float: center;" src="./screens/jenkinsci15.png">
<br>

12. Lets make changes to the test case and invalidate the build. the build on jenkins will fail

<br>
<img style="float: center;" src="./screens/jenkinsci16.png">
<br>

## Create an Maven Project Job 

1. Fork the following git repository https://github.com/kenken64/StackAnnotationMaven.git to your own Github Account

<br>
<img style="float: center;" src="./screens/jenkinsci12.png">
<br>


2. Clone the codes down to your local working directory
```
git clone https://github.com/<your username>/StackAnnotationMaven.git
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


3. Enter task description as 'This is a StackAnnotation Maven build'

4. Tick the Github Project option then enter the url as <your StackAnnotationMaven github repo url>

5. Under source code management, select Git ten enter the repository URL as <your StackAnnotationMaven github repo url>. Change the branch to be build to '*/development'

6. Configure poll interval for the source code retrieval to be used as new build. Check Github hook trigger for GITScm polling and pilling SCM

