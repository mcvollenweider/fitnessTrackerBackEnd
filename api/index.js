// create an api router
// npm install cors
const express = require("express");
const apiRouter = express.Router();
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
});

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
});

// GET /health
apiRouter.get('/health', async (req, res,next)={
    // A common need is to see if our server is up (not completely crashed). We can create a route to send back a message, just a string saying all is well.
    
  
    next();

});


// attach other routers from files in this api directory (users, activities...)
const activitiesRouter = require("./activities");
apiRouter.use("/activities", activitiesRouter);

const routineActivitiesRouter = require("./routine_activities");
apiRouter.use("/routine_activities", routineActivitiesRouter);

const routinesRouter = require("./routines");
apiRouter.use("/routines", routinesRouter);

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

apiRouter.use((error, req, res, next) => {
    res.send(error);
  });
  

// export the api router
module.exports = { apiRouter };