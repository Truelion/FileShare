

namespace("applications.LoginOAuth",
{
    '@inherits' : core.Application,
    '@stylesheets' : [ "src/./index.css"],
    '@traits':[
        // UrlHashState,
        core.traits.InitializeApplicationData
    ],
    
    initialize : function () {
        this.parent(arguments);
        this.onResetSession();
        window.onSignIn = this.onSignIn.bind(this);
        this.bind("#signout", "click", (e) => this.onSignOut(e))
    },

    onResetSession : function(){
        this.session.set("user", null);
        Session.user = null;
    },

    onSignIn : function(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

      var user = {
        id : profile.getId(),
        fullname : profile.getName(),
        photo_src : profile.getImageUrl(),
        email : profile.getEmail(),
        username :profile.getEmail()
      }
      this.session.set("user", user);
      Session.user =  user;
      var lang = Config.DEFAULT_LANG;
      this.session.set("currentLanguage", lang);
      Session.State.currentLanguage =  lang;

      var account = new core.vo.Account(this.session.get("user"));
        account.touch();

      setTimeout(() =>{
            window.postMessage({
                type:"redirect",
                url: Config.Applications.MAIN
            }, "*");
      },200)
    },

    onSignOut :function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
    }



    
});
