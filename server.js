const express = require('express');
const app = express();
const pg = require('pg');
const db = require('./db');
const nunjucks = require('nunjucks');
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure({ noCache: true });
app.use((req, res, next) => {
    res.locals.path = req.url;
    next();
});

app.use(require('method-override')('_method'));
app.use(require('body-parser').urlencoded());
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listing on ${port}`);
});



app.use('/', require('./routes'))

db.sync()
    .then(() => {
        db.seed()
    })


module.exports = app;