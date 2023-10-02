sap.ui.define([
  "seminar/controller/BaseController"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController) {
      "use strict";

      return BaseController.extend("seminar.controller.App", {

          onInit: function () {
              this.onNavToLaunchpad();
          },

          onNavToLaunchpad: function () {
              let oRouter = this.getRouter();
                  oRouter.navTo("launchpad");
          }
      });
  });
  