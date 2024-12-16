import express from "express";
import { authCheckExistToken, authCheckUserPermission } from "../middleware/authCheckExistToken";
import registerLoginController from "../controllers/registerLoginController";
import googleOAuth from '../controllers/googleOAuth'
import positionController from "../controllers/positionController"
import positionRoleController from "../controllers/positionRoleController"
import roleController from "../controllers/roleController"
import productController from "../controllers/productController"
import capacityController from "../controllers/capacityController"
import colorController from "../controllers/colorController"
import orderLineController from "../controllers/orderLineController"
import categoryController from "../controllers/categoryController"
import brandController from "../controllers/brandController"
import imageController from "../controllers/imageController"
import addressController from "../controllers/addressController"
import orderController from "../controllers/orderController"
import cartController from "../controllers/cartController"
import assessmentController from "../controllers/assessmentController"
import configController from "../controllers/configController"
import SendMail from '../utility/SendMail'
import sendMailContact from '../utility/SendMailContact'

const router = express.Router();

const adminRoute = (app) => {

  // ---------- user ----------
  // login with google
  router.post('/auth/google', googleOAuth.loginGoogleOAuth)
  router.post('/auth/google/create', googleOAuth.saveAccountGoogleOAuth)

  // ---------- auth ----------
  router.post("/auth/register", registerLoginController.registerAccount);
  router.post("/auth/login", registerLoginController.loginAccount);
  router.post("/auth/logout", registerLoginController.logoutAccount);
  router.get("/auth/check-session", registerLoginController.checkSession);

  // // position
  // router.get("/position", positionController.readFunc)
  // router.get("/position-role", positionRoleController.readFunc)
  // router.get("/role", roleController.readFunc)

  // cart
  router.get("/cart", authCheckExistToken, authCheckUserPermission(99), cartController.readFunc)
  router.get("/cart-amount", authCheckExistToken, authCheckUserPermission(99), cartController.readFuncAmount)
  router.get("/cart-by-ids", cartController.readFuncByIds)
  router.post("/cart", authCheckExistToken, authCheckUserPermission(99), cartController.createFunc)
  router.put("/cart", authCheckExistToken, authCheckUserPermission(99), cartController.updateFunc)
  router.delete("/cart", authCheckExistToken, authCheckUserPermission(99), cartController.deleteFunc)

  // order
  router.get("/order", authCheckExistToken, authCheckUserPermission(99), orderController.readFunc)
  router.post("/order", authCheckExistToken, authCheckUserPermission(99), orderController.createFunc)
  router.put("/order", authCheckExistToken, authCheckUserPermission(99), orderController.updateFunc)
  router.delete("/order", authCheckExistToken, authCheckUserPermission(99), orderController.deleteFunc)

  // product
  router.get("/product", productController.readFunc)
  router.get("/product/:slug", productController.readFuncWithSlug)

  router.get("/config", configController.readFunc)
  router.get("/capacity", capacityController.readFunc)
  router.get("/color", colorController.readFunc)
  router.get("/order-line", orderLineController.readFunc)
  router.get("/category", categoryController.readFunc)
  router.get("/brand", brandController.readFunc)
  router.get("/image", imageController.readFunc)
  router.get("/address", addressController.readFunc)
  router.get("/order", orderController.readFunc)
  router.get("/assessment", assessmentController.readFunc)

  // Send Mail 
  router.post("/send-mail", SendMail);
  router.post("/send-mail-contact", sendMailContact);

  return app.use("/api", router);
};

export default adminRoute;
