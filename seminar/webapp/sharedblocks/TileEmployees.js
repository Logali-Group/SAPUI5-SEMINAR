sap.ui.define([
    "sap/uxap/BlockBase"
], function (BlockBase) {
    "use strict";

    let oEmployees = BlockBase.extend("seminar.sharedblocks.TileEmployees", {
        metadata: {
            views: {
                Collapsed: {
                    viewName: "seminar.sharedblocks.TileEmployees",
                    type: "XML"
                },
                Expanded: {
                    viewName: "seminar.sharedblocks.TileEmployees",
                    type: "XML"
                }
            }
        }
    });

    return oEmployees;
}, true);