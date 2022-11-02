//import connection
import db from "../config/database.js";

//get all products
export const getProducts = (result) => {
  db.query("SELECT * FROM product", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getProductsByFS = (sort, result) => {
  db.query( "SELECT * FROM product WHERE enable = 1 ", 
  [sort],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

//get single product
export const getProductByMerchant = (id, result) => {
  db.query(
    "SELECT * FROM PRODUCT WHERE merchantCategory = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

//insert product to database
export const insertProduct = (data, result) => {
  db.query("INSERT INTO product SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};


export const updateProductStock = (data, id, result) => {
  db.query(
    "UPDATE product SET stock = stock - ?  WHERE productID = ?",
    [data.stock, id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// Delete Product to Database
export const deleteProductById = (id, result) => {
  db.query("DELETE FROM product WHERE productID = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const changeProductStatus = (id,result) => {
  db.query("UPDATE product SET enable = !enable WHERE `productID` = ?;",
  [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const changeAll = (data,result) => {
  db.query("UPDATE product SET `productName` = ? , `price` = ? , `stock` = ?, `description` = ? , `preservation` = ? WHERE `productID` = ?;",
  [data.productName, data.price, data.stock, data.description, data.preservation, data.productID], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const clearAll = (id, result) => {
  db.query("DELETE FROM product WHERE merchantCategory = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
