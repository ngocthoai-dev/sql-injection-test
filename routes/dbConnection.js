var connection;

// connect db, if success listen to port
let initDbConection = function(connectionCallback){
  const mysql = require('mysql');
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sec_test",
    connectTimeout: 30000,
    multipleStatements: true, // this is problem in php
  });
  connection.connect((err)=>{
    if(err) throw err;
    console.log("db connected");
    connectionCallback();
  })
};

let db = function(query, queryCallback){
  // console.log(query, queryCallback);
  connection.query(query, (err, result)=>{
    queryCallback(err, result);
  });
};

module.exports = { db, initDbConection };
