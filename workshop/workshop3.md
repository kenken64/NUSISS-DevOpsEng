# S-DOEA - Workshop 3 - Jenkins - CI Workshop

## Pre-requisite
* AWS Account (Will be provided by NUS ISS)
* Oracle Account (Optional)
* Github Account (https://github.com/)

## Setup Jenkins before creating new build job

1. Launch internet browser, navigate to the link below. Login using the credential provided as below:-

* Jenkins Server 1
    - url : http://52.76.25.79/jenkins/
    
* Jenkins Server 2
    - url : http://3.24.33.126/jenkins/

<br>
<img style="float: center;" src="./screens/jenkinsci2.png">
<br>


## Create an Ant Project Job 

1. Fork the following git repository https://github.com/kenken64/StackAnnotation to your own Github Account

<br>
<img style="float: center;" src="./screens/jenkinsci6.png">
<br>

2. Clone the codes down to your local working directory. Replace ```<your username>``` with your own Github username.
```
git clone https://github.com/<your username>/StackAnnotation
```

3. Go to Jenkins, configure a new freestyle job as per the screenshot. Name your job item as "StackAnnotation_your initial"

<br>
<img style="float: center;" src="./screens/jenkinsci7.png">
<br>

4. Enter task description as 'This is a StackAnnotation ant build'

5. Tick the Github Project option then enter the url as ```<your StackAnnotation github repo url>```

<br>
<img style="float: center;" src="./screens/jenkinsci8.png">
<br>

6. Under source code management, select Git then enter the repository URL as ```<your StackAnnotation github repo url>```. Change the branch to be build to '*/development'

<br>
<img style="float: center;" src="./screens/jenkinsci11.png">
<br>

7. Configure poll interval for the source code retrieval to be used as new build. Check Github hook trigger for GITScm polling and pilling SCM. Configure the polling schedule as * * * * * (Polling every minute, feel free to change to your desire scheduling timing)

<br>
<img style="float: center;" src="./screens/jenkinsci10.png">
<br>

8. Configure the pre build step, add invoke ant step then select Ant version as 'Ant' follow by targets as build

<br>
<img style="float: center;" src="./screens/jenkinsci14.png">
<br>


9. Before configure this step. Run the build manually with the step 8 configured and saved. Once the manual trigger build is successful proceed with configure the post build action where it will generate Junit published report from the ant build

<br>
<img style="float: center;" src="./screens/jenkinsci15.png">
<br>

10. The build will trigger automatically

<br>
<img style="float: center;" src="./screens/jenkinsci16.png">
<br>
<img style="float: center;" src="./screens/jenkinsci17.png">
<br>
11. Lets make changes to the test case and invalidate the build. the build on jenkins will fail. Under the file MyStringStackTest.java under the testPush method right after the instantiation of the MyStringStack class.

```
MyStringStack stack = new MyStringStack();
stack.push (s1);
assertTrue (stack.isEmpty());
```

12. Commit the changes to the github.
```
git add .
git commit -m "fail the test case"
git push origin development
```
13. The outcome of the build will be unstable
<br>
<img style="float: center;" src="./screens/jenkinsci18.png">
<br>

<br>
<img style="float: center;" src="./screens/jenkinsci19.png">
<br>

<br>
<img style="float: center;" src="./screens/jenkinsci20.png">
<br>

## Create a Maven Project Job 

1. Fork the following git repository https://github.com/kenken64/StackAnnotationMaven.git to your own Github Account

<br>
<img style="float: center;" src="./screens/jenkinsci12.png">
<br>


2. Clone the codes down to your local working directory. Replace ```<your username>``` with your own Github username.
```
git clone https://github.com/<your username>/StackAnnotationMaven.git
```

3. Go to Jenkins, configure a new freestyle job as per the screenshot. Name your job item as "StackAnnotationMaven_your initial"
<br>
<img style="float: center;" src="./screens/jenkinsci21.png">
<br>

4. Enter task description as 'This is a StackAnnotation Maven build'

5. Tick the Github Project option then enter the url as ```<your StackAnnotationMaven github repo url>```

<br>
<img style="float: center;" src="./screens/jenkinsci22.png">
<br>

6. Under source code management, select Git then enter the repository URL as 'your StackAnnotationMaven github repo url'. Change the branch to be build to '*/development'

7. Configure poll interval for the source code retrieval to be used as new build. Check Github hook trigger for GITScm polling and pilling SCM

8. Under source code management, select Git ten enter the repository URL as 'your StackAnnotation github repo url'. Change the branch sepcifier to '*/development'

<br>
<img style="float: center;" src="./screens/jenkinsci23.png">
<br>

9. Check the poll interval for the source code retrieval to be used as new build. Check Github hook trigger for GITScm polling and pilling SCM. Configure the polling schedule as * * * * * (Polling every minute, feel free to change to your desire scheduling timing)

<br>
<img style="float: center;" src="./screens/jenkinsci24.png">
<br>

10. Configure the pre build step, add top-level Maven step then select Maven version as 'Maven' follow by entering goals as surefire-report:report. Refer to https://maven.apache.org/surefire/maven-surefire-report-plugin/usage.html

<br>
<img style="float: center;" src="./screens/jenkinsci25.png">
<br>


11. Lastly, configure the post build action where it will generate Junit published report from the maven build. Enter 'target/surefire-reports/TEST-sg.edu.nus.StackAnnotation.AppTest.xml' to the test report XML field.

<br>
<img style="float: center;" src="./screens/jenkinsci26.png">
<br>

12. The build will trigger automatically

<br>
<img style="float: center;" src="./screens/jenkinsci27.png">
<br>
<img style="float: center;" src="./screens/jenkinsci28.png">
<br>
13. Lets make changes to the test case and invalidate the build. Under the file AppTest.java line 18 change the code to as below 

```
assertTrue( false );
```

14. Commit the changes to the github.
```
git add .
git commit -m "fail the test case"
git push origin development
```
15. The outcome of the build will be unstable. Status of the build will be flag out as amber.
<br>
<img style="float: center;" src="./screens/jenkinsci29.png">
<br>

<br>
<img style="float: center;" src="./screens/jenkinsci30.png">
<br>

<br>
<img style="float: center;" src="./screens/jenkinsci31.png">
<br>

<br>
<img style="float: center;" src="./screens/jenkinsci32.png">
<br>
