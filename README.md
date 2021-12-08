# Comiclub

This is the repository for the Comiclub website! \
Built By Students in CSC309, during the Fall Semester of 2021, at UofT.

Students involved: \
`Dionysus Cho` \
`Patrick Vuscan` \
`Raag Kashyap` \
`Salman Shahid`
___
## Important

### Creating a User

There is no implemented authentication or way to designate an admin user, further than creating a user with the username `admin`. \
Please create a user with the username = `admin` to get this started. If on our heroku build, expect it to have the credentials `admin@gmail.com` and `password`.

___
## Available Scripts


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

Inside of `db` you will find files for creating our `cloudinary` connection, as well as our `mongoose/mongoDB` connection. \
Inside of `frontend` you will find our frontend. \
Inside of `models` you will find our mongoose models. \
Inside of `mongo-data` you will see local mongoDB data, IF you're running locally. \
Inside of `routes` you will see our express routes, seperated by which mongoose model they pertain to. \

___

# Express Server Routes
![image](https://user-images.githubusercontent.com/6611743/145127196-98b9bc1b-16f9-4876-9517-a214740c545c.png)
Our [ComicClub API Route Documentation](https://documenter.getpostman.com/view/10028200/UVJk9sAJ).

___
## Deployment

The `start` and `heroku-postbuild` scripts included in [package.json](package.json) will tell Heroku how to run this app. You can deploy to Heroku easily:

```
# create a new empty Heroku app in the root directory (only need to be done once)
> heroku create

# get the addon for hosting mongoDB on heroku
> heroku config:set MONGODB_URI='mongodb+srv://comiclub:<password>@comiclubcluster.lfyhj.mongodb.net/ComiclubAPI?retryWrites=true&w=majority'

# deploy the latest committed version of your code to Heroku
> git push heroku main
```
