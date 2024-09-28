import express from "express";
import registerLoginController from "../controllers/registerLoginController";
import googleOAuth from '../controllers/googleOAuth'

const router = express.Router();

const sharedApiRoute = (app) => {

  // login with google
  router.post('/auth/google',googleOAuth.loginGoogleOAuth)
  router.post('/auth/google/create',googleOAuth.saveAccountGoogleOAuth)

  // login basic
  router.post("/user/register", registerLoginController.registerAccount);
  router.post("/user/login", registerLoginController.loginAccount);

  // logout
  router.post("/user/logout", registerLoginController.logoutAccount);

  return app.use("/api", router);
};

export default sharedApiRoute;
