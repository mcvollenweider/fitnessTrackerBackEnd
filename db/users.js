const client = require('./client');



async function createUser({ username, password }) {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
        INSERT INTO users(username, password) 
        VALUES($1, $2) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
      `,
        [username, password]
      );
      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }



  async function getUser({ username, password }) {
    try {
      const { rows } = await client.query(`
        SELECT username, password; 
        FROM users;
      `,
      [username, password]
      );
  
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async function getUserById(userId) {
    try {
      const {
        rows: [user],
      } = await client.query(`
        SELECT id, username, name, location, active
        FROM users
        WHERE id=${userId}
      `);
  
      delete user.password;
  
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function getUserByUsername(username) {
    try {
      const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1;
      `, [username]);
  
      return user;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
    client,
    createUser,
    getUser,
    getUserById,
    getUserByUsername
}