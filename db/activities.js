<<<<<<< HEAD
async function getActivityById() {
  try {
   
    return;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  try {
   
    return;
  } catch (error) {
    throw error;
  }
}

async function createActivity() {
  try {
   
    return;
  } catch (error) {
    throw error;
  }
}

async function updateActivity() {
  try {
   
    return;
  } catch (error) {
    throw error;
  }
}





=======
>>>>>>> 865956474e61db02c8fdb54fe250e873b7141225
async function attachActivitiesToRoutines(routines) {
    // no side effects
    const routinesToReturn = [...routines];
    const binds = routines.map((_, index) => `$${index + 1}`).join(', ');
    const routineIds = routines.map(routine => routine.id);
    if (!routineIds?.length) return;
    try {
      // get the activities, JOIN with routine_activities (so we can get a routineId), and only those that have those routine ids on the routine_activities join
      const { rows: activities } = await client.query(`
        SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId"
        FROM activities
        JOIN routine_activities ON routine_activities."activityId" = activities.id
        WHERE routine_activities."routineId" IN (${ binds });
      `, routineIds);
      // loop over the routines
      for(const routine of routinesToReturn) {
        // filter the activities to only include those that have this routineId
        const activitiesToAdd = activities.filter(activity => activity.routineId === routine.id);
        // attach the activities to each single routine
        routine.activities = activitiesToAdd;
      }
      return routinesToReturn;
    } catch (error) {
      throw error;
    }
  }
<<<<<<< HEAD

  module.exports ={
    getActivityById,
    getAllActivities,
    createActivity,
    updateActivity,
    attachActivitiesToRoutines
  }
=======
  
>>>>>>> 865956474e61db02c8fdb54fe250e873b7141225
