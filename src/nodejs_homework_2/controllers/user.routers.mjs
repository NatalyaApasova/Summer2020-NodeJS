import express from 'express';
import * as users from "./user.controller.mjs";

export default (app) => {

  const router = express.Router();

  router.get("/", users.redirect);
  router.get("/users",  users.getAutoSuggestUsers);
    // getAutoSuggestUsers());
  router.get("users/:id", users.findOne);
  router.post("users", users.create);
  router.put("users/:id", users.update);
  router.delete("users/:id", users.remove);
  router.delete("/users", users.deleteAll);

  app.use('/', router);
  
  // app.use((err, req, res, next) => {
  //   if (err && err.error && err.error.isJoi) {
  //     res.status(400).json({
  //       type: err.type,
  //       message: err.error.toString()
  //     })
  //   } else {
  //     next(err);
  //   }
  // });

  // app.use((err, req, res, next) => {
  //   console.error();
  //   res.status(500).send(err);
  // });
};
