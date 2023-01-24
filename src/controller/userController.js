const config = require('../config/configure');
const SuperUser = require('../models').SuperUser;
const Role = require('../models').Role;
const Permission = require('../models').Permission;
const RolePermission = require('../models').RolePermission;

const CheckPermission = require('../helpers/checkPermission');
const checkPermission = new CheckPermission();

let userController = {
  index: async (req, res, next) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'user_index'
      );

      if (!rolePerm) {
        req.redirect('403');
      }
      const users = await SuperUser.findAll({
        include: 'role',
      });

      if (users) {
        return res.render('users', {
          ...config.layouts.main,
          users,
          title: 'Users',
          breadcrumbs: [{ url: '/users', title: 'Users' }],
        });
      }
    } catch (error) {
      console.log(error);
      return req.flash('error_msg', 'something went wrong' + error);
    }
  },

  // Create a new Role
  store: async (req, res, next) => {
    const rolePerm = await checkPermission.checkPermission(
      req.user.role_id,
      'user_add'
    );

    if (!rolePerm) {
      req.redirect('403');
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('errors', errors.mapped());
      req.flash('inputData', req.body);
      return res.redirect('back');
    }

    if (
      !req.body.role_id ||
      !req.body.email ||
      !req.body.password ||
      !req.body.fullname ||
      !req.body.phone
    ) {
      res.status(400).send({
        msg: 'Please pass Role ID, email, password, phone or fullname.',
      });
    } else {
      SuperUser.create({
        email: req.body.email,
        password: req.body.password,
        fullname: req.body.fullname,
        phone: req.body.phone,
        role_id: req.body.role_id,
      })
        .then(user => res.status(201).send(user))
        .catch(error => {
          console.log(error);
          res.status(400).send(error);
        });
    }
  },

  // Get List of Roles
  getRoles: async (req, res, next) => {
    checkPermission
      .checkPermission(req.user.role_id, 'role_index')
      .then(rolePerm => {
        Role.findAll({
          include: [
            {
              model: Permission,
              as: 'permissions',
            },
            {
              model: SuperUser,
              as: 'users',
            },
          ],
        })
          .then(roles => res.status(200).send(roles))
          .catch(error => {
            res.status(400).send(error);
          });
      })
      .catch(error => {
        res.status(403).send(error);
      });
  },

  // Get User by ID
  show: async (req, res, next) => {
    checkPermission
      .checkPermission(req.user.role_id, 'user_show')
      .then(rolePerm => {
        SuperUser.findByPk(req.params.id)
          .then(user => res.status(200).send(user))
          .catch(error => {
            res.status(400).send(error);
          });
      })
      .catch(error => {
        res.status(403).send(error);
      });
  },

  // Update a User
  update: async (req, res, next) => {
    checkPermission
      .checkPermission(req.user.role_id, 'user_update')
      .then(rolePerm => {
        if (
          !req.body.role_id ||
          !req.body.email ||
          !req.body.password ||
          !req.body.fullname ||
          !req.body.phone
        ) {
          res.status(400).send({
            msg: 'Please pass Role ID, email, password, phone or fullname.',
          });
        } else {
          SuperUser.findByPk(req.params.id)
            .then(user => {
              SuperUser.update(
                {
                  email: req.body.email || user.email,
                  password: req.body.password || user.password,
                  fullname: req.body.fullname || user.fullname,
                  phone: req.body.phone || user.phone,
                  role_id: req.body.role_id || user.role_id,
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              )
                .then(_ => {
                  res.status(200).send({
                    message: 'User updated',
                  });
                })
                .catch(err => res.status(400).send(err));
            })
            .catch(error => {
              res.status(400).send(error);
            });
        }
      })
      .catch(error => {
        res.status(403).send(error);
      });
  },

  // Delete a User
  delete: async (req, res, next) => {
    checkPermission
      .checkPermission(req.user.role_id, 'user_delete')
      .then(rolePerm => {
        if (!req.params.id) {
          res.status(400).send({
            msg: 'Please pass user ID.',
          });
        } else {
          SuperUser.findByPk(req.params.id)
            .then(user => {
              if (user) {
                SuperUser.destroy({
                  where: {
                    id: req.params.id,
                  },
                })
                  .then(_ => {
                    res.status(200).send({
                      message: 'User deleted',
                    });
                  })
                  .catch(err => res.status(400).send(err));
              } else {
                res.status(404).send({
                  message: 'User not found',
                });
              }
            })
            .catch(error => {
              res.status(400).send(error);
            });
        }
      })
      .catch(error => {
        res.status(403).send(error);
      });
  },
};
module.exports = userController;
