const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');


// => localhost:3000/employee/
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : ${req.params.id}' );
    
    Employee.findById(req.params.id, (err, doc) => {
            if(!err) {res.send(doc);}
            else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2));}
    });
    
});


router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.f_name,
        position: req.body.l_name,
        office: req.body.email,
        salary: req.body.phone,
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}' ); 

    var emp = {
        name: req.body.f_name,
        position: req.body.l_name,
        office: req.body.email,
        salary: req.body.phone,
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err,doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    } );
});



router.delete('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');

    Employee.findByIdAndDelete(req.params.id, (err,doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    } );
});

module.exports = router;