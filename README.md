# Storefront Backend Project (Fullfillment of Udacity's Full-Stack Nanodegree (2nd project))

## Project Description

The aim of this project is to design a Rest API that interacts with a postgres database which play the role of a relational database. The API enables the project with CRUD operations for each provided model. <br>

### The Required environment variables

For the project to work correctley you need to create a ".env" file & provide the following variables in it:

- POSTGRES_HOST=(set your ip address) <br>

- POSTGRES_DB=(name your dev database) <br>

- POSTGRES_TEST_DB=(name your test database) <br>

- POSTGRES_USER=(name your postgres username) <br>

- POSTGRES_PASSWORD=(set your postgres password) <br>

- PGADMIN_DEFAULT_EMAIL=(set your login email for pgadmain) <br>

- PGADMIN_DEFAULT_PASSWORD=(set your login password for pgadmin) <br>

- pepper=(set your pepper string which 'll be used by bcrypt) <br>

- saltRounds=(set your salt "encryption" rounds) <br>

- secret=(set your secret string which will be used to verify the JWT's token signature) <br>

- ENV=(should be set to dev but changed to test before running the **test** script) <br>

### Operational Steps

1- From the terminal run **docker-compose up -d** to create the containers (after changin to the directory of the file in the terminal). <br>

2- Then through the terminal using the **docker ps** command, and copying the postgres image's container ID, we can then use the **docker exec -it (container ID number) bash** command. <br>

3- You can then create & access the database from the terminal using **psql -U postgres_user -d postgres_db** (to enter an existing DB) or from pgAdmin **@ localhost:5050** (port is defined @ the docker-compose). <br>

4- Open the project folder in your IDE, and then run **npm install** in IDE's terminal. <br>

5- Then you can run the project's test using **npm run test** in your IDE's terminal. <br>

6- That script will first run the up migration on the database which is provided in the ".env" file (you can select between dev & test). Then, it will trans-compile typescript to javascript and run the unit tests made using jasmine. And after that, it will drop all tables in the test database. <br>

7- To run the project's main js file, you could use the following command **node src/server.js**. <br>

8 - Finally, postman could then be used to manually check each endpoint of the Rest API. <br>

### Package Scripts

Provided within the package.json file, the following scripts could be used: <br>

1- **npm run lint** which is used for linting the Ts files. <br>

2- **npm run prettier** which runs prettier on Ts files. <br>

3- **npm run ja-test** which is used to build Js files and run jasmine on them. <br>

4- **npm run test** which run the database up migrations for the test database, then runs jasmine. <br>

### Extra Notes

1- Each model has the CRUD operations along with other functions to perform the optional requirements. <br>

2- The following additional functionalities have been provided: <br> - Top 5 most popular products. <br> - Showing products by their category. <br> - Listing the ( active or complete ) orders by each user. <br> - Listing 5 most recent purchases by each user (through the show-user endpoint). <br>

3- To acheive the optional goal of listing top 5 most popular products, a checkout method had to be made which updates the sold column within the product table and updates the mentioned order's status from "active" to "complete".
