import {
  getCart,
  getCartDetail,
  setUserCart,
  setCart,
  updateCart,
  deleteCart,
  deleteItem,
} from "../models/cartModel.js";

export const showCart = (req, res) => {
  getCart ( req.params.id ,(err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const showCartDetail = (req, res) => {
  getCartDetail ( req.params.id ,(err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const inserCart = (req, res) => {
  const data = req.body;
  setCart( data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const inserUserCart = (req, res) => {
  const data = req.body;
  setUserCart( data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};


export const addMoreCart = (req, res) => {
  const data = req.body;
  updateCart( data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const removeCart = (req, res) => {
  deleteCart( req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const removeItem= (req, res) => {
  deleteItem( req.data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};