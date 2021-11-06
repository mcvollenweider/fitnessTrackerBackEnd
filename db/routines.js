const client = require("./client");
const { attachActivitiesToRoutines } = require("./activities")
const {dbFields} = require("./util")
const { getUserByUsername } = require("./users");
const usersRouter = require("../api/users");

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        SELECT * 
        FROM routines 
        WHERE id = $1;
      `,
      [id]
    );

    if (!routine) {
      return null;
    }

    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const {
      rows
    } = await client.query(
      `
        SELECT * 
        FROM routines; 
        
      `,
      
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const {
      rows: routines
    } = await client.query(
      `
       SELECT routines.*, users.username AS "creatorName" FROM routines
       JOIN users ON routines."creatorId"=users.id
       WHERE routines."creatorId"=users.id;
       `

    );
      return attachActivitiesToRoutines(routines);

  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const {rows: routines} = await client.query(
      `SELECT routines.*, users.username AS "creatorName" FROM routines
      JOIN users ON routines."creatorId"=users.id
      WHERE "isPublic"='true';
      `
    )

    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
  const user = await getUserByUsername(username);
 
  try {
    const {rows: routines} = await client.query(
      `SELECT routines.*, users.username AS "creatorName" 
      FROM routines
      JOIN users on routines."creatorId"=users.id
      WHERE "creatorId"=$1;
    `
    , [user.id])
    return attachActivitiesToRoutines(routines);
    
  } catch (error) {
    throw error;
  
}
}

async function getPublicRoutinesByUser({ username }) {
  
  try {
    const user = await getUserByUsername(username);
    const {
      rows: routines
    } = await client.query(
      `
        SELECT routines.*, users.username AS "creatorName" FROM routines
        JOIN users ON routines."creatorId"=users.id
        WHERE "creatorId"=$1
        AND "isPublic"='true' 
      `, [user.id]
      
    );

    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}
// ^STILL NOT PASSING

async function getPublicRoutinesByActivity({ id }) {
  try {
    const {rows: routines} = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName" FROM routines
      JOIN users ON routines."creatorId"=users.id
      WHERE "isPublic"='true'
      `
    )
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
     const {rows: [routine]} = await client.query(
      `
         INSERT INTO routines("creatorId", "isPublic", "name", "goal")
         VALUES ($1, $2, $3, $4)
         RETURNING *;
         `,
      [creatorId, isPublic, name, goal]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function updateRoutine({ id, ...fields }) {
  try {
    const result = dbFields(fields);
    const {
      rows: [routine],
    } = await client.query(
      `
    UPDATE routines
    SET ${result.insert}
    WHERE id=${id}
    RETURNING *;
    `,
      result.vals
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(id) {
  try{

  await client.query(
    ` DELETE FROM routine_activities
      WHERE "routineId"=$1;
    `
    , [id]);

    const {rows: [routine]} = await client.query(
      ` DELETE FROM routines
        WHERE id=$1
        RETURNING *;
      `
      , [id]);

      return routine;
  } catch (error) {
    throw error;
  }
}

// NOTE:
// For the following database adapter functions, we will have to first create the functions in this order for our seed file (and tests) to work! createUser, createActivity, createRoutine, getRoutinesWithoutActivities, getAllActivities, addActivityToRoutine While writing these functions, we should be running the npm run seed:dev script, to test the functions as we go. As we build these functions, also require them into db/seedData.js so the seed script will be able to use them. It's always best to test our functions as we go!

// Once we have some of our adapters (functions) working, we should stop using the seed script, and start running the npm run test:watch db script to run automated tests to verify we have created them correctly. In order to get full credit, we must pass the automated tests.


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
};
