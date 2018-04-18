var express = require('express');
var router = express.Router();

// index
router.get('/', function(req, res, next) {

    var db = req.con;
    var data = "";
    var user = req.query.user;
    var filter = "";
    if (user) {
        filter = 'WHERE userid = ?';
    }
    db.query('SELECT * FROM test ' + filter, user, function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;
        // use index.ejs
        res.render('index', { title: 'Account Information', data: data, user: user });
    });
});

// add page
router.get('/add', function(req, res, next) {
    res.render('userAdd', { title: 'Add User', msg: '' });
});

// add post
router.post('/userAdd', function(req, res, next) {
    var db = req.con;
    // 检查userid是否存在
    var userid = req.body.userid;
    var qur = db.query('SELECT userid FROM test WHERE userid = ?', userid, function(err, rows) {
        if (err) {
            console.log(err);
        }
        var count = rows.length;
        if (count > 0) {
            var msg = 'Userid already exists.';
            res.render('userAdd', { title: 'Add User', msg: msg });
        } else {
            var sql = {
                userid: req.body.userid,
                password: req.body.password,
                email: req.body.email
            };
            var qur = db.query('INSERT INTO test SET ?', sql, function(err, rows) {
                if (err) {
                    console.log(err);
                }
                res.setHeader('Content-Type', 'application/json');
                res.redirect('/');
            });
        }
    });
});

// edit page
router.get('/userEdit', function(req, res, next) {
    var id = req.query.id;
    var db = req.con;
    var data = "";
    db.query('SELECT * FROM test WHERE id = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;
        res.render('userEdit', { title: 'Edit Account', data: data });
    });
});

router.post('/userEdit', function(req, res, next) {
    var db = req.con;
    var id = req.body.id;
    var sql = {
        userid: req.body.userid,
        password: req.body.password,
        email: req.body.email
    };
    var qur = db.query('UPDATE test SET ? WHERE id = ?', [sql, id], function(err, rows) {
        if (err) {
            console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/');
    });

});

router.get('/userDelete', function(req, res, next) {
    var id = req.query.id;
    var db = req.con;
    var qur = db.query('DELETE FROM test WHERE id = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
