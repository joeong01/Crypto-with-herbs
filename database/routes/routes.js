//import express
import express from "express";
//import functions from controller
import {
  showProducts,
  showProductsBySort,
  showProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";

import {
  showUsers,
  createUser,
} from "../controllers/user.js";

import {
  showCart,
  showCartDetail,
  inserCart,
  inserUserCart,
  addMoreCart,
  removeCart,
  removeItem,
} from "../controllers/cart.js"

import {
  showMerchant,
} from "../controllers/merchant.js"

//init express router
const router = express.Router();
//get all product
router.get("/products", showProducts);
//get single product
router.get("/products", showProductById);
//get product with sorting
router.get("/productsSort/:sort", showProductsBySort);
// Create New Product
router.post("/products", createProduct);
// Update Product
router.put("/products/:id", updateProduct);
// Delete Product
router.delete("/products/:id", deleteProduct);

router.get("/getUsers", showUsers);
router.post("/createUsers", createUser);

router.get("/cart/:id", showCart);
router.get("/cartDetail/:id", showCartDetail);
router.put("/cart/addNewUser", inserUserCart);
router.put("/cart/addMore", inserCart);
router.post("/cart/addNew", addMoreCart);
router.get("/cart/remove/:id",removeCart);
router.get("/cart/remove",removeItem);

router.get("/merchant",showMerchant);

//export default router
export default router;