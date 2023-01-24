const Role = require('../models').Role;
const Permission = require('../models').Permission;
const RolePermission = require('../models').RolePermission;

class CheckPermission {
  checkPermission(roleId, permName) {
    const role = Role.findOne({
      where: {
        id: roleId,
      },
    });

    if (role && role.slug == 'super_admin') {
      return true;
    } else {
      return new Promise((resolve, reject) => {
        Permission.findOne({
          where: {
            perm_name: permName,
          },
        })
          .then(perm => {
            RolePermission.findOne({
              where: {
                role_id: roleId,
                perm_id: perm.id,
              },
            })
              .then(rolePermission => {
                if (rolePermission) {
                  resolve(rolePermission);
                } else {
                  reject({ message: 'Forbidden' });
                }
              })
              .catch(error => {
                reject(error);
              });
          })
          .catch(() => {
            reject({ message: 'Forbidden' });
          });
      });
    }
  }
}

module.exports = CheckPermission;
