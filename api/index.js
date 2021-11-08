// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require("express");
const apiRouter = express.Router();
const client = require("../db/client");
const {getUserByUsername} = require("../db/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;

apiRouter.get("/health", async (req, res, next) => {
  try {
    res.send({
      message: "Healthy",
    });
  } catch (error) {
    next(error);
  }
});

apiRouter.use('/', async (req, res, next) => {
	const auth = req.header('Authorization');

	if (!auth) {
		return next();
	}

	if (auth.startsWith('Bearer ')) {
		const token = auth.slice('Bearer '.length);

		try {
			const { username } = verify(token, JWT_SECRET);

			if (username) {
				req.user = await getUserByUsername(username);
				return next();
			}
		} catch ({ name, message }) {
			next({ name, message });
		}
	} else {
		next({ name: 'AuthError', message: 'Error in authorization format' });
	}
});


const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);
apiRouter.use((error, req, res, next) => {
  res.send(error);
});

const activitiesRouter = require('./activities');
apiRouter.use('/activities', activitiesRouter);

const routinesRouter = require('./routines');
apiRouter.use('/routines', routinesRouter);

const routineActivitiesRouter = require('./routine_activities');
apiRouter.use('/routine_activities', routineActivitiesRouter);

module.exports = apiRouter;