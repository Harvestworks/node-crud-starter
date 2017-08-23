# node-crud-starter
A quick start database backend, simple database with Create, Read, Update, Delete (CRUD) Rest API.

Using node.js with express and mongoose.  This repo uses the [express-restify-mongoose](https://github.com/florianholzapfel/express-restify-mongoose) npm module as a base.

## Project Goals

Future goals for this project, mostly not implemented yet.

#### User Friendly Setup
The end user in mind is a technically-able non-programmer.

#### Backend REST API *only*
This makes no assumptions about where the data is going once it has been got - the frontend could be a web page, mobile app, Max/MSP patch, terminal curl request, or some new thing that hasn't been invented yet.
The only front end contained in this repo should be ...

#### Webpage Test
... a simple, one page web application as a means to test the endpoints.

#### Documentation
As part of the "user friendly" goal, it should also be friendly to developers who wish to contribute.
2 Documentation paths will be started:  one for developers, one for users

#### Portability
(this may be tricky... )

Once a user has built up a database with this on their localhost, they should be able to install the same folder onto a new computer or web server.

## To start:

This assumes you have a mac and the following installed on your computer:
* [node.js](https://nodejs.org/en/)
* [mongodb](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)

All commands to be entered in a Mac Terminal window.

If you do not have a mac, the commands are very similar, if not the same.
Instructions for your OS should be readily available online.
In the future, this document will be updated for all OSes.

### Install node.js dependencies
`npm install`

### Start mongodb
In a separate Terminal window or tab:

`mongod`

### Start the server
`node app.js`
