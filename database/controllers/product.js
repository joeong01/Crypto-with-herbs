//import functions from Product model
import {
  getProducts,
  getProductByMerchant,
  getProductsByFS,
  insertProduct,
  updateProductStock,
  deleteProductById,
  changeAll,
  changeProductStatus,
  clearAll,
} from "../models/productModel.js";

//get all products
export const showProducts = (req, res) => {
  getProducts((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//get single product
export const showProductByCategory = (req, res) => {
  getProductByMerchant(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const showProductsByFS = (req, res) => {
  getProductsByFS( req.params.sort ,(err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
}


//create new product
export const createProduct = (req, res) => {
  const data = req.body;
  insertProduct(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const reduceStock = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateProductStock(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Delete Product
export const deleteProduct = (req, res) => {
  deleteProductById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const updateProductStatus = (req, res) => {
  changeProductStatus(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const updateAll = (req, res) => {
  const data = req.body;
  changeAll(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const removeAll = (req, res) => {
  clearAll( req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};