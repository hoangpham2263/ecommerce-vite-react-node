import express from "express";
import positionController from "../controllers/positionController"
import positionRoleController from "../controllers/positionRoleController"
import roleController from "../controllers/roleController"
import productController from "../controllers/productController"
import capacityController from "../controllers/capacityController"
import colorController from "../controllers/colorController"
import orderLineController from "../controllers/orderLineController"
import categoryController from "../controllers/categoryController"
import brandController from "../controllers/brandController"

const router = express.Router();

const adminRoute = (app) => {

  // position
  router.get("/position", positionController.readFunc)
  router.get("/position-role", positionRoleController.readFunc)
  router.get("/role", roleController.readFunc)

  // product
  router.get("/product", productController.readFunc)
  router.get("/capacity", capacityController.readFunc)
  router.get("/color", colorController.readFunc)
  router.get("/order-line", orderLineController.readFunc)
  router.get("/category", categoryController.readFunc)
  router.get("/brand",brandController.readFunc)

  return app.use("/api", router);
};

export default adminRoute;
