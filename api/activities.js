const express = require("express");
const { createActivity } = require("../db");
const activitiesRouter = express.Router();


// GET /activities
activitiesRouter.get("/", async (req, res) => {
// Just return a list of all activities in the database
    const activities = await getAllActivities();
  
    res.send({
      activities,
    });
});   


// POST /activities (*)
activitiesRouter.post('activities', async (req, res, next)=>{
    // Create a new activity
    const newActivity = await createActivity();

    res.send({
        newActivity,
    })
})

// PATCH /activities/:activityId (*)
activitiesRouter.patch('/:activityId', async (req, res, next)=>{
// Anyone can update an activity

})
    

// GET /activities/:activityId/routines
activitiesRouter.get('/activities/activityId', async (req, res, next)=>{
    // Get a list of all public routines which feature that activity


})

module.exports = activitiesRouter;