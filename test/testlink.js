var assert = require('assert')
var expect = require('expect')
var should = require('should')
var testlink = require('../reports/testlink')

var data = {
    'NotRun' : 0,
    'Passed' : 207,
    'Failed' : 8,
    'Blocked' :4
}
it('Should get testplan id', function(done){
    var json = {'project':'AlfrescoOne','testplan' : 'Ent5.1-ManualRegressionVFOn'}
    testlink.getTestPlanId(json, function(result){
        should.equal('927183', result)
        done()
    })
})
it('Should throw an error if project name is not provided', function(done){
    var json = {"testplanid" : "boo"}
    assert.throws(function(){testlink.getTestPlan(json)}, Error)
    done()
})
it('Should throw an error if testplan name is not provided', function(done){
    var json = { 'project':'AlfrescoOne', 'testplanid' : ''}
    assert.throws(function(){testlink.getTestPlan(json)}, Error)
    done()
})
it('should display information relating to the test plan execution', function(done){
    var json = { 'project':'AlfrescoOne', 'testplanid' : '927183'}
    testlink.getTestPlan(json,function(callback){
        expect(data).toEqual(callback)
        done()
    })
})
it('should get a collection of test plans from project name', function(done){
    var json = { 'testprojectid':'460141'}
    testlink.getProjectTestPlans(json,function(response){
        console.log(response[0])
        response[0].struct.should.have.property('name')
        response[0].struct.should.have.property('id')
        done()
    })
})
