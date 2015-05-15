/**
 * Created by pawan on 2/10/2015.
 */

var restify = require('restify');
var sre = require('swagger-restify-express');
var context=require('./SIPUserEndpointService.js');
var UACCreate=require('./CreateSipUACrec.js');
var Extmgt=require('./ExtensionManagementAPI.js');
var UACUpdate=require('./UpdateSipUserData.js');
//var Schedule=require('./ScheduleApi.js');
var group=require('./SipUserGroupManagement.js');
var messageFormatter = require('DVP-Common/CommonMessageGenerator/ClientMessageJsonFormatter.js');
var config = require('config');
var logger = require('DVP-Common/LogHandler/CommonLogHandler.js').logger;

var port = config.Host.port || 3000;
var version=config.Host.version;


var RestServer = restify.createServer({
    name: "myapp",
    version: '1.0.0'
});
//Server listen

//Enable request body parsing(access)
RestServer.use(restify.bodyParser());
RestServer.use(restify.acceptParser(RestServer.acceptable));
RestServer.use(restify.queryParser());

RestServer.listen(port, function () {
    console.log('%s listening at %s', RestServer.name, RestServer.url);
});
//Tested :- Done
//.......................................................................................................................

RestServer.post('/dvp/'+version+'/context_mgmt/save_contextdata',function(req,res,next)
{
    try {
        context.AddOrUpdateContext(req, function (err, resz) {

            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end(resz.Context.toString());

            }

        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();

});

//Tested :- Done
//.......................................................................................................................

RestServer.post('/dvp/'+version+'/uac_mgmt/save_uac',function(req,res,next)
{
    try {
        UACCreate.SaveSip(req, function (err, resz) {
            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end(JSON.stringify(resz));
            }

        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();
});

//Tested :- Done
//.......................................................................................................................

RestServer.post('/dvp/'+version+'/uac_mgmt/updt_uac',function(req,res,next)
{
    try {
        UACUpdate.UpdateUacUserData(req.body, function (err, resz) {
            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end(JSON.stringify(resz));
            }

        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();

});

//Tested :- Done
//.......................................................................................................................

RestServer.post('/dvp/'+version+'/ext_mgmt/update_extension_st/:ref/:st',function(req,res,next)
{
    try {
        Extmgt.ChangeAvailability(req, function (err, resz) {
            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end(JSON.stringify(resz));
            }


        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();
});
//Tested :- Done
//.......................................................................................................................

RestServer.post('/dvp/'+version+'/ext_mgmt/add_extension',function(req,res,next)
{
    try {
        Extmgt.AddExtension(req.body, function (err, resz) {
            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end("1");
            }


        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();

});
//.......................................................................................................................

RestServer.post('/dvp/'+version+'/ext_mgmt/map_extension',function(req,res,next)
{
    try {
        Extmgt.MapWithSipUacEndpoint(req.body, function (err, resz) {
            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end(JSON.stringify(resz));
            }
        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();


});

RestServer.post('/dvp/'+version+'/ext_mgmt/map_extension_group',function(req,res,next)
{
    try {
        Extmgt.MapwithGroup(req.body, function (err, resz) {
            if(err)
            {
                res.end("err");
            }
            else
            {
                res.end(JSON.stringify(resz));
            }
        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();


});

//Tested :- Done
//.......................................................................................................................

RestServer.post('/dvp/'+version+'/sipgroup_mgt/sipuser_group/add_sipuser_group',function(req,res,next)
{
    try {
        group.AddSipUserGroup(req.body, function (err, resz) {
            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end(resz.GroupName.toString());
            }
        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();

});
//Tested :- Done
//.......................................................................................................................
/*
RestServer.post('/dvp/:version/sipgroup_mgt/sipuser_group/map_extensionid',function(req,res,next)
{
    try {
        group.MapExtensionID(req.body, function (err, resz) {
            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end(JSON.stringify(resz));
            }
        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();

});*/
//Tested :- Done
//.......................................................................................................................

RestServer.post('/dvp/'+version+'/sipgroup_mgt/sipuser_group/fill_usrgrp',function(req,res,next)
{
    try {
        group.FillUsrGrp(req.body, function (err, resz) {
            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end(JSON.stringify(resz));
            }
        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();

});
//Tested :- Done
//.......................................................................................................................

RestServer.post('/dvp/'+version+'/sipgroup_mgt/sipuser_group/update_sipuser_group',function(req,res,next)
{
    try {
        group.UpdateSipUserGroup(req.body, function (err, res) {
            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end(JSON.stringify(resz));
            }
        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();

});

//.......................................................................................................................
/*
 RestServer.post('/dvp/:version/scheduleapi/add_schedule',function(req,res,err)
 {
 Schedule.AddSchedule(req,res,err);
 });
 //.......................................................................................................................

 RestServer.post('/dvp/:version/scheduleapi/updt_scheduledata',function(req,res,err)
 {
 Schedule.UpdateScheduleData(req.body);
 });
 //.......................................................................................................................

 RestServer.post('/dvp/:version/scheduleapi/add_appdata',function(req,res,err)
 {
 Schedule.UpdateAppoinmentData(req.body);
 });
 //.......................................................................................................................

 RestServer.post('/dvp/:version/scheduleapi/update_sch_id_app',function(req,res,err)
 {
 Schedule.UpdateScheduleIDAppointment(req.body);
 });
 //.......................................................................................................................

 RestServer.post('/dvp/:version/scheduleapi/update_sch_id',function(req,res,err)
 {
 Schedule.UpdateScheduleID(req.body);
 });

 */

//Tested :- Done
//.......................................................................................................................

RestServer.get('/dvp/'+version+'/uac_mgmt/find_context/:cmpid',function(req,res,next)
{
    try {
        context.GetContextDetails(req.params.cmpid, function (err, resz) {
            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end(JSON.stringify(resz));
            }
        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();


});

//Tested :- Done
//.......................................................................................................................

RestServer.get('/dvp/'+version+'/sipgroup_mgt/sipuser_group/get_group_data/:name',function(req,res,next)
{
    try {
        group.GetGroupData(req.params.name, function (err, resz) {
            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end(JSON.stringify(resz));
            }
        });

    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();


});
//.......................................................................................................................

RestServer.get('/dvp/'+version+'/sipgroup_mgt/sipuser_group/get_group_endpoints/:GID',function(req,res,next)
{
    try {
        group.GetGroupEndpoints(req.params.GID, function (err, resz) {
            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end(JSON.stringify(resz));
            }
        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();

});

//.......................................................................................................................

RestServer.get('/dvp/'+version+'/sipgroup_mgt/sipuser_group/endpoint_groupid/:EID',function(req,res,next)
{
    try {
        group.EndpointGroupID(req.params.EID, function (err, resz) {
            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end(JSON.stringify(resz));
            }
        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();
});

//.......................................................................................................................

RestServer.get('/dvp/'+version+'/sipgroup_mgt/sipuser_group/AllRecWithCompany/:CompanyId',function(req,res,next)
{
    try {
        group.AllRecWithCompany(req.params.CompanyId, function (err, res) {
            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end(JSON.stringify(resz));
            }
        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();


});
//.......................................................................................................................

RestServer.get('/dvp/'+version+'/sipgroup_mgt/sipuser_group/get_all_users_in_group/:companyid',function(req,res,next)
{
    try {
        group.GetAllUsersInGroup(req.params.companyid, function (err, resz) {
            if(err)
            {
                res.end(err.toString());
            }
            else
            {
                res.end(JSON.stringify(resz));
            }
        });
    }
    catch(ex)
    {
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, -1);
        res.end(jsonString);
    }
    return next();


});









