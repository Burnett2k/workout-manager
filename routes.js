// app/routes.js
// grab the nerd model we just created
var Wod = require('./models/wod');
var WodLog = require('./models/wodlog');

    module.exports = function(app) {

        app.get('/api/wods', function(req, res) {
            // use mongoose to get all wods in the database
            Wod.find(function(err, wods) {

                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(wods); // return all wods in JSON format
            });
        });

        // route to handle creating goes here (app.post)
        app.post('/api/wods', function (req, res) {

            var wod = new Wod();
            wod.name = req.body.name;
            wod.description = req.body.description;
            wod.imgs = req.body.imgs;
            console.log('wod = ' + wod);

            wod.save(function(err, wod) {
                if (err) return console.error(err);

                res.json({ message: 'wod created!'});
            });

        });

        app.post('/api/wods/:wod_id', function(req, res) {

            Wod.update({ _id:req.params.wod_id}, { $set: {imgs: req.body.imgs}}, function(error, wod) {
                console.log("updated!")
                res.json(wod);
            });

        });

        // route to handle delete goes here (app.delete)
        app.delete('/api/wods/:wod_id', function(req, res) {
            Wod.remove({
                _id: req.params.wod_id}, function(err,bear) {
                if (err)
                    res.send(err);

                res.json({ message: 'successfully deleted'});
            });

        });

        app.get('/api/wodlogs', function(req, res) {
            // use mongoose to get all wodlogs in the database

            var begDate = req.query.begDate;
            var endDate = req.query.endDate;

            WodLog.find(
            {
                "timeCompleted" : 
                {
                    "$gte": begDate, "$lte": endDate
                }
            },function(err, wodlogs) {

                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(wodlogs); // return all wodlogs in JSON format
            });
        });

        // route to handle creating goes here (app.post)
        app.post('/api/wodlogs', function (req, res) {

            var wodlog = new WodLog();
            wodlog.wodId = req.body.wodId
            wodlog.wodName = req.body.wodName;
            wodlog.timeCompleted = req.body.timeCompleted;

            console.log('created wodlog = ' + wodlog);

            wodlog.save(function(err, wodlog) {
                if (err) return console.error(err);

                res.json({ wodLog: wodlog});
            });

        });

        // route to handle delete goes here (app.delete)
        app.delete('/api/wodlogs/:wodlog_id', function(req, res) {
            console.log("made it into routes.js logging");

            console.log(req.params.wodlog_id);

            WodLog.remove({
                _id: req.params.wodlog_id}, function(err,bear) {
                if (err)
                    res.send(err);

                res.json({ message: 'successfully deleted'});
            });

        });

        // frontend routes =========================================================
        // route to handle all angular requests
        // NOTE: you need to place other HTTP requests above this since this is a catch all and will
        // re-route all your requests to the home page.
        app.get('*', function(req, res) {
            console.log("serving up view index.html");
            res.sendFile('/public/index.html', { root : __dirname}); // load our public/index.html file
        });

    };
