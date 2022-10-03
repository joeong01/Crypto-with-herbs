import db from "../config/database.js";

export const getMerchant = (result) => {
  db.query("SELECT * FROM merchant",
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};