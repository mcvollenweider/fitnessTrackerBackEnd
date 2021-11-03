const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserByUsername, createUser } = require("../db");

//TEST
usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");
  
    next();
  });





// POST /users/register
usersRouter.post('/register', async (req, res, next)=>{
    // Create a new user. 
    const { username, password } = req.body;
    // Require username and password, and hash password before saving user to DB. Require all passwords to be at least 8 characters long.
    try {
        const _user = await getUserByUsername(username);
    
        if (_user) {
          next({
            name: 'UserExistsError',
            message: 'A user by that username already exists'
          });
        }
    
        const user = await createUser({
          username,
          password
        });
        
        if (user.password.length < 8){
            next({
                name: 'PasswordExistsError',
                message: 'Password-too-short'
              });
        }

        const token = jwt.sign({ 
          id: user.id, 
          username
        }, process.env.JWT_SECRET, {
          expiresIn: '1w'
        });
    
        res.send({ 
          message: "Thank you for signing up",
          token 
        });
      }
    // Throw errors for duplicate username, or password-too-short.
    catch ({ name, message }) {
        next({ name, message })
      } 
});
    

// POST /users/login
usersRouter.post('/login', async (req, res, next)=>{
    // Log in the user. Require username and password, and verify that plaintext login password matches the saved hashed password before returning a JSON Web Token.
const { username, password } = req.body;
    // Keep the id and username in the token.
// request must have both
if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      // create token
      const token = jwt.sign({ id: 1, username: 'albert' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(token);
      res.send(token);
      
    } else {
      next({ 
        name: 'IncorrectCredentialsError', 
        message: 'Username or password is incorrect'
      });
    }
  } catch(error) {
    console.log(error);
    next(error);
  }
});
    

// GET /users/me (*)
usersRouter.get('./me', async (req, res, next)={
    // Send back the logged-in user's data if a valid token is supplied in the header.

    // ? if condition verifying token???

})

// GET /users/:username/routines
usersRouter.get('/:username/routines', async (req, res, next)=>{
    // Get a list of public routines for a particular user.

})
    


module.exports = usersRouter;