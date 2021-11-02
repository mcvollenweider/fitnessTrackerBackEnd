const client = require("./client");

async function getRoutineById() {
    try {
     
      return;
    } catch (error) {
      throw error;
    }
  }

  async function getRoutinesWithoutActivities() {
    try {
     
      return;
    } catch (error) {
      throw error;
    }
  }

  async function getAllRoutines() {
    try {
     const {rows: [routines]} = await client.query(
       `
       SELECT username, duration, count
       FROM routines;
       `
     )
      return rows;
    } catch (error) {
      throw error;
    }
  }


  async function getAllPublicRoutines() {
    try {
     
      return;
    } catch (error) {
      throw error;
    }
  }

  async function getAllRoutinesByUser() {
    try {
      const { rows: routines } = await client.query(`
      SELECT id
      FROM routines
      WHERE "authorId"=${ userId };
    `);
    const routine = await Promise.all(userId.map(
      routine => getRoutineById( routines.id )
    ));
      return routines;
    } catch (error) {
      throw error;
    }
  }

  async function getPublicRoutinesByUser() {
    try {
     
      return;
    } catch (error) {
      throw error;
    }
  }

  async function getPublicRoutinesByActivity() {
    try {
     
      return;
    } catch (error) {
      throw error;
    }
  }

  async function createRoutine({name, description}) {
    try {
      const { rows: [routines]} =
      await client.query(
         `
         INSERT INTO routines(name, description)
         VALUES ($1, $2)
         ON CONFLICT (name) DO NOTHING
         RETURNING *;
         `,
         [name, description]
       );
     
      return routines;
    } catch (error) {
      throw error;
    }
  }

  async function updateRoutine({id, name, description}) {
    try {
      const {rows: [routines]} = await client.query(
        `UPDATE routines
        SET "name" = $2, "description" = $3
        WHERE "id" = $1
        RETURNING *;
        `, [id, name, description]
      )
     
      return;
    } catch (error) {
      throw error;
    }
  }

  async function destroyRoutine() {
    try {
     
      return;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
    getRoutineById,
    getRoutinesWithoutActivities,
    getAllRoutines,
    getAllPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity,
    createRoutine,
    updateRoutine,
    destroyRoutine,
  }