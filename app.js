const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoute = require("./routes/UserRoutes");
const authRoute = require("./routes/AuthRoutes");
const bugRoute = require("./routes/BugRoutes");
const commentRoute = require("./routes/CommentRoutes");


app.use("/users/api", userRoute);
app.use("/auth/api", authRoute);
app.use("/bugs/api", bugRoute);
app.use("/comments/api", commentRoute);


app.listen(process.env.PORT, () => console.log("app is running"));












/*


app.post("/api/signup", async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  const sql = `INSERT INTO user (name, username, email, password) 
              VALUES ("${name}","${username}","${email}","${hashedPassword}")`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log("saved");
  });
});



app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sql = `SELECT * FROM user WHERE username = "${username}"`;
  connection.query(sql, async (err, result) => {
    if (err) res.sendStatus(404);
    
    if(result.length>0) {
      await bcrypt.compare(password, result[0].password, (error, passwordMatched) => {
        if(passwordMatched) {

          // Generate an access token
        const accessToken = jwt.sign({ username: result[0].username }, accessTokenSecret, { expiresIn: '6m' });
        const refreshToken = jwt.sign({ username: result[0].username }, refreshTokenSecret, { expiresIn: '50m' });

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken
        });

          console.log(result);
        }
        else {
          res.sendStatus(401);
        }
      });
    }
    else res.sendStatus(404);
  
  });
});

app.post('/getValidToken', (req, res) => {
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

      const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '6m' });

      res.json({
          accessToken
      });
  });
});



app.get('/api/bugHunters', authenticateJWT, (req, res) => {
  const sql = `SELECT username, email FROM user`;
  connection.query(sql, async (err, result) => {
    if (err) res.sendStatus(404);
    res.send(result);
  });
});




app.post('/logout', (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter(token => refreshToken !== token);

  res.send("Logout successful");
});


app.post("/insert", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const birthday = req.body.birthday;
  
  const sql = `INSERT INTO users (username, password, birthday) 
              VALUES ("${username}","${password}","${birthday}")`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
  });
});

app.get("/username/:name", (req, res) => {
  let sql = "SELECT birthday FROM users WHERE username = ?";
  connection.query(sql, [req.params.name], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.patch("/update", (req, res) => {
  const sql = `UPDATE users 
                SET password = "${req.body.password}", birthday = "${req.body.birthday}" 
                WHERE username="${req.body.username}"`;
  connection.query(sql, (error, result) => {
    res.send({
      ok: true,
    });
  });
});

app.delete("/delete/:username", (req, res) => {
  let sql = "DELETE FROM users WHERE username = ?";
  connection.query(sql, [req.params.username], (err, result) => {
    if (err) throw err;
  });
});

app.get("/showAll", (req, res) => {
  let sql = "SELECT * FROM users";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
*/

