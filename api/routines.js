const express = require("express");
const { getAllPublicRoutines, createRoutine } = require("../db");
const routinesRouter = express.Router();
const {} = require("../db");

// GET /routines
routinesRouter.get('/routines', async (req, res, next)=>{
// Return a list of public routines, include the activities with them
    const publicRoutines = await getAllPublicRoutines();
  
    res.send({
      publicRoutines,
    });

})

// POST /routines (*)
routinesRouter.post('/routines', async (req, res, next)=>{
// Create a new routine
    const newRoutine = await createRoutine();

    res.send({
        newRoutine,
    });
    
})

// PATCH /routines/:routineId (**)
routinesRouter.patch('/routines/:routineId', async (req, res, next)=>{
// Update a routine, notably change public/private, the name, or the goal

    
})

// DELETE /routines/:routineId (**)
routinesRouter.delete('/routines/:routineId', async (req, res, next)=>{
// Hard delete a routine. Make sure to delete all the routineActivities whose routine is the one being deleted.

    
})

// POST /routines/:routineId/activities
routinesRouter.post('/routines/:routineId/activities', async (req, res, next)=>{
// Attach a single activity to a routine. Prevent duplication on (routineId, activityId) pair.

    
})

module.exports = routinesRouter;