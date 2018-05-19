/*
    STOP:

    ! DO NOT MODIFY THIS FILE. IMPROVEMENTS 
      SHOULD BE DISCUSSED FIRST. !





    
    -----------------------------------------------------------
    ApplicationContainer - An environment for loading 
    applications(single page apps - SPA's). Manages a frameset
    where 'sessionFrame' stores a cross-application session, 
    a 'mainFrame' for rendering an application and this, 
    the ApplicationContainer window that controls redirects 
    within the mainFrame via HTML5 window.postMessage() to
    bypass CORS restrictions.
*/

namespace("adp.esi.demos.ApplicationContainer",
{
    '@inherits' : core.Application,
    '@cascade'  : true,
    '@stylesheets' : [],
    '@traits':[
        core.traits.InitializeApplicationData
    ],

    initialize : function(){
        var self=this;
        this.parent(arguments);
        this.onRequestNotificationPermission();
        Session.user = this.session.get("user");
        Session.State.currentLanguage = this.session.get("currentLanguage");

        this.mainFrame = this.getMainFrame();
        this.mainFrame.addEventListener("load", 
            this.onMainFrameLoaded.debounce(200).bind(this), false);
    
        var url = window.getParameterByName("apppath"); 
            url = (url)?url:Config.Applications.MAIN;
            
        var showLogin = (typeof Config.ENABLE_LOGIN == "boolean") ?
            Config.ENABLE_LOGIN:true;
        var showSplash = (typeof Config.ENABLE_SPLASH == "boolean") ?
            Config.ENABLE_SPLASH:true;
        var persistSession = (typeof Config.PERSIST_SESSION == "boolean") ?
            Config.PERSIST_SESSION:true;

        if(showLogin) {
            if(!this.isUserSessionValid() || !persistSession){
                if(showSplash) {
                    //redirects to login
                    this.loadPage(Config.Applications.SPLASH);
                } else {
                    this.loadPage(Config.Applications.LOGIN);
                }
            } else {
                this.loadPage(url)
            }
        } else {
            this.setDefaultSession(); //bypass login step
            this.loadPage(url);
        }
    },

    setDefaultSession : function(){
        var a = new core.controllers.AccountDataController;
        var user = a.getUserByRole(Config.DEFAULT_ROLE);
        Session.user = user;
        Session.State.currentLanguage = Config.DEFAULT_LANG;//Constants.Languages.EN_US;
        if(Config.PERSIST_SESSION){
            this.session.set("currentLanguage", Session.State.currentLanguage);
            this.session.set("user", Session.user);
        }
    },

    onMainFrameLoaded : function(e){
        var self=this;
        var win = self.getMainFrame().contentWindow;
        console.log("Loaded: " + win.location.href)
        win.addEventListener("message", self.onPostMessageReceived.bind(self), false);
    },

    onPostMessageReceived : function(e){
        if(e.data.type == "redirect"){
            this.loadPage(e.data.url)
        }
        else if(e.data.type == "resetdemo"){
            var destUrl = Config.Applications.LOGINCONFIG ?
                Config.Applications.LOGINCONFIG :
                Config.Applications.LOGIN;
            var doit = confirm("Reset this demo?");
            doit && core.data.StorageManager.clean();
            this.loadPage(destUrl)
        } else {
            console.info("<ApplicationContainer> received a\
             postMessage of type: '" + e.data.type + "' - unable\
             to handle.")
        }
    },

    intiDefaultApp : function(){},//ignores MAIN_ACTIVITY

    logout : function(){
        this.loadPage(Config.Applications.LOGIN)
    },

    getMainFrame : function (){
        return document.getElementById("mainFrame");
    },
    
    loadPage : function (page){
        var self = this;
        page = this.evalUrl(page);
        document.getElementById("mainFrame").src = page;   
    },

    evalUrl : function(page){
        page = page.replace(/\{([a-zA-Z0-9\.\_\-]+)\}/gim, function(){
            return eval(arguments[1]);
        });
        return page;
    },

    onRequestNotificationPermission : function(){
        var self=this;
        var rel = $framework.releases;
        var notificationLabel = rel[rel.length-1].version+"_framework_message";
        var framework_release = rel[rel.length-1];
        var showNotification = Config.SHOW_FRAMEWORK_RELEASE_NOTES;//false;
            showNotification = typeof showNotification=="boolean" ?
                showNotification:true;

        var count = this.session.get("_framework_release_notes_count");
        var disabled = this.session.get("disable_framework_release_notifications");

        if(showNotification) {
            if(typeof count == "number" && count >3) {
                return
            } else {
                count++;
            }
            if(disabled) {
                return
            }

            try {
                if(("Notification" in window) && Notification.requestPermission){
                    Notification.requestPermission().then(function(result) {
                      if (Notification.permission === "granted") {
                        var options = {
                            body: framework_release.description,
                            icon: "resources/images/adplogo.jpg",
                            requireInteraction:true
                          }
                          var n = new Notification("Simul8 Framework Updated: "+framework_release.version, options);
                          n.onclick = function(e) {
                              e.preventDefault(); // prevent the browser from focusing the Notification's tab
                              var releaseNotesApp = Config.Applications.FRAMEWORK_RELEASE_NOTES?
                                    Config.Applications.FRAMEWORK_RELEASE_NOTES:
                                    "src/applications/FrameworkReleaseNotes/index.html";
                                    
                              self.loadPage(releaseNotesApp)
                          }
                       }
                       self.session.set("_framework_release_notes_count",count++);
                    });
                }
            } catch(e) {}
        }
    },

    innerHTML:
	'<div></div>'
});
