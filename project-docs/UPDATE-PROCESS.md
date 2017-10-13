# update process 

## project details
master branch is controlled by Francisco (Slack: @Fordaz) at git@github.com:CescoIV/my_travels_log.git


## update steps

These steps assume that you have already created a fork of the project and have cloned your personal fork to your local repo and that all of your changes have been pushed back to your fork's master. 

### Updating local pc repo with the current master files. 
Update your local repo from your personal fork with all updates current in the master. 

1. Setup a remote connection to the master to get updates from project team
    ```git remote add "upstream" git@github.com:CescoIV/my_travels_log.git```

2. Run merge command to apply them to your local setup
    ```git merge upstream/master```

    *side note: the term master refers to the master fork, you could also update a different branch by putting the name in.*

3. Update your fork repo to your github then submit a pull request to turn your changes in to the master (managed by Francisco)
    ```git push origin master```

