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
1. Download the GitHub repository down to your machine.
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

## Documentation
[Scope Document] - See 'Local Crate Scoping Document' in the root folder of this repo.

## Create database and table
Postico is the recommended application for creation of your database as the formatting in the database.sql file is built from postico code.

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

## Create AWS Account to host photos
1. Create AWS account.
2. Create S3 bucket.
3. Retrieve keys from AWS
4. Click account username in navbar
5. Select 'My Security Credentials'
6. Select access keys
7. Click 'Create new access key' - save this in the .env file

### Admin Creation
This is an important step!  The app does not have functionality to crate an admin from a live deployed app.
1. To create an administrator, first make sure the server and app is running locally.
2. Navigate to [the Register page](http://localhost:3000/#/register) in your browser.
3. Register the a user by following the steps.
4. In Postico, navigate to the `local_crate` database you created then to the `person` table.
5. Change the `user_type` column from `user` to `admin`.
6. This user is now an administrator.   When you push this database to Heroku, the user you created will permanently be an administrator and give access to administrator functionality.

## Deployment on Heroku
1. Register an account on Heroku (http://signup.heroku.com/login).
2. If you have not already done so, install the Heroku CLI (Command Line Interface) in the Terminal with the command `brew install heroku`.
3. Authenticate your Heroku credentials with the command `heroku login` and follow the prompts.
4. Create a new Heroku project - In the Terminal, navigate to the folder where you cloned the repo and use the command `heroku create`.
5. Create an Herkoku Postgres database: Run the commands `heroku addons:create heroku-postgresql:hobby-dev` and `heroku pg:push local_crate DATABASE_URL` to add Postgres functionality to the Heroku project.
6. Now that Heroku is almost set up, create the production build with the command `npm run build`.  This will create a build folder that contains the code Heroku will be pointed at.
7. Remove or comment out the `build/Release` line from the .gitignore file.
8. Add and commit the new build files and updated .gitignore.
9. Run the command `git push heroku master` to push the application to Heroku.  This process may take several minutes.
10. Add environment variables through the heroku dashboard for this app - these are the same as your .env file
* `SERVER_SESSION_SECRET` with a nice random string for security
* `aws_access_key_id` with key from step 1
* `aws_secret_access_key` with key from step 1
* `bucket_name` with bucket name from step 1
* do not touch `DATABASE_URL`, automatically populated by Heroku PostgreSQL
* `multer_dest` with `/app/tmp/uploads/`
* add `EMAIL_USERNAME` that you want nodemailer to send from
* add `EMAIL_PASSWORD` for email accountt that you want nodemailer to send from
11. Run the command `heroku open` to open the project!

## Lay of the Land
* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

## Authors
[Shannon Engstrom](https://github.com/Shannonengstrom) \
[Ben Hacker](https://github.com/BenHacker1995) \
[Bill Hickey](https://github.com/bhickey77) \
[Jake Tovsen](https://github.com/JacobTovsen)

