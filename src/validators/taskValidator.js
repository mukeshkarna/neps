const { checkSchema } = require('express-validator');

const { Task } = require('../models');
let { Op } = require("sequelize");
let dateTimeRegex=/^([0-2][0-9]{3})\-(0[1-9]|1[0-2])\-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-3]):([0-5][0-9])\:([0-5][0-9])( ([\-\+]([0-1][0-9])\:00))?$/ ;

let taskValidator = checkSchema({
    'name': {
        isLength: {
            errorMessage: 'Name is required',
            options: { min: 1 }
        },
        custom: {
            options: (value, { req }) => {
                if (value.length > 50) {
                    throw new Error('Name must be less than 50 characters', 'title', 412);
                }
                let isEdit = req.params && req.params.id ? true : false;
                return new Promise( (resolve, reject) => {
                    let whereCondition = {name:value};
                    if (isEdit) {
                        whereCondition = {name:value, 'id': {[Op.ne]: req.params.id}};
                    }
                    Task.findOne({where:whereCondition}).then(Task => {
                        if(Task === null) {
                            resolve(true);
                        } else {
                            reject('Name already exists');
                        }
                    }).catch(() => {
                        resolve(true);
                    });
                });
            }
        }
    },
    'short_description': {
        isLength: {
            errorMessage: 'Short Description is required',
            options: { min: 1 }
        },
        custom: {
            options: (value, { req }) => {
                if (value.length > 500) {
                    throw new Error('Short Description must be less than 500 characters', 'title', 412);
                }
                let isEdit = req.params && req.params.id ? true : false;
                return new Promise( (resolve, reject) => {
                    let whereCondition = {short_description:value};
                    if (isEdit) {
                        whereCondition = {short_description:value, 'id': {[Op.ne]: req.params.id}};
                    }
                    Task.findOne({where:whereCondition}).then(Task => {
                        if(Task === null) {
                            resolve(true);
                        } else {
                            reject('Short Description already exists');
                        }
                    }).catch(() => {
                        resolve(true);
                    });
                });
            }
        }
    },

    'date_time': {
        isLength: {
            errorMessage: 'Date Time is required',
            options: { min: 1 }
        },
        custom: {
            options: (value, { req }) => {
                let time = value.match(dateTimeRegex);
                return new Promise( (resolve, reject) => {
                    if(time) {
                        resolve(true);
                    } else {
                        reject('Invalid Date Time Format');
                    }
                });
            }
        }
    }
});



module.exports = {taskValidator};