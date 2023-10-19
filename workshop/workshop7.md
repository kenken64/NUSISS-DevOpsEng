# S-DOEA - Workshop 7 - End to end DevOps Engineering and Automation

## AWS Codestar with Python Flask Project

At the end of this tutorial, you will be able to push your code changes to Github and run it in an EC2 instance deployed AWS CodeBuild.

All of AWS services in this tutorial should be in the same region Singapore or Sydney (ap-southeast-1 or ap-southeast-2).

## Pre-requisites
- Team workshop
- Github Account
- AWS Account
- AWS Region : Singapore/Sydney (ap-southeast-1/2)
- AWS EC2 Key Pair. [Follow this tutorial](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#having-ec2-create-your-key-pair) and take note of your Key Pair. *There is no need for us to ssh into a machine here so we can skip the `chmod` step in the guide.*

## Step by step guide - basic CodeStar setup

1. Open [AWS Codestar](https://console.aws.amazon.com/codestar/home).

1. Click "Create a new project".

1. Choose Python (Flask) Web server / Amazon EC2.

1. Enter your Project Details.

1. Choose GitHub as your repository.

1. Click "Connect to GitHub" button.

    ![CodeStar Project Details](screens/codestar-project-details.png "CodeStar Project Details")

1. Enter your GitHub reporitory details. Select repo as public. 

    ![GitHub repository details](screens/codestar-github-connect.png "GitHub repository details")

1. After reviewing the project details, click "Create Project". This will automatically create the GitHub repository for you. You can visit GitHub afterwards to see your repository.

1. Choose the keypair that you have created in the Pre-Requisites as you Key Pair.

1. Click "Next" button, you will be redirected to the Project setup page. Try to refresh the page to see if the project setup has finished.

    ![Project loading](screens/setup-loading.png "Project loading")


1. Capture screenshot of the successful build, save it along as part of your submission.

1. In the lower right side of the Project setup page, the application endpoint will show up when the deployment has finished loading. You can check the deployment status in the Continuous deployment section.

1. Click the Application Endpoint when it is ready and you should be able to see the JSON response of your Flask API.

1. Update your `helloworld/application.py` file to change your application's output using GitHub's web interface. Observe the deployment pipeline and refresh your Application Endpoint. You can change the following line under the `get()` method:

    ```
    return Response(json.dumps({'Output': 'Hello World from Codestar'}), mimetype='application/json', status=200)
    ```
1. Capture screenshot of the failed build, save it along as part of your submission.


## AWS Codestar integrate with Jenkins using Spring Boot Project template

1. Repeat the above steps 1 - 11, select 'Java Spring' Web service on EC2 when creating the new codestar template wizard.

 ![CodeStar Project Details](screens/javaspringboot/10.png "CodeStar Project Details")

![CodeStar Project Details](screens/javaspringboot/11.png "CodeStar Project Details")

![CodeStar Project Details](screens/javaspringboot/12.png "CodeStar Project Details")

![CodeStar Project Details](screens/javaspringboot/13.png "CodeStar Project Details")

![CodeStar Project Details](screens/javaspringboot/14.png "CodeStar Project Details")


![CodeStar Project Details](screens/javaspringboot/15.png "CodeStar Project Details")

![CodeStar Project Details](screens/javaspringboot/16.png "CodeStar Project Details")

![CodeStar Project Details](screens/javaspringboot/17.png "CodeStar Project Details")

![CodeStar Project Details](screens/javaspringboot/18.png "CodeStar Project Details")

![CodeStar Project Details](screens/javaspringboot/9.png "CodeStar Project Details")

2. Logon to your own AWS Jenkins as below:-


* Your own AWS Jenkins Server 
    - url : http://```<your AWS Jenkins server's public ip address>```/jenkins/

* Install all the required plugins. Lecturer will provide the plugins pdf in the class. 

* Setup the system configuration according to the screenshot

![CodeStar Project Details](screens/javaspringboot/19.png "CodeStar Project Details")

![CodeStar Project Details](screens/javaspringboot/20.png "CodeStar Project Details")

![CodeStar Project Details](screens/javaspringboot/21.png "CodeStar Project Details")

![CodeStar Project Details](screens/javaspringboot/22.png "CodeStar Project Details")
   

3. Create a new freestyle project item with following naming convention ```'aws_javaspringboot_group name>'```

4. Configure the jenkins job as below

    ![CodeStar Project Details](screens/javaspringboot/23.png "CodeStar Project Details")

    ![CodeStar Project Details](screens/javaspringboot/24.png "CodeStar Project Details")

    ![CodeStar Project Details](screens/javaspringboot/25.png "CodeStar Project Details")

 -  Configure SCM and the build schedule trigger
 - Create 5 shell execute under the pre jenkins action

![CodeStar Project Details](screens/javaspringboot/4.png "CodeStar Project Details")
   
![CodeStar Project Details](screens/javaspringboot/5.png "CodeStar Project Details")

![CodeStar Project Details](screens/javaspringboot/6.png "CodeStar Project Details")

![CodeStar Project Details](screens/javaspringboot/7.png "CodeStar Project Details")

![CodeStar Project Details](screens/javaspringboot/8.png "CodeStar Project Details")

5. Capture screenshot of the successful build, save it along as part of your submission.

6. Open your preferred editor and access the Spring Boot project. Modify the Spring Boot test case located in the namespace com.aws.codestar.projecttemplates.controller.HelloWorldControllerTest. Update the EXPECTED_RESPONSE_VALUE to say "Hello AWS CodeStar!!".

7. Commit your codes to the github and watch how the build will fail.

8. Capture screenshot of the failed build, save it along as part of your submission.

9. Stabilize the test case before dockerized the app. Revert back the changes back to a successful build.

10. Create a Dockerfile on the root of the project directory for this Spring Boot project. *Hint shown  during lecturer day3.

```
FROM tomcat:latest

ADD target/ROOT.war /usr/local/tomcat/webapps/

EXPOSE 8080

CMD ["catalina.sh", "run"]


```

11. Commit the Dockefile into your github repository.

12. Set up the pre-build step in your Jenkins configuration to push the project's image to DockerHub. Use your DockerHub username as the prefix for the image tag, and provide DockerHub credentials. If you face permission issues, ensure that the Jenkins Unix user has the necessary Docker permissions. Additionally, perform a Docker login before pushing the image to Docker Hub.

![CodeStar Project Details](screens/javaspringboot/1.png "CodeStar Project Details")

![CodeStar Project Details](screens/javaspringboot/2.png "CodeStar Project Details")

![CodeStar Project Details](screens/docker_jenkins.jpg "CodeStar Project Details")

13. Capture screenshot of the successful docker build and also the image is being store on the dockerhub repo, save it along as part of your submission.

![CodeStar Project Details](screens/javaspringboot/3.png "CodeStar Project Details")

14. Try accessing the app via the end point created from the CodeStar dashboard.

## Design and proposed CI CD pipeline for StoolViriiDetect Pte Ltd COVID19 - Internet of Things Project.

To detect covid19 cluster as early as possible, SG GovHighTech recently awarded StoolViriiDetect Pte Ltd the project to use their stool detection sensor solution in every residential area islandwide. The collected data should be sent to the Health Authority for analysis twice a day via a secure cloud channel. Kindly proposed an end to end CI CD pipeline for this project.

Things that the team should consider as below:-
* Public Web App and API with a geolocation-based map showing a possible cluster
* Private Web App with a map showing possible cluster and additional info
* Integrated with the trace together mobile app to notify users that a potential new cluster. (Near to realtime)
* Live update (firmware) to all the deployed sensors
* Name all the technological stacks in terms of DevOps and implementation of your proposal.
* The solution must be regional within the country. (Areas)

https://www.youtube.com/watch?v=XeFOpSNgSGk

https://www.youtube.com/watch?v=nN9d_bLE-vM&t=127s
