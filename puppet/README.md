## Prepare 3 AWS/Google cloud instances for this workshop

1. Label one instance as master the rest of the node instance as slave/node

2. Change all the hostname accordingly
    master - nusiss.puppetmaster.edu.sg
    slave 1 - nusiss.puppetslave1.edu.sg  
    slave 2 - nusiss.puppetslave2.edu.sg  

<img src="./images/puppet1.png" width="640" height="480">

3. Exit and logout the system after changing hostname of all the 3 instances

4. Lets fixed all the master and slave servers with their ip and hostname on the host file

    Master

<img src="./images/puppet2.png" width="1024" height="480">


    Slave 1

```
sudo i
echo 10.148.0.4 nusiss.puppetmaster.edu.sg >> /etc/hosts

````


    Slave 2

```
sudo i
echo 10.148.0.4 nusiss.puppetmaster.edu.sg >> /etc/hosts

````

5. Make sure all the instances about to ping each other

```
ping nusiss.puppetslave1.edu.sg
ping nusiss.puppetslave2.edu.sg
ping nusiss.puppetmaster.edu.sg

```

6. Make sure all the packages within the Ubuntu is up to date

```
sudo apt-get update
```

7. On the puppet master host install the master software

```
sudo apt-get install puppetmaster -y
```

8. On both the slave install the puppet agent software, puppetslave1 and puppetslave2

```
sudo apt-get install puppet -y
```

9. Check whether the puppet master service is up
nusiss.puppetmaster.edu.sg
```
sudo service puppetmaster status

● puppetmaster.service - Puppet master
   Loaded: loaded (/lib/systemd/system/puppetmaster.service; enabled; vendo
   Active: active (running) since Thu 2019-04-18 07:57:04 UTC; 2min 59s ago
 Main PID: 4569 (puppet)
   CGroup: /system.slice/puppetmaster.service
           └─4569 /usr/bin/ruby /usr/bin/puppet master

Apr 18 07:57:01 master-puppet systemd[1]: Starting Puppet master...
Apr 18 07:57:03 master-puppet puppet-master[4543]: Signed certificate reque
Apr 18 07:57:04 master-puppet puppet-master[4543]: master-puppet.asia-south
Apr 18 07:57:04 master-puppet puppet-master[4543]: Signed certificate reque
Apr 18 07:57:04 master-puppet puppet-master[4543]: Removing file Puppet::SS
Apr 18 07:57:04 master-puppet puppet-master[4543]: Removing file Puppet::SS
Apr 18 07:57:04 master-puppet puppet-master[4569]: Reopening log files
Apr 18 07:57:04 master-puppet puppet-master[4569]: Starting Puppet master v
Apr 18 07:57:04 master-puppet systemd[1]: Started Puppet master.
```

10. On the slave instance, check both the service of the agent is up

```
sudo service puppet status
```

11. Configure both agent to be aware of the master node

```
sudo nano /etc/puppet/puppet.conf
```

```
[agent]
server=nusiss.puppetmaster.edu.sg
runinterval=5s
```

Restart both the agents

```
sudo service puppet restart
```


12. Send certificate from agent to the master 

Agent 
```
sudo puppet agent --no-daemonize --onetime --verbose
```

Over the master side sign the request certificate

```
sudo puppet cert list --all
sudo puppet cert sign slave-1.asia-southeast1-b.c.door-sensor-app-237520.internal
sudo puppet cert sign slave-2.asia-southeast1-b.c.door-sensor-app-237520.internal
```

Agent 
```
sudo puppet agent --enable
sudo puppet agent server nusiss.puppetmaster.edu.sg
```

13 Preapre and validate manifest for the installation of software that do not happens to be available on the agent instances

```
cd /etc/puppet/manifests
sudo nano site.pp
```
```
node 'slave-1.asia-southeast1-b.c.door-sensor-app-237520.internal', 'slave-2.asia-southeast1-b.c.door-sensor-app-237520.internal'
 package { 'htop':
        name => 'htop',
        ensure => installed,
 }
}
```

Validate the pp configuration file
```
sudo puppet parser validate site.pp
```

14. To force the update on the agent side 

```
sudo puppet agent -t
```

15. By right all agents are configured with update interval of 5 secs.

```
bunnyppl@nusiss:~$ htop
-bash: /usr/bin/htop: No such file or directory
bunnyppl@nusiss:~$ 
```