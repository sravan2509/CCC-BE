const user = require('../models/user');

function signup(data){
    return new Promise((resolve,reject) =>{
        user.findOne({emailid: data.emailid}).then((resp) => {
            if(resp){
                resolve({
                    status : true,
                    message:'account exist',
                    response:''
                })
            }
            else {
                var userdetails = new user();
                userdetails.firstname = data.name;
                userdetails.emailid = data.emailid;
                userdetails.password = data.password;
                userdetails.save(function (err, dbresp) {
                    if (err) {
                        resolve({
                            status: false,
                            message: 'error in db',
                            response: ''
                        })
                    }
                    else {
                        resolve({
                            status: true,
                            message: '',
                            response: '',
                            userid: data.emailid
                        })
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    })
}

module.exports = {
    signup: signup
}