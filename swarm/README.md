## Docker Swarm

* This workshop require student to install Virtualbox on their host machine  the OS can be either Windows 10/Macos/Linux


* MacOS users require to install brew (https://brew.sh/)

```
brew cask install virtualbox
```

1. Create docker machines ( to act as nodes for Docker Swarm), one manager as 'namager1 and two workers as 'worker1' and worker2'

```
$ docker-machine create --driver virtualbox manager1

$ docker-machine create --driver virtualbox worker1

$ docker-machine create --driver virtualbox worker2
```

2. Verify machine created successfully

```

docker-machine ls
docker-machine ip <machine name>

```

3. Initialize the Docker Swarm

```
docker swarm init --advertise-addr MANAGER_IP
```

4. Connect to the machine via SSH

```
docker-machine ssh <machine name>
```

5. Upon ssh into the manager machine, list all the current nodes connected to the swarm

```
docker node ls
```

6. In order to retrieve the join as worker command in the manager machine run the below command

```
docker swarm join-token worker1
```

7. In the manager machine run the below command, to check on the swarm info

```
docker info

docker swarm
```

8. Run containers on the Docker Swarm

```
docker service create --replicas 3 -p 80:80 --name serviceName nginx
```

Verify the status of the swarm

```
docker service ls

docker service ps serviceName
```


9. Scaling service up and down


```
docker service scale serviceName=2
```

10. Inspecting the nodes (this command can only run on the manager node)

```
docker node inspect nodename
docker node inspect self
docker node inspect worker1
```

11. In order to shutdown the nodes (Inside the manager nodes)

```
docker node update --availability drain worker1/worker2
```

12. To update the services perform the following command

```
docker service update --image imagename:version web
docker service update --image nginx:1.14.0 serviceName
```

13. Remove services from the swarm

```
docker service rm serviceName
```

14. Leaving the swarm , stopping and deleting from the swarm

```
docker swarm leave
docker-machine stop machineName
docker-machine rm machineName
```