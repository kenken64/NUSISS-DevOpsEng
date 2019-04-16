## Install Docker on Google Cloud Engine/AWS

1. Update Ubuntu/Debian package manager's index
```
sudo apt-get update
```

2. Install packages to allow apt to use a repository over HTTPS:
```
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```
3. Add Docker’s official GPG key:
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
4. Verify the fingerprint
```
$ sudo apt-key fingerprint 0EBFCD88
pub   rsa4096 2017-02-22 [SCEA]
      9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
sub   rsa4096 2017-02-22 [S]
```

5. Use the following command to set up the stable repository. To add the nightly or test repository, add the word nightly or test (or both) after the word stable in the commands below.
```
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```
6. Update package index
```
 sudo apt-get update
 ```

 7. Install the latest version of Docker CE and containerd, or go to the next step to install a specific version:
 ```
sudo apt-get install docker-ce docker-ce-cli containerd.io
 ```

 8. Test hello world 
 ```
 sudo docker run hello-world
 ```

## Installing Docker Compose

Unlike the Mac and Windows Docker Desktop versions, we must manually install Docker Compose. See the instructions for the installation steps (Click on the tab for Linux)

https://docs.docker.com/compose/install/#install-compose

After completing, test your installation:

docker-compose -v

This should print the version and build numbers to your console.

## Run without Sudo

Follow these instructions to run Docker commands without sudo:

https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user

The docker group will likely already be created, but you still need to add your user to this group.



## Start on Boot

Follow these instructions so that Docker and its services start automatically on boot:

https://docs.docker.com/install/linux/linux-postinstall/#configure-docker-to-start-on-boot



You may need to restart your system before starting the course material.

## Using Docker Client

### Check version 

```
bunnyppl@instance-1:~$ sudo docker version
Client:
 Version:           18.09.5
 API version:       1.39
 Go version:        go1.10.8
 Git commit:        e8ff056
 Built:             Thu Apr 11 04:43:57 2019
 OS/Arch:           linux/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          18.09.5
  API version:      1.39 (minimum version 1.12)
  Go version:       go1.10.8
  Git commit:       e8ff056
  Built:            Thu Apr 11 04:10:53 2019
  OS/Arch:          linux/amd64
  Experimental:     false
```

### Override defaults command parameters
```
sudo docker run busybox echo are you ok?
```

```
sudo docker run busybox ls
```

### Not all images the same
```
bunnyppl@instance-1:~$ sudo docker run hello-world ls

```

```
docker: Error response from daemon: OCI runtime create failed: container_linux.go:345: starting container process caused "exec: \"ls\": executable file not found in $PATH": unknown.
```

### List all the images on Docker
```
docker ps
```

```
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

Get the running Ids of the container

```
bunnyppl@instance-1:~$ sudo docker ps --all
```

```
CONTAINER ID        IMAGE               COMMAND                 CREATED              STATUS                      PORTS               NAMES
0c2fe1b63420        busybox             "ping www.google.com"   About a minute ago   Up About a minute                               competent_dewdney
d7e1ad5b1704        hello-world         "ls"                    4 minutes ago        Created                                         naughty_lewin
128b93e9e590        hello-world         "/hello"                4 minutes ago        Exited (0) 4 minutes ago                        adoring_matsumoto
351db5e94033        hello-world         "ls"                    5 minutes ago        Created                                         suspicious_liskov
9dbc66f69040        busybox             "ls"                    6 minutes ago        Exited (0) 6 minutes ago                        heuristic_wozniak
b92236efc4f0        busybox             "ls"                    6 minutes ago        Exited (0) 6 minutes ago                        distracted_cohen
b2f71fe813bb        busybox             "echo are you ok?"      6 minutes ago        Exited (0) 6 minutes ago                        affectionate_ellis
fbf18801c90b        hello-world         "/hello"                17 minutes ago       Exited (0) 17 minutes ago                       quizzical_goldberg
c8ae6686b9a4        hello-world         "/hello"                26 minutes ago       Exited (0) 26 minutes ago                       jovial_swanson
```

## Container Lifecycle

Create docker image

```
sudo docker create hello-world
```

```
e6e4746d1a831508ab3dd838e734b2ed8f641f3545a7f41758d1f503e8c32aec
```

Run the docker image as container, -a watch output coming from container print on the host

```
sudo docker start -a e6e4746d1a831508ab3dd838e734b2ed8f641f3545a7f41758d1f503e8c32aec
```

Check docker exist with status
```
sudo docker ps --all
```

Re-run the historical exit docker container

```
sudo docker start -a 7eb505e0966e
```

Not allow to run mutiple same container at once
```
sudo docker start -a 7eb505e0966e echo hi there
```

```
you cannot start and attach multiple containers at once
```

Clean up container from docker

```
sudo docker system prune
```

```
WARNING! This will remove:
        - all stopped containers
        - all networks not used by at least one container
        - all dangling images
        - all dangling build cache
Are you sure you want to continue? [y/N] y
Deleted Containers:
7eb505e0966ef628b6c946efc313468abee3217e3bce7bd9bcd585f0faddc1f4
e6e4746d1a831508ab3dd838e734b2ed8f641f3545a7f41758d1f503e8c32aec
0c2fe1b634204ce020bec8dfdc59472dfc5984c8149c78607e769ab92613ae42
d7e1ad5b1704481442ac13e2298580f7dc25a11392933ea2d301f853501db63c
128b93e9e590a7e4b0914622982366e87ea2696f8151adf756150d77d7cd3d9e
351db5e94033f75e9280518e99954afc7975772e5234f1e06c8263da86670030
9dbc66f690402a5073f394e4e506d588ed95a62dffba1e33209a91ece9f112f4
b92236efc4f0c967ffb3990e15be570f63d00b6829f616a138ea1f6e5615c2b4
b2f71fe813bbddf935534733700de89f00363221dd911c56b78802d8e9b5b71d
fbf18801c90b36b22ab3aa774433ac4b45ed284c85011d04d97e4ea981c58d72
c8ae6686b9a4d47e9d317a0ec50cc868d44788de5634635b53dcba082545caac

Total reclaimed space: 0B
```

### Retrieving all output logs without -a

There is not restart on the container
```
bunnyppl@instance-1:~$ sudo docker create busybox echo hi there
a1f8bcd83040df5cfd6f1e7389d89104761f33eb153ec4765faba7d34b953bb0
```

```
bunnyppl@instance-1:~$ sudo docker start a1f8bcd83040df5cfd6f1e7389d89104761f33eb153ec4765faba7d34b953bb0
a1f8bcd83040df5cfd6f1e7389d89104761f33eb153ec4765faba7d34b953bb0
```

```
bunnyppl@instance-1:~$ sudo docker logs a1f8bcd83040df5cfd6f1e7389d89104761f33eb153ec4765faba7d34b953bb0
hi there
```

### Stopping vs Killing container

10 seconds to shutdown with stop then it will fallback to kill 

```
sudo docker create busybox ping www.google.com
```

f48779733ad71b0c4b66458b1de00afea30ac6bdce02276a6e57b6f4bf92540e

```
bunnyppl@instance-1:~$ sudo docker start f48779733ad71b0c4b66458b1de00afea30ac6bdce02276a6e57b6f4bf92540e
f48779733ad71b0c4b66458b1de00afea30ac6bdce02276a6e57b6f4bf92540e
```

```
bunnyppl@instance-1:~$ sudo docker logs f48779733ad71b0c4b66458b1de00afea30ac6bdce02276a6e57b6f4bf92540e
PING www.google.com (74.125.24.147): 56 data bytes
64 bytes from 74.125.24.147: seq=0 ttl=51 time=0.859 ms
64 bytes from 74.125.24.147: seq=1 ttl=51 time=0.720 ms
64 bytes from 74.125.24.147: seq=2 ttl=51 time=0.375 ms
64 bytes from 74.125.24.147: seq=3 ttl=51 time=0.353 ms
64 bytes from 74.125.24.147: seq=4 ttl=51 time=0.438 ms
64 bytes from 74.125.24.147: seq=5 ttl=51 time=0.472 ms
```

```
bunnyppl@instance-1:~$ sudo docker ps --all
```

```
CONTAINER ID        IMAGE               COMMAND                 CREATED             STATUS                     PORTS               NAMES
f48779733ad7        busybox             "ping www.google.com"   27 seconds ago      Up 16 seconds                                  competent_heisenberg
a1f8bcd83040        busybox             "echo hi there"         2 minutes ago       Exited (0) 2 minutes ago                       brave_varahamihira
```

```
bunnyppl@instance-1:~$ sudo docker stop f48779733ad7
f48779733ad7
```

Let's restart the docker again with the container id
```
sudo docker start f48779733ad7
```

No grace period
```
bunnyppl@instance-1:~$ sudo docker kill f48779733ad7
f48779733ad7
```

### Multiple-Command Containers

```
sudo apt update
sudo apt install redis-server
```

```
sudo nano /etc/redis/redis.conf
```

```
. . .

# If you run Redis from upstart or systemd, Redis can interact with your
# supervision tree. Options:
#   supervised no      - no supervision interaction
#   supervised upstart - signal upstart by putting Redis into SIGSTOP mode
#   supervised systemd - signal systemd by writing READY=1 to $NOTIFY_SOCKET
#   supervised auto    - detect upstart or systemd method based on
#                        UPSTART_JOB or NOTIFY_SOCKET environment variables
# Note: these supervision methods only signal "process is ready."
#       They do not enable continuous liveness pings back to your supervisor.
supervised systemd

. . .
```

```
sudo systemctl restart redis.service
```

Run redis server inside the container
```
sudo docker run redis
```

it - allow us to provide input to the container

```
bunnyppl@instance-1:~$ sudo docker exec -it 3e00723f6add redis-cli

127.0.0.1:6379> set myvalue 4
OK
127.0.0.1:6379> get myvalue 
"4"
127.0.0.1:6379> 
```

Without it argument
```
bunnyppl@instance-1:~$ sudo docker exec 3e00723f6add redis-cli
bunnyppl@instance-1:~$
```

