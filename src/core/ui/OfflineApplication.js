//=require src/core/utilities/URIHelpers.js

namespace("core.ui.OfflineApplication",
{
    '@inherits' : core.Application,
    '@cascade'  : true,
    '@traits':[
        core.traits.InitializeApplicationData
    ],
    
    
    initialize : function(){
        this.parent(arguments);

        // core.utilities.URIHelpers.interceptClicks();
        core.utilities.URIHelpers.highlight(this.querySelectorAll("a"));
    },

    track : function(data) {
        console.log("Click Log", data)
    }
});
