# Social Crate
Social Crate is a social platform created to facilitate a community dialog between farmers, other food related suppliers, and customers for Local Crate -- a meal kit provider decentralizing the food industry.

## Built With
* React
* Express
* PostgreSQL
* Material UI
* Passport
* AWS S3
* Nodemailer

## Installing
1. Clone the GitHub repository down to your machine.
2. Navigate to the folder in your Terminal.
3. Create a `.env` file at the root of the repository.
4. Inside the `.env` file, add following lines of code:
```
SERVER_SESSION_SECRET = sadfjlkj34tr#$5654ssgdfssdfg%^2312
aws_access_key_id = ///POPULATE WITH YOUR KEY ID see Deployment
aws_secret_access_key = ///POPULATE WITH YOUR KEY see Deployment
bucket_name = ///POPULATE WITH YOUR BUCKET NAME see Deployment
EMAIL_PASSWORD = ///Setup Gmail account
EMAIL_USERNAME = ///Setup Gmail account
multer_dest = /app/tmp/uploads/
```
5. Run the command `npm install` to install the dependencies.


## Deployment
1. Create AWS account.
    a. Create S3 bucket.
    b. Retrieve keys from AWS
        * Click account username in navbar
        * Select 'My Security Credentials'
        * Select access keys
        * Click 'Create new access key' - save this in the .env file
4. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Herkoku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add environment variables
* `SERVER_SESSION_SECRET` with a nice random string for security
* `aws_access_key_id` with key from step 3
* `aws_secret_access_key` with key from step 3
* `bucket_name` with bucket name from step 2
* do not touch `DATABASE_URL`, automatically populated by Heroku PostgreSQL
* `multer_dest` with `/app/tmp/uploads/`
* add `EMAIL_USERNAME` that you want nodemailer to send from
* add `EMAIL_PASSWORD` for email acct that you want nodemailer to send from
10. Push project to heroku

## Create database and table

Create a new database called `local_crate` and create the 5 tables listed in the database.sql file of this repo.

Example:
```SQL
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `local_crate` to the name of your new database name in `server/modules/pool.js`

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

