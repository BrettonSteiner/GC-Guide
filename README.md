# GC-Guide
> The Get Conected Guide, my Senior Project for BYU-Idaho

The Get Connected Guide (GC Guide) is be a website that provides new students with information regarding their experience with the Get Connected New Student Orientation (GC) at BYU-Idaho. The new students will be able to find out which I-Team they are on, what college their selected major is in, and the schedule of GC activities with locations utilizing Google Maps. The Student Support Get Connected Committee (GC Committee) will be able to edit the information at any time through the administration portal.

## Installing / Getting started

To set up this application we'll be using Docker and Docker Compose. Docker will create and run a container from a Docker image of this application. First, you will need to have Docker installed on your computer:

https://docs.docker.com/get-docker/

Make sure your computer has these packages installed in the project's root directory:

```shell
npm install docker
npm install docker-compose
```

These packages will allow you to create and run the Docker image of this application. To create the image, run this command in the project's root directory:

```shell
docker-compose build
```

This will read the project's docker-compose.yml file to construct the image. To run the application, run this command in the project's root directory:

```shell
docker-compose up
```

This will create and run a container from the image we created in the last step.

And you're done! The application should now be running locally on your computer. You can access it through your localhost:

* Public page: http://localhost:8080
* Admin page: http://localhost:8080/admin

### Initial Configuration

This application requires certain keys and sensitive information in order to be fully functional. All of these can be provided in an environment variable file (`.env`) you can create in the "root/back" directory. The following features need the following environment variables to work properly:

#### Google Maps

Requires:
* Google Maps API key

In your environment variable file, put this line in (must be the same spelling and upper case):

```code
REACT_APP_GOOGLE_MAPS_API_KEY=<Your Google Maps API key here>
```

#### Email Service

Requires:
* Email service
* Email address to send from
* Password to email address provided above

In your environment variable file, put these lines in (must be the same spelling and upper case):

```code
EMAIL_SERVICE=<Your email provider. Ex: "gmail">
EMAIL=<Address of email you want it to send from>
PASSWORD=<Password of the above email>
```

Note: The email you provide may need to have certain settings set to allow 3rd-party applications to use it to send emails. For gmail, you will need to enable "Less secure app access." Follow Google's guide on it here:

https://support.google.com/accounts/answer/6010255

## Features

There are a number of features with this application. A few notable ones it makes use of are:
* [Google Maps](https://developers.google.com/maps) to show where events occur.
* An email service to allow users to email information to themselves.
* A file uploader to quickly import data into the database. Sample csv files can be found at https://github.com/BrettonSteiner/GC-Guide/tree/development/sample_files
* A [React](https://reactjs.org/)-[NodeJS](https://nodejs.org/en/)-[MongoDB](https://www.mongodb.com/) stack.
* [Bootstrap](https://getbootstrap.com/) for many styles and functions.
* Mobile-first design for the Public Page.
* Desktop-first design for the Admin Page.
