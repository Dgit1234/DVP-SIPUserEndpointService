/**
 * Created by Pawan on 11/9/2015.
 */
function AddOrUpdateContext(req,reqId,callback)
{
    logger.debug('[DVP-SIPUserEndpointService.AddOrUpdateContext] - [%s] - [PGSQL] - Method Hit',reqId);
    if(req)
    {
        try {
            var ContextObj = req;

            ContextObj.CompanyId = 1;
            ContextObj.TenantId = 1;
            ContextObj.AddUser = "NAddUser";
            ContextObj.UpdateUser = "NUpdateUser";
            ContextObj.AddTime = new Date(2013, 01, 13);
            ContextObj.UpdateTime = new Date(2013, 01, 28);

        }
        catch (ex) {

            logger.error('[DVP-SIPUserEndpointService.AddOrUpdateContext] - [%s] - Error occurred while Creating request Object ',reqId,ex);
            callback(ex,undefined);

        }




        if(ContextObj.Context) {
            try {
                DbConn.Context
                    .find({where: {Context: ContextObj.Context}})
                    .then(function (resContext) {

                        if (!resContext) {

                            logger.debug('[DVP-SIPUserEndpointService.AddOrUpdateContext] - [%s] - [PGSQL] - No record found for Context %s ',reqId,ContextObj.Context);

                            try {

                                logger.debug('[DVP-SIPUserEndpointService.AddOrUpdateContext] - [%s] - [PGSQL] - Creating new record of Context %s ',reqId,ContextObj.Context);
                                DbConn.Context
                                    .create(
                                    {
                                        Context: ContextObj.Context,
                                        Description: ContextObj.Description,
                                        ContextCat: ContextObj.ContextCat,
                                        ObjClass: "OBJCLZ",
                                        ObjType: "OBJTYP",
                                        ObjCategory: "OBJCAT",
                                        CompanyId: 1,
                                        TenantId: 1,
                                        AddUser: ContextObj.AddUser,
                                        UpdateUser: ContextObj.UpdateUser

                                    }
                                ).then(function (resSave) {

                                        logger.debug('[DVP-SIPUserEndpointService.AddOrUpdateContext] - [%s] - [PGSQL] - Context %s inserted successfully - Data %s',reqId,ContextObj.Context,JSON.stringify(ContextObj));
                                        callback(undefined, resSave);

                                    }).catch(function (errSave) {

                                        logger.error('[DVP-SIPUserEndpointService.AddOrUpdateContext] - [%s] - [PGSQL] - Context %s insertion  failed - Data %s',reqId,ContextObj.Context,JSON.stringify(ContextObj),errSave);
                                        callback(errSave, undefined);

                                    });





                            }
                            catch (ex) {
                                logger.error('[DVP-SIPUserEndpointService.AddOrUpdateContext] - [%s]  - Exception in detail creation of Context %s',reqId,ContextObj.Context,ex);
                                callback(ex, undefined);

                            }

                        } else {

                            logger.debug('[DVP-SIPUserEndpointService.AddOrUpdateContext] - [%s]  - Context found',reqId,JSON.stringify(resContext));

                            try {
                                logger.debug('[DVP-SIPUserEndpointService.AddOrUpdateContext] - [%s]  - Updating picked Context data %s to %s',reqId,JSON.stringify(resContext),JSON.stringify(ContextObj));
                                DbConn.Context
                                    .update(
                                    {
                                        Description: ContextObj.Description,
                                        ContextCat: ContextObj.ContextCat,
                                        ObjClass: "OBJCLZ",
                                        ObjType: "OBJTYP",
                                        ObjCategory: "OBJCAT",
                                        CompanyId: 1,
                                        TenantId: 1,
                                        AddUser: ContextObj.AddUser,
                                        UpdateUser: ContextObj.UpdateUser
                                    },
                                    {
                                        where: {
                                            Context: ContextObj.Context
                                        }
                                    }
                                ).then(function (resUpdate) {


                                        logger.debug('[DVP-SIPUserEndpointService.AddOrUpdateContext] - [%s] - [PGSQL] - Context %s Updated successfully',reqId,ContextObj.Context);
                                        callback(undefined, resUpdate);

                                    }).catch(function (errUpdate) {


                                        logger.error('[DVP-SIPUserEndpointService.AddOrUpdateContext] - [%s] - [PGSQL] - Context %s Updation failed',reqId,ContextObj.Context,errUpdate);
                                        callback(errUpdate, undefined);


                                    });
                            }
                            catch (ex) {
                                logger.error('[DVP-SIPUserEndpointService.AddOrUpdateContext] - [%s] - [PGSQL] - Exception in updating context %s',reqId,ContextObj.Context,ex);
                                callback(ex, undefined);
                            }

                        }

                    }).catch(function (errContext) {

                        logger.error('[DVP-SIPUserEndpointService.AddOrUpdateContext] - [%s] - [PGSQL] - Error occurred while searching Context %s ',reqId,ContextObj.Context,errContext);
                        callback(errContext, undefined);

                    });




            }
            catch (ex) {
                logger.error('[DVP-SIPUserEndpointService.AddOrUpdateContext] - [%s] - [PGSQL] - Exception in Searching context %s',reqId,ContextObj.Context,ex);
                callback(ex,undefined);
            }
        }
        else
        {
            logger.error('[DVP-SIPUserEndpointService.AddOrUpdateContext] - [%s] - [PGSQL] - Recieved Context id is invalid',reqId);
            callback(new Error("Invalid Context"),undefined);
        }
    }
    else
    {
        callback(new Error("Empty request"),undefined);
    }

}

function GetCompanyContextDetails(CompanyId,reqId,callback)
{
    if(!isNaN(CompanyId)&& CompanyId)
    {
        try {

            DbConn.Context
                .findAll({where: {CompanyId: CompanyId}})
                .then(function (resContext) {

                    if (resContext.length==0) {

                        logger.error('[DVP-SIPUserEndpointService.FindContextByCompany] - [%s] - [PGSQL]  - No record found for Context %s ',reqId,CompanyId);
                        callback(new Error("No Context record found"), undefined);
                    }
                    else {

                        logger.debug('[DVP-SIPUserEndpointService.FindContextByCompany] - [%s] - [PGSQL] - Record found for Context %s ',reqId,CompanyId);
                        callback(undefined, resContext);



                    }

                }).catch(function (errContext) {

                    logger.error('[DVP-SIPUserEndpointService.FindContextByCompany] - [%s] - [PGSQL]  - Error in searching Context %s ',reqId,CompanyId,errContext);
                    callback(errContext, undefined);

                });


        }
        catch (ex)
        {
            logger.debug('[DVP-SIPUserEndpointService.FindContextByCompany] - [%s] - Exception in starting method : GetContextDetails  Context %s ',reqId,CompanyId);
            callback(ex,undefined);

        }
    }
    else
    {
        logger.debug('[DVP-SIPUserEndpointService.FindContextByCompany] - [%s] - CompanyID is Undefined');
        callback(new Error("CompanyID is Undefined"),undefined);
    }


}



module.exports.AddOrUpdateContext = AddOrUpdateContext;
module.exports.GetCompanyContextDetails = GetCompanyContextDetails;