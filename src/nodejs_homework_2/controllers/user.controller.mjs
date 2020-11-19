import db from "../models/index.mjs";

const User = db.users;
const Op = db.Sequelize.Op;

export const redirect = (req, res) => {
  res.redirect('users');
}

export const findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

export const findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving User with id=${id}`
      });
    });
};

export const getAutoSuggestUsers = (req, res) => {
  if (req.query.loginSubstring && req.query.limit) {
    User.findAll({
          limit: limit,
          where: {
            [Op.substring]: loginSubstring,
          }
        })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    })
  } else {
    User.findAll()
  }
};

export const create = (req, res) => {
  if (!req.body.login || !req.body.password || !req.body.age ) {
    res.status(400).send({
      message: "All fields are required."
    });
    return;
  }

  const user = {
    login: req.body.login,
    password: req.body.password,
    age: req.body.age
  };

  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

export const update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "The User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update the User with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating the User with id=" + id
      });
    });
};

export const remove = (req, res) => {
  const id = req.params.id;

 User.update({ isDeleted: true }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "The User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete the User with id=${id}. Maybe the User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete the User with id=${id}`
      });
    });
};

export const deleteAll = (req, res) => {
  User.update({ isDeleted: true }, {
    where: {}
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};
