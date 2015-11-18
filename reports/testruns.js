var config = require('../config')
var db = require('mongoskin').db(config.mongo)
var testruns = db.collection('testruns').ensureIndex({name:1}, {unique:true},function(err,res){})
module.exports ={
    create : function(req,res){
        var data = module.exports.parseTestRun(req,function(err,result){
            if(err){
                res.send({error:true, msg : err})
                return
            }
        })
        testruns.save(
            data,{},function(error,result){
                if(error){
                    res.send({error:true, msg : error.message})
                    return
                }
                res.send({error:false});
            })
    },
    get:function(req,res){
        var name = req.params.name
        testruns.findOne({"name":name}, function(err,result){
                if(err){
                    res.send({error:true,msg:err.err})
                    return
                }
                res.send(result)
            })
    },
    delete: function(req,res){
        var name = req.params.name
        testruns.remove({"name":name},function(err,result){
            res.send({error:false})
        })
    },
    update: function(req,res){
        var data = module.exports.parseTestRun(req,function(err){
            if(err){
                res.send({error:true, msg : err})
                return
            }
        })
        var query = { "name" : data.name, "state" : "ready" }

        testruns.update(query, data, { upsert: true }, function(err, result){
            if(err){
                res.send({error:true,msg:err.err})
                return
            }
            res.send(data)
        })
    },

    parseTestRun: function(req,callback){
        var name = req.body.name
        var startDate = req.body.startDate
        if(startDate == undefined){
            callback(new Error("Start date is required"))
        }
        var endDate = req.body.endDate
        if(endDate == undefined){
            callback(new Error("End date is required"))
        }
        var targetDate = req.body.targetDate
        var tc = req.body.tc
        if(tc == undefined || tc <=0 ){
            callback(new Error('Valid test case count is required'))
        }
        var data =
            {"name":name,
            "startDate":startDate,
            "endDate": endDate,
            "tc" : tc,
            "state": "ready", // the 3 states completed, started, ready
            "entries":[]
            }
            if(targetDate !== undefined && targetDate !== null){
                data.targetDate = targetDate
            }
        return data
    }

}
