const config = {};

config.cmsTitle = 'Ekcms';
config.logotitle = 'Ekcms';

config.modules = {
	home: 'Admin Dashboard',
	user: 'Admin Users',
	system: 'System Config',
};

config.modulepages = {
	home: { home: 'Admin Dashboard' },
	user: { roles: 'Roles', users: 'Users' },
	// "user": { "permission": "Permissions", "roles": "Roles", "users": "Users" },
	log: { log: 'Log Management' },
	loginlog: { log: 'Access Logs' },

	// "system": { "settings": "Settings", "email": "Email Template", "notification": "Push Notification" },
	system: { settings: 'Settings', email: 'Email Template' },
	language: {
		languages: 'Languages',
		words: 'Words',
		translation: 'Translation',
	},
	// "profile": { "profile": "Profile Setting"},
	// "cms": { "article": "Article", "page": "Page Management" },
	companies: {
		companies: 'Company Management',
		companyusers: 'Company Users',
		companyorder: 'Company Order',
	},
	jobseekers: {
		jobseekers: 'Jobseekers Management',
		massemails: 'Mass Email',
		email_status: 'Email History',
	},
	// "emails": "Mass Email",
	access: { access: 'Access Control' },

	config: {
		'employment-status': 'Employment Status',
		'english-skill': 'English Skills',
		education: 'Educations',
		position: 'Job Positions',
		residence: 'Residences',
		occupation: 'Occupations',
		'screening-intention': 'Screening Intention',
		'job-history-record': 'Job History Record',
	},
	// "jobseekers": { "jobseekers" : "JobSeeker Management" }
};

//Permissions for each module is defined here
config.modulepermissions = {
	user: {
		//Permission Sub Module
		// "user.permission.view": "View Permission",
		// "user.permission.create": "Create Permission",
		// "user.permission.edit": "Edit Permission",
		// "user.permission.delete": "Delete Permission",

		//Roles Sub Module
		'user.roles.view': 'View Roles',
		'user.roles.create': 'Create Roles',
		'user.roles.edit': 'Edit Roles',
		'user.roles.delete': 'Delete Roles',

		//Users Sub Module
		'user.users.view': 'View Users',
		'user.users.create': 'Create Users',
		'user.users.edit': 'Edit Users',
		'user.users.password': 'Change Users Password',
		'user.users.delete': 'Delete Users',
	},

	profile: {
		'profile.profile.view': 'Profile View',
	},

	system: {
		//system Sub Module
		'system.settings.view': 'View Settings',
		'system.settings.create': 'Create Settings',
		'system.settings.edit': 'Edit Settings',
		'system.settings.delete': 'Delete Settings',

		//system Sub Module
		'system.email.view': 'View Email',
		'system.email.create': 'Create Email',
		'system.email.edit': 'Edit Email',
		'system.email.delete': 'Delete Email',
	},
};

//Icons for eash modules is defined here
config.moduleicons = {
	home: 'ti-home',
	user: 'fa fa-users',
	log: 'ti-file',
	loginlog: 'fa fa-lock',
	system: 'ti-settings',
	// "cms": "ti-notepad",
	language: 'fa fa-language',
	profile: 'ti-hand-point-right',
	companies: 'fa fa-building',
	jobseekers: 'fa fa-search',
	config: 'fa fa-cogs',
	access: 'fa fa-lock',
	// "jobseekers": "ti-hand-point-right",
};

module.exports = config;
