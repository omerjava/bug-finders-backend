const connection = require("../connection/postgresqlConnection");

const commentController = {
  createNewComment: (req, res) => {
    const { comment, bug_id } = req.body;
    const user_id = req.user.user_id;

    const params = [comment, user_id, bug_id];

    const sql = `INSERT INTO comments (comment, user_id, bug_id) 
                VALUES ($1, $2, $3);`;
    connection.query(sql, params, (err, result) => {
      if (err) throw err;
      else res.send("Your comment is successfully added!");
    });
  },

  getAllComments: (req, res) => {
    const sql = `SELECT users.username, comments.comment,
                  comments.created_on, comments.user_id, comments.comment_id, comments.bug_id
                  FROM (users
                  INNER JOIN comments ON users.user_id = comments.user_id);`;

    connection.query(sql, async (err, result) => {
      if (err) res.sendStatus(404);
      await res.send(result.rows);
    });
  },

  getMyComments: (req, res) => {
    const user_id = req.user.user_id;

    const params = [user_id];

    const sql = `SELECT users.username, bugs.bug, bugs.bug_id, bugs.bugname, comments.comment, 
                  comments.created_on, comments.user_id, comments.comment_id
                  FROM ((users
                  INNER JOIN bugs ON users.user_id = bugs.user_id)
                  INNER JOIN comments ON bugs.bug_id = comments.bug_id)
                  WHERE users.user_id=$1;`;
    connection.query(sql, params, async (err, result) => {
      if (err) res.sendStatus(404);
      await res.send(result.rows);
    });
  },

  getCommentsById: (req, res) => { 
    const id = req.params.userId;

    const params = [id];

    const sql = `SELECT users.username, bugs.bug, bugs.bug_id, bugs.bugname, comments.comment,
                  comments.created_on, comments.user_id, comments.comment_id
                  FROM ((users
                  INNER JOIN bugs ON users.user_id = bugs.user_id)
                  INNER JOIN comments ON bugs.bug_id = comments.bug_id)
                  WHERE users.user_id = $1;`;
    connection.query(sql, params, async (err, result) => {
      if (err) res.sendStatus(404);
      await res.send(result.rows);
    });
  },

  updateMyComment: (req, res) => {
    const {comment, comment_id} = req.body;

    const params = [comment, comment_id];

    const sql = `UPDATE comments
                 SET comment = $1
                 WHERE comment_id= $2;`;
    connection.query(sql, params, async (err, result) => {
      if (err) res.sendStatus(404);
      await res.send("Comment is updated!");
    });
  },

  deleteMyComment: (req, res) => {
    const { comment_id } = req.body;

    const params = [comment_id];

    const sql = `DELETE FROM public.comments
    WHERE comment_id = $1;`;

    connection.query(sql, params, async (err, result) => {
      if (err) res.sendStatus(404);
      await res.send("Comment is deleted!");
    });
  },
};

module.exports = commentController;
