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
  
  async function addActivityToRoutine() {
    try {
     
      return;
    } catch (error) {
      throw error;
    }
  };

  async function updateRoutineActivity() {
    try {
     
      return;
    } catch (error) {
      throw error;
    }
  };

  async function destroyRoutineActivity() {
    try {
     
      return;
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