const mysql = require("mysql");
const sha256 = require("crypto-js/sha256");

const connection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  multipleStatements: true,
});

const databaseName = "server_resource_manager";

connection.connect((error) => {
  const createDatabase = () => {
    return new Promise((resolve) => {
      const sqlCreateDatebase = `create database ${databaseName}`;
      connection.query(sqlCreateDatebase, (error, result) => {
        if (error) throw error;
        resolve(`Database ${databaseName} was created`);
      });
    });
  };

  const useDB = () => {
    return new Promise((resolve) => {
      const sqlUseDatabase = `use ${databaseName}`;
      connection.query(sqlUseDatabase, (error, result) => {
        if (error) throw error;
        resolve(`Database ${databaseName} was set`);
      });
    });
  };

  const addAdminTable = () => {
    return new Promise((resolve) => {
      const sqlCreateAdminTable =
        "create table admin(password varchar(64), limit_cores int)";
      connection.query(sqlCreateAdminTable, (error, result) => {
        if (error) throw error;
        const sqlInsert = "insert into admin values(?,?)";
        connection.query(
          sqlInsert,
          [sha256("password").toString(), 16],
          (error, res) => {
            if (error) throw error;
            resolve("Table admin was created and inserted initial values");
          }
        );
      });
    });
  };

  const addServersTable = () => {
    return new Promise((resolve) => {
      let sqlCreateServersTable =
        "create table servers(server_id varchar(64), server_address varchar(64), max_cores int, registration_date datetime";
      for (let core_index = 1; core_index <= 16; core_index++) {
        sqlCreateServersTable += `,core_${core_index}_uid varchar(64), core_${core_index}_start datetime, core_${core_index}_end datetime`;
      }
      sqlCreateServersTable += ")";
      connection.query(sqlCreateServersTable, (error, result) => {
        if (error) throw error;
        resolve("Table servers was created");
      });
    });
  };

  const addUsersTable = () => {
    return new Promise((resolve) => {
      let sqlCreateUsersTable =
        "create table users(uid varchar(21), username varchar(40), grade varchar(20), password varchar(64), registration_date datetime)";
      connection.query(sqlCreateUsersTable, (error, result) => {
        if (error) throw error;
        resolve("Table users was created");
      });
    });
  };

  const addTable = async () => {
    const msg1 = await createDatabase();
    console.log(msg1);
    const msg2 = await useDB();
    console.log(msg2);
    const [msg3, msg4, msg5] = await Promise.all([
      addAdminTable(),
      addServersTable(),
      addUsersTable(),
    ]);
    console.log(msg3);
    console.log(msg4);
    console.log(msg5);

    console.log("all tasks completed");
  };

  addTable();
});
