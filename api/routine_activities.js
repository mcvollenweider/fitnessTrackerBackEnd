const express = require("express");
const routineActivitiesRouter = express.Router();



// PATCH /routine_activities/:routineActivityId (**)
routineActivitiesRouter.patch('/routine_activities/:routineActivityId', async (req, res)=>{
    // Update the count or duration on the routine activity

});
    

// DELETE /routine_activities/:routineActivityId (**)
routineActivitiesRouter.delete('/routine_activities/:routineActivityId', async (req, res,)=>{
    // Remove an activity from a routine, use hard delete

});
    

module.exports = routineActivitiesRouter;