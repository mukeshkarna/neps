"use strict";

const { Task } = require("../models");

let taskService = {};

taskService.findAll = async (query) => {
  try {
    let data = await Task.findAll({
      where: query.where,
      order: query.order,
    });
    return data;
  } catch (e) {}
};

taskService.count = async (query) => {
  let resp = await Task.count(query);
  return resp;
};

taskService.findOne = async (query) => {
  let resp = await Task.findOne(query);
  return resp;
};

taskService.add = async (req) => {
  let data = {
    name: req.body.name,
    short_description: req.body.short_description,
    date_time: req.body.date_time,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let resp = await Task.create(data);
  return resp;
};

taskService.delete = async (id) => {
  return Task.destroy({ where: { id: id } });
};

taskService.findAndUpdate = async (id, req) => {
  let updateData = {
    name: req.body.name,
    short_description: req.body.short_description,
    date_time: req.body.date_time,
    updatedAt: new Date(),
  };
  let user = await Task.update(updateData, { where: { id: id } });
  return user;
};

module.exports = taskService;
