const mssql=require("mssql")
var config={
  
  Trusted_Connection:false,
    server:"DESKTOP-AD5I5EJ" ,
    user: "serenityhouse",
     password:"serenity123",
    port: 1433,
    database:"serenityhouse",
    options:{
       encrypt:false,
       trustServerCertificate:true
    },

    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
   
  
}
exports.executeSql=function( sql, callback){
 
    var conn = new mssql.ConnectionPool(config);
  conn.connect()
  .then(function() {
    var req = new mssql.Request(conn);
    req.query(sql)
    .then(function(recordset) {
      callback(recordset);
    })
    .catch(function(err) {
      console.log(err);
      callback(null, err);
    });
  })
  .catch(function(err) {
    console.log(err);
    callback(null, err);
  });
  
}




 