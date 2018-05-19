namespace("core.ui.DropdownMenu", 
{
    '@inherits'     : core.ui.WebComponent,
    '@stylesheets'  : [],
    "@cascade"      : true,

    initialize : function(){
        this.addEventListener("click", this.onMenuItemClicke.bind(this), false);
        this.tertiary_menu_container = this.querySelector(".dropdown-menu-tertiary-items");
    },
    
    onMenuItemClicke : function(e){
        var el = e.target;
        if(el && el.classList.contains("dropdown-menu-item")){
            if(this.lastSelectedEl){
                this.lastSelectedEl.classList.remove("selected");
            }
            if(el.getAttribute("data-childmenu") == "true"){
                var tertiary_menu = el.querySelector(".tertiary-childmenu");
                this.tertiary_menu_container.style.display="block";
                this.tertiary_menu_container.innerHTML = tertiary_menu.innerHTML;
            }
            else {
                this.tertiary_menu_container.style.display="none";
                var _appref = el.getAttribute("data-appref");
                var _title = el.getAttribute("title");
                this.dispatchEvent("selected", true, true, {target:el});
                if(_appref) {
                    application.open({appref: _appref});
                    this.logEvent({
                        Type     : "event",
                        Category : "MegaMenu",
                        Label    : _title,
                        Action   : "click"
                    });
                }
            }
            el.classList.add("selected");
            this.lastSelectedEl = el;
        }
    },

    logEvent : function(data){
        application.dispatchEvent("tracking", true, true, data);
    }
});