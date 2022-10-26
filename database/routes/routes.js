//import express
import express from "express";
//import functions from controller
import {
  showProducts,
  showProductsByFS,
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
  inserUserCart,
  updateTotalPrice,
  updateMerchant,
  clearCart,
  showCartDetail,
  showDetail,
  inserCart,
  addMoreSameItem,
  updateItemNumber,
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
//get product with filter and sorting
router.get("/productsFS/:sort", showProductsByFS);
// Create New Product
router.post("/products", createProduct);
// Update Product
router.put("/products/:id", updateProduct);
// Delete Product
router.delete("/products/:id", deleteProduct);

router.get("/getUsers", showUsers);
router.post("/createUsers", createUser);

router.get("/cart/:id", showCart);
router.put("/cart/addNewUser", inserUserCart);
router.put("/cart/updateTotal", updateTotalPrice);
router.put("/cart/updateMerchant", updateMerchant);
router.put("/cart/reset/:id", clearCart);

router.get("/cartDetail/:id", showCartDetail);
router.get("/cart/detailOnly/:id",showDetail);
router.put("/cart/addNew", inserCart);
router.put("/cart/addMore/:id", addMoreSameItem);
router.put("/cart/updateDetail", updateItemNumber);
router.get("/cart/remove/:id",removeCart);
router.get("/cart/remove",removeItem);

router.get("/merchant",showMerchant);

//export default router
export default router;