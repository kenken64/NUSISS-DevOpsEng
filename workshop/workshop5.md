# S-DOEA - Workshop - Containers and Container Management Workshop

## Pre-requisite
* AWS Account 
* Dockerhub Account
* Github Account
* Access to the following URL : https://ec2-13-238-161-21.ap-southeast-2.compute.amazonaws.com:8888/
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

1. Clone source code repo from https://github.com/kenken64/reactjs-subdevice.git . 

```
git clone https://github.com/kenken64/reactjs-subdevice.git
```

2. Create a Dockerfile.dev under the React App (subsdevices)

```
FROM node:alpine

WORKDIR '/app'

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
```

3. Build the docker image

```
docker build -f Dockerfile.dev -t kenken64/react-app .
```

4. Run the docker image as container with port forward and volume mounting

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
        dockerfile: Dockerfile.dev
      ports:
        - "3000:3000"
      volumes:
        - /app/node_modules
        - .:/app
```

6. Start the docker container using docker-compose

```
sudo docker-compose up --build
```

7. Implement test on separate container, please replace the hash value of the container id from step 6

```
docker exec -it 87b898a5cc64 npm run test
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

8. Start the docker container using docker-compose

```
sudo docker-compose up --build
```

9. Multi step build process, different base images

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

10. Build the multi phase container setup

```
docker build .
```

11. Start the multi phase container setup and expose the port, please replace the hash value of the container id from step 10

```
docker run -p 8080:80 936ca285e822 
```

12. Add a new firewall rules - inbound tcp port 8080 on the EC2 slave server.

13. Launch your browser and try accessign the app http://```<slave server public DNS>```

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