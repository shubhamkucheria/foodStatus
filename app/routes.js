var Food = require('./models/food');

function getFoods(res) {
    Food.find(function (err, food) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(food); // return all food in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all food
    app.get('/api/food', function (req, res) {
        // use mongoose to get all food in the database
        getFoods(res);
    });


    //update food
    app.post('/api/Updatefood', function (req, res) {

    Food.update({
            "_id": req.body._id}
            ,{
                text: req.body.text,
                quantity: req.body.quantity,
                createdTillNow: req.body.createdTillNow,
                predicted: req.body.predicted,
                status: req.body.status,
                done: false
        }, function (err, food) {
            if (err)
                res.send(err);
            getFoods(res);
        });
    });

    // create food and send back all food after creation
    app.post('/api/food', function (req, res) {

        Food.create({
            text: req.body.text,
            quantity: req.body.quantity,
            createdTillNow: req.body.createdTillNow,
            predicted: req.body.predicted,
            status: req.body.status,
            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the food after you create another
            getFoods(res);
        });
    });

    // delete a food
    app.delete('/api/food/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFoods(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
