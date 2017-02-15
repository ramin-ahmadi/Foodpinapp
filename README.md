#Designed by Ramin Ahmadi 10/011/2015 http://www.raminahmadi.com

Welcome to FoodPinapp repository


This repository contains a set of Cordova (PhoneGap) app known as Foodpinapp.
Foodpin is a website and multi-platform mobile app that helps users find their preferred food easier.


#SETUP and USAGE
The steps bellow will take you through cloning your own fork, installing dependencies and building:


1. Fork and/or clone our repository. 

  ```
    git clone https://github.com/ramin-ahmadi/Foodpinapp.git
  ```

2. Open your terminal and run following command

  ```
$ sudo npm install -g cordova
  ```
    ```
  $ cordova platform add ios --save
    ```
    ```
  $ cordova platform add android --save
  
    ```
    
3. To check your current set of platforms:

    ```
$ cordova platform ls
    ```
Running commands to add or remove platforms affects the contents of the project's platforms directory, where each specified platform appears as a subdirectory.    
