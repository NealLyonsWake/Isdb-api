# ISDB Project

1. Welcome, my deployed app is available [here.](https://neals-isdb-app.herokuapp.com/)
2. All endpoints detailed below require `/api` prior to the endpoint; e.g. `/api/register`.

## Scope
1. Create an API for an Internet Song Database (ISDB) that has the following endpoints:
    a. `/register` 
    b. `/login`
    c. `/tracks/:id`
    d. `/genres`
    e. `/albums/:id`
    f. `/tracks`
    g. `/artists/:id` 
2. Users will need to register and login before being able to use the tracks, genres, albums and artists endpoints. Users will need to provide an authorization token for those endpoints once registered.
3. The `/register`, `/login` and `/tracks` endpoints are required to be `POST` methods. All other endpoints are required to be `GET` methods.
4. Each endpoint requires an appropriate JSON response and appropriate status code.

## Documented Endpoints
1. The endpoints are required to be apprpriately documented using Swagger. The swagger.json file with the documented endpoints is available in this repo.
2. End points are documented in Swagger [here.](https://app.swaggerhub.com/apis/supernovaboy/neals-isdb-api/0.1)

## Approach Taken
### Planning
1. User stories created to account for each of the endpoints detailed above.
2. A user case diagram was formulated to draft the top-level interactions between client and server.
3. Both the user stories and user case diagram are available in my Miro board [here.](https://miro.com/app/board/o9J_lodlUls=/)

### Database
1. Collections associated with the respective endpoints were provided in a .csv file type. Each .csv file was imported to a remote database in MongoDB.

### VS Code Setup
1. Once the remote database had been created and configured, the project app was created in VS Code using the express boiler plate (`express <app-name>`).
2. All required packages were installed and added to the package.json file and are available to view in this repo.
3. Packages were initialized.
4. All initialized variables with `var` were changed to `const` as good practice.
5. All routes, apart from the home route (`/`) were configured to require `/api` prior to the endpoint. For example `/api/tracks`.

### Mongoose Schema
1. Each database schema was created to enable the correct models and documents to be created and managed.
2. A `models` directory was created to store all schema models.
3. Each model was exported to be used as part of the router code.

### Routes
1. Express was used to setup all requests to each endpoint.
2. The `routes` directory contains the home, user authentication and song database routes.
3. The routers were exported to be used when called from the dependant index.js file; the users.js file was also used in the songs.js file to authenticate the user when calling the relevant endpoints.
4. Each route and method required were tested to confirm correct data responses prior to setting up user authentication.

### Authentication
1. The scope required token-based authentication to request the songs.js endpoints.
2. Passport and jsonwebtoken (JWT) packages were used to enable authentication.
3. Authentication was setup in the same way as previous assignments in classes, although it was still not fully understood the full workings on the interactions between each authentication package. Further study and practice is required to fully understand the concepts here.
4. The strategy is implemented using passport to confirm the token is for a real user. 
5. The code is confirgured that the password is encripted with `salt` and `hash` on register and therefore not exposed in the database.
6. Each request made to the songs.js routes will require a token as part of the authorization header in the request. The token is obtained from a user registering and logging in whtere the token will be displayed in the repose. In order to use the token, `jwt` will need to be appended to the start of the token, seperated with a space; i.e. `jwt your_token_here`.

### Deployment
1. This app has been deployed to Heroku via the Git repo.
2. An environment was setup to hide the MongoDB access credentials to the remote cluster. This was enabled using the dotenv package and configured once deployed using Heroku's CLI.
3. Git branch created for deployment called "deploy".