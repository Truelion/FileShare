namespace("core.ui.FlyoutButton", 
{
    '@inherits'     : core.ui.WebComponent,
    '@stylesheets'  : ["src/./index.css"],
    '@template-uri'  : "src/./index.html",
    "@cascade"      : true,

    initialize : function(){
    	this.parent(arguments);
        application.addEventListener("click", this.onClick.bind(this), false);
    },

    onClick : function(e){
        var isListItem = this.getRealTargetFromEvent(e,"li",".flyout");
        var isButton   = this.getRealTargetFromEvent(e,"button",".FlyoutButton");

        if(isButton){
            this.toggle();
        }
        else if(isListItem){
            //alert("You clicked: " + isListItem.innerHTML);
            this.hide();
        } 
        else {
            this.hide();
        }
    },

    hide : function(){
        this.element.classList.remove("open")
    },

    toggle : function(){
        this.element.classList.toggle("open")
    }
});