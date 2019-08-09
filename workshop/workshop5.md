# Containers and Container Management 

## Pre-requisite
* AWS Account 
* Dockerhub Account
* Github Account

## Test out the Docker installation on the Puppet Slave server

1. Test out whether docker cli is install correctly

```
docker -v
```

2. Test out whether docker-compose is installed correctly

```
docker-compose -v
```

3. Create the docker group.

```
sudo groupadd docker
```

4. Add your user to the docker group.

```
sudo usermod -aG docker $USER
```

5. Verify that you can run docker commands without sudo.

```
$ docker run hello-world
```

This command downloads a test image and runs it in a container. When the container runs, it prints an informational message and exits.

If you initially ran Docker CLI commands using sudo before adding your user to the docker group, you may see the following error, which indicates that your ~/.docker/ directory was created with incorrect permissions due to the sudo commands.
```
WARNING: Error loading config file: /home/user/.docker/config.json -
stat /home/user/.docker/config.json: permission denied
```

To fix this problem, either remove the ~/.docker/ directory (it is recreated automatically, but any custom settings are lost), or change its ownership and permissions using the following commands:

```
$ sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
$ sudo chmod g+rwx "$HOME/.docker" -R
```

## Dockerized a sample web app

<img src="../container/images/img16.png" width="400" height="200">

<img src="../container/images/img17.png" width="400" height="200">

1. Create a Dockerfile.dev under the React App (subsdevices)

```
FROM node:alpine

WORKDIR '/app'

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
```

2. Build the docker image

```
sudo docker build -f Dockerfile.dev -t kenken64/react-app
```

3. Run the docker image as container with port forward and volume mounting

```
sudo docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app kenken64/react-app
```

4. Download ngrok since the react app doesn't have SSL installed

```
chmod +x ngrok
./ngrok authtoken KuTKRosrawrDMAgX1ayq_7AAmsVSom4E6GtT18S1pn
./ngrok http 3000
```

5. Use web browser to access the generated ngrok address from the terminal

6. Create a docker-compose.yml

```
version: '3'
services:
    web:
      build:
        context: .
        dockerfile: Dockerfile.dev
      ports:
        - "3000:3000"
      volumes:
        - /app/node_modules
        - .:/app
```

7. Start the docker container using docker-compose

```
sudo docker-compose up --build
```

8. Implement test on separate container

```
sudo docker exec -it 87b898a5cc64 npm run test
```

- Add test service in the docker compose yml file

```
version: '3'
services:
    web:
      build:
        context: .
        dockerfile: Dockerfile.dev
      ports:
        - "3000:3000"
      volumes:
        - /app/node_modules
        - .:/app
    test:
      build:
        context: .
        dockerfile: Dockerfile.dev
      volumes:
          - /app/node_modules
          - .:/app
      command: ["npm", "run", "test"]
```

9. Start the docker container using docker-compose

```
sudo docker-compose up --build
```

10. Multi step build process, different base images

```
# builder phase
FROM node:alpine as builder

WORKDIR '/app'

COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html
```

11. Build the multi phase container setup

```
sudo docker build .
```

12. Start the multi phase container setup and expose the port

```
sudo docker run -p 8080:80 936ca285e822
```

13. Use ngrok to tunnel due to we do not have domain name, take the generated domain name and test it on the web browser

```
./ngrok http 8080
```

14. Let's integrate with the travis CI with AWS elastic beanstalk, create a .travis.yml

<img src="../container/images/img18.png">
<img src="../container/images/img19.png" width="600" height="400">

<img src="../container/images/img20.png">

```
sudo: required
services:
  - docker

before install:
  - docker build -t kenken64/subsdevices:v1 -f Dockerfile.dev .

script:
  - docker run kenken64/subsdevices:v1 npm run test -- --coverage
```

15. Login into travis CI dashboard and monitor the successful build

16. Login into AWS account and create a elastic beanstalk instance.
    Watch the below step by step walkthorugh youtube videos:-

| Video URL                    |                    Description                     |
| ---------------------------- | :------------------------------------------------: |
| https://youtu.be/L01gk757pq4 |           AWS - Create Elastic BeanStalk           |
| https://youtu.be/vJG-4J2cp0s |       AWS - Create Elastic BeanStalk Part 2        |
| https://youtu.be/vz2Y8LvcdHw | Configure IAM for Travis CI with Elastic Beanstalk |
| https://youtu.be/XUfBsttJnbA |         Configure env variable @ Travis CI         |

- Make sure the AWS region is always set to <b>Singapore</b>
- Deployment type is choosen as Docker
- Source code is Sample application given in this tutorial
- The configuration and setup takes a few minutes to finish.

17. Amend the .travis.yml with additional deployment

```
sudo: required
services:
  - docker

before install:
  - docker build -t kenken64/subsdevices:v1 -f Dockerfile.dev .

script:
  - docker run kenken64/subsdevices:v1 npm run test -- --coverage

deploy:
  provider: elasticbeanstalk
  region: "ap-southeast-1"
  app: "docker-subdevices"
  env: "DockerSubdevices-env"
  bucket_name: "elasticbeanstalk-ap-southeast-1-200097394821"
  bucket_path: "docker-subdevices"
  on:
    branch: master
  access_key_id: $AWS_ACCESS_KEY
  secret_access_key:
    secure: "$AWS_SECRET_KEY"
```

18. Git add, commit and push to the github repo that is configure with travis CI

<img src="../container/images/img21.png" >
<br>
<img src="../container/images/img22.png" >
<br>
<img src="../container/images/img23.png">

<img src="../container/images/img21.png">

<img src="../container/images/img22.png">

<img src="../container/images/img23.png">

<img src="../container/images/img24.png">

<img src="../container/images/img25.png">

<img src="../container/images/img26.png">

## Create Elastic Container Service

1.	Before creating a new ECS cluster, navigate to EC2 Service on the AWS console.
 

2.	Select ‘Key Pairs’ on the left-hand side menu.
 
 
3.	Click ‘Create Key Pair’ button.
 

4.	Ensure your new key pair has been created.
 

 
5.	Create a Security Group.
 
Or alternatively, if you already have a security group created previously. You may use an existing security group.

6.	On the AWS console, navigate to Elastic Container Service.
 

 
7.	Click ‘Create Cluster’ button to create a new cluster.
 

8.	Choose EC2 Linux + Networking and click ‘Next’ button.
 

 
9.	Configure the cluster with the following information:
 
 

If you have previously spin off EC2 instances, VPC and subnets will have already been created and you could use them for this workshop to create your new EC2 instances. 
 
10.	Choose the security group you have created earlier and let the ECS automatically Create new container instance IAM role for you.
 

	Click ‘Create’ button to continue to create your new cluster.
 
  
11.	Once you have successfully created your cluster, you will see a similar screen as shown.
  

## Create AWS ECR Repository

1.	Under Amazon EMR, click on Repositories. Or ‘Create repository’.
 

2.	Provide the new repository a name.
 

	Click ‘Next step’ button to start creating a new repository.
 
3.	You should see a similar screen as shown.
 
 

4.	Select and navigate into the repository you have just created. Click on ‘Permission’ tab.
  
5.	Enable permissions on the repository.
 
 

	Click ‘Save all’ button to apply the changes to the repository.
 
6.	Go into your IAM, ensure you have the necessary writes to access the Amazon EC2 Container Registry.
 
Without the relevant rights access to the user, you will not be able to use docker command to push images into the ECR repository you have created.

7.	Make sure you attach the policy (permission) to the user that will be used to login to AWS via docker for pushing the image.
 
 
8.	Execute the command 
```
aws ecr get-login --no-include-email --region ap-southeast-1 
```

to get the command to login to AWS using Docker.
 
	Login using the command string return from the response.

9.	Execute the command 
```
docker tag myapp:latest 557271209954.dkr.ecr.ap-southeast-1.amazonaws.com/mysimpledockerprojectrepo:latest to tag the image for deploying to AWS ECS.
```

 
10.	Execute the command 
```
docker push 557271209954.dkr.ecr.ap-southeast-1.amazonaws.com/mysimpledockerprojectrepo:latest 
```
to push the image to AWS-ECR repository you have created earlier.
 

11.	You should be able to push your image successfully to AWS ECR if you have login successfully via docker command as shown.


## Create ECS Task Definition

1.	Under Amazon ECS, select Task Definitions.
 

2.	Provide a name for the task.
 
 
3.	Leave the section ‘Task size’ blank. Don’t fill in any value as shown.
 

4.	Click ‘Add container’ button to add a container.
 
 
5.	Provide the container a name.
 
Image is the ECR repo URL with a tag.
Port mappings is very important. 
Container port is the port used in the application. In this case, i.e. port 3000.
Host port is the port it will run the application via the container over the virtualized environment over the Internet, i.e. port 80. In this case, this refers to the EC2 host.

 
6.	Provide additional mandatory information.
 

Click ‘Add’ button to proceed with creating the container for the task.

7.	Click ‘Create’ button to start creating the task.
 
 
8.	You should receive a notification that the task definition has been created successfully.
 
 9.	Check and ensure that your container configurations and port mappings are correct as shown.


## Create an ECS Service

1.	Under the cluster, select the cluster you have created.
 

2.	Under Services tab, click ‘Create’ button to create a new service.
 
 
3.	Provide the following information as shown.
 
 
 
4.	Configure the network information as shown.
 
 
 
5.	Determine if there will be auto scaling as shown.
 

6.	Review your service configuration.
 

	Click ‘Create Service’ to start creating your service.
 
7.	You show see the message as shown if you have successfully created your service.


## Run the task and test your application

1.	Create a task to run.
 
 

Click ‘Run Task’ button to start running the task.

 
2.	Go to your EC2 instance.
 

3.	Copy the public DNS (IPv4) address and paste it on another browser’s tab. You should see the web application running similar to the one shown.

For further Docker swarm workshop please refer to the following link https://github.com/kenken64/NUSISS-DevOpsEng/blob/master/swarm/README.md