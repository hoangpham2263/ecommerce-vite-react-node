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
import imageController from "../controllers/imageController"
import addressController from "../controllers/addressController"
import orderController from "../controllers/orderController"
import cartController from "../controllers/cartController"
import assessmentController from "../controllers/assessmentController"

const router = express.Router();

const adminRoute = (app) => {

  // position
  router.get("/position", positionController.readFunc)
  router.get("/position-role", positionRoleController.readFunc)
  router.get("/role", roleController.readFunc)

  // product
  router.get("/product", productController.readFunc)
  router.get("/product/:slug",  productController.readFuncWithSlug)
  router.get("/capacity", capacityController.readFunc)
  router.get("/color", colorController.readFunc)
  router.get("/order-line", orderLineController.readFunc)
  router.get("/category", categoryController.readFunc)
  router.get("/brand", brandController.readFunc)
  router.get("/image", imageController.readFunc)
  router.get("/address", addressController.readFunc)
  router.get("/order", orderController.readFunc)
  router.get("/cart", cartController.readFunc)
  router.get("/assessment", assessmentController.readFunc)

  return app.use("/api", router);
};

export default adminRoute;
