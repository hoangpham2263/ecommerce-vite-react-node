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

const router = express.Router();

const adminRoute = (app) => {

  // position
  router.get("/position", authCheckExistToken, authCheckUserPermission(), positionController.readFunc)
  router.post("/position", authCheckExistToken, authCheckUserPermission(), positionController.createFunc)
  router.put("/position", authCheckExistToken, authCheckUserPermission(), positionController.updateFunc)
  router.delete("/position", authCheckExistToken, authCheckUserPermission(), positionController.deleteFunc)

  // position role
  router.get("/position-role", authCheckExistToken, authCheckUserPermission(), positionRoleController.readFunc)
  router.post("/position-role", authCheckExistToken, authCheckUserPermission(), positionRoleController.createFunc)
  router.put("/position-role", authCheckExistToken, authCheckUserPermission(), positionRoleController.updateFunc)
  router.delete("/position-role", authCheckExistToken, authCheckUserPermission(), positionRoleController.deleteFunc)

  // role
  router.get("/role", authCheckExistToken, authCheckUserPermission(), roleController.readFunc)
  router.post("/role", authCheckExistToken, authCheckUserPermission(), roleController.createFunc)
  router.put("/role", authCheckExistToken, authCheckUserPermission(), roleController.updateFunc)
  router.delete("/role", authCheckExistToken, authCheckUserPermission(), roleController.deleteFunc)

  // product
  router.get("/product", authCheckExistToken, authCheckUserPermission(), productController.readFunc)
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

  return app.use("/api/admin", router);
};

export default adminRoute;
