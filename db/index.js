const db = require('./conn');
const Employee = require('./employee')
const Sequelize = require('sequelize');
const express = require('express');
const app = express();


const sync = () => {
    return db.sync({ force: true })
};

const seed = () => {
    return Promise.all([
        Employee.create({ firstName: 'aa', lastName: 'bbb', nickName: 'hhh' }),
        Employee.create({ firstName: 'dd', lastName: 'ccc', nickName: 'jjj' })
    ])

};






module.exports = {
    sync,
    seed,
    app,
    models: {
        Employee
    }
}