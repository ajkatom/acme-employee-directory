const app = require('express').Router();
const Sequelize = require('sequelize');
const db = require('../db');
const { Employee } = db.models;
app.use(require('method-override')('_method'));
app.use(require('body-parser').urlencoded());

// const path = require('path');
app.use((req, res, next) => {
    let employeesCount, nickCount;
    Employee.findAll()
        .then(employees => {
            console.log(employees)
            employeesCount = employees.length;
            nickCount = employees.reduce((total, employee) => {
                if (employee.nickName) {
                    return total += employee.nickName.length;
                }
                return total;
            }, 0)
            res.locals.employeesCount = employeesCount;
            res.locals.nickCount = nickCount;
            next();
        })

    .catch(next);
});


app.get('/', (req, res, next) => {
    res.render('index', { title: 'WELCOME TO YOUR PERSONAL HELL' });
})
app.get('/employees', (req, res, next) => {
    Employee.findAll()
        .then(employees => res.render('employees', { employees }))
        .catch(next);

});
app.get('/employees/:id', (req, res, next) => {
    Employee.findById(req.params.id)
        .then(employee => res.render('employee', { employee }))
        .catch(() => res.redirect('/error'));
});

app.post('/employees', (req, res, next) => {
    Employee.create(req.body)
        .then((employee => res.redirect('/employees')))
        .catch(() => res.redirect('/error'));
});

app.delete('/employees/:id', (req, res, next) => {
    Employee.findById(req.params.id)
        .then(employee => employee.destroy())
        .then(() => res.redirect('/employees'))
        .catch(() => res.redirect('/error'));
});

app.patch('/employees/:id', (req, res, next) => {
    Employee.findById(req.params.id)
        .then(employee => {
            employee.firstName = req.body.firstName;
            employee.lastName = req.body.lastName;
            employee.nickName = req.body.nickName;
            return employee.save();
        })
        .then(() => res.redirect('/employees'))
        .catch(() => {
            res.status(404);
            res.redirect('/error')
        });

});


module.exports = app;