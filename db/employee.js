const db = require('./conn');
const Sequelize = require('sequelize');
const express = require('express');
const app = express();




const Employee = db.define('employee', {
    lastName: Sequelize.STRING,
    firstName: Sequelize.STRING,
    nickName: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        set: function(nicknames) {
            if (!nicknames) nicknames = [];
            if (!Array.isArray(nicknames)) {
                let nk = nicknames.split(',');
                this.setDataValue('nickName', nk);

            } else {
                this.setDataValue('nickName', nicknames);

            }
        }
    }
}, {
    getterMethods: {
        Fullname: function() {
            return `${ this.firstName } ${ this.lastName }`;
        }

    }


});


module.exports = Employee;