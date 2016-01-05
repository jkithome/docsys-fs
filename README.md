<a href="https://codeclimate.com/github/andela-jkithome/docsys"><img src="https://codeclimate.com/github/andela-jkithome/docsys/badges/gpa.svg" /></a> <a href="https://codeclimate.com/github/andela-jkithome/docsys/coverage"><img src="https://codeclimate.com/github/andela-jkithome/docsys/badges/coverage.svg" /></a>
# DOCUMENT MANAGEMENT SYSTEM
This is a system for managing documents, users and roles. Users have defined roles which determine what they can do. Users create documents and specificy the roles that are allowed to access the document. The user role combined with the roles allowed to access a document determine what a user can do to the document. The system was developed using moongose an ODM for node.

## Installation
  - Download and install [**Node Js**](https://nodejs.org/en/download/) and [**MongoDB**](https://www.mongodb.org/downloads#production)
  - Clone the [**repository**](https://github.com/andela-jkithome/docsys.git) or download the project zip file from the project github page [**here**](https://github.com/andela-jkithome/docsys). Unzip it.
  - Navigate to the root of the folder and ensure you are in the master branch
  - Run npm install to install required dependencies

## Testing
Testing is done using superagent and jasmine node. Superagent is used to make requests to the server and tests done on the responses. Mongoose seed is used to seed initial users to help in testing. To test the system, open four tabs and navigate to the root folder of the project in each. Run the following commands in a tab in order:

  - mongod
  - node index.js
  - node test/seed/seed.js
  - npm test

## Express Routes
The API endpoints were created using express router. To access them on a http client or browser, run node index.js on your terminal at the root of the project folder. The routes are defined under server/routes.