const config = {};

config.modules = {
	home: 'Admin Dashboard',
	user: 'Admin Users',
	system: 'System Config',
};

config.modulepages = {
	home: { home: 'Admin Dashboard' },
	user: { roles: 'Roles', users: 'Users' },
	system: { settings: 'Settings', email: 'Email Template' },
};

//Icons for eash modules is defined here
config.moduleicons = {
	home: 'ti-home',
	user: 'fa fa-users',
	system: 'ti-settings',
};

module.exports = config;
