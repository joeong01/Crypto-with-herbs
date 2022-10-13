import db from "../config/database.js";

export const getCart = (id, result) => {
  db.query("SELECT * FROM shoppingcart where userID = ?", [id],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getCartDetail = (id, result) => {
  db.query("SELECT * FROM shoppingcartdetail INNER JOIN product ON shoppingcartdetail.productID = product.productID where cartID = ?", [id],
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
  db.query("INSERT INTO shoppingcartdetail SET ?", [data],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const setUserCart = (data,result) => {
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
  db.query("UPDATE shoppingcartdetail SET numberProduct = numberProduct + ? WHERE cartID = ? AND productID = ?",
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
  db.query("DELETE * FROM shoppingcartdetail where cartID = ?",
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

export const deleteItem= (data,result) => {
  db.query("DELETE * FROM shoppingcartdetail where cartID = ? AND productID = ?",
  [data.id, data.itemID],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};