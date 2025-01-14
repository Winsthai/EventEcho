# How to Run Schema and Seeding Scripts

## Obtain .env File
Retrieve a ```.env``` file from a trusted developer. This is required to access the database. Place the ```.env``` file in the outermost directory ```../SENG513-FALL24-GROUP-7```.

This ```.env``` file should contain three variables: POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB, for the username, password, and name of the database respectively. Here is an example of ```.env``` file that could be used:

```dotenv
POSTGRES_USER = postgres
POSTGRES_PASSWORD = password
POSTGRES_DB = mydb
```

## Running the Schema and Seeding Scripts
Create the Docker container with the ```docker-compose up --build``` command. The dockerfiles are configured in a way where the SQL scripts in the ```db``` folder will run while the container is being set up.

The database can now be viewed in the terminal.

## Viewing the Database
Launch the PostgreSQL terminal inside the Docker container. 
```
docker-compose exec db psql -U <username> -d <name of database>
```
This command will automatically connect to the ```mydb``` database, if using the provided example ```.env``` credentials above:
```
docker-compose exec db psql -U postgres -d mydb
```

View all tables inside the database:
```
\dt
```

Any SQL statement can be executed. To view the ```events``` table:
```
SELECT * FROM events;
```

To exit the terminal:
```
\q
```


