const client = require("./client");

async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
        SELECT * 
        FROM routine_activities 
        WHERE id = $1;
      `,
      [id]
    );

    if (!routine) {
      return null;
    }

    return routineActivity;
  } catch (error) {
    throw error;
  }
  };
  
  async function addActivityToRoutine({routineId, activityId, count, duration}) {
    try {
      const {rows: [newActivity]} = await client.query(
        `INSERT INTO routine_activities("routineId", "activityId", "count", "duration")
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `
      , [routineId, activityId, count, duration]);
     
      return newActivity;
    } catch (error) {
      throw error;
    }
  };

  async function updateRoutineActivity({ id, count, duration }) {
    if(id !== routine_activity.id){
      return null;
    }

    try {
      const { rows: activities} = await client.query(
        `
        UPDATE routine_activities
        SET "count" = $2, "duration" = $3
        WHERE "id"=$1  
        RETURNING *;
        `
      , [id, count, duration])
     
      return activities;
    } catch (error) {
      throw error;
    }
  };

  async function destroyRoutineActivity(id) {
    try {
      const {
        rows: [routine_activity]
      } = await client.query(
        `DELETE FROM routine_activities
        WHERE "id"=$1
        `
      , [id])
      delete routineActivity.id
      return routine_activity;
    } catch (error) {
      throw error;
    }
  };


  async function getRoutineActivitiesByRoutine() {
    try {
     
      return;
    } catch (error) {
      throw error;
    }
  };

  module.exports = {
    getRoutineActivityById,
    addActivityToRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,
    getRoutineActivitiesByRoutine,
  }