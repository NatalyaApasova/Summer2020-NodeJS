import db from "../services/index.mjs";

const User = db.users;
const Op = db.Sequelize.Op;

export const redirect = (req, res) => {
  res.redirect('users');
}

export const findOne = (req, res) => {
  const id = req.params.uuid;

  User.findByPk(id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving User with id=${id}`
      });
    });
}

export const getUsers = (req, res) => {
  const { loginSubstring, limit } = req.query;
  if (loginSubstring && limit) {
    User.findAll({
      limit: limit,
      where: {
        login: {
          [Op.substring]: loginSubstring,
        }
      }
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      })
  } else {
    User.findAll().then((data) => {
      res.send(data);
    })
  }
}

export const create = (req, res) => {
  const { login, password, age } = req.body;

  const user = {
    login,
    password,
    age
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
}

export const update = (req, res) => {
  const id = req.params.uuid;

  User.update(req.body, {
    where: { uuid: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "The User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update the User with id=${id}. Maybe User was not found or req.body is empty.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating the User with id=" + id
      });
    });
}

export const remove = (req, res) => {
  const id = req.params.uuid;

  User.update({ isDeleted: true }, {
    where: { uuid: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "The User was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete the User with id=${id}. Maybe the User was not found.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete the User with id=${id}.`
      });
    });
}

export const deleteAll = (req, res) => {
  User.update({ isDeleted: true }, {
    where: {}
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
}
