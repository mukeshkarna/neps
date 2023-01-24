'use strict';

const { Role } = require('../models');

let roleService = {};

roleService.findAll = async query => {
  try {
    let data = await Role.findAll({
      where: query.where,
      order: query.order,
    });
    return data;
  } catch (e) {}
};

roleService.count = async query => {
  let resp = await Role.count(query);
  return resp;
};

roleService.findOne = async query => {
  let resp = await Role.findOne(query, {
    include: {
      model: Permission,
      as: 'permissions',
    },
  });
  return resp;
};

roleService.add = async req => {
  let data = {
    name: req.body.name,
    short_description: req.body.short_description,
    date_time: req.body.date_time,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let resp = await Role.create(data);
  return resp;
};

roleService.delete = async id => {
  return Role.destroy({ where: { id: id } });
};

roleService.findAndUpdate = async (id, req) => {
  let updateData = {
    name: req.body.name,
    short_description: req.body.short_description,
    date_time: req.body.date_time,
    updatedAt: new Date(),
  };
  let user = await Role.update(updateData, { where: { id: id } });
  return user;
};

module.exports = roleService;
