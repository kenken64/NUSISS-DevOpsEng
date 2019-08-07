# Jenkins CI Setup

## Pre-requisite
* AWS Account 
* Oracle Account

## Setup Jenkins before creating project

1. Launch internet browser, navigate to the <bitnami jenkins Public DNS>. Login using the credential retrieve from the credential file

<br>
<img style="float: center;" src="./screens/jenkinsci1.png">
<br>

2. Go to Manage Jenkins then Global Tool configuration -> Configure JDK. Input name as 'JDK', prepare with your Oracle credential to login so that the installer can download JDK From Oracle website, tick agree with the T&E. Click Save

<br>
<img style="float: center;" src="./screens/jenkinsci2.png">
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

## Create a Ant Project Job 

1. Configure a new project as development
2. Configure a new project as staging
3. Configure as production
4. All from different branches
5. Introduce pull request to merge from one branch to another
6. Demo the build are propogated from one jenkins task to another