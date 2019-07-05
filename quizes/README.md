### 1. Which command is used to place an image into a registry?

A) docker commit

B) docker tag

C) docker push

D) docker images

E) docker pull
<br>

### 2. Which network allows Docker Trusted Registry components running on different nodes to communicate and replicate Docker Trusted Registry data?

A) dtr-ol

B) dtr-hosts

C) dtr-br

D) dtr-vlan

<br>

### 3. which one is a valid command to run global service in docker swarm?

A) docker service create —mode global

B) docker swarm create —mode global

C) docker service create —global

D) docker swarm create —global

Answer is A. Refer to the cli documentation 
https://docs.docker.com/engine/reference/commandline/service_create/

<br>

### 4. Which of the following is not an endpoint exposed by Docker Trusted Registry that can be used to assess the health of a Docker Trusted Registry replica?

A) /health

B) /nginx_status

C) /api/v0/meta/cluster_status

D) /replica_status

### 5. Which of the following endpoints exposed by Docker Trusted Registry can be used to assess the health of a Docker Trusted Registry replica?

A) /health

B) /api/health

C) /replica_status

D) /nginx/health

### 6. One of your developers is trying to push an image to the registry (dtr.example.com). The push fails with the error “denied: requested access to the resource is denied”. What should you verify the user has completed?

A) docker login -u <username> -p <password> dtr.example.com

B) docker registry login -u username -p <password> dtr.example.com

C) docker push <username>/<image:tag> dtr.example.com

D) docker images login -u <username> -p <password> dtr.example.com

<br>

7. You have been asked to backup the swarm state on a Linux installation. By default, where do Docker manager nodes store the swarm state and manager logs?

A) /var/run/docker/swarm
B) /var/lib/docker/swarm
C) /etc/docker/swarm
D) /run/docker/swarm
<br>

8. Which of the following will put the Docker engine into debug mode?
- A. echo '{"debug": true}' > /var/lib/docker/daemon.json ; sudo kill -HUP <pid of
dockerd>
- B. echo '{"debug": true}' > /etc/docker/config.json ; sudo kill -HUP <pid of
dockerd>
- C. echo '{"debug": true}' > /var/lib/docker/config.json ; sudo kill -HUP <pid of
dockerd>
- D. echo '{"debug": true}' > /etc/docker/daemon.json ; sudo kill -HUP <pid of
dockerd>



9. How do you deploy 4 new instances of nginx with a single command?
- A. docker service create --replicas 4 --name myservice nginx
- B. docker service create --instances 4 --name myservice nginx
- C. docker service scale myservice=4 nginx
- D. docker service scale --replicas 4 --name myservice nginx

<br>

10. You are using self-signed UCP certs and have a second DNS name that points to your
internal controllers. When installing UCP, which flag should you use to add this additional
name?

- A. --internal-server-cert
- B. --dns
- C. --san
- D. --external-server-cert