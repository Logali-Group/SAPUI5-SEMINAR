sap.ui.define([
    "sap/ui/base/Object",
    "sap/m/MessageBox"
],function (Object, MessageBox) {

    "use strict";

    var oModel = {},
        oResourceBundle = {};

    return Object.extend("seminar.controller.Crud",{

        init: function (oController) {
            oModel = oController.getModel("employees");
            oResourceBundle = oController.getModel("i18n").getResourceBundle();
        },

        crud: function (sCrud, oObject) {

            let $this = this;

            MessageBox.confirm(oResourceBundle.getText("question"),{
                actions:[ MessageBox.Action.OK, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.OK,
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        switch (sCrud) {
                            case 'Create':  $this._create(oObject); break;
                            case 'Update':  $this._update(oObject); break;
                            case 'Delete':  $this._delete(oObject); break;
                        }
                    } 
                }
            });
        },

        read: function (oObject) {

            let sUrl =          oObject.Url;
            
            new Promise((resolve, reject)=>{
                oModel.read(sUrl, {
                    // urlParameters:{
                    //     '$expand':'UserToSalary'
                    // },
                    success: function (data) {
                        console.log(data);
                        return resolve(true);
                    },
                    error: function () {
                        return reject(false);
                    }
                });
            });

        },

        _create: function (oObject) {

            let sUrl =          oObject.Url,
                oData =         oObject.Data,
                oController =   oObject.Controller,
                fnCallback =    oObject.Function,
                sBusy =         oObject.Busy;

            oController.byId(sBusy).setBusy(true);

            let oPromise = new Promise((resolve, reject)=>{
                oModel.create(sUrl, oData, {
                    success: function (data) {

                        if (fnCallback) {
                            let oPromise = fnCallback('Create');
                            oPromise.then(function(response){
                                response? resolve(true) : reject(false);
                            });
                        }

                        resolve(true);
                    },
                    error: function () {
                        reject(false);
                    }
                });
            });

            oPromise.then(function(response){

                if (response) {
                    MessageBox.success(oResourceBundle.getText("create"));
                } else {
                    MessageBox.error(oResourceBundle.getText("error"));
                }

                oController.byId(sBusy).setBusy(false);
            });

        },

        _update: function (oObject) {
            
            let sUrl =          oObject.Url,
                oData =         oObject.Data,
                oController =   oObject.Controller,
                fnCallback =    oObject.Function,
                sBusy =         oObject.Busy;

            oController.byId(sBusy).setBusy(true);

            let oPromise = new Promise((resolve, reject)=>{
                oModel.update(sUrl, oData, {
                    success: function (data) {

                        if (fnCallback) {
                            let oPromise = fnCallback('Update');
                            oPromise.then(function(response){
                                response? resolve(true) : reject(false);
                            });
                        }

                        resolve(true);
                    },
                    error: function () {
                        reject(false);
                    }
                });
            });

            oPromise.then(function(response){

                if (response) {
                    MessageBox.success(oResourceBundle.getText("update"));
                } else {
                    MessageBox.error(oResourceBundle.getText("error"));
                }

                oController.byId(sBusy).setBusy(false);
            });

            oController.byId(sBusy).setBusy(false);
        },

        _delete: function (oObject) {

            let sUrl =          oObject.Url,
                oController =   oObject.Controller,
                fnCallback =    oObject.Function,
                sBusy =         oObject.Busy;

            oController.byId(sBusy).setBusy(true);

            let oPromise = new Promise((resolve, reject)=>{
                oModel.remove(sUrl, {
                    success: function (data) {
                        if (fnCallback) {
                            let oPromise = fnCallback('Delete');
                            oPromise.then(function(response){
                                response? resolve(true) : reject(false);
                            });
                        }

                        resolve(true);
                    },
                    error: function (err) {
                        reject(false);
                    }
                });
            });

            oPromise.then(function(response){

                if (response) {
                    MessageBox.success(oResourceBundle.getText("delete"));
                } else {
                    MessageBox.error(oResourceBundle.getText("error"));
                }

                oController.byId(sBusy).setBusy(false);
            });

        }

    });

});