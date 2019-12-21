<h1 align="center">
    <img src="https://res.cloudinary.com/stefanosaffran/image/upload/v1576226426/kxmdozm0odu7e0twlhx3.svg" />
    <br>
    GymPoint Fullstack app
</h1>

<h4 align="center">
  Gym management app, where the admin can manage students, plans, memberships and answer to student requests on the web app and students can check-in and create orders on the mobile app.
</h4>

<p align="center">
<img alt="Last commit on GitHub" src="https://img.shields.io/github/last-commit/StefanoSaffran/gympoint">
<img alt="Made by Stefano" src="https://img.shields.io/badge/made%20by-StefanoSaffran-%">
<img alt="Project top programing language" src="https://img.shields.io/github/languages/top/StefanoSaffran/gympoint">
<img alt="GitHub license" src="https://img.shields.io/github/license/StefanoSaffran/gympoint">
</p> 

## :rocket: Built with

This project was developed with the following technologies:

-  [Node.js](https://nodejs.org/)
-  [ReactJS](https://reactjs.org/)
-  [React Native](https://facebook.github.io/react-native/)
-  [Redux](https://redux.js.org/)
-  [Redux-Saga](https://redux-saga.js.org/)
-  [Redux-persist](https://github.com/rt2zz/redux-persist)
-  [@rocketseat/unform](https://github.com/Rocketseat/unform)
-  [Styled-components](https://www.styled-components.com/)
-  [React-toastify](https://github.com/fkhadra/react-toastify)
-  [React Navigation](https://reactnavigation.org/)
-  [React-icons](https://react-icons.netlify.com/)
-  [Axios](https://github.com/axios/axios)
-  [Reactotron](https://infinite.red/reactotron)
-  [Immer](https://github.com/immerjs/immer)
-  [Polished](https://polished.js.org/)
-  [Yup](https://www.npmjs.com/package/yup)
-  [Bee-queue](https://github.com/bee-queue/bee-queue)
-  [Date-fns](https://date-fns.org/)
-  [Prop-types](https://www.npmjs.com/package/prop-types)
-  [ESLint](https://eslint.org/)
-  [Prettier](https://prettier.io/)
-  [VS Code](https://code.visualstudio.com/)
-  And many more... Look at the package.json file to see all the dependecies of the app. - [backend](https://github.com/StefanoSaffran/gympoint/blob/master/backend/package.json) [frontend](https://github.com/StefanoSaffran/gympoint/blob/master/frontend/package.json) [mobile](https://github.com/StefanoSaffran/gympoint/blob/master/mobile/package.json)

## :information_source: How to run the application locally
### Requirements
To run the app, you will need [Git](https://git-scm.com), [Node.js](https://nodejs.org/) v12.13.1 or higher, [Yarn](https://yarnpkg.com/), [PostgreSQL](https://www.postgresql.org/) and [Redis](https://redis.io/) installed on your computer. I strongly recommend using [Docker](https://www.docker.com/) to run the databases.
<br>
If you install docker, follow this steps to install and run the docker images.

```bash
# install Redis image
docker run --name imageName -p 6379:6379 -d -t redis:alpine

# install Postgres image (if you don't specify an username it will be postgres by default)
docker run --name imagename -e POSTGRES_PASSWORD=yourPassword -p 5432:5432 -d postgres

# start Redis
docker start imageName

# start Postgres
docker start imageName

```
Now clone the repository and install the dependencies.
```bash
# to clone the repository
git clone https://github.com/StefanoSaffran/gympoint.git

# go into the backend folder
cd gympoint/backend

#install the backend dependencies
yarn install

```
In order to connect to the database, you will need to enter the access informations into a .env file, based on a .env.example file that is provided in the backend folder, change the variables according to your environment.
```bash
# run migrations
yarn sequelize db:migrate

# run seeds
yarn sequelize db:seed:all

# run api
yarn dev & yarn queue

# in another tab in the terminal install the frontend dependencies and run it 
cd frontend
yarn install
yarn start
```
Use this credentials to access the web application
<blockquote><strong>email:</strong> admin@gympoint.com</blockquote>
<blockquote> <strong>senha:</strong> 123456</blockquote>

for mobile you need the Android emulator with the SDK installed or IOS emulator and the react-native cli.

<blockquote>The project was developed and tested on Android emulator</blockquote>

```bash
# install dependencies and run the mobile
cd mobile
yarn install

# first open the emulator and start the react native server
yarn start

# in another tab install and run the app
yarn android

```
<blockquote>this part can be tricky, if you face some error, try running yarn start --reset-cache and yarn android again.</blockquote>

## :page_facing_up: License

This project is under the MIT license. See the [LICENSE](https://github.com/StefanoSaffran/gympoint/blob/master/LICENSE) for more information

## :mailbox_with_mail: Get in touch!

[LinkedIn](https://www.linkedin.com/in/stefanosaffran/) | [Website](https://stefanosaffran.com)