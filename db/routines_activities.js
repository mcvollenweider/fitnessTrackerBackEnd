const client = require("./client");
const {dbFields} = require("./util");

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

  async function updateRoutineActivity({ id, ...fields }) {
  const result = dbFields(fields);

    try {
      const { rows: [routine_activity]} = await client.query(
        `
        UPDATE routine_activities
        SET ${result.insert}
        WHERE "id"=${id}  
        RETURNING *;
        `
      , result.vals)
     
      return routine_activity;
    } catch (error) {
      throw error;
    }
  };

  async function destroyRoutineActivity(id) {
    try {
      const {rows: [routineActivity]} = await client.query(
        `DELETE FROM routine_activities
        WHERE id=$1
        RETURNING *;
        `, [id])

        return routineActivity;
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

  async function getAllRoutineActivities() {
    try {
      const {
        rows: routine_activities
      } = await client.query(
        `
         SELECT routine_activities.*, users.username AS "creatorName" FROM routines
         JOIN users ON routines."creatorId"=users.id
         WHERE routines."creatorId"=users.id;
         `
  
      );
        return attachActivitiesToRoutines(routine_activities);
  
    } catch (error) {
      throw error;
    }
  }

  

  module.exports = {
    getRoutineActivityById,
  addActivityToRoutine,
  getAllRoutineActivities,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  // canEditRoutineActivity,

  }