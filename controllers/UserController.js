const connection = require("../connection/postgresqlConnection");

const userController = {
  getAllUsernames: (req, res) => {
    const sql = `SELECT username FROM users`;
    connection.query(sql, (err, result) => {
      if (err) res.sendStatus(404);
      res.send(result);
    });
  },

  getAllUsers: (req, res) => {
    const sql = `SELECT * FROM users`;
    connection.query(sql, async (err, result) => {
      if (err) res.sendStatus(404);
      res.send(result.rows);
    });
  },

  getMyUserInfo: (req, res) => {
    const user_id = req.user.user_id;

    const params = [Number(user_id)];

    const sql = `SELECT user_id, username, email, created_on
                  FROM users
                  WHERE users.user_id=$1;`;
    connection.query(sql, params, async (err, result) => {
      if (err) res.sendStatus(404);
      await res.send(result.rows);
    });
  },

  deleteUser: (req, res) => {
     const user_id = req.user.user_id;

    const params = [Number(user_id)];

    const sql = `DELETE FROM users
    WHERE user_id = $1;`;

    connection.query(sql, params, async (err, result) => {
      if (err) res.sendStatus(404);
      console.log("User is deleted!");
      await res.send("User is deleted!");
    });
  },
};

module.exports = userController;
