const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const port = 4000;
const app = express();
const { nanoid } = require("nanoid");
const mysqlEnv = require("./mySQLSetting");
const http = require("http");
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
  cors: { origin: "*" },
});

const limitCores = 16;

app.use(cors());
app.use(express.json());

//mysql set up
const connection = mysql.createConnection(mysqlEnv.settings);

app.get("/users", (req, res) => {
  let sqlSelect = "select * from users";
  connection.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

app.get("/servers", (req, res) => {
  let sqlSelect = "select * from servers";
  connection.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

app.post("/admin_sign_in", (req, res) => {
  const hashedPassword = req.body.hashedPassword;
  let sqlSelect = "select password from admin";
  connection.query(sqlSelect, (error, result) => {
    let authentication = false;
    if (result[0].password === hashedPassword) {
      authentication = true;
    }
    res.send({ authentication });
  });
});

app.post("/auto_sign_in", (req, res) => {
  const storageId = req.body.storageId;
  let sqlSelect = "select uid,username from users where uid=?";
  connection.query(sqlSelect, [storageId], (error, result) => {
    let msg;
    let userInfo;
    let authentication = false;
    if (result.length !== 1) {
      msg = "auto signIn failed";
    } else {
      msg = "auto signIn succesed";
      userInfo = result[0];
      authentication = true;
    }
    res.send({ msg, authentication, userInfo });
  });
});

app.post("/sign_in", (req, res) => {
  const username = req.body.username;
  const hashedPassword = req.body.hashedPassword;
  let sqlSelect =
    "select uid,username from users where username=? and password=?";
  connection.query(sqlSelect, [username, hashedPassword], (error, result) => {
    let msg;
    let userInfo;
    let authentication = false;
    if (result.length !== 1) {
      msg = "username or password invalid";
    } else {
      msg = "Successfully signed in";
      userInfo = result[0];
      authentication = true;
    }
    res.send({ msg, authentication, userInfo });
  });
});

app.get("/get_servers", (req, res) => {
  let sqlSelect = "select * from servers";
  connection.query(sqlSelect, (error, snapshot) => {
    const servers = snapshot.map((snap) => {
      let server = {
        server_id: snap.server_id,
        server_address: snap.server_address,
        max_cores: snap.max_cores,
        registration_date: snap.registration_date,
        use_status: [{ uid: null }],
      };
      const max_cores = server.max_cores;
      delete snap.server_id;
      delete snap.server_address;
      delete snap.max_cores;
      delete snap.registration_date;
      let core_uid = [];
      let core_start = [];
      let core_end = [];
      Object.keys(snap).forEach((key, index) => {
        if (index < max_cores * 3) {
          if (index % 3 === 0) core_uid.push(snap[key]);
          if (index % 3 === 1) core_start.push(snap[key]);
          if (index % 3 === 2) core_end.push(snap[key]);
        }
      });
      let use_status = [];
      for (let i = 0; i < max_cores; i++) {
        use_status.push({
          uid: core_uid[i],
          start: core_start[i],
          end: core_end[i],
        });
      }
      server = {
        ...server,
        use_status: use_status,
      };
      return server;
    });
    res.send(servers);
  });
});

app.get("/get_users", (req, res) => {
  let sqlSelect = "select uid, username, grade from users";
  connection.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

app.post("/add_user", (req, res) => {
  const { username, grade, hashedPassword } = req.body.newUser;
  let sqlInsert = "insert into users values(?,?,?,?,now())";
  connection.query(
    sqlInsert,
    [nanoid(), username, grade, hashedPassword],
    (error, result) => {
      res.send(result);
    }
  );
});

app.post("/add_server", (req, res) => {
  const { server_address, max_cores } = req.body.newServer;
  let sqlInsert = "insert into servers value(?,?,?,now()";
  for (let i = 0; i < limitCores * 3; i++) {
    sqlInsert += ",null";
  }
  sqlInsert += ")";
  connection.query(
    sqlInsert,
    [nanoid(), server_address, max_cores],
    (error, result) => {
      res.send(result);
    }
  );
});

app.post("/edit_user", (req, res) => {
  const uid = req.body.uid;
  const { username, grade } = req.body.editUser;
  let sqlUpdate = "update users set username=?, grade=? where uid=?";
  connection.query(sqlUpdate, [username, grade, uid], (error, result) => {
    res.send(result);
  });
});

app.post("/delete_user", (req, res) => {
  const uid = req.body.uid;
  let sqlSelect = "select server_id, max_cores from servers";
  connection.query(sqlSelect, (error, servers) => {
    servers.map((server) => {
      for (let core_index = 1; core_index <= server.max_cores; core_index++) {
        let sqlUpdate = `update servers set core_${core_index}_uid=null, core_${core_index}_start=null, core_${core_index}_end=null where server_id=? and core_${core_index}_uid=?`;
        connection.query(
          sqlUpdate,
          [server.server_id, uid],
          (error, updateResult) => {}
        );
      }
    });
    let sqlDelete = "delete from users where uid=?";
    connection.query(sqlDelete, [uid], (error, deleteResult) => {
      res.send("deleted");
    });
  });
});

app.post("/edit_server", (req, res) => {
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

app.post("/delete_server", (req, res) => {
  const server_id = req.body.serverId;
  let sqlDelete = "delete from servers where server_id=?";
  connection.query(sqlDelete, [server_id], (error, result) => {
    res.send("delete server");
  });
});

io.on("connection", (socket) => {
  console.log(socket.id, "is connecting");

  socket.on("regist_core", (input) => {
    let { uid, server_id, core_index, isUndecided, end } = input.registInfo;
    if (!isUndecided) {
      let [date, time] = end.split("T");
      end = `${date} ${time}:00`;
    }
    let sqlUpdate = `update servers set core_${core_index + 1}_uid=?, core_${
      core_index + 1
    }_start=now(), core_${core_index + 1}_end=? where server_id=?`;
    connection.query(sqlUpdate, [uid, end, server_id], (error, result) => {
      io.emit("new_servers", {
        messageFromServer: "Successful database update (reserve core)",
      });
    });
  });

  socket.on("complete_core", (input) => {
    let { uid, server_id, core_index } = input.completeInfo;
    let sqlUpdate = `update servers set core_${core_index + 1}_uid=null, core_${
      core_index + 1
    }_start=null, core_${core_index + 1}_end=null where server_id=?`;
    connection.query(sqlUpdate, [server_id], (error, result) => {
      io.emit("new_servers", {
        messageFromServer: "Successful database update (complete core)",
      });
    });
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "was disconnected");
  });
});

httpServer.listen(port, () => {
  console.log("listening on port *: 4000");
});
