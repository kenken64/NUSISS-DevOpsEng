# S-DOEA - Workshop - Github Workshop

## Pre-requisites 
* [Github](https://github.com/)/[Gitlab](https://about.gitlab.com/) account
* Download & Install Git for Windows https://git-scm.com/download/win

### For mac users please use brew 

Homebrew (http://brew.sh/) is another alternative to install Git. If you have Homebrew installed, install Git via

```
brew install git
```

## Instructions

1. Create/Sign up for a Github account
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/git1.png"/>
<br>

2. Create a working directory on your machine

```
mkdir Projects

cd Projects

mkdir ProjectA

```
3. Initialize the working directory as git enable project

```
git init
```

4. Go to the Gitlab dashboard, add a new repository
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/git2.png"/>
<br>


5. Create a repo on Github, do not initialize README.md
<br>
<img style="width:350px;height:100px; float: center;" src="./screens/git3.png"/>
<br>

6. Associate the local working directory with the remote repository

```
git remote add origin https://github.com/kenken64/ProjectA.git
```

<br>
<img style="width:350px;height:100px; float: center;" src="./screens/git4.png"/>
<br>

7. Issue the following command to to verify the association is correct

```
git remote -v

origin	https://github.com/kenken64/ProjectA.git (fetch)
origin	https://github.com/kenken64/ProjectA.git (push)
```

8. Create a README.md documentation as the initial file for your newly created repository

```
echo "# ProjectA" >> README.md
```

9. Add the files to the staging index

```
git add .
```

10. Confirm all the changes made to the working directory and ready to commit to the remote repository by issuing the following command. argument -m is comment to every check in of the source codes.

```
git commit -m "new"
```

11. Check in the changes to the remote repository

```
git push origin master

Counting objects: 7, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (7/7), done.
Writing objects: 100% (7/7), 510.18 KiB | 17.59 MiB/s, done.
Total 7 (delta 4), reused 0 (delta 0)
remote: Resolving deltas: 100% (4/4), completed with 4 local objects.
To https://github.com/kenken64/ProjectA.git
   84e356d..b6c5251  master -> master
```

12. Verify all the files are pushed to the github repo after the above steps

** Whenever there is new files created or any changes to the current codebase if the developer would like to check in their codes please run step 8,9,10 again. For those of you not very comfortable with command line there are many IDE Git integration software out there. See below screen capture for Visual Studio Code Git Plugin. Also Git GUI Standalone software by Atlassian https://www.sourcetreeapp.com/

<br>
<img style="width:350px;height:100px; float: center;" src="./screens/git5.png"/>
<br>

For branching, tagging and etc please visit the following link https://github.com/kenken64/NUSISS-DevOpsEng/blob/master/git/README.md


## Reference
* Software sourcetree - https://www.sourcetreeapp.com/
* Eclipse with Git - https://www.vogella.com/tutorials/EclipseGit/article.html
* Visual Studio Code - https://scotch.io/tutorials/git-integration-in-visual-studio-code
