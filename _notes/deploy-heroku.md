# Deploy project to Heroku
    https://devcenter.heroku.com/articles/getting-started-with-nodejs
## Deploy project
    $ heroku login
    $ git push heroku master

## Don't use nodemon on Heroku
    make sure use script
    "start":"node ./server.js",
    in package.json
    nodemon can not work on Heroku