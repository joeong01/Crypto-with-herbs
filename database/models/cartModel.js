import db from "../config/database.js";

export const getCart = (id, result) => {
  db.query("SELECT * FROM shoppingcart INNER JOIN product ON shoppingcart.productID = product.productID = where userID = ?", [id],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const setCart = (data,result) => {
  db.query("INSERT INTO shoppingcart SET ?", [data],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const updateCart = (data,result) => {
  db.query("UPDATE shoppingcart SET number = number + ? WHERE userID = ? AND productID = ?",
  [data.number, data.userID, data.productID ],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const deleteCart= (id,result) => {
  db.query("DELETE * FROM shoppingcart where userID = ?",
  [id],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};