const config = require('../config/configure');
const User = require('../models').User;
const Role = require('../models').Role;
const Permission = require('../models').Permission;

const CheckPermission = require('../helpers/checkPermission');
const checkPermission = new CheckPermission();

let roleController = {
  index: async (req, res, next) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'role_index'
      );

      if (!rolePerm) {
        req.redirect('403');
      }
      const roles = await Role.findAll();

      if (roles) {
        return res.render('roles', {
          ...config.layouts.main,
          roles,
          title: 'Roles',
          breadcrumbs: [{ url: '/roles', title: 'Roles' }],
        });
      }
    } catch (error) {
      console.log(error);
      return req.flash('error_msg', 'something went wrong' + error);
    }
  },

  createView: async (req, res) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'role_edit'
      );

      if (!rolePerm) {
        req.redirect('403');
      }

      res.render('roles/create');
    } catch (error) {
      req.flash('error_msg', 'something went wrong');
    }
  },

  // Create a new Role
  store: async (req, res, next) => {
    const rolePerm = await checkPermission.checkPermission(
      req.user.role_id,
      'role_add'
    );

    if (!rolePerm) {
      req.redirect('403');
    }

    if (!req.body.role_name || !req.body.role_description) {
      res.status(400).send({
        msg: 'Please pass Role name or description.',
      });
    } else {
      Role.create({
        role_name: req.body.role_name,
        role_description: req.body.role_description,
      })
        .then(role => res.status(201).send(role))
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
        console.log(rolePerm);

        Role.findAll({
          include: [
            {
              model: Permission,
              as: 'permissions',
            },
            {
              model: User,
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

  // Get Role by ID
  show: async (req, res, next) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'role_show'
      );

      if (!rolePerm) {
        req.redirect('403');
      }

      const role = await Role.findByPk(req.params.id, {
        include: {
          model: Permission,
          as: 'permissions',
        },
      });

      if (role) {
        return res.render('roles/permissions', {
          ...config.layouts.main,
          role,
          title: 'Role Permissions',
          breadcrumbs: [
            { url: '/roles', title: 'Roles' },
            { url: `javascript::void(0)`, title: 'Role Permissions' },
            // { url: `/roles/${role.id}`, title: 'Role Permissions' },
          ],
        });
      }
    } catch (error) {
      if (error.message == 'Forbidden') {
        res.redirect('403');
      } else {
        console.log(error);
        res.redirect('400');
      }
    }
  },

  editView: async (req, res) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'role_edit'
      );

      if (!rolePerm) {
        req.redirect('403');
      }

      const role = await Role.findByPk(req.params.id, {
        include: {
          model: Permission,
          as: 'permissions',
        },
      });

      const permissions = await Permission.findAll();

      if (!role) {
        req.flash('error_msg', 'Data not found');
        return res.redirect('back');
      }

      return res.render('roles/edit', {
        ...config.layouts.main,
        role,
        permissions,
        title: 'Edit Role',
        breadcrumbs: [
          { url: '/roles', title: 'Roles' },
          { url: `javascript::void(0)`, title: 'Edit Role' },
        ],
      });
    } catch (error) {
      if (error.message == 'Forbidden') {
        res.redirect('403');
      } else {
        console.log(error);
        res.redirect('400');
      }
    }
  },

  // Update a Role
  update: async (req, res, next) => {
    checkPermission
      .checkPermission(req.user.role_id, 'role_update')
      .then(rolePerm => {
        if (
          !req.params.id ||
          !req.body.role_name ||
          !req.body.role_description
        ) {
          res.status(400).send({
            msg: 'Please pass Role ID, name or description.',
          });
        } else {
          Role.findByPk(req.params.id)
            .then(role => {
              Role.update(
                {
                  role_name: req.body.role_name || role.role_name,
                  role_description:
                    req.body.role_description || role.role_description,
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              )
                .then(_ => {
                  res.status(200).send({
                    message: 'Role updated',
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

  // Delete a Role
  delete: async (req, res, next) => {
    checkPermission
      .checkPermission(req.user.role_id, 'role_delete')
      .then(rolePerm => {
        if (!req.params.id) {
          res.status(400).send({
            msg: 'Please pass role ID.',
          });
        } else {
          Role.findByPk(req.params.id)
            .then(role => {
              if (role) {
                Role.destroy({
                  where: {
                    id: req.params.id,
                  },
                })
                  .then(_ => {
                    res.status(200).send({
                      message: 'Role deleted',
                    });
                  })
                  .catch(err => res.status(400).send(err));
              } else {
                res.status(404).send({
                  message: 'Role not found',
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

  // Add Permissions to Role
  addPermission: async (req, res, next) => {
    checkPermission
      .checkPermission(req.user.role_id, 'permission_add')
      .then(rolePerm => {
        if (!req.body.permissions) {
          res.status(400).send({
            msg: 'Please pass permissions.',
          });
        } else {
          Role.findByPk(req.params.id)
            .then(role => {
              req.body.permissions.forEach(function (item, index) {
                Permission.findByPk(item)
                  .then(async perm => {
                    await role.addPermissions(perm, {
                      through: {
                        selfGranted: false,
                      },
                    });
                  })
                  .catch(error => {
                    res.status(400).send(error);
                  });
              });
              res.status(200).send({
                message: 'Permissions added',
              });
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
module.exports = roleController;
