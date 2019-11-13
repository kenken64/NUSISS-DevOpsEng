# S-DOEA - Workshop - End to end DevOps Engineering and Automation

## AWS Codestar with Python Flask Project

At the end of this tutorial, you will be able to push your code changes to Github and run it in an EC2 instance deployed AWS CodeBuild.

All of AWS services in this tutorial should be in the same region Singapore (ap-southeast-1).

## Pre-requisites
- Github Account
- AWS Account
- Region : Sydney
- AWS EC2 Key Pair. [Follow this tutorial](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#having-ec2-create-your-key-pair) and take note of your Key Pair. *There is no need for us to ssh into a machine here so we can skip the `chmod` step in the guide.*

## Step by step guide - basic CodeStar setup

1. Open [AWS Codestar](https://console.aws.amazon.com/codestar/home).

1. Click "Create a new project".

1. Choose Python (Flask) Web server / Amazon EC2.

1. Enter your Project Details.

1. Choose GitHub as your repository.

1. Click "Connect to GitHub" button.

    ![CodeStar Project Details](screens/codestar-project-details.png "CodeStar Project Details")

1. Enter your GitHub reporitory details.

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


## AWS Codestar integrate with Jenkins using ASP.Net Core Project template

1. Repeat the above steps 1 - 11, select 'ASP.NET Core' Web service on EC2 when creating the new codestar template wizard.

 ![CodeStar Project Details](screens/codestar_dotnet.jpg "CodeStar Project Details")

1. Logon to the AWS Jenkins as below:-

* Jenkins Server 1
    - url : http://ec2-52-221-182-172.ap-southeast-1.compute.amazonaws.com/jenkins/
    - username : user
    - password : ```<PASSWORD WILL BE PROVIDED DURING CLASS>```

* Jenkins Server 2
    - url : http://ec2-3-105-229-16.ap-southeast-2.compute.amazonaws.com/jenkins/
    - username : user
    - password : ```<PASSWORD WILL BE PROVIDED DURING CLASS>```

1. Create a new freestyle project item with following naming convention 'aws_dotnet_<your initial>'

1. Configure the jenkins job as below, make sure to replace all the userid in the screenshots 

   ![CodeStar Project Details](screens/codestar_dotnet2.jpg "CodeStar Project Details")
   ![CodeStar Project Details](screens/codestar_dotnet3.jpg "CodeStar Project Details")
   ![CodeStar Project Details](screens/codestar_dotnet4.jpg "CodeStar Project Details")
   ![CodeStar Project Details](screens/codestar_dotnet5.jpg "CodeStar Project Details")

1. Try to make any simple changes to the README.md and commit your codes to the github repo.

1. Capture screenshot of the successful build, save it along as part of your submission.