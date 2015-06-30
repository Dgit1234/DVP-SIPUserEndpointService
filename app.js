/**
 * Created by pawan on 2/10/2015.
 */

var restify = require('restify');
var context=require('./SIPUserEndpointService.js');
var UACCreate=require('./CreateSipUACrec.js');
var Extmgt=require('./ExtensionManagementAPI.js');
var UACUpdate=require('./UpdateSipUserData.js');
var group=require('./SipUserGroupManagement.js');
var messageFormatter = require('DVP-Common/CommonMessageGenerator/ClientMessageJsonFormatter.js');
var config = require('config');
var logger = require('DVP-Common/LogHandler/CommonLogHandler.js').logger;
var uuid = require('node-uuid');
var cors = require('cors');

var port = config.Host.port || 3000;
var version=config.Host.version;



var RestServer = restify.createServer({
    name: "myapp",
    version: '1.0.0'
});

RestServer.listen(port, function () {
    console.log('%s listening at %s', RestServer.name, RestServer.url);
});

//Server listen

//Enable request body parsing(access)
RestServer.use(restify.bodyParser());
RestServer.use(restify.acceptParser(RestServer.acceptable));
RestServer.use(restify.queryParser());
RestServer.use(cors());


RestServer.put('/DVP/API/' + version + '/SipUser/DidNumber', function(req, res, next)
{
    var reqId = uuid.v1();
    try
    {
        var securityToken = req.header('authorization');
        var reqBody = req.body;

        logger.debug('[DVP-SIPUserEndpointService.NewDidNumber] - [%s] - HTTP Request Received - Req Body : ', reqId, reqBody);

        if(reqBody && securityToken) {
            reqBody.CompanyId = 1;
            reqBody.TenantId = 3;


            Extmgt.AddDidNumberDB(reqId, reqBody, function (err, addResult)
            {
                if (err)
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Add NewDidNumber Failed", false, false);
                    logger.debug('[DVP-SIPUserEndpointService.NewDidNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }
                else
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Add NewDidNumber Success", true, addResult);
                    logger.debug('[DVP-SIPUserEndpointService.NewDidNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }

            })

        }
        else
        {
            var jsonString = messageFormatter.FormatMessage(new Error('Empty request body or no authorization token set'), "Empty request body or no authorization token set", false, false);
            logger.debug('[DVP-SIPUserEndpointService.NewDidNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
            res.end(jsonString);

        }


    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.NewDidNumber] - [%s] - Exception Occurred', reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception occurred", false, false);
        logger.debug('[DVP-SIPUserEndpointService.NewDidNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
        res.end(jsonString);

    }
    return next();

});

RestServer.put('/DVP/API/' + version + '/SipUser/EmergencyNumber', function(req, res, next)
{
    var reqId = uuid.v1();
    try
    {
        var securityToken = req.header('authorization');
        var reqBody = req.body;

        logger.debug('[DVP-SIPUserEndpointService.NewEmergencyNumber] - [%s] - HTTP Request Received - Req Body : ', reqId, reqBody);

        if(reqBody && securityToken)
        {
            reqBody.CompanyId = 1;
            reqBody.TenantId = 3;

            Extmgt.AddEmergencyNumberDB(reqId, reqBody, function (err, addResult)
            {
                if (err)
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Add NewEmergencyNumber Failed", false, -1);
                    logger.debug('[DVP-SIPUserEndpointService.NewEmergencyNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }
                else
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Add NewEmergencyNumber Success", true, addResult);
                    logger.debug('[DVP-SIPUserEndpointService.NewEmergencyNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }

            })

        }
        else
        {
            var jsonString = messageFormatter.FormatMessage(new Error('Empty request body or no authorization token set'), "Empty request body or no authorization token set", false, -1);
            logger.debug('[DVP-SIPUserEndpointService.NewEmergencyNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
            res.end(jsonString);

        }


    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.NewEmergencyNumber] - [%s] - Exception Occurred', reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception occurred", false, -1);
        logger.debug('[DVP-SIPUserEndpointService.NewEmergencyNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
        res.end(jsonString);

    }
    return next();

});

RestServer.post('/DVP/API/' + version + '/SipUser/DodNumber', function(req, res, next)
{
    var reqId = uuid.v1();
    try
    {
        var securityToken = req.header('authorization');
        var extId = req.body.UserUuid;
        var dodNumber = req.body.DodNumber;
        var isActive = req.body.DodActive;

        logger.debug('[DVP-SIPUserEndpointService.SetDodNumber] - [%s] - HTTP Request Received - Req Body : %s', reqId, req.body);

        if(securityToken)
        {
            Extmgt.SetDodNumberToExtDB(reqId, dodNumber, extId, 1, 3, isActive, function (err, updateRes) {
                if (err)
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Set Dod number Failed", false, false);
                    logger.debug('[DVP-SIPUserEndpointService.SetDodNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }
                else
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Set Dod Number Success", true, updateRes);
                    logger.debug('[DVP-SIPUserEndpointService.SetDodNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }

            })
        }
        else
        {
            var jsonString = messageFormatter.FormatMessage(new Error('Empty request body or no authorization token set'), "Empty request body or no authorization token set", false, false);
            logger.debug('[DVP-SIPUserEndpointService.SetDidNumberStatus] - [%s] - API RESPONSE : %s', reqId, jsonString);
            res.end(jsonString);

        }


    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.SetDidNumberStatus] - [%s] - Exception Occurred', reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception occurred", false, false);
        logger.debug('[DVP-SIPUserEndpointService.SetDidNumberStatus] - [%s] - API RESPONSE : %s', reqId, jsonString);
        res.end(jsonString);

    }
    return next();

});

RestServer.post('/DVP/API/' + version + '/SipUser/DidNumber/:id/Activate/:isActive', function(req, res, next)
{
    var reqId = uuid.v1();
    try
    {
        var securityToken = req.header('authorization');
        var didId = req.params.id;
        var isActive = req.params.isActive;

        logger.debug('[DVP-SIPUserEndpointService.SetDidNumberStatus] - [%s] - HTTP Request Received - Req Params : DidId : %s, isActive " %s', reqId, didId, isActive);

        if(securityToken)
        {
            Extmgt.SetDidNumberActiveStatusDB(reqId, didId, 1, 3, isActive, function (err, assignResult) {
                if (err)
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Set Did Number Status Failed", false, false);
                    logger.debug('[DVP-SIPUserEndpointService.SetDidNumberStatus] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }
                else
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Set Did Number Status Success", true, assignResult);
                    logger.debug('[DVP-SIPUserEndpointService.SetDidNumberStatus] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }

            })
        }
        else
        {
            var jsonString = messageFormatter.FormatMessage(new Error('Empty request body or no authorization token set'), "Empty request body or no authorization token set", false, false);
            logger.debug('[DVP-SIPUserEndpointService.SetDidNumberStatus] - [%s] - API RESPONSE : %s', reqId, jsonString);
            res.end(jsonString);

        }


    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.SetDidNumberStatus] - [%s] - Exception Occurred', reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception occurred", false, false);
        logger.debug('[DVP-SIPUserEndpointService.SetDidNumberStatus] - [%s] - API RESPONSE : %s', reqId, jsonString);
        res.end(jsonString);

    }
    return next();

});

RestServer.del('/DVP/API/' + version + '/SipUser/DidNumber/:id', function(req, res, next)
{
    var reqId = uuid.v1();
    try
    {
        var securityToken = req.header('authorization');
        var didId = req.params.id;

        logger.debug('[DVP-SIPUserEndpointService.DeleteDidNumber] - [%s] - HTTP Request Received - Req Params - didId : %s', reqId, didId);

        if(securityToken)
        {

            Extmgt.DeleteDidNumberDB(reqId, didId, 1, 3, function (err, delResult)
            {
                if (err)
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Delete DID Record Failed", false, false);
                    logger.debug('[DVP-SIPUserEndpointService.DeleteDidNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }
                else
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Delete DID Record Success", true, delResult);
                    logger.debug('[DVP-SIPUserEndpointService.DeleteDidNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }

            })

        }
        else
        {
            var jsonString = messageFormatter.FormatMessage(new Error('Empty request params or no authorization token set'), "Empty request body or no authorization token set", false, false);
            logger.debug('[DVP-SIPUserEndpointService.DeleteDidNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
            res.end(jsonString);

        }

    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.DeleteDidNumber] - [%s] - Exception Occurred', reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception occurred", false, false);
        logger.debug('[DVP-SIPUserEndpointService.DeleteDidNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
        res.end(jsonString);

    }
    return next();

});

RestServer.del('/DVP/API/' + version + '/SipUser/EmergencyNumber/:emergencyNum', function(req, res, next)
{
    var reqId = uuid.v1();
    try
    {
        var securityToken = req.header('authorization');
        var emergencyNum = req.params.emergencyNum;

        logger.debug('[DVP-SIPUserEndpointService.DeleteEmergencyNumber] - [%s] - HTTP Request Received - Req Params - emergencyNum : %s', reqId, emergencyNum);

        if(securityToken && emergencyNum)
        {

            Extmgt.DeleteEmergencyNumberDB(reqId, emergencyNum, 1, 3, function (err, delResult)
            {
                if (err)
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Delete emergency number Record Failed", false, false);
                    logger.debug('[DVP-SIPUserEndpointService.DeleteEmergencyNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }
                else
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Delete emergency number Record Success", true, delResult);
                    logger.debug('[DVP-SIPUserEndpointService.DeleteEmergencyNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }

            })

        }
        else
        {
            var jsonString = messageFormatter.FormatMessage(new Error('Empty request params or no authorization token set'), "Empty request body or no authorization token set", false, false);
            logger.debug('[DVP-SIPUserEndpointService.DeleteEmergencyNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
            res.end(jsonString);

        }

    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.DeleteEmergencyNumber] - [%s] - Exception Occurred', reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception occurred", false, false);
        logger.debug('[DVP-SIPUserEndpointService.DeleteEmergencyNumber] - [%s] - API RESPONSE : %s', reqId, jsonString);
        res.end(jsonString);

    }
    return next();

});

RestServer.get('/DVP/API/' + version + '/SipUser/EmergencyNumbers', function(req, res, next)
{
    var emptyArr = [];
    var reqId = uuid.v1();
    try
    {
        var securityToken = req.header('authorization');

        logger.debug('[DVP-SIPUserEndpointService.EmergencyNumbers] - [%s] - HTTP Request Received', reqId);

        if(securityToken)
        {

            Extmgt.GetEmergencyNumbersForCompany(reqId, 1, 3, function (err, eNums)
            {
                if (err)
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Get Emergency Numbers for company Failed", false, eNums);
                    logger.debug('[DVP-SIPUserEndpointService.EmergencyNumbers] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }
                else
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Get Emergency Numbers for company Success", true, eNums);
                    logger.debug('[DVP-SIPUserEndpointService.EmergencyNumbers] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }

            })

        }
        else
        {
            var jsonString = messageFormatter.FormatMessage(new Error('Empty request params or no authorization token set'), "Empty request params or no authorization token set", false, emptyArr);
            logger.debug('[DVP-SIPUserEndpointService.EmergencyNumbers] - [%s] - API RESPONSE : %s', reqId, jsonString);
            res.end(jsonString);

        }

    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.EmergencyNumbers] - [%s] - Exception Occurred', reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception occurred", false, emptyArr);
        logger.debug('[DVP-SIPUserEndpointService.EmergencyNumbers] - [%s] - API RESPONSE : %s', reqId, jsonString);
        res.end(jsonString);

    }
    return next();

});

RestServer.get('/DVP/API/' + version + '/SipUser/DidNumbers', function(req, res, next)
{
    var emptyArr = [];
    var reqId = uuid.v1();
    try
    {
        var securityToken = req.header('authorization');

        logger.debug('[DVP-SIPUserEndpointService.DidNumbers] - [%s] - HTTP Request Received', reqId);

        if(securityToken)
        {

            Extmgt.GetDidNumbersForCompanyDB(reqId, 1, 3, function (err, didNums)
            {
                if (err)
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Get did numbers for company Failed", false, didNums);
                    logger.debug('[DVP-SIPUserEndpointService.DidNumbers] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }
                else
                {
                    var jsonString = messageFormatter.FormatMessage(err, "Get did numbers for company Success", true, didNums);
                    logger.debug('[DVP-SIPUserEndpointService.DidNumbers] - [%s] - API RESPONSE : %s', reqId, jsonString);
                    res.end(jsonString);
                }

            })

        }
        else
        {
            var jsonString = messageFormatter.FormatMessage(new Error('Empty request params or no authorization token set'), "Empty request params or no authorization token set", false, emptyArr);
            logger.debug('[DVP-SIPUserEndpointService.DidNumbers] - [%s] - API RESPONSE : %s', reqId, jsonString);
            res.end(jsonString);

        }

    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.DidNumbers] - [%s] - Exception Occurred', reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception occurred", false, emptyArr);
        logger.debug('[DVP-SIPUserEndpointService.DidNumbers] - [%s] - API RESPONSE : %s', reqId, jsonString);
        res.end(jsonString);

    }
    return next();

});

RestServer.post('/DVP/API/' + version + '/SipUser/AssignDidNumberToExtension', function(req, res, next)
{
    var reqId = uuid.v1();
    try
    {
        var securityToken = req.header('authorization');
        var reqBody = req.body;

        logger.debug('[DVP-SIPUserEndpointService.AssignDidNumberToExtension] - [%s] - HTTP Request Received - Req Body : ', reqId, reqBody);

        if(reqBody && securityToken)
        {
            var extId = req.body.ExtensionId;
            var didId = req.body.DidId;

            if(extId && didId)
            {
                Extmgt.AssignDidNumberToExtDB(reqId, didId, extId, 1, 3, function(err, assignResult)
                {
                    if(err)
                    {
                        var jsonString = messageFormatter.FormatMessage(err, "Assign Did to extension Failed", false, false);
                        logger.debug('[DVP-SIPUserEndpointService.AssignDidNumberToExtension] - [%s] - API RESPONSE : %s', reqId, jsonString);
                        res.end(jsonString);
                    }
                    else
                    {
                        var jsonString = messageFormatter.FormatMessage(err, "Assign Did to extension Success", true, assignResult);
                        logger.debug('[DVP-SIPUserEndpointService.AssignDidNumberToExtension] - [%s] - API RESPONSE : %s', reqId, jsonString);
                        res.end(jsonString);
                    }

                })
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(new Error('Extension id and did record not given'), "Extension id and did record not given", false, false);
                logger.debug('[DVP-SIPUserEndpointService.AssignDidNumberToExtension] - [%s] - API RESPONSE : %s', reqId, jsonString);
                res.end(jsonString);
            }
        }
        else
        {
            var jsonString = messageFormatter.FormatMessage(new Error('Empty request body or no authorization token set'), "Empty request body or no authorization token set", false, false);
            logger.debug('[DVP-SIPUserEndpointService.AssignDidNumberToExtension] - [%s] - API RESPONSE : %s', reqId, jsonString);
            res.end(jsonString);

        }


    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.AssignDidNumberToExtension] - [%s] - Exception Occurred', reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception occurred", false, false);
        logger.debug('[DVP-SIPUserEndpointService.AssignDidNumberToExtension] - [%s] - API RESPONSE : %s', reqId, jsonString);
        res.end(jsonString);

    }
    return next();

});


//.......................................................................................................................

//RestServer.post('/dvp/'+version+'/context_mgmt/save_contextdata',function(req,res,next)
RestServer.post('/DVP/API/'+version+'/SipUser/Context',function(req,res,next)
{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }



    try {

        logger.debug('[DVP-SIPUserEndpointService.NewContextData] - [%s] - [HTTP]  - Request received -  Data - %s ',reqId,JSON.stringify(req.body));

        context.AddOrUpdateContext(req,reqId, function (err, resz) {

            if(err)
            {

                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false,undefined);
                logger.debug('[DVP-SIPUserEndpointService.NewContextData] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true, resz);
                logger.debug('[DVP-SIPUserEndpointService.NewContextData] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);

            }

        });
    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.NewContextData] - [%s] - [HTTP]  - Exception on Request received -  Data - %s ',reqId,JSON.stringify(req.body));
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.NewContextData] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();

});


//RestServer.post('/dvp/'+version+'/uac_mgmt/save_uac',function(req,res,next)

RestServer.post('/DVP/API/'+version+'/SipUser/User',function(req,res,next)
{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }



    try {

        logger.debug('[DVP-SIPUserEndpointService.NewUAC] - [%s] - [HTTP]  - Request received -  Data - %s ',reqId,JSON.stringify(req.body));

        UACCreate.CreateUser(req,reqId,function (err,resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.NewUAC] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true, resz);
                logger.debug('[DVP-SIPUserEndpointService.NewUAC] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }

        });
    }
    catch(ex)
    {
        logger.debug('[DVP-SIPUserEndpointService.NewUAC] - [%s] - [HTTP]  - Exception in Request receiving  -  Data - %s ',reqId,JSON.stringify(req.body),ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.NewUAC] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();
});

//RestServer.post('/dvp/'+version+'/uac_mgmt/updt_uac',function(req,res,next)

RestServer.post('/DVP/API/'+version+'/SipUser/User/:Username',function(req,res,next)
{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }



    try {

        logger.debug('[DVP-SIPUserEndpointService.UpdateUAC] - [%s] - [HTTP]  - Request received -  Data - Username %s Body %s ',reqId,req.params.Username,JSON.stringify(req.body));

        UACUpdate.UpdateUser(req.params.Username,req.body,reqId,function (err, resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR", false,undefined);
                logger.debug('[DVP-SIPUserEndpointService.UpdateUAC] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true, resz);
                logger.debug('[DVP-SIPUserEndpointService.UpdateUAC] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }

        });
    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.UpdateUAC] - [%s] - [HTTP]  - Exception in Request -  Data - Username %s Body %s ',reqId,req.params.Username,JSON.stringify(req.body),ex);
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.UpdateUAC] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();

});

RestServer.get('/DVP/API/'+version+'/SipUser/User/ByUUID/:uuid',function(req,res,next)
{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }
    var sipUuid = req.params.uuid;

    try
    {

        logger.debug('[DVP-SIPUserEndpointService.SipUserByUuid] - [%s] - [HTTP]  - Request received -  Uuid - %s ',reqId,sipUuid);

        context.PickUserByUUID(reqId,sipUuid, 1, 1, function (err, sipUsr) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.SipUserByUuid] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true, sipUsr);
                logger.debug('[DVP-SIPUserEndpointService.SipUserByUuid] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
        });
    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.SipUserByUuid] - [%s] - [HTTP]  - Exception in Request',reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.SipUserByUuid] - [%s] - Request response : %s ',reqId, jsonString);
        res.end(jsonString);
    }
    return next();


});


RestServer.get('/DVP/API/'+version+'/SipUser/Extension/:extention',function(req,res,next)
{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }
    var ext = req.params.extention;
    var Tenant=1;
    var Company=1;
    try
    {

        logger.debug('[DVP-SIPUserEndpointService.FullExtensionDetails] - [%s] - [HTTP]  - Request received -  ext - %s ',reqId,ext);

        Extmgt.GetUsersOfExtension(reqId,ext, Tenant,Company, function (err, extInfo) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.FullExtensionDetails] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true, extInfo);
                logger.debug('[DVP-SIPUserEndpointService.FullExtensionDetails] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
        });
    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.FullExtensionDetails] - [%s] - [HTTP]  - Exception in Request',reqId, ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.FullExtensionDetails] - [%s] - Request response : %s ',reqId, jsonString);
        res.end(jsonString);
    }
    return next();


});

//RestServer.post('/DVP/'+version+'/SipUserEndpointService/ExtensionManagement/ExtensionStatus/:id/:st',function(req,res,next)

RestServer.post('/DVP/API/'+version+'/SipUser/Extension/:extension/Status/:st',function(req,res,next)

{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }



    try {

        logger.debug('[DVP-SIPUserEndpointService.UpdateExtensionStatus] - [%s] - [HTTP]  - Request received -  Data - Tenant %s Id %s Status %s ',reqId,req.params.tenant,req.params.extension,req.params.st);

        Extmgt.ChangeUserAvailability(req.params.tenant,req.params.extension,req.params.st,reqId,function (err, resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.UpdateExtensionStatus] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true, resz);
                logger.debug('[DVP-SIPUserEndpointService.UpdateExtensionStatus] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }


        });
    }
    catch(ex)
    {
        logger.debug('[DVP-SIPUserEndpointService.UpdateExtensionStatus] - [%s] - [HTTP]  - Exception in Request -  Data - Tenant %s Id %s Status %s ',reqId,req.params.tenant,req.params.id,req.params.st);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.UpdateExtensionStatus] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();
});

//RestServer.post('/DVP/'+version+'/SipUserEndpointService/ExtensionManagement/Extension',function(req,res,next)

RestServer.post('/DVP/API/'+version+'/SipUser/Extension',function(req,res,next)

{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }



    try {

        logger.debug('[DVP-SIPUserEndpointService.NewExtension] - [%s] - [HTTP]  - Request received -  Data - %s',reqId,JSON.stringify(req.body));

        Extmgt.CreateExtension(req.body,reqId,function (errExt, resExt) {
            if(errExt)
            {
                var jsonString = messageFormatter.FormatMessage(errExt, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.NewExtension] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true, resExt);
                logger.debug('[DVP-SIPUserEndpointService.NewExtension] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }


        });
    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.NewExtension] - [%s] - [HTTP]  - Exception in Request -  Data - %s',reqId,JSON.stringify(req.body),ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.NewExtension] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();

});



RestServer.post('/DVP/API/'+version+'/SipUser/Extension/:extension/AssignToSipUser/:id',function(req,res,next)

{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }
    var Company=1;
    var Tenant=1;


    try {

        logger.debug('[DVP-SIPUserEndpointService.MapExtensionWithUAC] - [%s] - [HTTP]  - Request received -  Data - Ext %s UAC %s Data %s',reqId,req.params.extension,req.params.id,JSON.stringify(req.body));

        Extmgt.AssignToSipUser(req.params.extension,parseInt(req.params.id),Company,Tenant,reqId,function (err, resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.MapExtensionWithUAC] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true, resz);
                logger.debug('[DVP-SIPUserEndpointService.MapExtensionWithUAC] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
        });
    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.MapExtensionWithUAC] - [%s] - [HTTP]  - Exception in Request  -  Ext %s UAC %s Data %s',reqId,req.params.extension,req.params.id,JSON.stringify(req.body),ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.MapExtensionWithUAC] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();


});



//RestServer.post('/dvp/'+version+'/ext_mgmt/map_extension_group',function(req,res,next)
RestServer.post('/DVP/API/'+version+'/SipUser/Extension/:extension/AssignToGroup/:grpid',function(req,res,next)

{

    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }

    var Company=1;
    var Tenant=1;

    try {

        logger.debug('[DVP-SIPUserEndpointService.ExtensionMapwithGroup] - [%s] - [HTTP]  - Request received -  Extension %s Group %',reqId,req.params.extension,req.params.grpid);

        Extmgt.AssignToGroup(req.params.extension,req.params.grpid,Company,Tenant,reqId,function (err, resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.ExtensionMapwithGroup] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true,resz);
                logger.debug('[DVP-SIPUserEndpointService.ExtensionMapwithGroup] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
        });
    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.ExtensionMapwithGroup] - [%s] - [HTTP]  - Exception in Request -  Extension %s Group % Other %s',reqId,req.params.extension,req.params.grpid,JSON.stringify(req),ex);
        var jsonString = messageFormatter.FormatMessage(ex, "ERROR", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.ExtensionMapwithGroup] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();

});


//RestServer.post('/dvp/'+version+'/sipgroup_mgt/sipuser_group/add_sipuser_group',function(req,res,next)

RestServer.post('/DVP/API/'+version+'/SipUser/Group',function(req,res,next)
{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }



    try {

        logger.debug('[DVP-SIPUserEndpointService.NewSipUserGroup] - [%s] - [HTTP]  - Request received -  Data - %s',reqId,JSON.stringify(req.body));

        group.CreateUserGroup(req.body,reqId, function (err, resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.NewSipUserGroup] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true, resz);
                logger.debug('[DVP-SIPUserEndpointService.NewSipUserGroup] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
        });
    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.NewSipUserGroup] - [%s] - [HTTP]  - Exception in Request -  Data - %s',reqId,JSON.stringify(req.body),ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.NewSipUserGroup] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();

});


//RestServer.post('/dvp/'+version+'/sipgroup_mgt/sipuser_group/update_sipuser_group',function(req,res,next)


RestServer.post('/DVP/API/'+version+'/SipUser/Group/:id',function(req,res,next)

{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }



    try {

        logger.debug('[DVP-SIPUserEndpointService.UpdateSipUserGroup] - [%s] - [HTTP]  - Request received -  Data - ID %s Other %s',reqId,req.params.id,JSON.stringify(req.body));

        group.UpdateUserGroup(req.params.id,req.body,reqId,function (err, resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.UpdateSipUserGroup] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true, resz);
                logger.debug('[DVP-SIPUserEndpointService.UpdateSipUserGroup] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
        });
    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.UpdateSipUserGroup] - [%s] - [HTTP]  - Exception in Request  - Data - ID %s Other %s',reqId,req.params.id,JSON.stringify(req.body),ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.UpdateSipUserGroup] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();

});


//RestServer.get('/dvp/'+version+'/uac_mgmt/find_context/:cmpid',function(req,res,next)


RestServer.get('/DVP/API/'+version+'/SipUser/Context/ByCompany/:companyid',function(req,res,next)
{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }



    try {

        logger.debug('[DVP-SIPUserEndpointService.FindContextByCompany] - [%s] - [HTTP]  - Request received -  Data - %s',reqId,req.params.companyid);

        context.GetCompanyContextDetails(parseInt(req.params.companyid),reqId, function (err, resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, resz);
                logger.debug('[DVP-SIPUserEndpointService.FindContextByCompany] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true, resz);
                logger.debug('[DVP-SIPUserEndpointService.FindContextByCompany] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
        });
    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.FindContextByCompany] - [%s] - [HTTP]  - Exception in Request  -  Data - %s',reqId,req.params.companyid);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.FindContextByCompany] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    next();


});




RestServer.get('/DVP/API/'+version+'/SipUser/Group/:groupid',function(req,res,next)

{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }
    var Company=1;
    var Tenant=1;


    try {

        logger.debug('[DVP-SIPUserEndpointService.GroupData] - [%s] - [HTTP]  - Request received -  Data - %s',reqId,req.params.groupid);

        group.PickUserGroup(req.params.groupid,Company,Tenant,reqId, function (err, resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.GroupData] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true, resz);
                logger.debug('[DVP-SIPUserEndpointService.GroupData] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
        });

    }
    catch(ex)
    {
        logger.error('[DVP-SIPUserEndpointService.GroupData] - [%s] - [HTTP]  - Exception in Request  -  Data - %s',reqId,req.params.groupid);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.GroupData] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();


});

/*
 //RestServer.get('/dvp/'+version+'/sipgroup_mgt/sipuser_group/get_group_endpoints/:GID',function(req,res,next)

 RestServer.get('/DVP/API/'+version+'/SipUserEndpointService/SIPUserGroupManagemnt/GroupEndPoints/:GID',function(req,res,next)

 {
 var reqId='';

 try
 {
 reqId = uuid.v1();
 }
 catch(ex)
 {

 }
 var Company=1;
 var Tenant=1;


 try {

 logger.debug('[DVP-SIPUserEndpointService.GroupEndPoints] - [%s] - [HTTP]  - Request received -  Data - %s',reqId,req.params.GID);

 group.GetGroupEndpoints(parseInt(req.params.GID),Company,Tenant, reqId,function (err, resz) {
 if(err)
 {
 var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
 logger.debug('[DVP-SIPUserEndpointService.GroupEndPoints] - [%s] - Request response : %s ',reqId,jsonString);
 res.end(jsonString);
 }
 else
 {
 var jsonString = messageFormatter.FormatMessage(undefined, "Success", true, resz);
 logger.debug('[DVP-SIPUserEndpointService.GroupEndPoints] - [%s] - Request response : %s ',reqId,jsonString);
 res.end(jsonString);
 }
 });
 }
 catch(ex)
 {
 logger.debug('[DVP-SIPUserEndpointService.GroupEndPoints] - [%s] - [HTTP]  - Exception in Request -  Data - %s',reqId,req.params.GID,ex);
 var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
 logger.debug('[DVP-SIPUserEndpointService.GroupEndPoints] - [%s] - Request response : %s ',reqId,jsonString);
 res.end(jsonString);
 }
 return next();

 });
 */
//.......................................................................................................................




RestServer.get('/DVP/API/'+version+'/SipUser/Group/User/:sipid',function(req,res,next)

{

    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }
    var Company=1;
    var Tenant=1;


    try {

        logger.debug('[DVP-SIPUserEndpointService.EndpointGroupID] - [%s] - [HTTP]  - Request received -  Data - %s',reqId,req.params.sipid);

        group.PickUsersGroup(req.params.sipid,Company,Tenant,reqId,function (err, resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false,undefined);
                logger.debug('[DVP-SIPUserEndpointService.EndpointGroupID] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true,resz);
                logger.debug('[DVP-SIPUserEndpointService.EndpointGroupID] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
        });
    }
    catch(ex)
    {
        logger.debug('[DVP-SIPUserEndpointService.EndpointGroupID] - [%s] - [HTTP]  - Exception in Request - Data %s',reqId,req.params.sipid,ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false,undefined);
        logger.debug('[DVP-SIPUserEndpointService.EndpointGroupID] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();
});





//RestServer.get('/dvp/'+version+'/sipgroup_mgt/sipuser_group/AllRecWithCompany/:CompanyId',function(req,res,next)

RestServer.get('/DVP/API/'+version+'/SipUser/Groups/Company/:companyid',function(req,res,next)

{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }



    try {

        logger.debug('[DVP-SIPUserEndpointService.AllRecWithCompany] - [%s] - [HTTP]  - Request received -  Data - %s',reqId,req.params.companyid);

        group.PickCompayGroups(req.params.companyid,reqId, function (err, resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.AllRecWithCompany] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true, resz);
                logger.debug('[DVP-SIPUserEndpointService.AllRecWithCompany] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
        });
    }
    catch(ex)
    {
        logger.debug('[DVP-SIPUserEndpointService.AllRecWithCompany] - [%s] - [HTTP]  - Exception Request -  Data - %s',reqId,req.params.companyid);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.AllRecWithCompany] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();


});
//.......................................................................................................................



RestServer.get('/DVP/API/'+version+'/SipUser/Group/:groupid/Users',function(req,res,next)

{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }

    var Company=1;
    var Tenant=1;

    try {

        logger.debug('[DVP-SIPUserEndpointService.AllUsersInGroup] - [%s] - [HTTP]  - Request received -  Data - %s',reqId,req.params.groupid);

        group.PickUsersInGroup(parseInt(req.params.groupid),Company,Tenant,reqId,function (err, resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.AllUsersInGroup] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true,resz);
                logger.debug('[DVP-SIPUserEndpointService.AllUsersInGroup] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
        });
    }
    catch(ex)
    {
        logger.debug('[DVP-SIPUserEndpointService.AllUsersInGroup] - [%s] - [HTTP]  - Error in Request -  Data - %s',reqId,req.params.groupid,ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.AllUsersInGroup] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();


});


// New




RestServer.get('/DVP/API/'+version+'/SipUser/Users/OfCompany/:compid',function(req,res,next)
{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }



    try {

        logger.debug('[DVP-SIPUserEndpointService.AllSIPUsersOfCompany] - [%s] - [HTTP]  - Request received -  Data - %s',reqId,req.params.compid);

        UACUpdate.PickCompanyUsers(req.params.compid,reqId,function (err, resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.AllSIPUsersOfCompany] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true,resz);
                logger.debug('[DVP-SIPUserEndpointService.AllSIPUsersOfCompany] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
        });
    }
    catch(ex)
    {
        logger.debug('[DVP-SIPUserEndpointService.AllSIPUsersOfCompany] - [%s] - [HTTP]  - Error in Request -  Data - %s',reqId,req.params.compid,ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.AllSIPUsersOfCompany] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    next();


});


RestServer.get('/DVP/API/'+version+'/SipUser/Extension/:extension/Users',function(req,res,next)

{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }

    var Tenant=1;
    var Company=1;

    try {

        logger.debug('[DVP-SIPUserEndpointService.UsersOfExtension] - [%s] - [HTTP]  - Request received -  Data - %s',reqId,req.params.extension);

        Extmgt.PickExtensionUsers(req.params.extension,Company,Tenant,reqId,function (err, resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.UsersOfExtension] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true,resz);
                logger.debug('[DVP-SIPUserEndpointService.UsersOfExtension] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
        });
    }
    catch(ex)
    {
        logger.debug('[DVP-SIPUserEndpointService.UsersOfExtension] - [%s] - [HTTP]  - Error in Request -  Data - %s',reqId,req.params.extension,ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.UsersOfExtension] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();


});



RestServer.get('/DVP/API/'+version+'/SipUser/Extensions/OfCompany/:companyid',function(req,res,next)

{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }

    var Tenant=1;

    try {

        logger.debug('[DVP-SIPUserEndpointService.GetExtensionsOfCompany] - [%s] - [HTTP]  - Request received -  Data - %s',reqId,req.params.companyid);

        Extmgt.PickCompanyExtensions(parseInt(req.params.companyid),Tenant,reqId,function (err, resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.GetExtensionsOfCompany] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true,resz);
                logger.debug('[DVP-SIPUserEndpointService.GetExtensionsOfCompany] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
        });
    }
    catch(ex)
    {
        logger.debug('[DVP-SIPUserEndpointService.GetExtensionsOfCompany] - [%s] - [HTTP]  - Error in Request -  Data - %s',reqId,req.params.companyid,ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.GetExtensionsOfCompany] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();


});


/*

RestServer.get('/DVP/API/'+version+'/SipUserEndpointService/ExtensionManagement/Extension/:Extension',function(req,res,next)

{
    var reqId='';

    try
    {
        reqId = uuid.v1();
    }
    catch(ex)
    {

    }

    var Tenant=1;
    var Company =1;
    try {

        logger.debug('[DVP-SIPUserEndpointService.UsersOfExtension] - [%s] - [HTTP]  - Request received -  Data - %s',reqId,req.params.Extension);

        Extmgt.GetUserDataOfExtension(req.params.Extension,Company,Tenant,reqId,function (err, resz) {
            if(err)
            {
                var jsonString = messageFormatter.FormatMessage(err, "ERROR/Exception", false, undefined);
                logger.debug('[DVP-SIPUserEndpointService.UsersOfExtension] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
            else
            {
                var jsonString = messageFormatter.FormatMessage(undefined, "Success", true,resz);
                logger.debug('[DVP-SIPUserEndpointService.UsersOfExtension] - [%s] - Request response : %s ',reqId,jsonString);
                res.end(jsonString);
            }
        });
    }
    catch(ex)
    {
        logger.debug('[DVP-SIPUserEndpointService.UsersOfExtension] - [%s] - [HTTP]  - Error in Request -  Data - %s',reqId,req.params.Extension,ex);
        var jsonString = messageFormatter.FormatMessage(ex, "Exception", false, undefined);
        logger.debug('[DVP-SIPUserEndpointService.UsersOfExtension] - [%s] - Request response : %s ',reqId,jsonString);
        res.end(jsonString);
    }
    return next();


});
*/
