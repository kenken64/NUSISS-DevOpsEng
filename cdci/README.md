## Agile Continous Delivery Sample App

* Jenkins Hosted on AWS : http://ec2-13-251-81-39.ap-southeast-1.compute.amazonaws.com
    * username: user
    * password: password@1234

* Deployed NodeJS App URL : http://ec2-54-169-29-207.ap-southeast-1.compute.amazonaws.com:3000/

* AWS KEY ID: <b><YOUR_AWS_KEY_ID></b>
* AWS SECRET KEY: <b><YOUR_AWS_SECRET_KEY></b>


E2E test tools (Possible to replace test tool with Selenium and etc)

- Chrome testing - https://github.com/GoogleChrome/puppeteer
- Microsoft IE -  https://github.com/TechQuery/Puppeteer-IE
- Firefox - https://github.com/autonome/puppeteer-fx


## AWS Region and Endpoints 
https://docs.aws.amazon.com/general/latest/gr/rande.html

## Spin off AWS EC2 Jenkins instance

<a href="http://www.youtube.com/watch?feature=player_embedded&v=RxwHjGAS4vQ" target="_blank"><img src="http://img.youtube.com/vi/RxwHjGAS4vQ/0.jpg" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>


## Configure Jenkins - Bitnami Server (EC2)

<a href="http://www.youtube.com/watch?feature=player_embedded&v=gMF_BD-MPgk" target="_blank"><img src="http://img.youtube.com/vi/gMF_BD-MPgk/0.jpg" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

* Login to the bitnami server (EC2 ipv4 address) using bitnami as the userid

* Once login to bitnami server install the following dependencies
```
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash
sudo apt-get install -y nodejs
sudo apt install gdebi-core
cd ~
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo gdebi google-chrome-stable_current_amd64.deb
```

## Create AWS user for Jenkins Code Deploy

<a href="http://www.youtube.com/watch?feature=player_embedded&v=0Y2ER4fE_bo" target="_blank"><img src="http://img.youtube.com/vi/0Y2ER4fE_bo/0.jpg" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>


## Configure AWS Code Deploy Role for EC2 instance

<a href="http://www.youtube.com/watch?feature=player_embedded&v=ORCA_NgXDXM" target="_blank"><img src="http://img.youtube.com/vi/ORCA_NgXDXM/0.jpg" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

## Spin off a AWS EC2 Deployment instance

<a href="http://www.youtube.com/watch?feature=player_embedded&v=-_75hMRc898" target="_blank"><img src="http://img.youtube.com/vi/-_75hMRc898/0.jpg" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

## Install Code Deploy Agent on the EC2 deployment instance

<a href="http://www.youtube.com/watch?feature=player_embedded&v=k95MEYwBU8E" target="_blank"><img src="http://img.youtube.com/vi/k95MEYwBU8E/0.jpg" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

## Create AWS role for AWS Code Deploy Service

<a href="http://www.youtube.com/watch?feature=player_embedded&v=6ZTkmE-M0Nk" target="_blank"><img src="http://img.youtube.com/vi/6ZTkmE-M0Nk/0.jpg" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

## Configure AWS Code Deploy on AWS Management Console

<a href="http://www.youtube.com/watch?feature=player_embedded&v=WjH0USK86tg" target="_blank"><img src="http://img.youtube.com/vi/WjH0USK86tg/0.jpg" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

## Install Jenkins Code Deploy Plugin

<a href="http://www.youtube.com/watch?feature=player_embedded&v=rqeSE6xLVlA" target="_blank"><img src="http://img.youtube.com/vi/rqeSE6xLVlA/0.jpg" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

## Create Jenkins Job integrate with Code Deploy & Testing

<a href="http://www.youtube.com/watch?feature=player_embedded&v=qS580v7Lsc4" target="_blank"><img src="http://img.youtube.com/vi/qS580v7Lsc4/0.jpg" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

## Test ACD Sample App
* Working on the acd sample app Github repo. Checkout the source codes from github
```
git clone https://github.com/kenken64/acd-sample-app
```

* Install Node JS dependencies
```
npm install
```

* Run the server starting the port on 3000
```
npm start
```

* Run test cases against the started server

```
npm test
```

* Make some changes on the index.html, commit the changes to the github repo

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <title>ACD Sample App</title>
</head>
<body>
    
    <div class="jumbotron">
        <h1 class="display-4">Welcome, PopQuiz Management System !</h1>
        <p class="lead">This is a simple pop quiz management system. Able to add new quiz, edit and delete</p>
        <hr class="my-4">
        <p>Technology behind this app is simple and outdated -  bootstrap 4, node js , mongodb and handlebar.</p>
        <a href="/list-quizes" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Manage Pop Quizes</a>
        <a href="/list-quizes" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Manage Pop Quizes 2</a>
        <a href="/list-quizes" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Manage Pop Quizes 3</a>
      
        </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</body>
</html>
```

```bash
git add .
git commit -m "test cdci"
git push origin master -u
```

## View E2E test result within screenshot folder

<a href="http://www.youtube.com/watch?feature=player_embedded&v=2lNDFGyOMJE" target="_blank"><img src="http://img.youtube.com/vi/2lNDFGyOMJE/0.jpg" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>