const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 3000
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

  app.get('/users', db.getUsers)
  app.get('/users/:id', db.getUserById)
  app.post('/users', db.createUser)
  app.put('/users/:id', db.updateUser)
  app.delete('/users/:id', db.deleteUser)


  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

  passport.use(new LocalStrategy(
    function(username, password, done) {
        //verifies name and password
    }
));

function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    } else {
        return res.status(403).json({ message: 'Permission denied' });
    }
}

app.post('/users', [
    // adds validation rules
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    // Processes the request
});
app.use(helmet());