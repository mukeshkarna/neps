var { Permission } = require('../../models');
const permission = require('../../config/backend-config').modulepermissions;

for (var key in permission) {
  if (permission.hasOwnProperty(key)) {
    var permissionmodules = permission[key];
    for (var moduleKey in permissionmodules) {
      if (permissionmodules.hasOwnProperty(moduleKey)) {
        const permissionData = {
          slug: moduleKey,
          name: permissionmodules[moduleKey],
          module: key,
        };
        const response = Permission.findOne({
          where: { slug: permissionData.slug },
        });

        if (response === null) {
          Permission.create(permissionData)
            .then(function (newPermission) {
              //
            })
            .catch(function (err) {
              // handle error;
            });
        }
      }
    }
  }
}
