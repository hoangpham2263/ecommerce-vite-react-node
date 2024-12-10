import express from "express";
import { authCheckExistToken, authCheckUserPermission } from "../middleware/authCheckExistToken";
import registerLoginAdminController from "../controllers/registerLoginAdminController";
import googleOAuthAdmin from '../controllers/googleOAuthAdmin'
import positionController from "../controllers/positionController"
import positionRoleController from "../controllers/positionRoleController"
import roleController from "../controllers/roleController"
import productController from "../controllers/productController"
import capacityController from "../controllers/capacityController"
import ramController from "../controllers/ramController"
import colorController from "../controllers/colorController"
import orderLineController from "../controllers/orderLineController"
import categoryController from "../controllers/categoryController"
import brandController from "../controllers/brandController"
import versionController from "../controllers/versionController"
import imageController from "../controllers/imageController"
import addressController from "../controllers/addressController"
import orderController from "../controllers/orderController"
import cartController from "../controllers/cartController"
import assessmentController from "../controllers/assessmentController"
import userController from "../controllers/userController"
import configController from "../controllers/configController"


const router = express.Router();

const adminRoute = (app) => {

  // ---------- admin ----------
  // login with google
  router.post('/auth/google', googleOAuthAdmin.loginGoogleOAuth)
  router.post('/auth/google/create', googleOAuthAdmin.saveAccountGoogleOAuth)

  // ---------- auth ----------
  router.post("/auth/register", registerLoginAdminController.registerAccount);
  router.post("/auth/login", registerLoginAdminController.loginAccount);
  router.post("/auth/logout", registerLoginAdminController.logoutAccount);
  router.get("/auth/check-session", registerLoginAdminController.checkSession);

  // account
  router.get("/user", authCheckExistToken, authCheckUserPermission(1), userController.readFunc)
  router.post("/user", authCheckExistToken, authCheckUserPermission(1), userController.createFunc)
  router.put("/user", authCheckExistToken, authCheckUserPermission(1), userController.updateFunc)
  router.delete("/user", authCheckExistToken, authCheckUserPermission(1), userController.deleteFunc)

  // position
  router.get("/position", authCheckExistToken, authCheckUserPermission(2), positionController.readFunc)
  router.get("/position-is-master", authCheckExistToken, authCheckUserPermission(2), positionController.readFuncIsMaster)
  router.post("/position", authCheckExistToken, authCheckUserPermission(2), positionController.createFunc)
  router.put("/position", authCheckExistToken, authCheckUserPermission(2), positionController.updateFunc)
  router.delete("/position", authCheckExistToken, authCheckUserPermission(2), positionController.deleteFunc)

  // position role
  router.get("/position-role", authCheckExistToken, authCheckUserPermission(3), positionRoleController.readFunc)
  router.get("/position-role-reverse", authCheckExistToken, authCheckUserPermission(3), positionRoleController.readFuncReverse)
  router.post("/position-role", authCheckExistToken, authCheckUserPermission(3), positionRoleController.createFunc)
  router.delete("/position-role", authCheckExistToken, authCheckUserPermission(3), positionRoleController.deleteFunc)

  // role
  router.get("/role", authCheckExistToken, authCheckUserPermission(4), roleController.readFunc)
  router.post("/role", authCheckExistToken, authCheckUserPermission(4), roleController.createFunc)
  router.put("/role", authCheckExistToken, authCheckUserPermission(4), roleController.updateFunc)
  router.delete("/role", authCheckExistToken, authCheckUserPermission(4), roleController.deleteFunc)

  // product
  router.get("/product", authCheckExistToken, authCheckUserPermission(5), productController.readFunc)
  router.get("/product/:slug", authCheckExistToken, authCheckUserPermission(5), productController.readFuncWithSlug)
  router.post("/product", authCheckExistToken, authCheckUserPermission(5), productController.createFunc)
  router.put("/product", authCheckExistToken, authCheckUserPermission(5), productController.updateFunc)
  router.put("/product-status", authCheckExistToken, authCheckUserPermission(5), productController.updateFuncStatus)
  router.delete("/product", authCheckExistToken, authCheckUserPermission(5), productController.deleteFunc)

  // config
  router.get("/config", authCheckExistToken, authCheckUserPermission(6), configController.readFunc)
  router.post("/config", authCheckExistToken, authCheckUserPermission(6), configController.createFunc)
  router.put("/config", authCheckExistToken, authCheckUserPermission(6), configController.updateFunc)
  // router.put("/config-status", authCheckExistToken, authCheckUserPermission(), configController.updateFuncStatus)
  // router.delete("/config", authCheckExistToken, authCheckUserPermission(), configController.deleteFunc)

  // category
  router.get("/category", authCheckExistToken, authCheckUserPermission(7), categoryController.readFunc)
  router.post("/category", authCheckExistToken, authCheckUserPermission(7), categoryController.createFunc)
  router.put("/category", authCheckExistToken, authCheckUserPermission(7), categoryController.updateFunc)
  router.delete("/category", authCheckExistToken, authCheckUserPermission(7), categoryController.deleteFunc)

  // brand
  router.get("/brand", authCheckExistToken, authCheckUserPermission(8), brandController.readFunc)
  router.post("/brand", authCheckExistToken, authCheckUserPermission(8), brandController.createFunc)
  router.put("/brand", authCheckExistToken, authCheckUserPermission(8), brandController.updateFunc)
  router.delete("/brand", authCheckExistToken, authCheckUserPermission(8), brandController.deleteFunc)

  // version
  router.get("/version", authCheckExistToken, authCheckUserPermission(9), versionController.readFunc)
  router.post("/version", authCheckExistToken, authCheckUserPermission(9), versionController.createFunc)
  router.put("/version", authCheckExistToken, authCheckUserPermission(9), versionController.updateFunc)
  router.delete("/version", authCheckExistToken, authCheckUserPermission(9), versionController.deleteFunc)

  // color
  router.get("/color", authCheckExistToken, authCheckUserPermission(10), colorController.readFunc)
  router.get("/color/:id", authCheckExistToken, authCheckUserPermission(10), colorController.readFuncDetail)
  router.post("/color", authCheckExistToken, authCheckUserPermission(10), colorController.createFunc)
  router.put("/color", authCheckExistToken, authCheckUserPermission(10), colorController.updateFunc)
  router.delete("/color", authCheckExistToken, authCheckUserPermission(10), colorController.deleteFunc)

  // capacity
  router.get("/capacity", authCheckExistToken, authCheckUserPermission(11), capacityController.readFunc)
  router.post("/capacity", authCheckExistToken, authCheckUserPermission(11), capacityController.createFunc)
  router.put("/capacity", authCheckExistToken, authCheckUserPermission(11), capacityController.updateFunc)
  router.delete("/capacity", authCheckExistToken, authCheckUserPermission(11), capacityController.deleteFunc)

  // ram
  router.get("/ram", authCheckExistToken, authCheckUserPermission(12), ramController.readFunc)
  router.post("/ram", authCheckExistToken, authCheckUserPermission(12), ramController.createFunc)
  router.put("/ram", authCheckExistToken, authCheckUserPermission(12), ramController.updateFunc)
  router.delete("/ram", authCheckExistToken, authCheckUserPermission(12), ramController.deleteFunc)

  // image
  router.get("/image", authCheckExistToken, authCheckUserPermission(13), imageController.readFunc)
  router.post("/image", authCheckExistToken, authCheckUserPermission(13), imageController.createFunc)
  router.put("/image", authCheckExistToken, authCheckUserPermission(13), imageController.updateFunc)
  router.delete("/image", authCheckExistToken, authCheckUserPermission(13), imageController.deleteFunc)
  
  // address
  router.get("/address", authCheckExistToken, authCheckUserPermission(14), addressController.readFunc)
  router.post("/address", authCheckExistToken, authCheckUserPermission(14), addressController.createFunc)
  router.put("/address", authCheckExistToken, authCheckUserPermission(14), addressController.updateFunc)
  router.delete("/address", authCheckExistToken, authCheckUserPermission(14), addressController.deleteFunc)

  // cart
  router.get("/cart", authCheckExistToken, authCheckUserPermission(15), cartController.readFunc)
  router.post("/cart", authCheckExistToken, authCheckUserPermission(15), cartController.createFunc)
  router.delete("/cart", authCheckExistToken, authCheckUserPermission(15), cartController.deleteFunc)

  // order
  router.get("/order", authCheckExistToken, authCheckUserPermission(16), orderController.readFunc)
  router.post("/order", authCheckExistToken, authCheckUserPermission(16), orderController.createFunc)
  router.put("/order", authCheckExistToken, authCheckUserPermission(16), orderController.updateFunc)
  router.delete("/order", authCheckExistToken, authCheckUserPermission(16), orderController.deleteFunc)

  // order line
  router.get("/order-line", authCheckExistToken, authCheckUserPermission(17), orderLineController.readFunc)
  router.post("/order-line", authCheckExistToken, authCheckUserPermission(17), orderLineController.createFunc)
  router.put("/order-line", authCheckExistToken, authCheckUserPermission(17), orderLineController.updateFunc)
  router.delete("/order-line", authCheckExistToken, authCheckUserPermission(17), orderLineController.deleteFunc)

  // assessment
  // router.get("/assessment", authCheckExistToken, authCheckUserPermission(18), assessmentController.readFunc)
  router.post("/assessment", authCheckExistToken, authCheckUserPermission(18), assessmentController.createFunc)
  // router.put("/assessment", authCheckExistToken, authCheckUserPermission(18), assessmentController.updateFunc)
  router.delete("/assessment", authCheckExistToken, authCheckUserPermission(18), assessmentController.deleteFunc)

  return app.use("/api/admin", router);
};

export default adminRoute;
