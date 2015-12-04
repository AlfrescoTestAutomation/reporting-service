var TestlinkConnect = require("testlink-connect");
var config = require('../config')
module.exports = {
    getTestPlan:function(json, callback){
        var planid
        if(json == null){
            throw new Error('Project name is required')
        }
        if(json.projectname == null || json.projectname.length === 0){
            throw new Error('Project name is required')
        }
        if(json.testplanid == null || json.testplanid.length === 0){
            if(json.testplanname == null | json.testplanname.length === 0){
                throw new Error('Test plan name is required')
            } else {
                module.exports.getTestPlanId(json.testplannameq, function(res){
                    planid = res
                })
            }
        }
        var testlink = new TestlinkConnect(config.testlink.key, config.testlink.url)
        var obj = {
            'testprojectname':'AlfrescoOne',
            // 'testplanname':'Ent5.1-ManualRegressionVFOn',
            'testplanid' : '927183'
        };
        testlink.getTotalsForTestPlan(obj,function(res){
            var result = {
                'NotRun' : res.struct._n.exec_qty,
                'Passed' : res.struct._p.exec_qty,
                'Failed' : res.struct._f.exec_qty,
                'Blocked' :res.struct._b.exec_qty
            }
            callback(result)
        });

    },
    getTestPlanId : function(name,callback){
        var obj = {
            'testprojectname':'AlfrescoOne',
            'testplanname':name
        };
        var testlink = new TestlinkConnect(config.testlink.key, config.testlink.url)
        testlink.getTestPlanByName(obj,function(res){
            callback(res)
        })
    }
}
