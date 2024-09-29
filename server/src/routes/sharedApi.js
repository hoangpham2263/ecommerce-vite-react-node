import express from "express";
import registerLoginController from "../controllers/registerLoginController";
import googleOAuth from '../controllers/googleOAuth'
import { authCheckExistToken, authCheckUserPermission } from "../middleware/authCheckExistToken";

const router = express.Router();

const sharedApiRoute = (app) => {
  // login with google
  router.post('/auth/google', googleOAuth.loginGoogleOAuth)
  router.post('/auth/google/create', googleOAuth.saveAccountGoogleOAuth)

  // login basic
  router.post("/auth/register", authCheckExistToken, authCheckUserPermission(100), registerLoginController.registerAccount);
  router.post("/auth/login", registerLoginController.loginAccount);

  // logout
  router.post("/auth/logout",registerLoginController.logoutAccount);
  router.get("/auth/jwt-token", registerLoginController.readJWT);

  return app.use("/api", router);
};

export default sharedApiRoute;