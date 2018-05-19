
namespace("applications.HelloWorld.activities.MegamenuActivity",
{
    '@inherits' : core.ui.Activity,
    "@cascade"  : true,
    '@href'     : "src/./index.html",
    '@title'    : "Test",
    '@stylesheets' : [ "src/./index.css" ],
    '@imports'  : ['src/core/ui/MegaMenu/index.js'],
    '@traits'   : [],


    initialize : function() {
        this.parent(arguments);
        this.setupMenu();
    },

    onPause : function(){
        this.parent(arguments);
    },

    setupMenu : function(){
        alert("asdas")
        var m = new core.ui.MegaMenu({}, this.querySelector("menu"));
        console.log(m)
    },

    innerHTML:
    '<div></div>'
});



