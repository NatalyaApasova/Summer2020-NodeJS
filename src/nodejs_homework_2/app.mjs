import express from 'express';
import db from "./services/index.mjs";
import routers from "./data-access/user.routers.mjs";

const User = db.users;
const app = express();

app.use(express.json());

routers(app)
const port = 3000;

app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      type: err.type,
      message: err.error.toString()
    })
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost: ${port}`);
})
