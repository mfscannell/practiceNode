var users = require('../data/users');
/*
 * GET home page.
 */
module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', {title: 'Express Revised'})
    });

    app.get('/users', function(req, res) {
        res.render('users/index', {title: 'Users', users: users});
    });

    app.get('/users/new', function(req, res) {
        res.render('users/new', {title: "New User"});
    });

    app.get('/users/:name', function(req, res, next) {
        var user;

        for (var i = 0; i < users.length; i++) {
            if (req.params.name == users[i].username) {
                user = users[i];
                break;
            }
        }

        if (user) {
            res.render('users/profile', {title: 'User profile', user: user});
        } else {
            next();
        }
    });

    app.post('/users', function(req, res) {
        if (users[req.body.username]) {
            res.send('Conflict', 409);
        } else {
            users[req.body.username] = req.body;
            res.redirect('/users');
        }
    });

    app.del('/users/:name', function(req, res, next) {
        console.log('delete name');
        console.log(req.params.name);
        var indexOfName;

        for (var i = 0; i < users.length; i++) {
            if (req.params.name == users[i].username) {
                indexOfName = i;
                break;
            }
        }

        if (indexOfName) {
            users.splice(indexOfName, 1);
            res.redirect('/users');
        } else {
            next();
        }
    });
};
