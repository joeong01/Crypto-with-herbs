//import express
import express from "express";
//import functions from controller
import {
  showProducts,
  // showProductsByCat,
  showProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";

import {
  showUsers,
  createUser,
} from "../controllers/user.js";

//init express router
const router = express.Router();
//get all product
router.get("/products", showProducts);
//get single product
router.get("/products/:id", showProductById);
// router.get("/products/:category", showProductsByCat);
// Create New Product
router.post("/products", createProduct);
// Update Product
router.put("/products/:id", updateProduct);
// Delete Product
router.delete("/products/:id", deleteProduct);

router.get("/users", showUsers);
router.post("/users", createUser);

//export default router
export default router;
