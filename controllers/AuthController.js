const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../connection/postgresqlConnection");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
let refreshTokens = [];

const authController = {
  signup: async (req, res) => {
    const { username, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const params = [username, hashedPassword, email];

    const sql = `INSERT INTO users (username, password, email) 
                VALUES ($1,$2,$3)`;
    connection.query(sql, params, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },

  login: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const params = [username];

    const sql = `SELECT * FROM users WHERE username = $1`;
    connection.query(sql, params, async (err, result) => {
      if (err) res.sendStatus(404);

      if (result.rows.length > 0) {
        await bcrypt.compare(
          password,
          result.rows[0].password,
          (error, passwordMatched) => {
            if (passwordMatched) {
              // Generate an access token
              const accessToken = jwt.sign(
                {
                  username: result.rows[0].username,
                  user_id: result.rows[0].user_id,
                },
                accessTokenSecret,
                { expiresIn: "6m" }
              );
              const refreshToken = jwt.sign(
                {
                  username: result.rows[0].username,
                  user_id: result.rows[0].user_id,
                },
                refreshTokenSecret,
                { expiresIn: "50m" }
              );

              refreshTokens.push(refreshToken);

              const username = result.rows[0].username;
              const user_id = result.rows[0].user_id;
              const email = result.rows[0].email;
              const created_on = result.rows[0].created_on;

              res.json({
                accessToken,
                refreshToken,
                username,
                user_id,
                email,
                created_on,
              });
            } else {
              res.sendStatus(403);
            }
          }
        );
      } else res.sendStatus(404);
    });
  },

  getValidToken: (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    if (!refreshTokens.includes(refreshToken)) {
      return res.sendStatus(403);
    }

    jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      const accessToken = jwt.sign(
        { username: user.username, user_id: user.user_id },
        accessTokenSecret,
        { expiresIn: "6m" }
      );

      res.json({
        accessToken,
      });
    });
  },

  logout: (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter((v) => v !== token);

    res.send("Logout successful");
  },
};

module.exports = authController;
