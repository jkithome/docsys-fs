[![Build Status](https://travis-ci.org/andela-jkithome/docsys-fs.svg?branch=master)](https://travis-ci.org/andela-jkithome/docsys-fs) <a href="https://codeclimate.com/github/andela-jkithome/docsys"><img src="https://codeclimate.com/github/andela-jkithome/docsys/badges/gpa.svg" /></a> </a> [![codecov.io](https://codecov.io/github/andela-jkithome/docsys-fs/coverage.svg?branch=master)](https://codecov.io/github/andela-jkithome/docsys-fs?branch=master)
# DOCUMENT MANAGEMENT SYSTEM (DOCSYS)
This is a system for managing documents, users and roles. Users have defined roles which determine what they can do. Users create documents and specificy the roles that are allowed to access the document. The user role combined with the roles allowed to access a document determine what a user can do to the document. The system was developed using moongose an ODM for node. The front end is implemented using React JS and flux.

## Installation & Usage
  - Download and install [**Node Js**](https://nodejs.org/en/download/) and [**MongoDB**](https://www.mongodb.org/downloads#production)
  - Clone the [**repository**](https://github.com/andela-jkithome/docsys-fs.git) or download the project zip file from the project github page [**here**](https://github.com/andela-jkithome/docsys-fs). Unzip it.
  - Navigate to the root of the folder and ensure you are in the master branch
  - Run npm install to install required dependencies
  - Run gulp to build project folders and start the server.
  - The application can be accessed locally at http://localhost:8080 or [**DOCSYS**](https://docsys-fs.herokuapp.com) online.

## Testing
Back end testing is done using superagent and jasmine node. Superagent is used to make requests to the server and tests done on the responses. Front end testing is executed using Mocha, chai, enzyme and sinon. Mocha is the testing framework while sinon is used to spy on calls, stub and mock functions. Enzyme is used for assertions. To test the system, navigate to the root folder of the project and make sure you are in the master branch by running git branch. To test the app on the command line, run the following command.

Test coverage was achieved through the use of Karma and Instanbul. To get coverage reports run karma start at the terminal. Ensure Karma is installed globally.

## Express Routes
The API endpoints were created using express router. To access them on a http client or browser, run node index.js on your terminal at the root of the project folder. The routes are defined under server/routes.

## Continuous intergration
Initially, Circle CI was used in the project for continous intergration before switching to Travis CI exclusively due to errors in installing packages. A history of the builds can be seen in these links. [**Circle CI**](https://circleci.com/gh/andela-jkithome/docsys-fs). [**Travis CI**](https://travis-ci.org/andela-jkithome/docsys-fs/builds).

## Project Management
This project was managed using Pivotal tracker. Click [**here**](https://www.pivotaltracker.com/n/projects/1514944) to see the project page.