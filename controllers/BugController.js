const connection = require("../connection/postgresqlConnection");

const bugController = {
  createBug: (req, res) => {
    const { bugName, bug, category } = req.body;
    const user_id = req.user.user_id;

    const params = [bugName, bug, user_id, category];

    const sql = `INSERT INTO bugs (bugname, bug, user_id, category) 
                VALUES ($1, $2, $3, $4);`;
    connection.query(sql, params, (err, result) => {
      if (err) throw err;
      else res.sendStatus(200);
    });
  },

  getAllBugs: (req, res) => {
    const sql = `SELECT bugs.bug_id, bugs.bugname, bugs.bug, bugs.category, 
                bugs.created_on, users.username, users.user_id
                FROM users
                INNER JOIN bugs ON users.user_id = bugs.user_id;`;
    connection.query(sql, async (err, result) => {
      if (err) res.sendStatus(404);
      await res.send(result.rows);
    });
  },

  getMyBugs: (req, res) => {
    const user_id = req.user.user_id;

    const params = [user_id];

    const sql = `SELECT bugs.bug_id, bugs.bugname, bugs.bug, bugs.category,
                    bugs.created_on, users.username, users.user_id
                    FROM users
                    INNER JOIN bugs ON users.user_id = bugs.user_id
                    WHERE users.user_id= $1;`;
    connection.query(sql, params, async (err, result) => {
      if (err) res.sendStatus(404);
      await res.send(result.rows);
    });
  },

  getBugsById: (req, res) => {
    const id = req.params.userId;

    const params = [id];

    const sql = `SELECT bugs.bug_id, bugs.bugname, bugs.bug, bugs.category,
                    bugs.created_on, users.username, users.user_id
                    FROM users
                    INNER JOIN bugs ON users.user_id = bugs.user_id
                    WHERE users.user_id = $1;`;
    connection.query(sql, params, async (err, result) => {
      if (err) res.sendStatus(404);
      await res.send(result.rows);
    });
  },

  updateMyBug: (req, res) => {
    const { inputName, inputContent, bugId } = req.body;

    const params = [inputContent, bugId];

    const sql = `UPDATE bugs
                 SET ${inputName} = $1
                 WHERE bug_id = $2;`;
    connection.query(sql, params, async (err, result) => {
      if (err) res.sendStatus(404);
      await res.send("Bug is updated!");
    });
  },

  deleteMyBug: (req, res) => {
    const { bugId } = req.body;

    const params = [bugId];

    const sql = `DELETE FROM bugs
    WHERE bug_id = $1;`;

    connection.query(sql, params, async (err, result) => {
      if (err) res.sendStatus(404);
      await res.send("Bug is deleted!");
    });
  },
};

module.exports = bugController;
