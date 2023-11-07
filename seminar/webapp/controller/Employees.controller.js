//@ts-nocheck
sap.ui.define([
    "seminar/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "seminar/libs/Validator",
    "seminar/utils/ModelData"
], function (
    BaseController,
    JSONModel,
    Filter,
    FilterOperator,
    Fragment,
    Validator,
    ModelData
) {
    "use strict";

    return BaseController.extend("seminar.controller.Employees", {

        onInit: function () {
            this._oTable = this.byId("tableEmployees");
            this._oModelEmployees = this.getOwnerComponent().getModel("employees");

            this._oCrudController = this.getOwnerComponent().oCrudController();

            this._oModelEmployees.attachRequestSent(function () {
                this._oTable.setBusy(true);
            }.bind(this));

            this._oModelEmployees.attachRequestCompleted(function () {
                this._count();
                this._oTable.setBusy(false);
            }.bind(this));

            this._loadFilters();
            this._loadView();
            this._loadControl();
        },

        _count: function () {
            let oBinding = this._oTable.getBinding("rows");
            oBinding.attachChange(function () {
                this.byId("titleCount").setText(this.getResourceBundle().getText("titleCount", [oBinding.getLength()]));
            }.bind(this));
        },

        _loadFilters: function () {
            let oData = {
                Type: "",
                EmployeeId: "",
                Dni: "",
                Name: "",
                Email: ""
            };
            this.setModel(new JSONModel(oData), "filters");
        },

        _loadView: function () {
            let oData = {
                EmployeeId:"",
                Type: "0",
                FirstName: "",
                LastName: "",
                DNI: "",
                GrossSalary: null,
                DailyPrice: null,
                Date: new Date(),
                Comments: "",
                InternalMin: 1200.00,
                InternalMax: 8000.00,
                InternalDefault: 2400.00,
                AutonomusMin: 100.00,
                AutonomusMax: 2000.00,
                AutonomusDefault: 400.00,
                ManagerMin: 50000.00,
                ManagerMax: 200000.00,
                ManagerDefault: 70000.00
            };
            this.setModel(new JSONModel(oData), "view");
        },

        _loadControl: function () {
            let oData = {
                Enabled: false
            };
            this.setModel(new JSONModel(oData), "control");
        },

        onFilter: function () {
            let aFilter = [],
                oModelFilters = this.getView().getModel("filters");

            if (oModelFilters.getProperty("/Type")) {
                aFilter.push(new Filter("Type", FilterOperator.EQ, oModelFilters.getProperty("/Type")));
            }

            if (oModelFilters.getProperty("/EmployeeId")) {
                aFilter.push(new Filter("EmployeeId", FilterOperator.Contains, oModelFilters.getProperty("/EmployeeId")));
            }

            if (oModelFilters.getProperty("/Dni")) {
                aFilter.push(new Filter("Dni", FilterOperator.Contains, oModelFilters.getProperty("/Dni")));
            }

            if (oModelFilters.getProperty("/Name")) {
                aFilter.push(new Filter({
                    filters: [
                        new Filter("FirstName", FilterOperator.Contains, oModelFilters.getProperty("/Name")),
                        new Filter("LastName", FilterOperator.Contains, oModelFilters.getProperty("/Name"))
                    ],
                    and: false
                }));
            }

            if (oModelFilters.getProperty("/Email")) {
                aFilter.push(new Filter("SapId", FilterOperator.Contains, oModelFilters.getProperty("/Email")))
            }

            let oBinding = this._oTable.getBinding("rows");
            oBinding.filter(aFilter);
        },

        onClearFilter: function () {
            let oBinding = this._oTable.getBinding("rows");
            oBinding.filter([]);
            this._loadFilters();
        },

        onOpenDialog: function () {
            let oView = this.getView();

            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "seminar.fragment.CreateEmployee",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            this._pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onCloseDialog: function () {
            this._loadView();
            this._pDialog.then(function (oDialog) {
                oDialog.close();
            });
        },

        onSave: function () {
            let oValidator = new Validator();
            oValidator.validate(this.byId("createEmployee"));

            if (oValidator._isValid) {
                
                let oViewModel = this.getModel("view");
                let sEmployeeId = oViewModel.getProperty("/EmployeeId");

                if (sEmployeeId) {
                    let oData = ModelData.update(oViewModel, this);
                    this._oCrudController.crud('Update',oData);    
                } else {
                    let oData = ModelData.create(oViewModel, this);
                    this._oCrudController.crud('Create',oData);    
                }

            }
        },

        refresh: function (sAction) {
            let $this = this;

            let oObject = {
                Url: "/Users"
            }

            return new Promise((resolve)=>{
                switch(sAction) {
                    case 'Create': 
                        $this._oCrudController.read(oObject);
                        $this.onCloseDialog();
                        resolve(true);
                    break;
                    case 'Update':
                        $this._oCrudController.read(oObject);
                        $this.onCloseDialog();
                        resolve(true);
                    break;
                    case 'Delete':
                        $this._oCrudController.read(oObject);
                        resolve(true);
                    break;
                }
            });
        },

        onToUnlock: function () {
            let aIndices = this._oTable.getSelectedIndices(),
                oControl = this.getModel("control");
            
                if (aIndices.length === 1) {
                    oControl.setProperty("/Enabled", true);
                } else {
                    oControl.setProperty("/Enabled", false);
                }
        },

        onDelete: function () {
            let oData = ModelData.delete(this._oTable, this);
            this._oCrudController.crud('Delete',oData);
        },

        onEdit: function () {

            let iIndex = this._oTable.getSelectedIndices()[0],
                oBindingContext = this._oTable.getContextByIndex(iIndex),
                oModel = this.getView().getModel("view");

            oModel.setProperty("/EmployeeId", oBindingContext.getProperty("EmployeeId"));
            oModel.setProperty("/SapId", oBindingContext.getProperty("SapId"))
            oModel.setProperty("/Type", oBindingContext.getProperty("Type"));
            oModel.setProperty("/FirstName",oBindingContext.getProperty("FirstName"));
            oModel.setProperty("/LastName", oBindingContext.getProperty("LastName"));
            oModel.setProperty("/DNI", oBindingContext.getProperty("Dni"));
            oModel.setProperty("/Date", oBindingContext.getProperty("CreationDate"));
            oModel.setProperty("/Comments", oBindingContext.getProperty("Comments"));


            this.onOpenDialog();

        }
    });
});