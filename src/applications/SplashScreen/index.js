
namespace("applications.SplashScreen",
{
    '@inherits' : core.ui.OfflineApplication,
    '@cascade'  : true,
    '@stylesheets' : [ "src/./index.css"],
    

    initialize : function(){
        this.element.classList.add("visible")
    },

    onRender : function(){
        var self=this;
        setTimeout(function(){
            self.querySelector("#splash-container").style.opacity = 0;
            var destLogin = Config.Applications.LOGINCONFIG?Config.Applications.LOGINCONFIG:Config.Applications.LOGIN;
            setTimeout(function(){
                location.href = Config.ROOTPATH + destLogin;
            }, 3000)
        }, 900);
    }   
});

