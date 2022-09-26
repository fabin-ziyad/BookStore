var db = require("../config/connection");
var collection = require("../config/collection");
var bcrypt = require("bcrypt");
var objectid = require("mongodb").ObjectId;
module.exports = {
    AdminLogin: (loginData) => {
        console.log(loginData);
        return new Promise(async (resolve, reject) => {
          let response = {};
          let admin = await db
            .get()
            .collection(collection.ADMIN_COLLECTION)
            .findOne({ AdminName: loginData.username });
          if (admin) {
            bcrypt.compare(loginData.password, admin.AdminPass).then((status) => {
              if (status) {
                console.log("Logged In");
                response.admin = admin;
                response.status = true;
                resolve(response);
              } else {
                console.log("error");
                // alert("User doesnt Matching...")
                resolve({ status: false });
              }
            });
          } else {
            console.log("error in conection");
            // alert("User doesnt exists....")
            resolve({ status: false });
          }
        });
      }
}