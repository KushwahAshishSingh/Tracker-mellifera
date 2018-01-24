/*
Main routes
*/

const ObjectId = require('mongodb').ObjectID;
//const BarCode_Info = require('mongodb').BarCode_Info;



module.exports = function(app, db) {
    app.post('/Tracker_Insert', (req, res) => {
        const errors = validateTrack(req);
    console.log(req.body);
    console.log(errors);
    if (errors.length) {
        return res.send({errors: errors});
    }

    const Track = {
        Width_in_MM: req.body.Width_in_MM,
        Length_in_MM: req.body.Length_in_MM,
        No_of_FINS: req.body.No_of_FINS,
        Order_Qty: req.body.Order_Qty,
        JOB_No: req.body.JOB_No,
        BarCode_Info: req.body.BarCode_Info
    };

    db.collection('Tracker').insert(Track, (err, result) => {
        if(err) {
            res.send({error: 'An error has occurred'});
            res.writeHead(400,{'Content-Type': 'application/json'});
        }   else {
            res.send(result.ops[0]);
    res.writeHead(201,{'Content-Type': 'application/json'});
}
});
});



    // Update Collection
    app.post('/Update', (req, res, next) => {

        const Track = {
            // Width_in_MM: req.body.Width_in_MM,
            // Length_in_MM: req.body.Length_in_MM,
            // No_of_FINS: req.body.No_of_FINS,
            // Order_Qty: req.body.Order_Qty,
            // JOB_No: req.body.JOB_No,
            BarCode_Info: req.body.BarCode_Info,
            Comment: req.body.Comment
        };
    const BarCode_Info = req.body.BarCode_Info

    db.collection('Tracker').findOneAndUpdate({BarCode_Info: BarCode_Info}, {$set: Track}, function (err, result) {
        if (err) {
            res.send({error: 'An error has occurred'});
            res.writeHead(400,{'Content-Type': 'application/json'});
        } else {
            console.log('updated');
            res.send(result);
            res.writeHead(200,{'Content-Type': 'application/json'});
        }
    });
});


    app.get('/Find/:BarCode_Info', (req, res) => {

        const resultArray = [];
    const BarCode_Info = req.params.BarCode_Info;

    var Results = db.collection('Tracker').find(
        {BarCode_Info: BarCode_Info});
    Results.toArray(function(err, result) {
        resultArray.push(result);

        if (result) {
            res.send(resultArray);
            //       res.writeHead(200,{'Content-Type': 'application/json'});
        } else {
            res.send({err: 'not in our database'});
            res.writeHead(204,{'Content-Type': 'application/json'});
        }
    });
});


//
//
//     app.post('/Find', (req, res) => {
//
//         const resultArray = [];
//     const BarCode_Info = req.body.BarCode_Info;
//
//
//     var Results = db.collection('Tracker').find(
//          {BarCode_Info: BarCode_Info}
//
//             );
//     Results.toArray(function(error, docs) {
//         resultArray.push(docs);
//
//         if (docs) {
//             res.send(resultArray);
//             res.writeHead(200,{'Content-Type': 'application/json'});
//         } else {
//             res.send({error: 'not in our database'});
//             res.writeHead(204,{'Content-Type': 'application/json'});
//         }
//     });
// });

};


function validateTrack(req) {

    const errors = [];
    if (!req.body.Width_in_MM) {
        errors.push({
            field: 'Width_in_MM',
            message: 'Width_in_MM is required'
        });
    }

    if (!req.body.Length_in_MM) {
        errors.push({
            field: 'Length_in_MM',
            message: 'Length_in_MM is required'
        });
    }

    if (!req.body.No_of_FINS) {
        errors.push({
            field: 'No_of_FINS',
            message: 'No_of_FINS is required'
        });
    }

    if (!req.body.Order_Qty) {
        errors.push({
            field: 'Order_Qty',
            message: 'Order_Qty is required'
        });
    }

    if (!req.body.JOB_No) {
        errors.push({
            field: 'JOB_No',
            message: 'JOB_No is required'
        });
    }

    if (!req.body.BarCode_Info) {
        errors.push({
            field: 'BarCode_Info',
            message: 'BarCode_Info is required'
        });
    }
    return errors;
}


