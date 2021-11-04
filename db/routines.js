const client = require("./client");
const { attachActivitiesToRoutines } = require("./activities")
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
       SELECT routines.*, users.username AS "creatorName"
       FROM routines
       JOIN users ON
       routines."creatorId" = users.id
       WHERE routines."creatorId" = users.id;
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
      `SELECT routines.*, users.username AS "creatorName" 
      FROM routines
      JOIN users on routines."creatorId" = users.id
      WHERE "isPublic" = 'true';
      `
    )

    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
 
  try {
    const {rows: routines} = await client.query(
      `SELECT routines.*, users.username AS "creatorName" 
      FROM routines
      JOIN users on routines."creatorId" = users.id
      WHERE "creatorName" = ${username};

    `
    )
    console.log(routines,"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    return attachActivitiesToRoutines(routines);
    
  } catch (error) {
    throw error;
  
}
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const {
      rows:[username]
    } = await client.query(
      `
        SELECT * 
        FROM routines
        WHERE id=${username}; 
      `,
      
    );

    return username;
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

async function updateRoutine({ id, name, description }) {
  try {
    const {
      rows: [routines],
    } = await client.query(
      `UPDATE routines
        SET "name" = $2, "description" = $3
        WHERE "id" = $1
        RETURNING *;
        `,
      [id, name, description]
    );

    return;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(id) {
  try{
  const {
    rows: [routines],
  } = await client.query(
  ` DELETE FROM routines
    WHERE "id" = $1  

  `
  ,[id]
  );

  return routines;
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
};
