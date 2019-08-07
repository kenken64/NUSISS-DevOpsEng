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

## Dockerized the app

## Create Elastic Container Service

## Create AWS ECR Repository

## Publish your dockerize app to the AWS ECR

## Create ECS Task Definition

## Create Docker Swarm 

## Scale up the Docker swarm