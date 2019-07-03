## Prepare 3 AWS/Google cloud instances for this workshop

1. Label one instance as master the rest of the node instance as slave/node

2. Change all the hostname accordingly
    master - nusiss.puppetmaster.edu.sg
    slave 1 - nusiss.puppetslave1.edu.sg  
    slave 2 - nusiss.puppetslave2.edu.sg  

<img src="./images/puppet1.png" width="640" height="480">

3. Exit and logout the system after changing hostname of all the 3 instances

4. Lets fixed all the master and slave servers with their ip and hostname on the host file

## Master

<img src="./images/puppet2.png" width="800" height="480">


## Slave 1

<img src="./images/puppet3.png" width="800" height="480">


## Slave 2

<img src="./images/puppet3.png" width="800" height="480">


5. Make sure all the instances about to ping each other

<img src="./images/puppet4.png" width="500" height="300">


6. Make sure all the packages within the Ubuntu is up to date

<img src="./images/puppet5.png" width="400" height="300">


7. On the puppet master host install the master software

<img src="./images/puppet6.png" width="600" height="300">


8. On both the slave install the puppet agent software, puppetslave1 and puppetslave2

<img src="./images/puppet7.png" width="600" height="300">


9. Check whether the puppet master service is up
nusiss.puppetmaster.edu.sg

<img src="./images/puppet8.png" width="800" height="500">


10. On the slave instance, check both the service of the agent is up

<img src="./images/puppet9.png" width="600" height="300">

11. Configure both agent to be aware of the master node


<img src="./images/puppet10.png" width="600" height="300">

<img src="./images/puppet11.png" width="600" height="300">


## Restart both the puppet agents

<img src="./images/puppet12.png" width="600" height="300">


12. Send certificate from agent to the master 

<br>

## Agent 

<img src="./images/puppet13.png" width="800" height="300">


Over the master side sign the request certificate

<img src="./images/puppet14.png" width="800" height="300">

<br>

## Agent 
<img src="./images/puppet15.png" width="800" height="300">

13 Preapre and validate manifest for the installation of software that do not happens to be available on the agent instances

<img src="./images/puppet16.png" width="500" height="300">
<br>
<img src="./images/puppet17.png" width="800" height="350">
<br>
Validate the pp configuration file

<img src="./images/puppet20.png" width="500" height="300">

14. To force the update on the agent side 

<img src="./images/puppet18.png" width="500" height="300">

15. By right all agents are configured with update interval of 5 secs.

<img src="./images/puppet19.png" width="600" height="300">
