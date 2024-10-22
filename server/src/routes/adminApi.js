import express from "express";
import { authCheckExistToken, authCheckUserPermission } from "../middleware/authCheckExistToken";
import positionController from "../controllers/positionController"
import positionRoleController from "../controllers/positionRoleController"
import roleController from "../controllers/roleController"
import productController from "../controllers/productController"
import capacityController from "../controllers/capacityController"
import colorController from "../controllers/colorController"
import orderLineController from "../controllers/orderLineController"
import categoryController from "../controllers/categoryController"
import brandController from "../controllers/brandController"
import versionController from "../controllers/versionController"
import imageController from "../controllers/imageController"
import addressController from "../controllers/addressController"
import orderItemController from "../controllers/orderItemController"
import orderController from "../controllers/orderController"
import cartController from "../controllers/cartController"
import assessmentController from "../controllers/assessmentController"
import userController from "../controllers/userController"

const router = express.Router();

const adminRoute = (app) => {

  // user
  router.get("/user", authCheckExistToken, authCheckUserPermission(), userController.readFunc)
  router.post("/user", authCheckExistToken, authCheckUserPermission(), userController.createFunc)
  router.put("/user", authCheckExistToken, authCheckUserPermission(), userController.updateFunc)
  router.delete("/user", authCheckExistToken, authCheckUserPermission(), userController.deleteFunc)
  
  // position
  router.get("/position", authCheckExistToken, authCheckUserPermission(), positionController.readFunc)
  router.post("/position", authCheckExistToken, authCheckUserPermission(), positionController.createFunc)
  router.put("/position", authCheckExistToken, authCheckUserPermission(), positionController.updateFunc)
  router.delete("/position", authCheckExistToken, authCheckUserPermission(), positionController.deleteFunc)

  // position role
  router.get("/position-role", authCheckExistToken, authCheckUserPermission(), positionRoleController.readFunc)
  router.get("/position-role-reverse", authCheckExistToken, authCheckUserPermission(), positionRoleController.readFuncReverse)
  router.post("/position-role", authCheckExistToken, authCheckUserPermission(), positionRoleController.createFunc)
  router.delete("/position-role", authCheckExistToken, authCheckUserPermission(), positionRoleController.deleteFunc)

  // role
  router.get("/role", authCheckExistToken, authCheckUserPermission(), roleController.readFunc)
  router.post("/role", authCheckExistToken, authCheckUserPermission(), roleController.createFunc)
  router.put("/role", authCheckExistToken, authCheckUserPermission(), roleController.updateFunc)
  router.delete("/role", authCheckExistToken, authCheckUserPermission(), roleController.deleteFunc)

  // product
  router.get("/product", authCheckExistToken, authCheckUserPermission(), productController.readFunc)
  router.get("/product/:slug", authCheckExistToken, authCheckUserPermission(), productController.readFuncWithSlug)
  router.post("/product", authCheckExistToken, authCheckUserPermission(), productController.createFunc)
  router.put("/product", authCheckExistToken, authCheckUserPermission(), productController.updateFunc)
  router.delete("/product", authCheckExistToken, authCheckUserPermission(), productController.deleteFunc)

  // capacity
  router.get("/capacity", authCheckExistToken, authCheckUserPermission(), capacityController.readFunc)
  router.post("/capacity", authCheckExistToken, authCheckUserPermission(), capacityController.createFunc)
  router.put("/capacity", authCheckExistToken, authCheckUserPermission(), capacityController.updateFunc)
  router.delete("/capacity", authCheckExistToken, authCheckUserPermission(), capacityController.deleteFunc)

  // color
  router.get("/color", authCheckExistToken, authCheckUserPermission(), colorController.readFunc)
  router.post("/color", authCheckExistToken, authCheckUserPermission(), colorController.createFunc)
  router.put("/color", authCheckExistToken, authCheckUserPermission(), colorController.updateFunc)
  router.delete("/color", authCheckExistToken, authCheckUserPermission(), colorController.deleteFunc)

  // order line
  router.get("/order-line", authCheckExistToken, authCheckUserPermission(), orderLineController.readFunc)
  router.post("/order-line", authCheckExistToken, authCheckUserPermission(), orderLineController.createFunc)
  router.put("/order-line", authCheckExistToken, authCheckUserPermission(), orderLineController.updateFunc)
  router.delete("/order-line", authCheckExistToken, authCheckUserPermission(), orderLineController.deleteFunc)

  // category
  router.get("/category", authCheckExistToken, authCheckUserPermission(), categoryController.readFunc)
  router.post("/category", authCheckExistToken, authCheckUserPermission(), categoryController.createFunc)
  router.put("/category", authCheckExistToken, authCheckUserPermission(), categoryController.updateFunc)
  router.delete("/category", authCheckExistToken, authCheckUserPermission(), categoryController.deleteFunc)

  // brand
  router.get("/brand", authCheckExistToken, authCheckUserPermission(), brandController.readFunc)
  router.post("/brand", authCheckExistToken, authCheckUserPermission(), brandController.createFunc)
  router.put("/brand", authCheckExistToken, authCheckUserPermission(), brandController.updateFunc)
  router.delete("/brand", authCheckExistToken, authCheckUserPermission(), brandController.deleteFunc)

  // version
  router.get("/version", authCheckExistToken, authCheckUserPermission(), versionController.readFunc)
  router.post("/version", authCheckExistToken, authCheckUserPermission(), versionController.createFunc)
  router.put("/version", authCheckExistToken, authCheckUserPermission(), versionController.updateFunc)
  router.delete("/version", authCheckExistToken, authCheckUserPermission(), versionController.deleteFunc)

  // image
  router.get("/image", authCheckExistToken, authCheckUserPermission(), imageController.readFunc)
  router.post("/image", authCheckExistToken, authCheckUserPermission(), imageController.createFunc)
  router.put("/image", authCheckExistToken, authCheckUserPermission(), imageController.updateFunc)
  router.delete("/image", authCheckExistToken, authCheckUserPermission(), imageController.deleteFunc)

  // address
  router.get("/address", authCheckExistToken, authCheckUserPermission(), addressController.readFunc)
  router.post("/address", authCheckExistToken, authCheckUserPermission(), addressController.createFunc)
  router.put("/address", authCheckExistToken, authCheckUserPermission(), addressController.updateFunc)
  router.delete("/address", authCheckExistToken, authCheckUserPermission(), addressController.deleteFunc)

  // orderItem
  router.get("/order-item", authCheckExistToken, authCheckUserPermission(), orderItemController.readFunc)
  router.post("/order-item", authCheckExistToken, authCheckUserPermission(), orderItemController.createFunc)
  // router.put("/order-item", authCheckExistToken, authCheckUserPermission(), orderItemController.updateFunc)
  router.delete("/order-item", authCheckExistToken, authCheckUserPermission(), orderItemController.deleteFunc)

  // order
  router.get("/order", authCheckExistToken, authCheckUserPermission(), orderController.readFunc)
  router.post("/order", authCheckExistToken, authCheckUserPermission(), orderController.createFunc)
  router.put("/order", authCheckExistToken, authCheckUserPermission(), orderController.updateFunc)
  router.delete("/order", authCheckExistToken, authCheckUserPermission(), orderController.deleteFunc)

  // cart
  router.get("/cart", authCheckExistToken, authCheckUserPermission(), cartController.readFunc)
  router.post("/cart", authCheckExistToken, authCheckUserPermission(), cartController.createFunc)
  // router.put("/cart", authCheckExistToken, authCheckUserPermission(), cartController.updateFunc)
  router.delete("/cart", authCheckExistToken, authCheckUserPermission(), cartController.deleteFunc)

  // assessment
  // router.get("/assessment", authCheckExistToken, authCheckUserPermission(), assessmentController.readFunc)
  router.post("/assessment", authCheckExistToken, authCheckUserPermission(), assessmentController.createFunc)
  // router.put("/assessment", authCheckExistToken, authCheckUserPermission(), assessmentController.updateFunc)
  router.delete("/assessment", authCheckExistToken, authCheckUserPermission(), assessmentController.deleteFunc)

  return app.use("/api/admin", router);
};

export default adminRoute;
