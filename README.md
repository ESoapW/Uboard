# Uboard - a web application to find partners for campus events
---
IT5007 Project

## Run on your local machine   
   
1. Clone this repository

    ```
    git clone https://github.com/Daisy1111/IT5007project.git
    cd
    ```   

2. Set up and start PostgreSQL database

    Open docker

    ```
    docker compose up
    ```

    Go to `localhost:5050`  
    Add a new server  
    Run the sql query in `sql/activity.sql` to initialize the database

3. Start back-end server

    ```
    screen java -jar target/5007project.jar 
    ```

    Detached from screen (ctrl/cmd + A + D)

4. Set up and start file server

    ```
    npm install -g http-server
    screen http-server ./
    ```

    Detached from screen (ctrl/cmd + A + D)

5. Start frond-end server

    ```
    cd frontend
    npm install
    npm run build
    npm start
    ```

    The web app should pop up, if not, enter `localhost:3000` in your browser (Chrome is recommended)

## Video

[Presentation video]()

[Set up tutorial]()