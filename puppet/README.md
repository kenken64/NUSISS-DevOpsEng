## Prepare 3 AWS/Google cloud instances for this workshop

1. Label one instance as master the rest of the node instance as slave/node

2. Change all the hostname accordingly
    master - nusiss.puppetmaster.edu.sg
    slave 1 - nusiss.puppetslave1.edu.sg  
    slave 2 - nusiss.puppetslave2.edu.sg  

```
sudo -i
hostname nusiss.puppetmaster.edu.sg
```

```
sudo -i
hostname nusiss.puppetslave1.edu.sg
```

```
sudo -i
hostname nusiss.puppetslave2.edu.sg
```
3. Exit and logout the system after changing hostname of all the 3 instances

4. Lets fixed all the master and slave servers with their ip and hostname on the host file

    Master

```
sudo i
echo 10.148.0.7 nusiss.puppetslave2.edu.sg >> /etc/hosts
echo 10.148.0.5 nusiss.puppetslave1.edu.sg >> /etc/hosts

````

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
