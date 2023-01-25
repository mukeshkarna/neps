const config = require('../config/configure');
const User = require('../models').User;
const Role = require('../models').Role;
const Permission = require('../models').Permission;

const { CREATED, UPDATED, DELETED, FAILED } = require('../utils/flashMessages');

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
        return res.redirect('403');
      }
      const roles = await Role.findAll();

      if (roles) {
        res.render('roles', {
          ...config.layouts.main,
          roles,
          title: 'Roles',
          breadcrumbs: [{ url: '/roles', title: 'Roles' }],
        });
      }
    } catch (error) {
      console.log(error);
      req.flash('error_msg', FAILED + error);
      res.redirect('/roles');
    }
  },

  createView: async (req, res) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'role_create'
      );

      if (!rolePerm) {
        return res.redirect('403');
      }

      const permissions = await Permission.findAll();

      res.render('roles/create', {
        ...config.layouts.main,
        permissions,
        title: 'Create Role',
        breadcrumbs: [
          { url: '/roles', title: 'Roles' },
          { url: `javascript::void(0)`, title: 'Create Role' },
        ],
      });
    } catch (error) {
      if (error.message == 'Forbidden') {
        res.redirect('403');
      } else {
        console.log(error);
        req.flash('error_msg', FAILED + error);
        res.redirect('400');
      }
    }
  },

  // Create a new Role
  store: async (req, res, next) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'role_add'
      );

      if (!rolePerm) {
        return res.redirect('403');
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

        req.flash('success_msg', CREATED);
        res.redirect('/roles');
      }
    } catch (error) {
      if (error.message == 'Forbidden') {
        res.redirect('403');
      } else {
        req.flash('error_msg', FAILED);
        res.redirect('back');
      }
    }
  },

  // Get List of Roles
  getRoles: async (req, res, next) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'role_index'
      );

      if (!rolePerm) {
        return res.redirect('403');
      }

      await Role.findAll({
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
      });
    } catch (error) {
      if (error.message == 'Forbidden') {
        res.redirect('403');
      } else {
        req.flash('error_msg', FAILED);
        res.redirect('/roles');
      }
    }
  },

  // Get Role by ID
  show: async (req, res, next) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'role_show'
      );

      if (!rolePerm) {
        return res.redirect('403');
      }

      const role = await Role.findByPk(req.params.id, {
        include: {
          model: Permission,
          as: 'permissions',
        },
      });

      if (role) {
        res.render('roles/permissions', {
          ...config.layouts.main,
          role,
          title: 'Role Permissions',
          breadcrumbs: [
            { url: '/roles', title: 'Roles' },
            { url: `javascript::void(0)`, title: 'Role Permissions' },
          ],
        });
      }
    } catch (error) {
      if (error.message == 'Forbidden') {
        res.redirect('403');
      } else {
        console.log(error);
        req.flash('error_msg', FAILED + error);
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
        return res.redirect('403');
      }

      const role = await Role.findByPk(req.params.id, {
        include: {
          model: Permission,
          as: 'permissions',
        },
      });

      if (!role) {
        req.flash('error_msg', 'Role not found');
        return res.redirect('back');
      }

      const permissions = await Permission.findAll();

      res.render('roles/edit', {
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
        req.flash('error_msg', FAILED + error);
        res.redirect('back');
      }
    }
  },

  // Update a Role
  update: async (req, res, next) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'role_update'
      );

      if (!rolePerm) {
        return res.redirect('403');
      }

      if (!req.params.id || !req.body.role_name || !req.body.role_description) {
        req.flash('error_msg', 'Please pass Role ID, name or description.');
        return res.redirect('back');
      } else {
        const role = await Role.findByPk(req.params.id);
        await Role.update(
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
        );

        req.flash('success_msg', UPDATED);
        res.redirect('/roles');
      }
    } catch (error) {
      if (error.message == 'Forbidden') {
        res.redirect('403');
      } else {
        req.flash('error_msg', FAILED + error);
        res.redirect('back');
      }
    }
  },

  // Delete a Role
  delete: async (req, res, next) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'role_delete'
      );

      if (!rolePerm) {
        return res.redirect('403');
      }

      if (!req.params.id) {
        req.flash('error_msg', 'Please pass role ID.');
        return res.redirect('back');
      } else {
        const role = await Role.findByPk(req.params.id);

        if (role) {
          await Role.destroy({
            where: {
              id: req.params.id,
            },
          });
        } else {
          req.flash('error_msg', 'Role not found');
          res.redirect('back');
        }
      }
    } catch (error) {
      if (error.message == 'Forbidden') {
        req.flash('error_msg', FAILED + error.message);
        res.redirect('403');
      } else {
        req.flash('error_msg', FAILED + error.message);
        res.redirect('back');
      }
    }
  },

  // Add Permissions to Role
  addPermission: async (req, res, next) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'permission_add'
      );

      if (!rolePerm) {
        return res.redirect('403');
      }

      if (!req.body.permissions) {
        return req.flash('error_msg', FAILED);
      } else {
        const role = await Role.findByPk(req.params.id);

        if (!role) {
          req.flash('error_msg', FAILED);
          return res.redirect('back');
        }
        req.body.permissions.forEach(async (item, index) => {
          const perm = Permission.findByPk(item);
          await role.addPermissions(perm, {
            through: {
              selfGranted: false,
            },
          });
        });

        req.flash('success_msg', CREATED);
        res.redirect('/roles');
      }
    } catch (error) {
      if (error.message == 'Forbidden') {
        req.flash('error_msg', FAILED + error.message);
        res.redirect('403');
      } else {
        req.flash('error_msg', FAILED + error.message);
        res.redirect('back');
      }
    }
  },
};
module.exports = roleController;
