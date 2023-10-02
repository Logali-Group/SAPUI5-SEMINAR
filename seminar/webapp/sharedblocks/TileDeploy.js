sap.ui.define([
    "sap/uxap/BlockBase"
], function (BlockBase) {
    "use strict";

    let oDeploy = BlockBase.extend("seminar.sharedblocks.Deploy", {
        metadata: {
            views: {
                Collapsed: {
                    viewName: "seminar.sharedblocks.Deploy",
                    type: "XML"
                },
                Expanded: {
                    viewName: "seminar.sharedblocks.Deploy",
                    type: "XML"
                }
            }
        }
    });

    return oDeploy;
}, true);