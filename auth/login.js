const { response } = require('express');
const user = require('../models/user');
const login = (data) =>{
    return new Promise((resolve , reject) => {
        user.findOne({emailid: data.emailid}).then((resp) =>{
            if(resp){
                if(resp.password == data.password){
                    resolve({
                        status : true,
                        message: 'ok',
                        response :'',
                        userid:data.emailid,
                        username:resp.firstname
                    })
                }
                else{
                    resolve({
                        status : true,
                        message:'password incorrect',
                        response:''
                    })
                }
            }
            else{
                resolve({
                    status:true,
                    message:'user doesnot have account',
                    response : ''
                })
            }
        }).catch((err) => {
            resolve({
                status :false,
                message :'error in db',
                response: ''
            })
           
        })
    })
}

module.exports = {login:login}