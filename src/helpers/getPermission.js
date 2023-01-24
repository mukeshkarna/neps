const config = require('../config/backend-config');
const _ = require('lodash');

const modules = config.modules;
const modulepages = config.modulepages;
const modulepermissions = config.modulepermissions;
const moduleicons = config.moduleicons;

function getPermission(user) {
	let permission = []; // Empty permission initialized
	if (user) {
		if (user.role.slug === 'superadmin') {
			for (let moduleID in modules) {
				const arrayData = {
					id: moduleID,
					title: modules[moduleID],
					subpagesCount: Object.keys(modulepages[moduleID]).length,
					enableDropdown:
						Object.keys(modulepages[moduleID]).length > 1 ? true : false,
					subPages: modulepages[moduleID],
					icon: moduleicons[moduleID],
				};
				permission.push(arrayData);
			}
		} else {
			for (let moduleID in modules) {
				if (moduleID === 'home') {
					const arrayData = {
						id: moduleID,
						title: modules[moduleID],
						subpagesCount: Object.keys(modulepages[moduleID]).length,
						enableDropdown:
							Object.keys(modulepages[moduleID]).length > 1 ? true : false,
						subPages: modulepages[moduleID],
						icon: moduleicons[moduleID],
					};
					permission.push(arrayData);
				} else {
					if (modulepermissions[moduleID] !== undefined) {
						const userPermission = user.role.permission;
						let modulePermissionData = _.map(
							modulepermissions[moduleID],
							function (p, key) {
								if (_.includes(userPermission, key)) {
									return key;
								}
							}
						);
						modulePermissionData = _.filter(
							modulePermissionData,
							function (p, key) {
								return p !== undefined;
							}
						);
						if (
							modulePermissionData.length > 0 &&
							modulePermissionData !== undefined
						) {
							submoduleArray = {};
							let submodulePermissionData = _.map(
								modulepages[moduleID],
								function (p, key) {
									submodulePermissionInsideData = _.filter(
										modulePermissionData,
										function (o, okey) {
											return o.indexOf(key) >= 0;
										}
									);
									if (submodulePermissionInsideData.length > 0) {
										submoduleArray[key] = p;
									}
								}
							);
							const arrayData = {
								id: moduleID,
								title: modules[moduleID],
								subpagesCount: Object.keys(modulepages[moduleID]).length,
								enableDropdown:
									Object.keys(modulepages[moduleID]).length > 1 ? true : false,
								subPages: submoduleArray,
								icon: moduleicons[moduleID],
							};
							permission.push(arrayData);
						}
					}
				}
			}
		}
	}
	return permission;
}

module.exports.getPermission = getPermission;
