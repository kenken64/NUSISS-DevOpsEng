# S-DOEA - Workshop 5 - Containers and Container Management Workshop

## Pre-requisite
* AWS Account 
* Dockerhub Account
* Github Account
* Access to the following URL : https://nusiss.ngrok.io/
* Reference material - https://gitlab.com/kenken64/docker-3tier-ecs 
* AWS Region: Sydney (ap-southeast-2)

## Test out the Docker installation on the Puppet Slave server

1. Test out whether docker cli is install correctly

```
docker -v
```

2. Test out whether docker-compose is installed correctly. If not kindly follow this installation guide (Linux) (https://docs.docker.com/compose/install/#install-compose)

```
docker-compose -v
```

3. Create the docker group.

```
$ sudo groupadd docker
```

4. Add your user to the docker group. Refresh the user's profile

```
sudo usermod -aG docker $USER

```

Refresh the user profile by issuing the below command

```
source ~/.bashrc
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

Relogin your Notebook terminal

## Dockerized a sample web app

<img src="../container/images/img16.png" width="400" height="200">

<img src="../container/images/img17.png" width="400" height="200">

1. Clone source code repo from https://github.com/kenken64/reactjs-subdevice.git . 

```
git clone https://github.com/kenken64/reactjs-subdevice.git

cd reactjs-subdevice
```

2. Create a Dockerfile.test under the React App (subsdevices)

```
FROM node:alpine

WORKDIR '/app'

COPY package.json ./
RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]
```

3. Build the docker image

```
docker build -f Dockerfile.test -t kenken64/react-app .
```

4. Run the docker image as container with port forward and volume mounting, once is up and running. To terminate this process press Ctrl + C

```
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app kenken64/react-app
```

5. Create a docker-compose.yml

```
version: '3'
services:
    web:
      build:
        context: .
        dockerfile: Dockerfile.test
      ports:
        - "3000:3000"
      volumes:
        - /app/node_modules
        - .:/app
```

6. Start the docker container using docker-compose.

```
docker-compose up --build
```

7. Launch another Jupyter notebook terminal (slave server) to execute this step. Implement test on separate container, please replace the hash value of the container id from ps command

```
docker ps 
docker exec -it <_test container id from docker ps> npm run test
```

- Add test service in the docker compose yml file

```
version: '3'
services:
    web:
      build:
        context: .
        dockerfile: Dockerfile.test
      ports:
        - "3000:3000"
      volumes:
        - /app/node_modules
        - .:/app
    test:
      build:
        context: .
        dockerfile: Dockerfile.test
      volumes:
          - /app/node_modules
          - .:/app
      command: ["npm", "run", "test"]
```

8. Start the docker container using docker-compose, once the process is running with warning messages press Ctrl + C to terminate the prompt. 

```
docker-compose up --build
```

9. Multi step build process, different base images, create a Dockerfile file and copy paste the below to the Dockerfile

```
# builder phase
FROM node:alpine as builder

WORKDIR '/app'

COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html
```

10. Build the multi phase container setup, DO NOT terminate this process. Wait till the following show up Successfully built ```<image id>```

```
docker build .
```

11. Start the multi phase container setup and expose the port, please replace the hash value of the container id from step 10

```
nohup docker run -p 80:80 <image id> &
```

12. Launch your browser and try accessign the app http://```<aws ec2 slave server public DNS>```

13. Login to docker hub through the CLI

```
$ sudo apt install gnupg2 pass
$ docker login
```

```
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: <your dockerhub username>
Password:
WARNING! Your password will be stored unencrypted in /home/bunnyppl/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```

14. Retrieve the docker Id from cli

```
$ docker images
```

15. Tag the image

```
$ docker tag <docker ps image id> <your dockerhub userid>/subsdevices:v1
```

16. Push the tagged image to the docker hub

```
$ docker push <your dockerhub userid>/subsdevices:v1
```

```
The push refers to repository [docker.io/kenken64/subsdevices]
82674fe9a8e6: Pushed
6f5e00ced6e0: Pushed
86865100bc00: Pushed
7e93be41b55d: Pushed
1c07e18a989b: Mounted from library/node
b92d384cdf06: Mounted from library/node
a464c54f93a9: Mounted from library/node
v1: digest: sha256:cac661266d1cf19ae4e72f8294e332275a4761a9f5bebe1fd663b1bc3a3c1d9a size: 1788
```

# ECR, ECS Optional 

## Install AWS CLI on the Slave Server via Jupyter Notebook

1. Execute the command line below

```
pip3 install awscli --upgrade --user
```

2. Verify whether aws cli is installed properly

```
aws --version
```

3. Configure the aws cli https://docs.aws.amazon.com/general/latest/gr/rande.html

```
aws configure 

AWS Access Key ID [****************ZLWC]: AKIA4UVXEV7IHCNLZLWCAWS Secret Access Key [****************/oyY]: 9i65B6ADkwZwuM2gkL9cMTHdLpC6oM/Z+M/k/oyY
Default region name [SG]: ap-southeast-2
Default output format [SG]: json
```

## Create Elastic Container Service Cluster

1.	Before creating a new ECS cluster, navigate to EC2 Service on the AWS console.
 
<img src="screens/ecs1.png" />
<br>


2. Select ‘Key Pairs’ on the left-hand side menu.

<img src="screens/ecs2.png" >
<br>

 
3. Click ‘Create Key Pair’ button.
<img src="screens/ecs3.png" >
<br>
 
4.	Ensure your new key pair has been created.
 
<img src="screens/ecs4.png" >
<br>

 
5.	Create a Security Group.

<img src="screens/ecs5.png" >
<br>

Or alternatively, if you already have a security group created previously. You may use an existing security group.

6.	On the AWS console, navigate to Elastic Container Service.
 
<img src="screens/ecs6.png" >
<br>
 
7.	Click ‘Create Cluster’ button to create a new cluster.

<img src="screens/ecs7.png" >
<br>


8.	Choose EC2 Linux + Networking and click ‘Next’ button.
 
<img src="screens/ecs8.png" >
<br>
 
9.	Configure the cluster with the following information:

<br>
<img src="screens/ecs9.png" >
<br>

If you have previously spin off EC2 instances, VPC and subnets will have already been created and you could use them for this workshop to create your new EC2 instances. 


10.	Choose the security group you have created earlier and let the ECS automatically Create new container instance IAM role for you.
 
<img src="screens/ecs10.png" >
<br>

Click <b>‘Create’</b> button to continue to create your new cluster.

<img src="screens/ecs11.png" >
<br> 
  
11.	Once you have successfully created your cluster, you will see a similar screen as shown.

<br>
<img src="screens/ecs13.png" >
<br>

<img src="screens/ecs14.png" >
<br>

<img src="screens/ecs15.png" >
<br>

## Create AWS ECR Repository

1.	Under Amazon EMR, click on Repositories. Or ‘Create repository’.

<br>
<img src="screens/ecs16.png" >
<br>


2.	Provide the new repository a name.
 
<img src="screens/ecs17.png" >
<br>

  Click <b>‘Next step’</b> button to start creating a new repository.

 
3.	You should see a similar screen as shown.
 
<img src="screens/ecs18.png" >
<br> 

4.	Select and navigate into the repository you have just created. Click on ‘Permission’ tab.

<img src="screens/ecs19.png" >
<br>
  
5.	Enable permissions on the repository.
 
<img src="screens/ecs20.png" >
<br> 
<img src="screens/ecs21.png" >
<br> 
<img src="screens/ecs22.png" >
<br> 

  Click <b>‘Save all’</b> button to apply the changes to the repository.

6.	Go into your IAM, ensure you have the necessary writes to access the Amazon EC2 Container Registry.

<img src="screens/ecs23.png" >
<br> 

 
Without the relevant rights access to the user, you will not be able to use docker command to push images into the ECR repository you have created.

7.	Make sure you attach the policy (permission) to the user that will be used to login to AWS via docker for pushing the image.

<img src="screens/ecs24.png" >
<br> 
 
8.	Execute the command

```
(aws ecr get-login --no-include-email --region ap-southeast-2 )
```

to get the command to login to AWS using Docker.


<img src="screens/ecs25.png" >
<br>

Login using the command string return from the response.

9.	Execute the command 
```
docker tag myapp:latest 557271209954.dkr.ecr.ap-southeast-1.amazonaws.com/mysimpledockerprojectrepo:latest 
```

to tag the image for deploying to AWS ECS.


<img src="screens/ecs26.png" >
<br>

 
10.	Execute the command 
```
docker push 557271209954.dkr.ecr.ap-southeast-1.amazonaws.com/mysimpledockerprojectrepo:latest 
```
to push the image to AWS-ECR repository you have created earlier.
 
<img src="screens/ecs27.png" >
<br>

11.	You should be able to push your image successfully to AWS ECR if you have login successfully via docker command as shown.

<img src="screens/ecs28.png" >
<br>


## Create ECS Task Definition

1.	Under Amazon ECS, select Task Definitions.

<img src="screens/ecs29.png" >
<br>

2.	Provide a name for the task.

<img src="screens/ecs30.png" >
<br> 
 
3.	Leave the section ‘Task size’ blank. Don’t fill in any value as shown.
 
<img src="screens/ecs31.png" >
<br>

4.	Click ‘Add container’ button to add a container.
 
<img src="screens/ecs32.png" >
<br>
 
5.	Provide the container a name.

<br>
<img src="screens/ecs33.png" >
<br>

Image is the ECR repo URL with a tag.
Port mappings is very important. 
Container port is the port used in the application. In this case, i.e. port 3000.
Host port is the port it will run the application via the container over the virtualized environment over the Internet, i.e. port 80. In this case, this refers to the EC2 host.

 
6.	Provide additional mandatory information.
 
<img src="screens/ecs34.png" >
<br>

Click ‘Add’ button to proceed with creating the container for the task.

7.	Click ‘Create’ button to start creating the task.

<img src="screens/ecs35.png" >
<br> 


8.	You should receive a notification that the task definition has been created successfully.

<img src="screens/ecs36.png" >
<br>

<img src="screens/ecs37.png" >
<br>

<img src="screens/ecs38.png" >
<br>

9.	Check and ensure that your container configurations and port mappings are correct as shown.

<img src="screens/ecs39.png" >
<br>

## Create an ECS Service

1.	Under the cluster, select the cluster you have created.

<img src="screens/ecs40.png" >
<br>

2.	Under Services tab, click ‘Create’ button to create a new service.
 
<img src="screens/ecs41.png" >
<br>
 
3.	Provide the following information as shown.

<br>
<img src="screens/ecs42.png" >
<br> 

<img src="screens/ecs43.png" >
<br> 
 
4.	Configure the network information as shown.

<br>
<img src="screens/ecs44.png" >
<br> 

<img src="screens/ecs45.png" >
<br> 
 
5.	Determine if there will be auto scaling as shown.

<br>
<img src="screens/ecs46.png" >
<br> 


6.	Review your service configuration.

<img src="screens/ecs47.png" >
<br> 

Click ‘Create Service’ to start creating your service.

 
7.	You show see the message as shown if you have successfully created your service.

<br>
<img src="screens/ecs48.png" >
<br> 

## Run the task and test your application

1.	Create a task to run.
 
<img src="screens/ecs49.png" >
<br>
<img src="screens/ecs50.png" >
<br> 

Click ‘Run Task’ button to start running the task.

 
2.	Go to your EC2 instance.
 
<img src="screens/ecs51.png" >
<br> 

3.	Copy the public DNS (IPv4) address and paste it on another browser’s tab. You should see the web application running similar to the one shown.

<img src="screens/ecs52.png" >
<br>

For further Docker swarm workshop please refer to the following link https://github.com/kenken64/NUSISS-DevOpsEng/blob/master/swarm/README.md
