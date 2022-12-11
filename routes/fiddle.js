const express = require('express');
const router = express.Router();
const fiddleModel = require('../models/fiddle');
const {v4:uuidv4} =  require('uuid');
const {c, cpp, node, python, java} = require('compile-run');
/*
fiddles/:fiddleid - GET
fiddles/user/:userid - GET
fiddles/ - POST
fiddles/ - PUT
fiddles/:fiddleid - DELETE
*/

// router.get('/get-fiddle-data/:fiddleid',(req,res)=>{
//     fiddleModel.findOne({fiddleid: req.params.fiddleid}).then((doc)=>{
//         res.json({error:false, response: doc});
//     }).catch((err)=>{
//         console.log(err);
//     })
// });
router.get('/get-fiddle-data/:userid/:challengeid',(req,res)=>{
    fiddleModel.findOne({userid: req.params.userid,challengeid:req.params.challengeid}).then((doc)=>{
        res.json({error:false, response: doc});
    }).catch((err)=>{
        console.log(err);
    })
});

router.get('/get-fiddles/:userid',(req,res)=>{
    fiddleModel.find({userid: req.params.userid}).then((docs)=>{
        res.json({error:false, response:docs});
    }).catch((err)=>{
        console.log(err);
    })
})

router.post('/save-fiddle', (req,res)=>{
    let fiddleObj = req.body;
    console.log(req.body);
    fiddleObj['fiddleid'] = uuidv4();
    let newFiddle = new fiddleModel(fiddleObj);
    newFiddle.save().then((doc)=>{
        res.json({error:false, response: doc});
    }).catch((err)=>{
        console.log(err);
    })
})
router.post('/execute',(req,res)=>{
    let reqObj = req.body;
    // reqObj['clientId'] = "9ab06225b696debb376ad4f66e8a695f";
    // reqObj['clientSecret'] = "733286d05a28f6d793029bf5c48cfe1388c7e1b220dd58b73438b686f84d7a91";
    // axios.post('https://api.jdoodle.com/v1/execute', reqObj).then((resp)=>{
    //     res.json({error:false, response: resp.data});
    // }).catch((err)=>{
    //     console.log(err);
    // });
    console.log(req.body);
    let resultPromise = python.runSource(reqObj.script,{stdin: reqObj.stdin});
    resultPromise
        .then(result => {
            console.log(result);
            res.send(result);//result object
        })
        .catch(err => {
            console.log(err);
        });
})

router.put('/save-fiddle/:fiddleid', (req,res)=>{
    fiddleModel.updateOne({fiddleid: req.body.fiddleid}, req.body).then((_)=>{
        res.json({error:false});
    }).catch((err)=>{
        console.log(err);
    })
})

router.delete('/delete-fiddle/:fiddleid',(req,res)=>{
    fiddleModel.deleteOne({fiddleid: req.params.fiddleid}).then((_)=>{
        res.json({error:false});
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;
