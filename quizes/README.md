### 1. Which command is used to place an image into a registry?

```
A) docker commit

B) docker tag

C) docker push

D) docker images

E) docker pull
```

<b>

### 2. Which network allows Docker Trusted Registry components running on different nodes to communicate and replicate Docker Trusted Registry data?

```
A) dtr-ol

B) dtr-hosts

C) dtr-br

D) dtr-vlan
```

<br>

### 3. which one is a valid command to run global service in docker swarm?

```
A) docker service create —mode global

B) docker swarm create —mode global

C) docker service create —global

D) docker swarm create —global
```

Answer is A. Refer to the cli documentation
https://docs.docker.com/engine/reference/commandline/service_create/

<br>

### 4. Which of the following is not an endpoint exposed by Docker Trusted Registry that can be used to assess the health of a Docker Trusted Registry replica?

```
A) /health

B) /nginx_status

C) /api/v0/meta/cluster_status

D) /replica_status
```

Answer : D
<br>

### 5. Which of the following endpoints exposed by Docker Trusted Registry can be used to assess the health of a Docker Trusted Registry replica?

```
A) /health

B) /api/health

C) /replica_status

D) /nginx/health
```

Answer: A
<br>

### 6. One of your developers is trying to push an image to the registry (dtr.example.com). The push fails with the error “denied: requested access to the resource is denied”. What should you verify the user has completed?

```
A) docker login -u <username> -p <password> dtr.example.com

B) docker registry login -u username -p <password> dtr.example.com

C) docker push <username>/<image:tag> dtr.example.com

D) docker images login -u <username> -p <password> dtr.example.com
```

Answer: A
<br>

### 7. You have been asked to backup the swarm state on a Linux installation. By default, where do Docker manager nodes store the swarm state and manager logs?

```
A) /var/run/docker/swarm

B) /var/lib/docker/swarm

C) /etc/docker/swarm

D) /run/docker/swarm
```

Answer: B
<br>

### 8. Which of the following will put the Docker engine into debug mode?

```
A) echo '{"debug": true}' > /var/lib/docker/daemon.json ; sudo kill -HUP <pid of
dockerd>

B) echo '{"debug": true}' > /etc/docker/config.json ; sudo kill -HUP <pid of
dockerd>

C) echo '{"debug": true}' > /var/lib/docker/config.json ; sudo kill -HUP <pid of
dockerd>

D) echo '{"debug": true}' > /etc/docker/daemon.json ; sudo kill -HUP <pid of
dockerd>
```

Answer: D
<br>

### 9. How do you deploy 4 new instances of nginx with a single command?

```
A) docker service create --replicas 4 --name myservice nginx

B) docker service create --instances 4 --name myservice nginx

C) docker service scale myservice=4 nginx

D) docker service scale --replicas 4 --name myservice nginx
```

Answer: A
<br>

### 10. You are using self-signed UCP certs and have a second DNS name that points to your internal controllers. When installing UCP, which flag should you use to add this additional name?

```
A) --internal-server-cert

B) --dns

C) --san

D) --external-server-cert
```

Answer: C
<br>

### 11. How to prevent any .pyc file in your entire docker context from being added inside your Docker?

```
A) \*\*.pyc

B) \*_/_.pyc

C) \*.pyc

D) /\*.pyc
```

Answer: B

https://codefresh.io/docker-tutorial/not-ignore-dockerignore/

<br>

### 12. Bob has configured his docker daemon to use syslog log driver by default. how can he run a container which uses son-file log driver?

```
A) By using “—log-opt-json-file along with the docker run

B) By using “—log-driver json-file” along with docker run

C) By using “—logger json-file” along with docker run

D) Its impossible
```

Answer: B

<br>

### 13. Which of the following commands can be used to see IPv4 subnet of the network?

```
A) docker network ls

B) docker info network

C) docker network info

D) docker network inspect
```

Answer: D

https://docs.docker.com/engine/reference/commandline/network_inspect/

<br>

### 14. You want to ensure that a container doesn’t expect memory usage than a specified amount. Which of the following will be used by default by docker to achieve that ?

```
A) namespaces

B) selinux

C) cgroups

D) seccomp
```

Answer: C

<br>

### 15. Which of the following lvm mode should a production host using the devicemapper as a storage driver use?

```
A) loop-vm

B) overlay

C) direct-lvm

D) zfs
```

Answer: C is meant to be used in production

<br>

### 16. Correct order to backup docker ucp cluster?

```
A) swarm, ucp , dtr

B) dtr, ucp, swarm

C) ucp, dtr , swarm

D) swarm, dtr, ucp
```

Answer: A

ucp - universal control plane
dtr - docker trust registry
swarm - nodes with manager

https://docs.docker.com/ee/ucp/admin/backups-and-disaster-recovery/

<br>

### 17. Which of the following commands can take a tar file as an argument and add the extracted content into the image automatically?

```
A) COPY

B) ADD

C) ADD and COPY both

D) None of these
```

Answer : B

https://nickjanetakis.com/blog/docker-tip-2-the-difference-between-copy-and-add-in-a-dockerile

<br>

### 18. You want to get shell access into a running container with id<container-id>. Which command should you use for it?

```
A) docker exec

B) docker ps

C) docker run

D) docker bash
```

Answer : A

docker exec -it <container-id> bash is the command which you should use i stand for interactive and t stand for shell

<br>

### 19. Which TCP ports must be open on all nodes participating in the docker swarm?

```
A) 2377

B) 7946

C) 2377 and 7946

D) 2388
```

Answer : C

https://docs.docker.com/engine/swarm/swarm-tutorial/

<br>

### 20. Docker content trust policy provides the ability to use **\_\_** for verifying integrity and the publisher of all the data received from a registry over any channel

```
A) end to end encryption

B) digital signatures

C) symmetric key encryption

D) a container
```

Answer: B
<br>

### 21. Which of the following is NOT true about secrets?

```
A) Secrets are encrypted during transit and also at rest

B) Secrets are available to swarm services and standalone container

C) Secrets are mounted in container’s filesystem directly

D) Secrets can be used for storing username and password
```

Answer : B

Secrets can be used only by swarm service not standalone

https://docs.docker.com/engine/swarm/secrets/

<br>

### 22. A global service is a service that runs \_\_\_\_ task/tasks on every node that meet the placement and resource constraints

```
A) Many

B) one

C) more than one

D) none
```

Answer : B

https://docs.docker.com/engine/swarm/services/#replicated-or-global-services

<br>

### 23. Which of the following statement is correct? Pick exactly two statements.

```
A) Image is a collection of immutable layers whereas container is a running instance of an image

B) Container can exist without the image but image cannot exist without container

C) Only one container can be spawned from a given image at a time

D) If multiple containers are spawned from the same image then they all use the same copy of image in memory

```

Answer : A and D
<br>

### 24. Overlay networks cannot be crated if docker engine is not a manager node in docker swarm?

```

A) True

B) False

```

Answer is A

Overlay networks can’t exist if docker engine is not part of a swarm. So to create overlay network being a manager node in a swarm is a necessary condition. If we try creating overlay network from a non manager node we get the following error

\$ docker network create -d overlay network test.network
Error response from daemon. Cannot create a multi host network from a worker node.Please create the network from a manager node.

### Answers

1. C.
   https://docs.docker.com/engine/reference/commandline/push/

2. A.
   https://success.docker.com/article/how-to-test-the-dtr-ol-network

3)

4)

5)

6)

7)

8)

9)

10)

11)

12)

13)

14)

15)

16)

17)

18)

19)

20)

21)

22)

23)

24. A.

    <br>
    Overlay networks can’t exist if docker engine is not part of a swarm. So to create overlay network being a manager node in a swarm is a necessary condition. If we try creating overlay network from a non manager node we get the following error

\$ docker network create -d overlay network test.network
Error response from daemon. Cannot create a multi host network from a worker node.Please create the network from a manager node.
