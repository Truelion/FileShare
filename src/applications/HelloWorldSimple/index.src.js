namespace("core.utilities.URIHelpers");

core.utilities.URIHelpers = {
    interceptClicks : function(){
        document.body.addEventListener("click", this.onLinkClicked.bind(this), false);
    },

    setTargetWindow : function(target){
        this.targetWindow = target;
    },

    getTargetWindow : function(target){
        return this.targetWindow||window;
    },

    evalUrl : function (path) {
        console.warn("Deprecated: core.utilities.URIHelpers.evalUrl() - use core.utilities.URIHelpers.eval() instead");
        return this.eval(path);
    },

    onLinkClicked : function(e){
        var self=this;

        var aTag = core.ui.HtmlComponent.prototype.getRealTargetFromEvent(e, "a", "body");
        // var val = aTag?aTag.href:e.target.textContent;
        var val = "";
        if(aTag) {
            var href = aTag.getAttribute("href").trim();//href.trim();
            // debugger;
            if(!href || href == "#" || href == "" || href.indexOf(":void") >=0) {
                val = (aTag.textContent.trim().length > 0)?
                aTag.textContent:(application.classname + "_" + aTag.id);
            } else {
                val = href;
            }
        } else {
            val = e.target.textContent;
        }
        val = val.trim();

        if(val && val.length > 0) {
            e.preventDefault();
            var mapped_uri = core.utilities.URIHelpers.map(val);
            if(mapped_uri){
                var href = core.utilities.URIHelpers.eval(mapped_uri);
                if(href) { 
                    var qstring = val.split("?")[1];
                        qstring = qstring||"";
                    var url = href + ("?" + qstring);
                    this.track(url);
                    setTimeout(function() {
                        
                        // location.href = url;
                        var target = self.getTargetWindow();
                            target.location.href = url;
                    },100)
                }
                else {

                }
            }
        }
    },

    track : function(data) {
        if(typeof data == "string"){
            var urlparts = data.split("/")
            // u[u.length-2]
            application.track({
                "Type": "event", 
                "Action": "click", 
                "Category": urlparts[urlparts.length-2], 
                "Label": data
            })
        }
        else if(typeof data == "object"){
            application.track(data)
        }
    },

    map : function(url){
        for(var regex in ROUTES.URL_MAPPING) {
            var r = new RegExp(regex);
            var matches = url.match(r);
            if(matches) {
                return ROUTES.URL_MAPPING[regex]
            }
        }
        console.warn("core.utilities.URIHelpers.map(): No URL_MAPPING defined for:\n" + url)
        return null;
    },

    eval : function(path){
        path = path.replace(/\{([a-zA-Z0-9\.\_\-]+)\}/gim, function(){
            return eval(arguments[1]);
        });
        return path;
    },

    //TODO:revisit this logic to handle links that are not true <A> tags.
    highlight : function(all_links){
        all_links = [].slice.call(all_links||document.body.querySelectorAll("a"));
        for(var regex in ROUTES.URL_MAPPING) {
            var r = new RegExp(regex);
            all_links.forEach(function(a){
                var href = a.getAttribute("href");
                var matches = href && href.match(r);
                if(matches) {
                    a.classList.remove("active");
                    setTimeout(function(){
                        a.classList.add("active");
                    },200)
                }
            });
        }
    }
};



namespace("core.ui.HelloWorldApplication",
{
    '@inherits' : core.Application,
    '@cascade'  : true,
    '@traits':[
        core.traits.InitializeApplicationData
    ],
    '@imports' : [
        "src/libs/tracker/src/core/libs/Tracker.src.js"
    ],

    intiDefaultApp : function(){},//ignores MAIN_ACTIVITY
    
    initialize : function(){
        this.parent(arguments);
        core.utilities.URIHelpers.interceptClicks();
        core.utilities.URIHelpers.highlight(this.querySelectorAll("a"));
    },

    track : function(data) {
        if(Session.Tracker) {
            Session.Tracker.log(data);
        } else {
            console.error("Session.Tracker is undefined. Try including a reference to Tracker from: " + this.namespace)
        }
    }
});

//require core.controllers.DataController

namespace("core.controllers.MegaMenuDataController", {
    '@inherits' : core.controllers.StorageController,
    SEED_DATA_URI:ROUTES.DATA.MEGA_MENU,

	initialize : function(host, async){
		this.allocate("mega-menu");
		// if(!this.getData()){
		// 	this.load(this.CONFIG, {
		// 		role : Session.user.role,
		// 		country: Session.State.currentLanguage.CODE
		// 	});
		// }
	}
});

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


namespace("core.ui.menus.wfn.MegaMenu", 
{
    '@inherits'     : core.ui.WebComponent,
    '@cascade'      : true,
    '@stylesheets'  : ["src/./index.css"],
    '@href'         : "src/./index.html",
    '@imports' : [
        // "src/core/controllers/MegaMenuDataController.js",
        // "src/core/ui/DropdownMenu.js"
    ],

    initialize : function(){
        this.parent();
        this.menu_container = this.querySelector("#mega-menu-container");
        application.addEventListener("click", this.onMenuItemClicked.bind(this), false);
        this.dataController = new core.controllers.MegaMenuDataController();  
        this.dataController.addEventListener("loaded", this.onMenuDataLoaded.bind(this), false);
        this.dataController.addEventListener("insert", this.onMenuItemInserted.bind(this), false);
        this.dataController.addEventListener("updated", this.onMenuUpdated.bind(this), false);
        this.load();
    },

    reset : function(){
        this.dataController.reset(true)
    },

    load : function(){
        this.dataController.load({
            role : Session.user.role,
            country: Session.State.currentLanguage.CODE
        });
    },

    onMenuUpdated : function(e){
        this.render(e);
    },


    hideMegaMenu : function(){
        this.lastSelectedEl.classList.remove("selected");
    },

    onMenuItemInserted : function(e){
        console.log("mega menu item inserted", e.controller.getData())
        if(e.controller == this.dataController){
            this.onRenderData(e.controller.getData(), true);
        }
    },

    onMenuDataLoaded : function(e){
        console.log("mega menu loaded", e.controller.getData())
        if(e.controller == this.dataController){
            this.onRenderData(e.controller.getData(), true);
        }
    },

    render : function(e){
        //if(e.controller == this.dataController){
            this.onRenderData(this.dataController.getData(), true);
        //}
    },

    onMenuItemClicked : function(e){

        var isDropdownItem = this.getRealTargetFromEvent(e,".dropdown-menu-item", ".DropdownMenu");
        var isMainMenuItem = this.getRealTargetFromEvent(e,".menu-item", ".MegaMenu");

        var item = isDropdownItem || isMainMenuItem;

        if(isDropdownItem){
            e.stopPropagation();

        } else if(isMainMenuItem){
                console.log(isMainMenuItem)
                if(this.lastSelectedEl){
                     if(this.lastSelectedEl != isMainMenuItem){
                         this.lastSelectedEl.classList.remove("selected");
                     }
                }
                isMainMenuItem.classList.toggle("selected");
                this.lastSelectedEl = isMainMenuItem;
        }
        else {
            this.lastSelectedEl && this.lastSelectedEl.classList.remove("selected");
        }

        if(item){
            var href = item.getAttribute("data-href");
            if(href){
                window.postMessage({
                    type:"redirect",
                    url: href
                }, "*");
            }
        }
    }
});




namespace("core.ui.menus.oneservice.MegaMenu", 
{
    '@inherits'     : core.ui.WebComponent,
    '@cascade'      : true,
    '@stylesheets'  : ["src/./index.css"],
    '@href'         : "src/./index.html",
    '@imports' : [
        // "src/core/controllers/MegaMenuDataController.js",
        // "src/core/ui/DropdownMenu.js"
    ],

    initialize : function(){
        this.parent();
        this.menu_container = this.querySelector("#mega-menu-container");
        application.addEventListener("click", this.onMenuItemClicked.bind(this), false);
        this.dataController = new core.controllers.MegaMenuDataController();  
        this.dataController.addEventListener("loaded", this.onMenuDataLoaded.bind(this), false);
        this.dataController.addEventListener("insert", this.onMenuItemInserted.bind(this), false);
        this.load();
    },

    reset : function(){
        this.dataController.reset(true)
    },

    load : function(){
        this.dataController.load({
            role : Session.user.role,
            country: Session.State.currentLanguage.CODE
        });
    },

    onMenuUpdated : function(e){
        this.render(e);
    },

    hideMegaMenu : function(){
        this.lastSelectedEl.classList.remove("selected");
    },

    render : function(e){
        // if(e.controller == this.dataController){
            this.onRenderData(this.dataController.getData(), true);
        // }
    },

    onMenuItemInserted : function(e){
        console.log("mega menu item inserted", e.controller.getData())
        if(e.controller == this.dataController){
            this.onRenderData(e.controller.getData(), true);
        }
    },

    onMenuDataLoaded : function(e){
        console.log("mega menu loaded", e.controller.getData())
        if(e.controller == this.dataController){
            this.onRenderData(e.controller.getData(), true);
        }
    },

    onMenuItemClicked : function(e){

        var isDropdownItem = this.getRealTargetFromEvent(e,".dropdown-menu-item", ".DropdownMenu");
        var isMainMenuItem = this.getRealTargetFromEvent(e,".menu-item", ".MegaMenu");

        var item = isDropdownItem || isMainMenuItem;

        if(isDropdownItem){
            e.stopPropagation();

        } else if(isMainMenuItem){
                console.log(isMainMenuItem)
                if(this.lastSelectedEl){
                     if(this.lastSelectedEl != isMainMenuItem){
                         this.lastSelectedEl.classList.remove("selected");
                     }
                }
                isMainMenuItem.classList.toggle("selected");
                this.lastSelectedEl = isMainMenuItem;
        }
        else {
            this.lastSelectedEl && this.lastSelectedEl.classList.remove("selected");
        }

        if(item){
            var href = item.getAttribute("data-href");
            if(href){
                window.postMessage({
                    type:"redirect",
                    url: href
                }, "*");
            }
        }
    }
});

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



namespace("applications.HelloWorldSimple",
{
    '@inherits' : core.ui.HelloWorldApplication,
    '@cascade'  : true,
    '@stylesheets' : [ "src/./index.css", "resources/css/common.css"],
    '@imports' :[
        // "src/core/ui/menus/wfn/MegaMenu/index.js",
        // "src/core/ui/menus/oneservice/MegaMenu/index.js",
        // "src/core/ui/FlyoutButton/index.js"
    ],
    '@traits' : [],

    initialize : function(){
        this.parent(arguments);
        var self=this;
        var items = this.querySelectorAll("*[data-bind=true]");
        var keyupBtn = this.querySelector("#toggleKeyupBinding");
        this.outputEl = this.querySelector("#output");

        this.textChangeBinding = this.bind("input[data-bind=true]",   "change", (e) => this.setText(e.target.value,e));
        this.keyUpBinding   = this.bind("input[data-bind=true]",   "keyup", (e)  => this.setText(e.target.value,e));
        

        this.nameChangedBinding = this.bind(this, "namechanged", 
            () => items.forEach(x => x.value=this.getText()));
        
        this.bind(this, "mousemove", 
            (e) => this.outputEl.innerHTML = 
                this.parseTemplate("<b>X: [screenX], Y: [screenY]</b>", e));

        
        this.bind(this.keyUpBinding, "change", 
            (e) => keyupBtn.innerHTML = e.isbound ? 
                "Turn Keyup Binding Off":
                "Turn Keyup Binding On");
        
        this.keyUpBinding.toggle();

        
        this.bind("#changeNameBtn", "click", () => this.changeName());
        this.bind("#toggleBinding", "click", (e) => this.nameChangedBinding.toggle());
        this.bind("#toggleKeyupBinding", "click", () => this.keyUpBinding.toggle());
        this.bind("#toggletextChangeBinding", "click", () => this.textChangeBinding.toggle());
        // this.querySelector("#changeNameBtn").addEventListener("click", this.changeName.bind(this), false);

        this.changeName();
    },

 

    bind : function(el, evtName, handler){
        var self=this;
        el = (el instanceof core.ui.Binding)?
            el : el.element||el||this.element;

        if(typeof el == "string") {
            var _handler = function(e){
                var t = self.getRealTargetFromEvent(e,el);
                if(t) {
                    handler(e);
                }
            };
            this.element.addEventListener(evtName, _handler, false);
            var b = new core.ui.Binding(this.element, evtName, _handler);
            return b;
        } else {
            el.addEventListener(evtName, handler, false);
            if(!(el instanceof core.ui.Binding)){
                var b = new core.ui.Binding(el, evtName, handler);
                return b;
            }
        }
    },



    changeName : function(){
        this.named="hello world"
        this.dispatchEvent("namechanged", true,true, {});
    },

    getText : function(){
        return this.named;
    },

    setText : function(str,e){
        this.named = str;
        if(e)  {
            this.dispatchEvent("namechanged", true,true, {});
        }
    },

    onRender : function(){
        this.parent(arguments);
        this.flagicon = this.querySelector("#flagicon");
        this.fullnameEl = this.querySelector("#fullname");
        this.avtarEl = this.querySelector("#emp-photo");
        this.lang = this.querySelector("#lang");
        this.resetMenu = this.querySelector("#resetMenu");
        // this.logout = this.querySelector("#logout");
        // this.logTrackingBtn = this.querySelector("#logTrackingBtn");

        // this.logout.addEventListener("click", this.onLogOut.bind(this), false);
        // this.logTrackingBtn.addEventListener("click", this.onLogTracking.bind(this), false);
        this.resetMenu.addEventListener("click", this.onResetMenu.bind(this), false);

        this.fullnameEl.innerHTML = Session.user.fullname + " - " + Session.user.role;
        this.avtarEl.src = Config.ROOTPATH + Session.user.photo_src;
        this.lang.innerHTML = Session.State.currentLanguage.NAME + " (" + Session.State.currentLanguage.CODE + ")<br/>" + location.href + "<br/><br/>"
        this.flagicon.src = Config.ROOTPATH + "src/applications/HelloWorldSimple/resources/images/flag_" + Session.State.currentLanguage.CODE + ".png";
    },

    // onLogTracking : function(){
    //     this.track({
    //         "Type": "event",
    //         "Action": "view",
    //         "Category": "Tests",
    //         "Label": "12-14-2017, 10:40:18 PM -- Testing 123..."
    //     });
    // },

    onResetMenu : function(){
        var megaMenu = this.querySelector("#megamenu");
            megaMenu = megaMenu.prototype;//get the real class component
        var doit = confirm("Are you sure you want to reset the menu?");
        doit && megaMenu.reset();
        doit && megaMenu.load();

        var c = megaMenu.dataController;
        var item = c.getData().items.where("$.label=='Resources'")[0];
        item.label = "XXXX";
        item.items.push({
            "label" : "Test",
            "items" : [
                {
                    label: "2nd dynamic item"
                }
            ]
        })
        c.update(item);
    },

    track : function(data) {
        if(Session.Tracker) {
            Session.Tracker.log(data);
        } else {
            console.error("Session.Tracker is undefined. Try including a reference to Tracker from: " + this.namespace)
        }
        // Session.Tracker.log ({
        //     "Type": "event", 
        //     "Action": "click", 
        //     "Category": "Payroll offline 3", 
        //     "Label": "Run Batch Payroll Process" 
        // });
    },

    onLogOut : function(){
        window.postMessage({
            type:"redirect",
            url: Config.Applications.LOGIN
        }, "*");
    },

    intiDefaultApp : function(){}//ignores MAIN_ACTIVITY
});