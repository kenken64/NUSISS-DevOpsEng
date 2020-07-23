# S-DOEA - Workshop 6 - DevOps in the Cloud 

## Objective 
The objective of this workshops is to learn how to setup and deploy frontend app using Github with Travis

## Pre-requisite
* Travis account (https://travis-ci.org/)
* Github Account

## Workshop
In this workshop you will setup a CD/CI to automatically build and publish your Frontend application to Github Pages using Travis.

1. Fork the source codes from the following URL https://github.com/kenken64/bitcoin-order-app to your own Github account.

```
$ git clone https://github.com/<replace this with your github userid>/bitcoin-order-app
```

2. Checkout the development branch

```
 $ git checkout development
```

3. Generate the personal access token from Github platform, select the repo scope and save the token to somewhere on your editor
  <img src="./screens/github_token.png" >

  <img src="./screens/github_token2.png" >


4. On the Travis CI platform, select a deployable application from your repository, slide the slider to enable the bitcoin-order-app from your github account

5. On the Travis CI platform, navigate to the selected project's setting

6. On the Travis CI platform, under settings of the project make sure the build validation is disabled

<img src="./screens/travis4.png" >

7. Create an account in Travis and allow it to associate with your GitHub account
  - Configure a GITHUB_TOKEN secure environment variable for all branches on Travis platform. The value shown on the screenshots is generated from  the Github personal token generation page (Step 3). Remember to Click on the Add button.
  <img src="./screens/travis1.png" >
  <img src="./screens/travis2.png" >
  <img src="./screens/travis3.png" >


8. Add a .travis.yml file to you working repository (Cloned githubrepo ), replace the email and Github userid placeholder in arrow bracket within the yml file. Do not replace or remove the value ```$GITHUB_TOKEN```

Features:
  - Notify all your co-workers on the build
  - Install all relevant dependencies
  - Perform a build on the frontend
  - Deploy to the cloud provider

```
language: node_js
node_js:
  - node

dist: bionic
sudo: required

notifications:
  email:
    recipients:
      - <your email address>
    on_success: always
    on_failure: always
branches:
  only:
   - development
before_script:
  - npm install -g @angular/cli
  
script:
  - ng build --prod --base-href https://<your github username>.github.io/bitcoin-order-app/
  
deploy:
  provider: pages
  skip_cleanup: true
  github_token: $GITHUB_TOKEN
  local_dir: dist/bitcoin
  edge: true
  on:
    branch: development

```
9. Travis should build wherever there is a push to the release branch
10. After a successful build, the application should be published to 
GitHub
11. Send a notification to your email mailbox regardless whether the build is
successful or if it has failed

## Bonus - Workshop
Only attempt this if you have completed the above workshop.

* Delete the feature branch when you have successfully published the
front end application.

```
after_success:
 - git push <remote_name> :<branch_name>
```
* Perform static code analysis 
```
ng lint
```
* Perform vulnebrality scanning 
```
npm audit fix
```

* Dockerized the app and push the docker image to dockerhub and AWS private docker registry

* Deploy the app to AWS's ElasticBeanStalk Docker v1
