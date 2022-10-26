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

export const updateCartTotalPrice = (data,result) => {
  db.query("UPDATE shoppingcart SET totalprice = (SELECT SUM(subtotal) FROM shoppingcartdetail WHERE cartID = ? ) WHERE userID = ?", 
  [data.cartID, data.userID],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const updateCartMerchant = (data,result) => {
  db.query("UPDATE shoppingcart SET merchantType = ? WHERE cartID = ?", 
  [data.merchantType, data.cartID],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const updateClearCart = (cartID,result) => {
  db.query("UPDATE shoppingcart SET merchantType = NULL, totalprice = 0 WHERE cartID = ?", 
  [cartID],
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

export const getDetail = (id, result) => {
  db.query("SELECT * FROM shoppingcartdetail where cartID = ?", [id],
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
  db.query("INSERT INTO shoppingcartdetail SET ? ", [data],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const updateCartSameItem = (data,id,result) => {
  db.query("UPDATE shoppingcartdetail SET numberProduct = numberProduct + ? , subtotal = subtotal + ? WHERE cartID = ? AND productID = ?",
  [data.number, data.subtotal, id, data.productID],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const updateCartNumber = (data,result) => {
  db.query("UPDATE shoppingcartdetail SET subtotal = ?, numberProduct = ?  WHERE cartID = ? AND productID = ?",
  [data.subtotal, data.newNumber, data.cartID, data.productID ],
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
  db.query("DELETE FROM shoppingcartdetail where cartID = ?",
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
  db.query("DELETE FROM shoppingcartdetail where cartID = ? AND productID = ?",
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