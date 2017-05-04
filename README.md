# README #

This is the backend for All About Movies app.

### Technologies and Libraries used ###

* Express(Node)
* Passport (for JWT authentication)
* Otplib (For generation of OTP to be send to the registered user's mail)
* Nodemailer (For sending OTP to the mail id)
* MongoDb(Mongoose)

### Rough manual ###

Database setup
Install Mongo 3.4 from the official website. The platform specific installation instructions can be found here :
https://docs.mongodb.com/manual/installation/

Once the installation is done, start up the ‘mongod’ server process. Make sure it is running on the default port 27017
Next run the `mongo` command in the terminal, in the prompt type the command `use movies` to create the movies database and then run the command `db.createCollection(“users”) to create the users collection

Then manually enter two users in the database:
(The created_at and update_at are audit fields and are automatically generated when entered through the app)
db.users.insert({
    "name" : "firstuser",
    "phone" : NumberLong(9999999999),
    "email" : "email that you want to be registered 1",
    "is_logged_in" : false,
    "created_at" : ISODate("2017-04-20T08:38:11.451Z"),
    "updated_at" : ISODate("2017-04-20T08:38:11.451Z"),
    "otp_secret" : ""
});

db.users.insert({
    "name" : "seconduser",
    "phone" : NumberLong(9999999999),
    "email" : "email that you want to be registered 1",
    "is_logged_in" : false,
    "created_at" : ISODate("2017-04-20T08:38:11.451Z"),
    "updated_at" : ISODate("2017-04-20T08:38:11.451Z"),
    "otp_secret" : ""
});
The database setup is complete.
Running the project
Run `npm i` on the root of the project
The project is configured to run and debug inside the VSCode itself, the startup file of the project is `/bin/www`. To simply run the project from an external terminal, run this command `node bin/www`.

To run the app from within the VSCode, go to the Debug option on the left toolbar, and then run the project from the play button on the top with the `Launch program` option being chosen.
 
