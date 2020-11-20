import express from 'express';
import * as users from "../controllers/user.controller.mjs";
import { validator, postSchema, updateSchema } from '../services/validation.mjs';

export default (app) => {
  const router = express.Router();

  router.get("/", users.redirect);
  router.get("/users",  users.getUsers);
  router.get("/users/:uuid", users.findOne);
  router.post("/users", validator.body(postSchema.user), users.create);
  router.put("/users/:uuid", validator.body(updateSchema.user), users.update);
  router.delete("/users/:uuid", users.remove);
  router.delete("/users", users.deleteAll);

  app.use('/', router);
};
