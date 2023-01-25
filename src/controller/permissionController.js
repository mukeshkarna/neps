const config = require('../config/configure');

const Permission = require('../models').Permission;
const CheckPermission = require('../helpers/checkPermission');
const { UPDATED, FAILED, DELETED, CREATED } = require('../utils/flashMessages');
const checkPermission = new CheckPermission();

let permissionController = {
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
        res.render('permissions', {
          ...config.layouts.main,
          permissions,
          title: 'Permissions',
          breadcrumbs: [{ url: '/permissions', title: 'Permissions' }],
        });
      }
    } catch (error) {
      console.log(error);
      req.flash('error_msg', FAILED + error);
      res.redirect('/permissions');
    }
  },

  createView: async (req, res) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'permission_add'
      );

      if (!rolePerm) {
        return res.redirect('403');
      }

      res.render('permissions/create', {
        ...config.layouts.main,
        title: 'Create Permission',
        breadcrumbs: [
          { url: '/permissions', title: 'Permissions' },
          { url: `javascript::void(0)`, title: 'Create Permission' },
        ],
      });
    } catch (error) {
      if (error.message == 'Forbidden') {
        res.redirect('403');
      } else {
        res.redirect('/permissions');
      }
    }
  },

  // Create a new permission
  store: async (req, res) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'permission_store'
      );

      if (!rolePerm) {
        return res.redirect('403');
      }

      if (!req.body.perm_name || !req.body.perm_description) {
        res.status(400).send({
          msg: 'Please pass permission name or description.',
        });
      } else {
        await Permission.create({
          perm_name: req.body.perm_name,
          perm_description: req.body.perm_description,
        });

        req.flash('success_msg', CREATED);
        res.redirect('/permissions');
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

  editView: async (req, res) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'permission_edit'
      );

      if (!rolePerm) {
        return res.redirect('403');
      }

      const permission = await Permission.findByPk(req.params.id);

      if (!permission) {
        req.flash('error_msg', 'Permission not found');
        return res.redirect('back');
      }

      res.render('permissions/edit', {
        ...config.layouts.main,
        permission,
        title: 'Edit Permission',
        breadcrumbs: [
          { url: '/permissions', title: 'Permissions' },
          { url: `javascript::void(0)`, title: 'Edit Permission' },
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

  // Update a permission
  update: async (req, res) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'permission_update'
      );

      if (!rolePerm) {
        return res.redirect('403');
      }

      if (!req.params.id || !req.body.perm_name || !req.body.perm_description) {
        res.status(400).send({
          msg: 'Please pass permission ID, name or description.',
        });
      } else {
        const perm = await Permission.findByPk(req.params.id);

        await Permission.update(
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
        );

        req.flash('success_msg', UPDATED);
        res.redirect('/permissions');
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

  // Delete a permission
  delete: async (req, res) => {
    try {
      const rolePerm = await checkPermission.checkPermission(
        req.user.role_id,
        'permissions_delete'
      );

      if (!rolePerm) {
        return res.redirect('403');
      }

      const perm = await Permission.findByPk(req.params.id);
      if (perm) {
        await perm.destroy({
          where: {
            id: req.params.id,
          },
        });
      } else {
        req.flash('error_msg', 'Permission not found');
        return res.redirect('back');
      }

      req.flash('success_msg', DELETED);
      res.redirect('/permissions');
    } catch (error) {
      if (error.message == 'Forbidden') {
        res.redirect('403');
      } else {
        req.flash('error_msg', FAILED + error);
        res.redirect('back');
      }
    }
  },
};

module.exports = permissionController;
