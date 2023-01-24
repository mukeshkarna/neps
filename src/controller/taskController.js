const { isEmpty } = require("lodash");
const { validationResult } = require("express-validator");
const { taskService } = require("../services");
const moment = require("moment");
let { Op } = require("sequelize");

let taskController = {
  index: async (req, res) => {
    try {
      return res.render("task/index");
    } catch (error) {
      req.flash("error_msg", "something went wrong");
    }
  },

  addView: async (req, res) => {
    try {
      res.render("task/create");
    } catch (error) {
      req.flash("error_msg", "something went wrong");

    }
  },

  add: async (req, res, fn) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("errors", errors.mapped());
      req.flash("inputData", req.body);
      return res.redirect("back");
    }
    try {
      await taskService.add(req);
      req.flash("success_msg", "Task added successfully.");
      return res.redirect("/task");
    } catch (error) {
      req.flash("error_msg", "Something went wrong.");

    }
  },

  editView: async (req, res) => {
    try {
      let taskId = req.params.id;
      let query = { where: { id: taskId } };
      const task = await taskService.findOne(query);
      if (!task) {
        req.flash("error_msg", "Data not found");
      return res.redirect("back");
      }
      return res.render("task/edit", {
        task,
        moment,
      });
    } catch (e) {
      req.flash("error_msg", "something went wrong");

    }
  },

  edit: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("errors", errors.mapped());
      req.flash("inputData", req.body);
      return res.redirect("/task/" + req.params.id);
    }
    try {
      let id = req.params.id;
      let query = { where: { id: id } };
      const task = await taskService.findOne(query);
      if (!task) {
        req.flash("error_msg", "Data not found");
      return res.redirect("back");
      }
      await taskService.findAndUpdate(id, req);
      req.flash("success_msg", "Task updated successfully");
      return res.redirect("/task");
    } catch (error) {
      req.flash("error_msg", error);

    }
  },

  delete: async (req, res) => {
    try {
      let id = req.params.id;
      let task = await taskService.findOne({ where: { id: id } });
      await taskService.delete(id);

      req.flash("success_msg", "Task deleted successfully.");
      return res.redirect("/task");
    } catch (error) {
      req.flash("error_msg", "Something went wrong while deleting task");
      return res.redirect("back");
    }
  },

  filter: async (req, res) => {
    let data = {
      tasks: [],
    };
    try {
      const filterQuery = await buildFilterQuery(req);
      let query = {
        where: filterQuery,
        order: [["id", "DESC"]],
      };
      let tasks = await taskService.findAll(query);
      data["tasks"] = tasks;
      return res.json(data);
    } catch (error) {
      
    }
  },
};

module.exports = taskController;

const buildFilterQuery = (req) => {
  let filter = {};
  const { query } = req;
  if (!query) {
    return filter;
  }
  if (query.data == "up_comming") {
    filter["date_time"] = {
      [Op.gte]: new Date(new Date),
    };
  }
  if (query.data == "done") {
    filter["date_time"] = {
      [Op.lte]: new Date(new Date),
    };
  }
  return filter;
};
