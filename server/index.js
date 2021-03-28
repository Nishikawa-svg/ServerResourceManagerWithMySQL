const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const port = 4000;
const app = express();
const { nanoid } = require("nanoid");
const mysqlEnv = require("./mySQLSetting");

app.use(cors());
app.use(express.json());

//mysql set up
const connection = mysql.createConnection(mysqlEnv.settings);

app.get("/", (req, res) => {
  let sqlSelect = "select * from users";
  connection.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

app.get("/get_servers", (req, res) => {
  let sqlSelect = "select * from servers";
  connection.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

app.get("/get_users", (req, res) => {
  let sqlSelect = "select * from users";
  connection.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});
app.post("/add_user", (req, res) => {
  console.log(req.body);
  const { username, grade, password } = req.body.newUser;
  let sqlInsert = "insert into users values(?,?,?,?,now())";
  connection.query(
    sqlInsert,
    [nanoid(), username, grade, password],
    (error, result) => {
      res.send(result);
    }
  );
});
app.post("/add_server", (req, res) => {
  console.log(req.body);
  const { server_address, max_cores } = req.body.newServer;
  let sqlInsert =
    "insert into servers value(?,?,?,now(),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)";
  connection.query(
    sqlInsert,
    [nanoid(), server_address, max_cores],
    (error, result) => {
      res.send(result);
    }
  );
});
app.post("/edit_user", (req, res) => {
  console.log(req.body);
  const uid = req.body.uid;
  const { username, grade } = req.body.editUser;
  let sqlUpdate = "update users set username=?, grade=? where uid=?";
  console.log(sqlUpdate);
  connection.query(sqlUpdate, [username, grade, uid], (error, result) => {
    res.send(result);
  });
});

app.post("/edit_server", (req, res) => {
  console.log(req.body);
  const server_id = req.body.serverId;
  const { server_address, max_cores } = req.body.editServer;
  let sqlUpdate =
    "update servers set server_address=?, max_cores=? where server_id=?";
  connection.query(
    sqlUpdate,
    [server_address, max_cores, server_id],
    (error, result) => {
      res.send(result);
    }
  );
});
app.listen(port, () => {
  console.log("listening on port *: 4000");
});
