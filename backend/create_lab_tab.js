var con = require("./connection");
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE labs (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255), address VARCHAR(255), phone INT(10), logo VARCHAR(255),cost INT(10),mrp INT(10),collectionType VARCHAR(255),certified VARCHAR(255),days VARCHAR(255), timing VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });