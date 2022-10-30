//import express
import express from "express";
//import functions from controller
import {
  showProducts,
  showProductsByFS,
  showProductById,
  createProduct,
  updateProduct,
  reduceStock,
  deleteProduct,
  updateAll
} from "../controllers/product.js";

import {
  showUsers,
  createUser,
} from "../controllers/user.js";

import {
  showCart,
  inserUserCart,
  updateTotalPrice,
  updateMerchantInCart,
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
  insertMerchant,
  updateMerchant,
  showMerchantCharge,
  getWalletID,
  updateFund,
  resetFund,
  plusMerchantProduct,
  minusMerchantProduct,
  deleteMerchant,
} from "../controllers/merchant.js"

import {
  showBlogs,
  setBlog,
  updateBlog,
  removeBlog,
} from "../controllers/blog.js"

const router = express.Router();
router.get("/products", showProducts);
router.get("/products", showProductById);
router.get("/productsFS/:sort", showProductsByFS);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/product/delete", deleteProduct);
router.put("/product/reduceStock/:id", reduceStock);
router.put("/product/updateAll", updateAll);

router.get("/getUsers", showUsers);
router.post("/createUsers", createUser);

router.get("/cart/:id", showCart);
router.put("/cart/addNewUser", inserUserCart);
router.put("/cart/updateTotal", updateTotalPrice);
router.put("/cart/updateMerchant", updateMerchantInCart);
router.put("/cart/reset/:id", clearCart);

router.get("/cartDetail/:id", showCartDetail);
router.get("/cart/detailOnly/:id", showDetail);
router.put("/cart/addNew", inserCart);
router.put("/cart/addMore", addMoreSameItem);
router.put("/cart/updateDetail", updateItemNumber);
router.get("/cart/remove/:id", removeCart);
router.put("/cart/removeItem", removeItem);

router.get("/merchants", showMerchant);
router.post("/mercahnts/insertMerchant", insertMerchant);
router.put("/merchant/updateALL", updateMerchant);
router.get("/merchant/merchantCharge/:id", showMerchantCharge);
router.get("/merchant/merchantWalletID/:id", getWalletID);
router.put("/merchant/updateFund", updateFund);
router.get("/merchant/releaseFund/:id", resetFund);
router.get("/merchant/plus/:id", plusMerchantProduct);
router.get("/merchant/minus/:id", minusMerchantProduct);
router.delete("/merchant/delete", deleteMerchant);

router.get("/blogs", showBlogs);
router.post("/blog/insert", setBlog);
router.put("/blog/update", updateBlog);
router.put("/blog/delete", removeBlog);

//export default router
export default router;