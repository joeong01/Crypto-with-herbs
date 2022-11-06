//import express
import express from "express";
//import functions from controller
import { showProducts, showProductsByFS, showProductByCategory, createProduct, reduceStock, deleteProduct, updateAll, removeAll, updateProductStatus,} from "../controllers/product.js";

import { showUsers, createUser } from "../controllers/user.js";

import { showCart, inserUserCart, updateTotalPrice, updateMerchantInCart, clearCart, showCartDetail, showDetail, inserCart,addMoreSameItem, updateItemNumber, removeCart, removeItem } from "../controllers/cart.js"

import { showAllMerchant, showMerchant, insertMerchant, updateMerchant, showMerchantCharge, getWalletID, updateFund, resetFund, plusMerchantProduct, minusMerchantProduct, disableMerchant, showSelectedMerchant,} from "../controllers/merchant.js"

import { showBlogs, setBlog, updateBlog, removeBlog, } from "../controllers/blog.js"

import { showAllInvoice, showInvoiceDetail, insertInvoice, insertInvoiceDetails, showInvoice } from "../controllers/invoice.js"

const router = express.Router();
router.get("/products", showProducts);
router.get("/productsEndabled", showProductsByFS);
router.get("/products/merchant/:id", showProductByCategory);
router.post("/productCreate", createProduct);
router.delete("/product/productDelete/:id", deleteProduct);
router.put("/product/reduceStock/:id", reduceStock);
router.put("/product/updateAll", updateAll);
router.get("/product/updateStatus/:id", updateProductStatus);
router.delete("/product/removeAll", removeAll);

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
router.delete("/cart/removeCartProduct/:id", removeItem);

router.get("/allMerchants", showAllMerchant);
router.get("/merchants", showMerchant);
router.get("/merchant/getSelects/:id", showSelectedMerchant);
router.post("/merchant/insertMerchant", insertMerchant);
router.put("/merchant/updateAll", updateMerchant);
router.get("/merchant/merchantCharge/:id", showMerchantCharge);
router.get("/merchant/merchantWalletID/:id", getWalletID);
router.put("/merchant/updateFund", updateFund);
router.get("/merchant/releaseFund/:id", resetFund);
router.put("/merchantPlus/:id", plusMerchantProduct);
router.put("/merchantMinus/:id", minusMerchantProduct);
router.get("/merchantDisable/:id", disableMerchant);

router.get("/blogs", showBlogs);
router.put("/blog/insert", setBlog);
router.put("/blog/update", updateBlog);
router.put("/blog/delete", removeBlog);

router.get("/invoice/all", showAllInvoice);
router.get("/invoice/user/:id", showInvoice);
router.get("/invoiceDetail", showInvoiceDetail);
router.put("/invoice/insert", insertInvoice);
router.put("/invoiceDetail/insert", insertInvoiceDetails);
//export default router
export default router;