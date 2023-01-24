
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {

    }
    Task.init({
        name: DataTypes.STRING,
        short_description : DataTypes.TEXT,
        date_time : DataTypes.DATE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,

    }, {
        sequelize,
        modelName: 'Task',
        tableName: 'tasks'
    });
    return Task;
};