# API

API = Aplication program interface

EndPoint / Root / Path:
Son una sección de la url de tu proyecto
<HTTP://TWITTER.com/EndPoint>
Lo mas comun es que se escriba como:
<HTTP://TWITTER.com/API/EndPoint>

## Creando los endpoints

CRUD: Create, Read, Update, Delete

### TWEETS

  1. GET /tweets -> Show all tweets

  2. POST /publish -> Publish a tweet

  3. GET /tweets/{tweet_id} -> Show a tweet

  4. PUT /tweets/{tweet_id}/update -> Update a tweet

  5. DELETE /tweets/{tweet_id}/delete -> Delete a tweet

### Users

  1. GET /users -> Show all users

  2. POST /signup -> Register a user

  3. GET /users/{user_id} -> Show a user
