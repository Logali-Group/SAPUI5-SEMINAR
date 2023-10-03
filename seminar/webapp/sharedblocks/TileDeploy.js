sap.ui.define([
    "sap/uxap/BlockBase"
], function (BlockBase) {
    "use strict";

    let oDeploy = BlockBase.extend("seminar.sharedblocks.TileDeploy", {
        metadata: {
            views: {
                Collapsed: {
                    viewName: "seminar.sharedblocks.TileDeploy",
                    type: "XML"
                },
                Expanded: {
                    viewName: "seminar.sharedblocks.TileDeploy",
                    type: "XML"
                }
            }
        }
    });

    return oDeploy;
}, true);