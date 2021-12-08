# Comiclub

This is the repository for the Comiclub website! \
Built By Students in CSC309, during the Fall Semester of 2021, at UofT.

Students involved: \
`Dionysus Cho` \
`Patrick Vuscan` \
`Raag Kashyap` \
`Salman Shahid`
___

## Available Scripts
___

This website is run on heroku.

When running locally, this is the simplest set of steps to get running:
```
> mkdir mongo-data
> npm run setup
> npm run dev-all
```

Here is the complete set of commands available to us
In the project directory, you can run:

### `npm start`

This runs the server as if it were in production - note, that this uses a frontend **BUILD**. Thus, to make it work, you must ensure you first run
```
> npm run build-frontend
```

### `npm run build-frontend`

This builds the frontend react app.

### `npm run dev`

This runs the server with nodemon, so it watches for changes.

### `npm run setup`

This `npm install`s both the frontend and backend.

### `npm run dev-all`

This does magic - using `concurrently` it will run the frontend, backend, and mongoDB all at once, locally. As before, must have already created the `mongo-data` folder in the root.

___
## Highlevel Structure
___
Inside of `db` you will find files for creating our `cloudinary` connection, as well as our `mongoose/mongoDB` connection. \
Inside of `frontend` you will find our frontend. \
Inside of `models` you will find our mongoose models. \
Inside of `mongo-data` you will see local mongoDB data, IF you're running locally. \
Inside of `routes` you will see our express routes, seperated by which mongoose model they pertain to. \

___

# Express Server Routes

## Comics

### POST '/'
### POST '/update/:comicID'
### POST '/thumbnail/:comicID'
### POST '/like'
### POST '/unlike'
### GET '/retrieve/all-comics'
### GET '/retrieve/top-comics'
### GET '/retrieve/comics-by-genre'
### GET '/userID'
### GET '/:comicID'
### GET '/user/likedComics'
### GET '/userID/:userID'
### GET '/liked/:comicID'
### DELETE '/:comicID'

## Comments

### GET '/episodeID/:episodeID'

Get a list of Comments made on an Episode

#### Request

`GET` : `.../api/comments/episodeID/61ae7c4a5a128860f4c702ed`

#### Response

```JSON
[
    {
        "_id": "61aff3739d3831d26462d58e",
        "userID": "61aed51ea56b52c09c401094",
        "episodeID": "61aed58da56b52c09c4010af",
        "body": "hello world!",
        "publishDate": "2021-12-07T23:51:15.664Z",
        "__v": 0
    },
    {
        "_id": "61aff6af15155016b1081b46",
        "userID": "61aed51ea56b52c09c401094",
        "episodeID": "61aed58da56b52c09c4010af",
        "body": "hello world again!",
        "publishDate": "2021-12-08T00:05:03.998Z",
        "__v": 0
    }
]

```
---

### GET '/userID/:userID'

Get all the comments made by a User.

#### Request

`GET` : `.../api/comments/userID/61aed51ea56b52c09c401094`

#### Response

```JSON
[
    {
        "_id": "61aff3739d3831d26462d58e",
        "userID": "61aed51ea56b52c09c401094",
        "episodeID": "61aed58da56b52c09c4010af",
        "body": "hello world!",
        "publishDate": "2021-12-07T23:51:15.664Z",
        "__v": 0
    },
    {
        "_id": "61aff6af15155016b1081b46",
        "userID": "61aed51ea56b52c09c401094",
        "episodeID": "61aed58da56b52c09c4010af",
        "body": "hello world again!",
        "publishDate": "2021-12-08T00:05:03.998Z",
        "__v": 0
    }
]
```

---

### PUT '/'

Adds a Comment to an Episode.

#### Request

`PUT` : `.../api/comments/`

Body:

```JSON
{
    "episodeID": "61aed58da56b52c09c4010af",
    "body": "hello world!"
}
```

#### Response
```JSON
{
    "_id": "61aff3739d3831d26462d58e",
    "userID": "61aed51ea56b52c09c401094",
    "episodeID": "61aed58da56b52c09c4010af",
    "body": "hello world!",
    "publishDate": "2021-12-07T23:51:15.664Z",
    "__v": 0
}
```
---

### DELETE '/comment'

Deletes a Comment from an Episode.

#### Request
`DELETE` : `.../api/comments/comment`

Body: 

```JSON
{
    "userID": "61aed51ea56b52c09c401094",
    "episodeID": "61aed58da56b52c09c4010af",
    "commentID": "61aff6af15155016b1081b46"
}
```

#### Response
```
Removed: "hello world again!"
```
---

## Episodes

### POST '/update/:episodeID'
### POST '/thumbnail/:episodeID'
### POST '/panels/:episodeID'
### POST '/view'
### GET '/:episodeID'
### GET '/userID/:userID'
### GET '/comicID/:comicID'
### PUT '/episode'
### DELETE '/:episodeID'

## Users

### POST '/'
### POST '/login'
### POST '/check-credentials'
### POST '/profile-picture'
### POST '/all-users'
### GET '/'
### GET '/logout'
### GET '/check-session'
### GET '/:username'
### GET '/userID/:userID'
### GET '/:username/likes'
### GET '/email/:email'
### DELETE '/:userID'


# React Express Auth

This example demonstrates how to:

-   connect your React frontend to Express backend and MongoDB
-   create user sessions and send session cookies
-   check the authentication status of the frontend

## Setup
Start your local Mongo database.  For example, in a separate terminal window:

```
# create and run local Mongo database in the root directory of the repo
mkdir mongo-data
mongod --dbpath mongo-data
```

Then, in the root directory of the repo, run:
```
# install server dependencies in the root directory
npm install

# install frontend dependencies in the frontend directory
cd frontend
npm install
```

Alternatively, you can run `npm run setup` in the root directory which runs a script to execute all the above commands (not including starting the mongo database, since it should be run in a separate window). This is a shortcut command defined in [package.json](package.json).

## Development

During development, run the following commands to build your React app and start the Express server.  You should re-run these commands for your app to reflect any changes in the code. Make sure mongo is still running on a separate terminal.

```
# build the React app
cd frontend
npm run build

# go back to the root directory
cd ..

# run the server
node server.js
```

Alternatively, you can run `npm run build-run` in the root directory which runs a script to execute all the above commands. This is a shortcut command defined in [package.json](package.json).

Note that all of this above is for testing a react app build, which becomes static, and needs to be rebuilt each time a change is made in the frontend.

There is an alternative: running the front-end and backend separately, so that changes to both are reflected immediately.

There is a simple script made for this, when run in the root directory, assuming you have already created the mongo-data directory.

```
# Use concurrently to run everything at once
npm run dev-all
```
## Creating a User

There is no frontend form to create a user on the app, so before you login send a `POST` request to `/api/users` with something like:
```
{
    "email": "bob@gmail.com",
    "password": "123456"
}
```
Then proceed to `http://localhost:5000` in your browser and login with your credentials.

## Directory Structure

```
react-express-auth
├── db
│   └── mongoose.js
├── models
│   ├── user.js
│   └── student.js
├── package.json
├── server.js
└── frontend
    ├── public
    │   ├── index.html
    │   └── ...
    ├── tests
    │   └── ...
    └── src
        ├── actions
        │   ├── student.js
        │   └── user.js
        ├── react-components
        │   ├── Dashboard
        │   │   └── index.js
        │   ├── StudentForm
        │   │   ├── index.js
        │   │   └── styles.css
        │   ├── Student
        │   │   ├── index.js
        │   │   └── styles.css
        │   └── ...
        ├── index.js
        ├── index.css
        ├── App.js
        ├── App.css
        ├── package.json
        └── serviceWorker.js
```

## React Components

Each React component lives in a separate directory with its own `index.js` and `styles.css`. Import them from parent components as needed.

### Styles

Unique styles associated with each React component are kept separate. If the same styles are shared between multiple React components, keep them in a top-level, shared CSS file (i.e. App.css) to avoid repeated styles.

### Material UI

The following Material UI components are used in this app:

-   Button
-   TextField
-   Grid
-   Table
-   Table Body
-   Table Row
-   Table Cell

You can find more components [here](https://material-ui.com/).

Note that you can override the default styles of these components by increasing CSS selector specificity.

### Actions

To keep your `index.js` files clean and simple, import required methods from an associated action file. Following this structure can help organize your code and keep it manageable.

## Deployment

The `start` and `heroku-postbuild` scripts included in [package.json](package.json) will tell Heroku how to run your app.  You can deploy to Heroku easily:

```
# create a new empty Heroku app in the root directory (only need to be done once)
heroku create

# deploy the latest committed version of your code to Heroku
git push heroku master
```

Don't forget to set the `MONGODB_URI` environmental variable to use a cloud Mongo database (like Atlas).




