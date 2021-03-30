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

app.use(cors());
app.use(express.json());

//mysql set up
const connection = mysql.createConnection(mysqlEnv.settings);

// const sqlCreate =
//   "create table servers(\
//   server_id varchar(64),\
//   server_address varchar(64),\
//   max_cores int,\
//   registration_date datetime,\
//   core_1_uid varchar(64), core_1_start datetime, core_1_end datetime,\
//   core_2_uid varchar(64), core_2_start datetime, core_2_end datetime,\
//   core_3_uid varchar(64), core_3_start datetime, core_3_end datetime,\
//   core_4_uid varchar(64), core_4_start datetime, core_4_end datetime,\
//   core_5_uid varchar(64), core_5_start datetime, core_5_end datetime,\
//   core_6_uid varchar(64), core_6_start datetime, core_6_end datetime,\
//   core_7_uid varchar(64), core_7_start datetime, core_7_end datetime,\
//   core_8_uid varchar(64), core_8_start datetime, core_8_end datetime,\
//   core_9_uid varchar(64), core_9_start datetime, core_9_end datetime,\
//   core_10_uid varchar(64), core_10_start datetime, core_10_end datetime,\
//   core_11_uid varchar(64), core_11_start datetime, core_11_end datetime,\
//   core_12_uid varchar(64), core_12_start datetime, core_12_end datetime,\
//   core_13_uid varchar(64), core_13_start datetime, core_13_end datetime,\
//   core_14_uid varchar(64), core_14_start datetime, core_14_end datetime,\
//   core_15_uid varchar(64), core_15_start datetime, core_15_end datetime,\
//   core_16_uid varchar(64), core_16_start datetime, core_16_end datetime)";
// connection.query(sqlCreate, (error, result) => {
//   console.log(result);
// });

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
//const p = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";
// connection.query("insert into admin values(?)", [p], (error, result) => {
//   console.log("added password");
// });

app.post("/admin_sign_in", (req, res) => {
  const hashedPassword = req.body.hashedPassword;
  let sqlSelect = "select password from admin";
  connection.query(sqlSelect, (error, result) => {
    console.log(result[0].password);
    console.log(hashedPassword);
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
    console.log(result);
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
  console.log(username, hashedPassword);
  connection.query(sqlSelect, [username, hashedPassword], (error, result) => {
    let msg;
    let userInfo;
    let authentication = false;
    if (result.length !== 1) {
      msg = "username or password invalid";
    } else {
      msg = "sign in succesed";
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
      // console.log(snap);
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
      //   console.log(server);
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
  console.log(req.body);
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
  //console.log(req.body);
  const { server_address, max_cores } = req.body.newServer;
  let sqlInsert =
    "insert into servers value(?,?,?,now(),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)";
  connection.query(
    sqlInsert,
    [nanoid(), server_address, max_cores],
    (error, result) => {
      res.send(result);
    }
  );
});
app.post("/edit_user", (req, res) => {
  //console.log(req.body);
  const uid = req.body.uid;
  const { username, grade } = req.body.editUser;
  let sqlUpdate = "update users set username=?, grade=? where uid=?";
  connection.query(sqlUpdate, [username, grade, uid], (error, result) => {
    res.send(result);
  });
});

app.post("/edit_server", (req, res) => {
  //console.log(req.body);
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

io.on("connection", (socket) => {
  console.log(socket.id, "is connecting");

  socket.on("regist_core", (input) => {
    console.log(input);

    let { uid, server_id, core_index, isUndecided, end } = input.registInfo;
    if (!isUndecided) {
      let [date, time] = end.split("T");
      end = `${date} ${time}:00`;
      console.log(end);
    }

    let sqlUpdate = `update servers set core_${core_index + 1}_uid=?, core_${
      core_index + 1
    }_start=now(), core_${core_index + 1}_end=? where server_id=?`;
    console.log(sqlUpdate);
    connection.query(sqlUpdate, [uid, end, server_id], (error, result) => {
      io.emit("new_servers", { message: "OK" });
    });
  });

  socket.on("complete_core", (input) => {
    console.log(input);
    let { uid, server_id, core_index } = input.completeInfo;
    let sqlUpdate = `update servers set core_${core_index + 1}_uid=null, core_${
      core_index + 1
    }_start=null, core_${core_index + 1}_end=null where server_id=?`;
    connection.query(sqlUpdate, [server_id], (error, result) => {
      io.emit("new_servers", { message: "ok" });
    });
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "was disconnected");
  });
});

httpServer.listen(port, () => {
  console.log("listening on port *: 4000");
});
