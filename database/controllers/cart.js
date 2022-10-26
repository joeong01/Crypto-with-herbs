import {
  getCart,
  setUserCart,
  updateCartTotalPrice,
  updateCartMerchant,
  updateClearCart,
  getCartDetail,
  getDetail,
  setCart,
  updateCartSameItem,
  updateCartNumber,
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


export const updateTotalPrice = (req, res) => {
  const data = req.body;
  updateCartTotalPrice( data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const updateMerchant = (req, res) => {
  const data = req.body;
  updateCartMerchant( data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const clearCart = (req, res) => {
  updateClearCart( req.params.id,(err, results) => {
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

export const showDetail = (req, res) => {
  getDetail ( req.params.id ,(err, results) => {
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

export const addMoreSameItem = (req, res) => {
  const data = req.body;
  updateCartSameItem( data, req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const updateItemNumber = (req, res) => {
  const data = req.body;
  updateCartNumber( data, (err, results) => {
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