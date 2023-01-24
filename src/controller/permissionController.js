const config = require('../config/configure');

const Permission = require('../models').Permission;
const CheckPermission = require('../helpers/checkPermission');
const checkPermission = new CheckPermission();

let permissionController = {
  // index: (req, res, next) => {
  //   try {
  //     return res.render('permission', config.layouts.main);
  //   } catch (error) {
  //     req.flash('error_msg', 'something went wrong');
  //   }
  // },

  // Create a new permission
  store: async (req, res) => {
    checkPermission
      .checkPermission(req.user.role_id, 'permissions_add')
      .then(rolePerm => {
        if (!req.body.perm_name || !req.body.perm_description) {
          res.status(400).send({
            msg: 'Please pass permission name or description.',
          });
        } else {
          Permission.create({
            perm_name: req.body.perm_name,
            perm_description: req.body.perm_description,
          })
            .then(perm => res.status(201).send(perm))
            .catch(error => {
              console.log(error);
              res.status(400).send(error);
            });
        }
      })
      .catch(error => {
        res.status(403).send(error);
      });
  },

  // Get List of permissions
  index: async (req, res) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'permission_index'
      );
      
      if (!rolePerm) {
        req.redirect('403');
      }
      const permissions = await Permission.findAll();

      if (permissions) {
        return res.render('permissions', {
          ...config.layouts.main,
          permissions,
          title: 'Permissions',
          breadcrumbs: [{ url: '/permissions', title: 'Permissions' }],
        });
      }
    } catch (error) {
      console.log(error);
      return req.flash('error_msg', 'something went wrong' + error);
    }
  },

  // Update a permission
  update: async (req, res) => {
    checkPermission
      .checkPermission(req.user.role_id, 'permissions_update')
      .then(rolePerm => {
        if (
          !req.params.id ||
          !req.body.perm_name ||
          !req.body.perm_description
        ) {
          res.status(400).send({
            msg: 'Please pass permission ID, name or description.',
          });
        } else {
          Permission.findByPk(req.params.id)
            .then(perm => {
              Permission.update(
                {
                  perm_name: req.body.perm_name || perm.perm_name,
                  perm_description:
                    req.body.perm_description || perm.perm_description,
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              )
                .then(_ => {
                  res.status(200).send({
                    message: 'permission updated',
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

  // Delete a permission
  delete: async (req, res) => {
    checkPermission
      .checkPermission(req.user.role_id, 'permissions_delete')
      .then(rolePerm => {
        if (!req.params.id) {
          res.status(400).send({
            msg: 'Please pass permission ID.',
          });
        } else {
          Permission.findByPk(req.params.id)
            .then(perm => {
              if (perm) {
                perm
                  .destroy({
                    where: {
                      id: req.params.id,
                    },
                  })
                  .then(_ => {
                    res.status(200).send({
                      message: 'permission deleted',
                    });
                  })
                  .catch(err => res.status(400).send(err));
              } else {
                res.status(404).send({
                  message: 'permission not found',
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

module.exports = permissionController;
