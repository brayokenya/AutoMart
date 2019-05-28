# AutoMart
[![Build Status](https://travis-ci.org/O-Osahon/AutoMart.svg?branch=develop)](https://travis-ci.org/O-Osahon/AutoMart)
[![Coverage Status](https://coveralls.io/repos/github/O-Osahon/AutoMart/badge.svg?branch=develop)](https://coveralls.io/github/O-Osahon/AutoMart?branch=develop)
<a href="https://codeclimate.com/github/O-Osahon/AutoMart/maintainability"><img src="https://api.codeclimate.com/v1/badges/ef3a5a387002a1bff028/maintainability" /></a>

Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.

# Features

## Core Features
- User can sign up.
- User can sign in.
- User (seller) can post a car sale advertisement.
- User (buyer) can make a purchase order.
- User (buyer) can update the price of his/her purchase order.
- User (seller) can mark his/her posted AD as sold.
- User (seller) can update the price of his/her posted AD.
- User can view a specific car.
- User can view all unsold cars.
- User can view all unsold cars within a price range.
- Admin can delete a posted AD record.
- Admin can view all posted ads whether sold or unsold.

## Extra Features

- User can reset password.
- User can view all cars of a specific body type.
- User can flag/report a posted AD as fraudulent.
- User can view all unsold cars of a specific make (manufacturer).
- User can view all used unsold cars.
- User can view all new unsold cars.



# Getting Started
To have this application running on your computer, follow the following steps



### Prerequisites
- You need to have [Node.js](nodejs.org) installed 
- You need to have a Cloudinary API key. Create a free account with [Cloudinary](https://cloudinary.com/). Your API key will be visible at the top of the screen after your have created your account.
- You will need a Mailgun API key. Create a free [Mailgun](https://www.mailgun.com/) account and follow the steps to obtain the API key



### Installing
- Clone or download this repository using `https://github.com/O-Osahon/AutoMart.git`
- Run `npm install` to install all the application's dependencies
- Set the following environment variables in your `.env` file:

    - `PORT` - An Integer specifying the PORT your application will run on.
    - `SECRET_KEY` - A random string used for generation authorization tokens.
    - `CLOUDINARY_URL` - A URL provided by [Cloudinary](https://cloudinary.com).
    - `MAILGUN_API_KEY` - API key provided by [Mailgun](https://mailgun.com).
    - `MAILGUN_DOMAIN` - A URL provided by  [Mailgun](https://mailgun.com).
    - `APPLICATION_URL` - It should be formated thus:  ***http(s)://(localhost/live domain)(:port)(TLD)/api/v1*** eg:
    
 ```
    http://localhost:300/api/v1 or https://automart-app.herokuapp.com/api/v1
 ```
    
    
 
### Running The Tests

#### Testing Locally
- Run `npm test`



#### Testing With Postman
- Install [Postman](https://getpostman.com).
- View the api endpoints [here](https://automart-app.herokuapp.com/docs).
   
	 
   
## Built With
- [Node.Js](https://nodejs.org)
- [ExpressJs](https://expressjs.com)



### Testing Tools
- [Mocha](https://www.npmjs.com/package/mocha)
- [Chai](https://www.npmjs.com/package/chai)
- [nyc](https://www.npmjs.com/package/nyc)
- [Istanbul](https://www.npmjs.com/package/istanbul)



### Coding Style
- [AirBnB](https://github.com/airbnb/javascript)



## Links
- UI Templates can be found [here](https://o-osahon.github.io/AutoMart/UI/html/index.html)
- APIs are hosted on [Heroku](https://heroku.com) [here](https://automart-app.herokuapp.com)
- API documentation can be found [here](https://automart-app.herokuapp.com/docs)
- This project is managed with [Pivotal Tracker](https://pivotaltracker.com) [here](https://www.pivotaltracker.com/n/projects/2345917)



## Author
- [Osahon Oboite](https://github.com/O-Osahon)



## Acknowledgements 
- README Format - [Billie Thompson](https://github.com/PurpleBooth).
- API Documentation - [David Thorpe](https://www.youtube.com/watch?v=5hS1wp70z1o&t=41s)