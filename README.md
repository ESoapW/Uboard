# Uboard - a web application to find partners for campus events
IT5007 Project

## Video demo
[Video demo](https://www.dropbox.com/s/c0n8k273kqfmbaa/Uboard%20demo.mov?dl=0)
<br/>

## Access via public IP address
~~54.149.15.71:3000~~ Instance has been stopped
<br/>

## Test account
You are recommended to log in with this admin account to better experience all the features, however, you can also register a new account.   
email: `adminTest@u.nus.edu`, password: `admin`   
The browser may warn of password compromise, but it doesn't matter.   

## Set up and run on your local machine   

0. Make sure you have installed docker, java, node and npm
   
   ```
   java -version
   node --version
   npm --version
   ```
   
1. Clone this repository

    ```
    git clone https://github.com/ESoapW/Uboard.git
    cd Uboard/
    ```   

2. Set up and start PostgreSQL database

    Open docker

    ```
    docker compose up
    ```

    Go to `localhost:5050/browser`, password: `admin`  
    Add a new server with properties `Name: Uboard, Port: 5432`  
    Add a new database with properties `Database: postgres, Username: postgres, Password: changeme`   
    Using query tool and run the sql query in `sql/activity.sql` to initialize the database  
    <br/>

3. Start back-end server

    ```
    screen java -jar target/5007project.jar
    ```

    Detach from screen (ctrl/cmd + A + D)   
    <br/>

4. Set up and start file server

    ```
    npm install -g http-server
    screen http-server ./
    ```

    Detach from screen (ctrl/cmd + A + D)   
    <br/>

5. Start frond-end server

    ```
    cd frontend
    npm install
    npm run build
    npm start
    ```

    The web app should pop up, if not, enter `localhost:3000` in your browser




