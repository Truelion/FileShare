//=require src/core/utilities/URIHelpers.js
//=require src/core/ui/HelloWorldApplication.js
//=require src/core/ui/menus/wfn/MegaMenu/index.js
//=require src/core/ui/menus/oneservice/MegaMenu/index.js
//=require src/core/ui/FlyoutButton/index.js


namespace("applications.HelloWorldSimple",
{
    '@inherits' : core.ui.HelloWorldApplication,
    '@cascade'  : true,
    '@stylesheets' : [ "src/./index.css", "resources/css/common.css"],
    '@imports' :[],
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