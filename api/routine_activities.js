const express = require('express');
const routineActivitiesRouter = express.Router();
const { getUserById,getAllActivities,getActivityById,createActivity,updateActivity,getRoutineById,
  getAllRoutines,getAllPublicRoutines,getAllRoutinesByUser,getPublicRoutinesByUser,
  getPublicRoutinesByActivity,createRoutine,updateRoutine,destroyRoutine,createUser,getUser,
  getRoutineActivitiesByRoutine,addActivityToRoutine,updateRoutineActivity,destroyRoutineActivity,
  attachActivitiesToRoutines } = require('../db');

  aRouter.use((req, res, next) => {
  console.log("A request is being made to routine activities");

  next(); 
});

routineActivitiesRouter.patch("/:routineActivityId", async (req, res, next) => {
    const { id, name, description } = req.body;
    try{
      const patch = await updateActivity( id, name, description );
      if(patch){
          res.send(patch);
        } else{
          next({
            name: 'error',
            message: 'destroyRoutineActivity'
          })
        }
    
      } catch ({ name, message }) {
        next({ name, message });
      }
  });

  routineActivitiesRouter.delete("/:routineActivityId", async (req, res, next) => {
    const { routineActivityId } = req.params;
    try{
      const close = await destroyRoutineActivity(routineActivityId);
      if(close){
          res.send(close);
        } else{
          next({
            name: 'error',
            message: 'destroyRoutineActivity'
          })
        }
    
      } catch ({ name, message }) {
        next({ name, message });
      }
  });

  module.exports = aRouter;