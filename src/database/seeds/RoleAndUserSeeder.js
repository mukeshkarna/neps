var { Role, User } = require('../../models');

var roleData = {
  name: 'Super Admin',
  slug: 'superadmin',
  permission: [],
};

Role.findOne({ where: { slug: roleData.slug } }).then(response => {
  if (!response) {
    Role.create(roleData)
      .then(function (savedRole) {
        const bcrypt = require('bcrypt');
        // console.log(savedRole);
        var userData = {
          firstname: 'Admin',
          lastname: 'User',
          email: 'info@ekbana.com',
          username: 'admin',
          password: '123admin@',
          role: savedRole.id,
          image: '',
          status: 'active',
        };

        User.findOne({ where: { email: userData.email } }).then(response => {
          if (!response) {
            const newUser = User(userData);
            newUser
              .save()
              .then(savedUser => {
                // console.log(savedUser);
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      })
      .catch(function (err) {
        // handle error;
      });
  }
});
