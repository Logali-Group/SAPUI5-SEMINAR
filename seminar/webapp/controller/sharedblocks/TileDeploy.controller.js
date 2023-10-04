sap.ui.define([
    "seminar/controller/BaseController"
],function (BaseController) {
    "use strict";

    return BaseController.extend("seminar.controller.sharedblocks.TileDeploy",{
        onInit: function () {

        },

        onRedirect: function () {
            let sRef = "https://bcc7b925trial-dev-seminar-approuter.cfapps.us10-001.hana.ondemand.com";
            sap.m.URLHelper.redirect(sRef, true);
        }
    });
});
