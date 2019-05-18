const mongoose = require('mongoose');


    var Employee = mongoose.model('Employee', {
        f_name: { type: String },
        l_name: { type: String },
        email: { type: String },
        phone: { type: Number }
    
});

module.exports = {Employee} 
