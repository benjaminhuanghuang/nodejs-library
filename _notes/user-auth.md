1. Create Uer model and import it in server.js

    "passport": "0.3.2",
    "passport-local": "1.0.0",
    "passport-local-mongoose": "4.0.0",
        For user auth
    "validator": "7.0.0",
    "md5": "2.2.1",
        For the gravater
    "mongoose-mongodb-errors":"~0.0.2"


2. Create routes and controller
    register
    login
    logout
    rest password
    modify account

3. Create pug files for user manage
    register
    login
    forgot
    account

4. Modify layout.pug to and the link


5. User register 

6. User login 
    passport middleware set user to req.user
    check req.user to change the UI for permission
    
7. Call user login after user register

8. Logout

