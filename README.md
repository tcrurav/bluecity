# BlueCity

Bluecity App and Server Software repository.

This is a MEC funded project which aims the construction of a prototype for a network of scooter parkings in a city, including the construction of the parkings (INS Esteve Terradas i Illa), the app and server software (IES El Rincón), the economic study of the project (INS Bernat el Ferrer), and the overall councelling by a company (Furious Koalas).

These are the collaborating institutions:
* [IES El Rincón](http://www.ieselrincon.es)
* [INS Esteve Terradas i Illa](http://www.iesesteveterradas.cat)
* [INS Bernat el Ferrer](https://www.bernatelferrer.cat)
* [Furious Koalas Interactive](https://www.furiouskoalas.com/)

## Getting Started

Download links:

From Github: https://github.com/tcrurav/bluecity.git

## Prerequisites

You need a working environment with:
* [Git](https://git-scm.com) - You can install it from https://git-scm.com/downloads.
* [MySQL](https://www.mysql.com) - You can install it from https://www.mysql.com/downloads/.
* [Node.js](https://nodejs.org) - Install node.js from https://nodejs.org/es/download/. It's advisable to install the LTS version.
* [Docker](https://www.docker.com/) - Install it if you want to deploy this project with Docker.

## General Installation instructions

The best option to start with this project is cloning it in your PC:

```
git clone https://github.com/tcrurav/bluecity.git
```

This project contains 4 different parts:
* Frontend
* Backend
* Box_simulator_frontend (Just to simulate a parking box)
* Box_simulator_backend (Just to simulate a parking box)

You need a node.js working environment. The LTS is recommended: https://nodejs.org/es/

Once you have cloned your project install all dependencies.

```
cd bluecity/frontend
npm install

cd bluecity/backend
npm install

cd bluecity/box_simulator_frontend
npm install

cd bluecity/box_simulator_backend
npm install
```

* For your frontend part, if you want to use the Google Login feature, you have to create a clientID by creating a new project on Google developers website.: https://developers.google.com/identity/sign-in/web/sign-in

In that page click on the blue button "Configure a project" to start the process of obtaining your clientID.

After clicking on the blue button you'll have to sign in Google, and then you will be able to create a new project:

![Create Project](/docs/screenshot-17-bis.png)

![Create Project](/docs/screenshot-18-bis.png)

![Create Project](/docs/screenshot-19-bis.png)

![Create Project](/docs/screenshot-20-bis.png)

In our local environment we can use the default http://localhost:3000 as the origin. For an explotation deployment you'll have to change/add your deployment URL.

![Create Project](/docs/screenshot-21-bis.png)

And finally you get your ClientID:

![Create Project](/docs/screenshot-22-bis.png)

Your Google ClientID is used in the file bluecity/frontend/src/components/my-login-with-google.js and should be inserted in the file bluecity/frontend/.env in the following manner: 

```
REACT_APP_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com
REACT_APP_BASEURL=http://localhost:4000
```

Take into account the second line to introduce in the file bluecity/frontend/.env necessary to indicate the base URL of your API.

* For your backend part:
1. You need a bluecity/backend/.env file with a key for the JWT and the data for the connection to your MySQL Server:

```
JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#

DB_DATABASE=bluecity_dev
DB_USER=a_user
DB_PASSWORD=a_password_for_user
DB_ROOT_PASSWORD=a_password_for_root_user
DB_DIALECT=choose_mysql_or_postgres
BLUECITY_CLIENT=http://localhost:3000

DB_HOST=127.0.0.1

NODE_ENV=development

HTTPS=false

# true --> using websockets to communicate to PARKING BOX intermediate computer
# false --> NOT using websockets to communicate to PARKING BOX intermediate computer
USING_WEBSOCKETS=true
```

2. You need a mysql server working.

3. Create the mysql database, that in our case is "bluecity_dev".

4. Do the migration creating the tables with the contents of /bluecity/backend/migrations 

```
cd /bluecity/backend
npx sequelize-cli db:migrate
```

5. And populating the tables with data with the contents of /bluecity/backend/seeders

```
cd /bluecity/backend
npx sequelize-cli db:seed:all
```

* For your box_simulator_frontend part, intended only to test a parking box, in the file bluecity/box_simulator_frontend/.env put the following 2 lines: 

```
REACT_APP_BASEURL=http://localhost:9000
PORT=8000

# true --> simulating OPCUA to communicate to box_simulator_backend
# false --> NOT simulating OPCUA to communicate to box_simulator_backend but using websockets
REACT_APP_SIMULATING_OPCUA=true
```

* For your box_simulator_backend part, intended only to test a parking box, in the file bluecity/box_simulator_backend/.env put the following 2 lines: 

```
BACKEND_URL=http://localhost:4000

NODE_ENV=development

# true --> using websockets to communicate to Backend
# false --> NOT using websockets to communicate to Backend
USING_WEBSOCKETS=true

# true --> using PLC
# false --> NOT using PLC but box simulator frontend simulating OPCUA
USING_PLC=false

//Reading from PLC
PLC_OPEN_BOX_CONFIRMED_1="Bloque de datos_2"."datos_enviar"."openboxconfirmed_1"
PLC_OPEN_BOX_CONFIRMED_2="Bloque de datos_2"."datos_enviar"."openboxconfirmed_2"
PLC_OPEN_BOX_CONFIRMED_3="Bloque de datos_2"."datos_enviar"."openboxconfirmed_3"
PLC_DETECTOR_1="Bloque de datos_2"."datos_enviar"."detector_pateineta_1"
PLC_DETECTOR_2="Bloque de datos_2"."datos_enviar"."detector_pateineta_2"
PLC_DETECTOR_3="Bloque de datos_2"."datos_enviar"."detector_pateineta_3"

//Writting to PLC
PLC_BOX_ID="Bloque de datos_2"."datos_recibir"."box_id"
PLC_OPEN_BOX="Bloque de datos_2"."datos_recibir"."open_box"
PLC_CLOSE_BOX="Bloque de datos_2"."datos_recibir"."closed_box"
PLC_RESERVE="Bloque de datos_2"."datos_recibir"."reserva"

PLC_PARKING_ID=8

PLC_POOLING_TIME=500

PLC_OPCUA_URL=opc.tcp://192.168.0.40:4000
```

Finally to start enjoying this project.

```
cd bluecity/frontend
npm start

cd bluecity/backend
npm start

cd bluecity/box_simulator_frontend
npm start

cd bluecity/box_simulator_backend
npm start
```

If you follow the former instructions the 4 different parts of this project will be running on the following urls:
* Frontend (http://localhost:3000)
* Backend (http://localhost:4000)
* Box_simulator_frontend (http://localhost:8000)
* Box_simulator_backend (http://localhost:9000)

Enjoy!!!

## Installation instructions for Ubuntu 20.04 
### (this documentation feature needs update)

Ensure you have an updated environment with update/upgrade:

```
$ sudo apt update
$ sudo apt upgrade
```

You need a node.js working environment. Install Node.js and npm (node package manager):

```
$ sudo apt install nodejs
$ sudo apt install npm
```

You need git to clone the project:

```
$ sudo apt install git
```

Create a directory for bluecity and clone the project using git:

```
$ mkdir ~/bluecity
$ cd ~/bluecity
$ git clone https://github.com/tcrurav/bluecity.git
```

You will notice this project contains 2 different parts (in 2 directories):
* Frontend
* Backend

Once you have a node.js working environment and you have cloned your project install all dependencies.

```
$ cd ~/bluecity/bluecity/frontend
$ npm install

$ cd ~/bluecity/bluecity/backend
$ npm install
```

* For your frontend part, if you want to use the Google Login feature, you have to create a clientID by creating a new project on Google developers website.: https://developers.google.com/identity/sign-in/web/sign-in, as explained previously in the General Installation Instructions above.

Your Google ClientID is used in the file bluecity/frontend/src/components/my-login-with-google.js and should be inserted in the file bluecity/frontend/.env in the following manner: 

```
REACT_APP_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com
REACT_APP_BASEURL=http://localhost:4000
CI=true
```

Take into account the second line to introduce in the file bluecity/frontend/.env is necessary to indicate the base URL of your API. The third line "CI=true" is to avoid a bug in react-scripts that maybe will be solved soon.

* For your backend part:
1. Create a ~/bluecity/bluecity/backend/.env file with a key for the JWT:

```
JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#

DB_DATABASE=bluecity_dev
DB_USER=a_user
DB_PASSWORD=a_password_for_user
DB_ROOT_PASSWORD=a_password_for_root_user
DB_DIALECT=choose_mysql_or_postgres
BLUECITY_CLIENT=http://localhost:3000

DB_HOST=127.0.0.1

NODE_ENV=development
```

2. You need a mysql server working. For detailed instructions click on https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04

```
$ sudo apt install mysql-server
$ sudo mysql_secure_installation
```

For the last command introduce the following recommended options:

![mysql](/docs/screenshot-31-bis.png)

And for the rest of the options just click on ENTER.

Now you can enter in the mysql CLI:

```
$ sudo mysql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'a_password_for_root';
mysql> FLUSH PRIVILEGES;
mysql> exit
```

Now you can enter in the mysql CLI again with your new password to create the database for this project:

```
$ sudo mysql -u root -p
mysql> create database bluecity_dev;
mysql> exit
```

3. Do the migration creating the tables with the contents of ~/bluecity/bluecity/backend/migrations 

```
$ cd ~/bluecity/bluecity/backend
$ npx sequelize-cli db:migrate
```

4. And populating the tables with data with the contents of ~/bluecity/bluecity/backend/seeders 

```
$ cd ~/bluecity/bluecity/backend
$ npx sequelize-cli db:seed:all
```

Finally to start enjoying this project.

```
$ cd ~/bluecity/bluecity/frontend
$ npm start

$ cd ~/bluecity/bluecity/backend
$ npm start
```

Enjoy!!!

## Installation instructions if you want to deploy the project with Docker
### (this documentation feature needs update)

Clone this project in your PC:

```
git clone https://github.com/tcrurav/bluecity.git
```

This project contains 2 different parts:
* Frontend
* Backend

Let's see how to proceed with each one:

* For your frontend part, if you want to use the Google Login feature, you have to create a clientID by creating a new project on Google developers website.: https://developers.google.com/identity/sign-in/web/sign-in, as explained previously in the General Installation Instructions above.

Your Google ClientID is used in the file bluecity/frontend/src/components/my-login-with-google.js and should be inserted in the file bluecity/frontend/.env in the following manner: 

```
REACT_APP_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com
REACT_APP_BASEURL=http://localhost:4000
```

Take into account the second line to introduce in the file bluecity/frontend/.env necessary to indicate the base URL of your API.

* For your backend part, you need a bluecity/backend/.env file with a key for the JWT and the data for the connection to your MySQL Server:

```
JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#

MYSQL_DATABASE=bluecity_dev
MYSQL_USER=a_user
MYSQL_PASSWORD=a_password_for_a_user
MYSQL_ROOT_PASSWORD=a_password_for_root

DB_HOST=db

NODE_ENV=development
```

* Finally go to the base directory of the project and run the docker-compose file:

```
$ cd bluecity
$ docker-compose up
```

Enjoy!!!

## Installation instructions if you want to deploy the project with Openshift
### (this documentation feature needs update)

Basically you have to first follow the instructions of the section "Installation instructions if you want to deploy the project with Docker" of this document.

Next you can create a free openshift online account: https://www.openshift.com/products/online/clicking on Sign up for free arriving to the link: https://manage.openshift.com/sign_in

Once you have created your openshift free online account create a new project on openshift web console.

After that notice that you have 2 different profiles to work with. Choose the "Developer" profile.

Click on "+Add" to create a new Database in your project. You need the data of the .env you have previosly entered to use the MySql template in openshift.

Click on "+Add" to create 2 new containers to your project for bluecity_api and bluecity_app. There are many possibilities. You can choose "Container image" to make use of the docker images you have already created using the docker-compose.yml file in the section "Installation instructions if you want to deploy the project with Docker" of this document.

You could choose the possibility to specify an image name of an external registry. To upload an image to docker hub (a possible external registry), you have to create an account in docker hub, and then just do the following to upload the images to docker hub:

```
$ docker tag bluecity_api <user>/bluecity_api
$ docker push <user>/bluecity_api
$ docker tag bluecity_api <user>/bluecity_api
$ docker push <user>/bluecity_api
```

Notice that user is your docker hub user account.

Once you have your 2 images uploaded to docker-hub you can proceed with the image deploy in openshift. Here you have an screenshot of my own image tcrurav/bluecity_api. (Remember to change tcrurav for your user docker hub account):

![Dockerhub](/docs/Openshift-Dockerhub.png)

After you have deployed your 3 images now your Openshift Topology should look like this:

![topology](/docs/Openshift-Topology.png)

At this point you need to run the entry-point.sh script in the bluecity_api container. For that access the openshift terminal and run the following command:

```
$ ./docker-entrypoint.sh
```

![Terminal](/docs/Openshift-Terminal.png)

And that's all.

Alternatively There are many other possibilities with Openshift including the use of Kompose to translate automatically the docker-compose.yml into Openshift objects, using the following instructions link: https://kubernetes.io/docs/tasks/configure-pod-container/translate-compose-kubernetes/

## Dev Docs

* [Ordinogram](https://github.com/tcrurav/bluecity/blob/master/docs/ordinogram.pdf) - The ordinogram designed by IES STEVE TERRADAS.
* [ER Diagram](https://github.com/tcrurav/bluecity/blob/master/docs/bluecity_dev_ER_diagram.png) - The Entity-Relationship backend's diagram.

## Built With

* [Visual Studio Code](https://code.visualstudio.com/) - The Editor used in this project
* [React](https://reactjs.org/) - React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
* [Node.js](https://nodejs.org/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Leaflet](https://leafletjs.com/) - an open-source JavaScript library for mobile-friendly interactive maps.
* [react-fontawesome](https://github.com/FortAwesome/react-fontawesome) - React package integrating all icons in fontawesome.
* [react-bootstrap](https://react-bootstrap.github.io/) - React-Bootstrap replaces the Bootstrap JavaScript. Each component has been built from scratch as a true React component, without unneeded dependencies like jQuery.
* [react-leaflet](https://react-leaflet.js.org/) - React-Leaflet uses ⚛️ React's lifecycle methods to call the relevant Leaflet handlers, which has a few consequences.
* [sequelize](https://sequelize.org/) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.
* [express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
* [MySQL Workbench](https://www.mysql.com/products/workbench/) - MySQL Workbench is a unified visual tool for database architects, developers, and DBAs.
* [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
* [react-i18next](https://react.i18next.com) - react-i18next integrates internationalization i18n in React.
* [react-flag-icon-css](https://www.npmjs.com/package/react-flag-icon-css) - A simple React SVG country flags component: it works with Css Modules (default) or standard Css.
* [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js.
* [socket.io](https://socket.io/) - Socket.IO enables real-time, bidirectional and event-based communication.
* [socket.io-client](https://socket.io/) - Socket.IO enables real-time, bidirectional and event-based communication.
* [node-opcua](https://github.com/node-opcua) - An implementation of a OPC UA stack fully written in javascript and nodejs. OPC UA is used to connect to S7-1500 in this project.

## Acknowledgments

* https://www.cluemediator.com/category/reactjs. Excellent tutorial as a basis for learning the basics needed for this project.
* https://bezkoder.com/react-crud-web-api/. Another excellent tutorial to learn about the basics of this project.
* https://gist.github.com/PurpleBooth/109311bb0361f32d87a2. A very complete template for README.md files.
* https://w3path.com/react-google-login-with-example/. Excellent tutorial to understand Google login feature.
* https://www.theserverside.com/video/Follow-these-git-commit-message-guidelines. Guidelines to write properly git commit messages.
* https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04. Excellent tutorial to install mysql-server in Ubuntu 20.04.
* https://github.com/vishnubob/wait-for-it. wait-for-it.sh is a pure bash script that will wait on the availability of a host and TCP port. In our bluecity project makes it possible that the api waits for mysql when the docker-compose.yml file gets launched.
* https://react.i18next.com/latest/using-with-hooks. Step by step guide using react-i18next.
* https://www.npmjs.com/package/react-flag-icon-css. A simple React SVG country flags component: it works with Css Modules (default) or standard Css.