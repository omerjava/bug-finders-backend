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
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

    const offset = (page - 1) * limit;

    let sortBy = "";
    let sortType = "";

    sortBy = req.query.sortBy;
    sortType = req.query.sortType;

    if (!req.query.sortBy) {
      sortBy = "bug_id";
    }

    if (!req.query.sortType) {
      sortType = "DESC";
    }

    let fieldName = sortBy === "username" ? `users.username` : `bugs.${sortBy}`;

    const sql = `SELECT bugs.bug_id, bugs.bugname, bugs.bug, bugs.category, 
                  bugs.created_on, users.username, users.user_id
                  FROM users
                  INNER JOIN bugs ON users.user_id = bugs.user_id
                  ORDER BY ${fieldName} ${sortType}
                  LIMIT ${limit}
				          OFFSET ${offset};`;

    connection.query(sql, async (err, result) => {
      if (err) res.sendStatus(404);
      await res.send(result.rows);
    });
  },

  getMyBugs: (req, res) => {
    const user_id = req.user.user_id;

    const params = [user_id];

    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

    const offset = (page - 1) * limit;

    let sortBy = "";
    let sortType = "";

    sortBy = req.query.sortBy;
    sortType = req.query.sortType;

    if (!req.query.sortBy) {
      sortBy = "bug_id";
    }

    if (!req.query.sortType) {
      sortType = "DESC";
    }

    let fieldName = sortBy === "username" ? `users.username` : `bugs.${sortBy}`;

    const sql = `SELECT bugs.bug_id, bugs.bugname, bugs.bug, bugs.category,
                    bugs.created_on, users.username, users.user_id
                    FROM users
                    INNER JOIN bugs ON users.user_id = bugs.user_id
                    WHERE users.user_id= $1
                    ORDER BY ${fieldName} ${sortType}
                    LIMIT ${limit}
				            OFFSET ${offset};`;

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

  searchBugs: (req, res) => {
    let searchInput = "";

    searchInput = req.query.searchInput;

    if (!req.query.searchInput) {
      searchInput = "";
    }

    const sql = `SELECT bugs.bug_id, bugs.bugname, bugs.bug, bugs.category, 
                  bugs.created_on, users.username, users.user_id
                  FROM users
                  INNER JOIN bugs ON users.user_id = bugs.user_id
                  WHERE	bugs.bug iLIKE '%${searchInput}%' 
                  OR bugs.bugname iLIKE '%${searchInput}%'
                  OR bugs.category iLIKE '%${searchInput}%'
                  OR users.username iLIKE '%${searchInput}%';`;

    connection.query(sql, async (err, result) => {
      if (err) res.sendStatus(404);
      await res.send(result.rows);
    });
  },

  countBugs: (req, res) => {
    if (req.params.userId === undefined) {
      let sql = `SELECT COUNT(*) FROM bugs;`;

      connection.query(sql, async (err, result) => {
        if (err) res.sendStatus(404);
        await res.send(result.rows[0].count);
      });
    } else {
      const id = req.params.userId;
      const params = [id];
      sql = `SELECT COUNT(*) FROM bugs WHERE user_id = $1;`;

      connection.query(sql, params, async (err, result) => {
        if (err) res.sendStatus(404);
        await res.send(result.rows[0].count);
      });
    }
  },
};

module.exports = bugController;
