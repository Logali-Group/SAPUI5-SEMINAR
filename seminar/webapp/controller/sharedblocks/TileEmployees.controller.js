sap.ui.define([
    "seminar/controller/BaseController"
],function (BaseController) {
    "use strict";

    return BaseController.extend("seminar.controller.sharedblocks.TileEmployees",{

        onInit: function () {

        },

        onNavToEmployee: function () {
            let oRouter = this.getRouter();
                oRouter.navTo("RouteEmployee");
        }
    });
});