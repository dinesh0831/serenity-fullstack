var db = require("./mssql");

exports.getList = function(req, resp) {
  db.executeSql("SELECT * FROM EmployeeMaster", function(data, err) {
    if (err) {
      resp.writeHead(500, "Internal Error Occoured", {
        "Content-type": "text/html"
      });
      resp.write("<html><head><title>500</title></head><body>500: Internal Error, Details:" + err + "</body></html>");
      resp.end();
    } else {
      resp.writeHead(200, {
        "Content-Type": "application/json"
      });
      resp.write(JSON.stringify(data));
    }
    resp.end();
  });
};
exports.availablevacation=function(req,resp){
    console.log(req.params.id)
    db.executeSql("SELECT * FROM tblEmployeeTimeTable where Employee_id="+req.params.id , function(data, err) {
        if (err) {
          resp.writeHead(500, "Internal Error Occoured", {
            "Content-type": "text/html"
          });
          resp.write("<html><head><title>500</title></head><body>500: Internal Error, Details:" + err + "</body></html>");
          resp.end();
        } else {
          resp.writeHead(200, {
            "Content-Type": "application/json"
          });
          resp.write(JSON.stringify(data));
        }
        resp.end();
      });
}