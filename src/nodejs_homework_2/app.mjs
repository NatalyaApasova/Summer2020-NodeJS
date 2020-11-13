import express from 'express';
import { v4 as uuid } from 'uuid';
import Joi from 'joi';
import * as expressJoiValidation from 'express-joi-validation';

const app = express();
const port = 3000;

const validator = expressJoiValidation.createValidator({
  passError: true,
  statusCode: 400
});

app.use(express.json());

const postSchema = {
  user: Joi.object().keys({
    login: Joi.string()
      .alphanum()
      .min(2)
      .max(25)
      .required(),
    password: Joi.string()
      .alphanum()
      .min(8)
      .max(25)
      .required(),
    age: Joi.number()
      .min(4)
      .max(130)
      .integer()
      .required(),
    isDeleted: Joi.boolean()
      .required()
  })
}

const updateSchema = {
  user: Joi.object().keys({
    login: Joi.string()
      .alphanum()
      .min(2)
      .max(25),
    password: Joi.string()
      .alphanum()
      .min(8)
      .max(25),
    age: Joi.number()
      .min(4)
      .max(130)
      .integer(),
    isDeleted: Joi.boolean()
  })
}

let users = [
  {
    "id": `${uuid()}`,
    "login": "Jtfhsda",
    "password": "11111111",
    "age": "23",
    "isDeleted": "false"
  },
  {
    "id": `${uuid()}`,
    "login": "erfasd",
    "password": "22222222",
    "age": "45",
    "isDeleted": "false"
  },
  {
    "id": `${uuid()}`,
    "login": "Casdjk",
    "password": "33333333",
    "age": "68",
    "isDeleted": "false"
  },
  {
    "id": `${uuid()}`,
    "login": "Kfhvnfhoik",
    "password": "44444444",
    "age": "85",
    "isDeleted": "false"
  }
];

app.get('/', (req, res) => {
  res.redirect('users');
})

app.get('/users', (req, res) => {
  let loginSubstring = req.query.loginSubstring;
  let limit = req.query.limit;
  if (loginSubstring && limit) {
    let getFilteredUsers = users.filter((user) => {
      let login = user.login.toLowerCase();
      return login.includes(loginSubstring.toLowerCase());
    });
    if (getFilteredUsers.length === 0) {
      res.status(500).send('No matches.')
    } else {
      let limitedUsers = getFilteredUsers.slice(0, limit);
      function sortUsers(arr) {
        return arr.sort((a, b) => {
          return a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1;
        })
      }
      res.json(sortUsers(limitedUsers));
    }
  } else {
    res.json(users);
  }
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id || req.params.id.slice(0, 8);
  const getUser = users.find((user) => {
    return user.id === userId || user.id.slice(0, 8) === userId
  });
  if (!getUser) {
    res.status(500).send('User not found.')
  } else {
    res.json(getUser);
  }
});

app.post('/users', validator.body(postSchema.user), (req, res, next) => {
  let newUser = { id: uuid(), ...req.body };
  users.push(newUser);
  res.send(users);
  next()
})

app.put('/users/:id', validator.body(updateSchema.user), (req, res) => {
  const userId = req.params.id;
  const getUser = users.find((user) => {
    return user.id === userId
  });
  const index = users.indexOf(getUser);

  if (!getUser) {
    res.status(500).send('User not found.')
  } else {
    const updatedUser = { ...getUser, ...req.body };
    users[index] = updatedUser;
    res.json(updatedUser);
  }
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const getUser = users.find((user) => {
    return user.id === userId;
  });
  const index = users.indexOf(getUser);

  if (!getUser) {
    res.status(500).send('User not found.');
  } else {
    const deletedUser = { ...getUser, isDeleted: true };
    users[index] = deletedUser;
    res.json(users);
  }
});

app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    let msg = switch(err.type) {
        case "any.empty":
          err.message = "Value should not be empty!";
          break;
        case "string.min":
          err.message = `Value should have at least ${err.context.limit} characters!`;
          break;
        case "string.max":
          err.message = `Value should have at most ${err.context.limit} characters!`;
          break;
        default:
          break;
      }
    res.status(400).json({
      type: err.type,
      message: msg || err.error.toString()
    })
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error();
  res.status(500).send(err);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost: ${port}`);
})
