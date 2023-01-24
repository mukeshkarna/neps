'use strict';

const bcrypt = require('bcrypt');

const { User } = require('../../models');

const UserNotFoundException = require('./UserNotFoundException');

let userService = {};

userService.create = async body => {
  const { username, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, email, password: hashedPassword });
};

userService.getUsers = async pagination => {
  const { page, size } = pagination;

  const usersWithCount = await User.findAndCountAll({
    limit: size,
    offset: page * size,
    attributes: ['id', 'username', 'email'],
  });
  return {
    content: usersWithCount.rows,
    totalPages: Math.ceil(usersWithCount.count / Number.parseInt(size)),
  };
};

userService.getUser = async id => {
  const user = await User.findOne({
    where: { id: id },
    attributes: ['id', 'username', 'email'],
  });
  if (!user) {
    throw new UserNotFoundException();
  }
  return user;
};

userService.findByEmail = async email => {
  return await User.findOne({ where: { email: email } });
};

userService.findAll = async query => {
  try {
    let data = await User.findAll({
      where: query.where,
      order: query.order,
    });
    return data;
  } catch (e) {}
};

userService.count = async query => {
  let resp = await User.count(query);
  return resp;
};

userService.findOne = async query => {
  let resp = await User.findOne(query);
  return resp;
};

userService.add = async req => {
  let data = {
    name: req.body.name,
    short_description: req.body.short_description,
    date_time: req.body.date_time,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let resp = await User.create(data);
  return resp;
};

userService.delete = async id => {
  return User.destroy({ where: { id: id } });
};

userService.findAndUpdate = async (id, req) => {
  let updateData = {
    name: req.body.name,
    short_description: req.body.short_description,
    date_time: req.body.date_time,
    updatedAt: new Date(),
  };
  let user = await User.update(updateData, { where: { id: id } });
  return user;
};

module.exports = userService;
