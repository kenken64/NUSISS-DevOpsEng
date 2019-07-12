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

<br>

### 4. Which of the following is not an endpoint exposed by Docker Trusted Registry that can be used to assess the health of a Docker Trusted Registry replica?

```
A) /health

B) /nginx_status

C) /api/v0/meta/cluster_status

D) /replica_status
```

<br>

### 5. Which of the following endpoints exposed by Docker Trusted Registry can be used to assess the health of a Docker Trusted Registry replica?

```
A) /health

B) /api/health

C) /replica_status

D) /nginx/health
```

<br>

### 6. One of your developers is trying to push an image to the registry (dtr.example.com). The push fails with the error “denied: requested access to the resource is denied”. What should you verify the user has completed?

```
A) docker login -u <username> -p <password> dtr.example.com

B) docker registry login -u username -p <password> dtr.example.com

C) docker push <username>/<image:tag> dtr.example.com

D) docker images login -u <username> -p <password> dtr.example.com
```

<br>

### 7. You have been asked to backup the swarm state on a Linux installation. By default, where do Docker manager nodes store the swarm state and manager logs?

```
A) /var/run/docker/swarm

B) /var/lib/docker/swarm

C) /etc/docker/swarm

D) /run/docker/swarm
```

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

<br>

### 9. How do you deploy 4 new instances of nginx with a single command?

```
A) docker service create --replicas 4 --name myservice nginx

B) docker service create --instances 4 --name myservice nginx

C) docker service scale myservice=4 nginx

D) docker service scale --replicas 4 --name myservice nginx
```

<br>

### 10. You are using self-signed UCP certs and have a second DNS name that points to your internal controllers. When installing UCP, which flag should you use to add this additional name?

```
A) --internal-server-cert

B) --dns

C) --san

D) --external-server-cert
```

<br>

### 11. How to prevent any .pyc file in your entire docker context from being added inside your Docker?

```
A) \*\*.pyc

B) \*_/_.pyc

C) \*.pyc

D) /\*.pyc
```

<br>

### 12. Bob has configured his docker daemon to use syslog log driver by default. how can he run a container which uses son-file log driver?

```
A) By using “—log-opt-json-file along with the docker run

B) By using “—log-driver json-file” along with docker run

C) By using “—logger json-file” along with docker run

D) Its impossible
```

<br>

### 13. Which of the following commands can be used to see IPv4 subnet of the network?

```
A) docker network ls

B) docker info network

C) docker network info

D) docker network inspect
```

<br>

### 14. You want to ensure that a container doesn’t expect memory usage than a specified amount. Which of the following will be used by default by docker to achieve that ?

```
A) namespaces

B) selinux

C) cgroups

D) seccomp
```

<br>

### 15. Which of the following lvm mode should a production host using the devicemapper as a storage driver use?

```
A) loop-vm

B) overlay

C) direct-lvm

D) zfs
```

<br>

### 16. Correct order to backup docker ucp cluster?

```
A) swarm, ucp , dtr

B) dtr, ucp, swarm

C) ucp, dtr , swarm

D) swarm, dtr, ucp
```

<br>

### 17. Which of the following commands can take a tar file as an argument and add the extracted content into the image automatically?

```
A) COPY

B) ADD

C) ADD and COPY both

D) None of these
```

<br>

### 18. You want to get shell access into a running container with id<container-id>. Which command should you use for it?

```
A) docker exec

B) docker ps

C) docker run

D) docker bash
```

<br>

### 19. Which TCP ports must be open on all nodes participating in the docker swarm?

```
A) 2377

B) 7946

C) 2377 and 7946

D) 2388
```

<br>

### 20. Docker content trust policy provides the ability to use **\_\_** for verifying integrity and the publisher of all the data received from a registry over any channel

```
A) end to end encryption

B) digital signatures

C) symmetric key encryption

D) a container
```

<br>

### 21. Which of the following is NOT true about secrets?

```
A) Secrets are encrypted during transit and also at rest

B) Secrets are available to swarm services and standalone container

C) Secrets are mounted in container’s filesystem directly

D) Secrets can be used for storing username and password
```

<br>

### 22. A global service is a service that runs \_\_\_\_ task/tasks on every node that meet the placement and resource constraints

```
A) Many

B) one

C) more than one

D) none
```

<br>

### 23. Which of the following statement is correct? Pick exactly two statements.

```
A) Image is a collection of immutable layers whereas container is a running instance of an image

B) Container can exist without the image but image cannot exist without container

C) Only one container can be spawned from a given image at a time

D) If multiple containers are spawned from the same image then they all use the same copy of image in memory

```

<br>

### 24. Overlay networks cannot be create if docker engine is not a manager node in docker swarm?

```

A) True

B) False

```

<br>

## 25. What are the two types of UCP client bundles?

```
A)	Docker CLI bundles and Docker web UI bundles

B)	Ops client bundles and dev client bundles

C)	Docker UCP client bundles and DTR client bundles

D)	Admin user certificate bundles and user certificate bundles
```

<br>

## 26 Docker security scan result is available in both UCP and DTR. True or false?

```
A) True

B) False
```

<br>

## 27 Docker security scan can be started by all users including those with read-only access. True or false?

```
A	True

B	False
```

<br>

## 28 What is the command that need to be executed to sign an image before pushing it to repository?

```
A) export TRUST_DOCKER_CONTENT=1

B) export TRUST_DOCKER_IMAGE=1

C) export SIGN_DOCKER_IMAGE=1

D) export DOCKER_CONTENT_TRUST=1
```

<br>

## 29 What is a grant made up of in Docker's Role Based Access Controls (RBAC)? (select three)

```
A) Certificate

B) Role

C) Subject

D) Resource collection
```

<br>

## 30 Where do you create Docker Role Based Access Controls (RBAC)?

```
A) Docker Machine

B) Universal Control Plane

C) Docker Compose

D) Docker Trusted Registry
```

<br>

## 31 Which of the followings are Docker Engine Security features? (select all that apply)

```
A) You can configure Docker’s trust features so that your users can push and pull trusted images

B) You can use certificate-based client-server authentication to verify a Docker daemon has the rights to access images on a registry

C) You can configure secure computing mode (Seccomp) policies to secure system calls in a container

D) You can protect the Docker daemon socket and ensure only trusted Docker client connections
```

<br>

## 32 What are the steps needed to sign images in a way that UCP trusts them? (select three)

```
A) Configure Notary client

B) Delegate signing to the keys in your UCP client bundle

C) Initialize trust metadata for the repository

D) Approve image sign on UCP
```

<br>

## 33 Where is the option to integrate Docker Enterprise with LDAP?

A) Docker Machine

B) Docker Trusted Registry

C) Docker Compose

D) Universal Control Plane

<br>

## 34 What is the difference between UCP workers and managers?

A) ucp-agent service automatically starts serving all UCP components in manager node, and only a proxy service in worker node

B) ucp-agent service automatically starts serving all UCP components in worker node, and only a proxy service in manager node

<br>

## 35 What is the default format of docker inspect output?

```
A) json

B) xml

C) html

D) yaml
```

<br>

## 36 What are the two types of docker swarm services?

```
A) replicated and global services

B) distributed and replicated services

C) local and global services

D) replicated and local services
```

<br>

## 37 What is the function of docker inspect command?

```
A) To inspect changes to files or directories on a container's filesystem

B) To manage Docker configs

C) To display system-wide information

D) To return low-level information on Docker objects
```

<br>

## 38 Which of the following is the docker command to enable autolock on an existing swarm cluster?

```
A) docker swarm --autolock=true

B) docker swarm update --autolock=true

C) docker swarm autolock

D) docker swarm update --autolock-swarm=true
```

<br>

## 39 What is the difference between a replicated and a global service?

```
A) Number of identical tasks can be specified for a replicated service. There is no pre-specified number of tasks for global service.

B) Replicated service can only be deployed on manager node. Global service can be deployed on both manager and worker node.

C) Replicated service runs one task on every node. Global service runs multiple task on every node.

D) Good candidates for replicated service are monitoring agents that you want to run on every node in the swarm. Good candidates for global service are http servers.
```

<br>

## 40 Which network driver type is best when the network stack should not be isolated from the Docker host, but you want other aspects of the container to be isolated?

```
A)	User-defined bridge networks

B)	Overlay networks

C)	Host networks

D)	Macvlan networks
```

<br>

### Answers

1. C.<br>
   https://docs.docker.com/engine/reference/commandline/push/

2. A.<br>
   https://success.docker.com/article/how-to-test-the-dtr-ol-network

3) A. <br>
   Refer to the cli documentation
   https://docs.docker.com/engine/reference/commandline/service_create/

4) D.

5) A.

6) A.

7) B.

8) D.

9) A.

10) C.

11) B. <br>
    https://codefresh.io/docker-tutorial/not-ignore-dockerignore/

12) B.

13) D. <br>
    https://docs.docker.com/engine/reference/commandline/network_inspect/

14) C.

15) C. <br>
    Is meant to be used in production environment.

16) A. <br>
    ucp - universal control plane dtr - docker trust registry swarm - nodes with manager
    https://docs.docker.com/ee/ucp/admin/backups-and-disaster-recovery/

17) B. <br>
    https://nickjanetakis.com/blog/docker-tip-2-the-difference-between-copy-and-add-in-a-dockerile

18) A. <br>
    docker exec -it bash is the command which you should use i stand for interactive and t stand for shell

19. C. <br>
    https://docs.docker.com/engine/swarm/swarm-tutorial/

20) B.

21) B. <br>
    Secrets can be used only by swarm service not standalone
    https://docs.docker.com/engine/swarm/secrets/

22) B. <br>
    https://docs.docker.com/engine/swarm/services/#replicated-or-global-services

23) A and D

24) A.

    <br>
    Overlay networks can’t exist if docker engine is not part of a swarm. So to create overlay network being a manager node in a swarm is a necessary condition. If we try creating overlay network from a non manager node we get the following error

    \$ docker network create -d overlay network test.network
    Error response from daemon. Cannot create a multi host network from a worker node.Please create the network from a manager node.

25) D.

    Reference: https://docs.docker.com/datacenter/ucp/2.2/guides/user/access-ucp/cli-based-access/

26) B.

    Reference: https://docs.docker.com/datacenter/dtr/2.3/guides/user/manage-images/scan-images-for-vulnerabilities/#the-docker-security-scan-process

27) B.

28) D.

    Reference: https://docs.docker.com/datacenter/dtr/2.3/guides/user/manage-images/sign-images/

29) C & D.

    Reference: https://docs.docker.com/datacenter/ucp/2.2/guides/access-control/grant-permissions/

30) B.

    Reference: https://docs.docker.com/datacenter/ucp/2.2/guides/access-control/

31) A , B , C, D.

    Reference: https://docs.docker.com/engine/security

32) A , B , C.

    Reference: https://docs.docker.com/datacenter/dtr/2.3/guides/user/manage-images/sign-images/#sign-images-that-ucp-can-trust

33) D.

    https://docs.docker.com/datacenter/ucp/2.2/guides/admin/configure/external-auth/

34) A.

    https://docs.docker.com/datacenter/ucp/2.2/guides/architecture/#under-the-hood

35) A.

36) A.

37) D.

38) B.

39) A.

40) C.
