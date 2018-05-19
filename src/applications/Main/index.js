//=require src/libs/dragdrop.js
//=require src/libs/webtorrent.min.js
//=require src/core/ui/OfflineApplication.js

namespace("applications.Main",
{
    '@inherits' : "core.ui.OfflineApplication",
    '@cascade'  : true,
    '@stylesheets' : [ 
        "~/resources/css/common.css",
        "src/./index.css"
        // "src/./dyn.css"
    ],
    '@imports' :[
        // "src/core/ui/HeroSlider/index.js"
    ],

    initialize : function(){
        window.onSignIn = this.onSignIn.bind(this);

        var self=this;
        this.element.style.opacity=0;
        this.parent(arguments);
        this.link = this.querySelector("#magnet_link");

        var client = new WebTorrent();
        DragDrop('#dropzone', function (files) {
          client.seed(files, function (torrent) {
            console.log('Client is seeding ' + torrent.magnetURI);
            // console.log(torrent)
            self.onMagnetLinkReady(torrent)
          })
        });

        window.addEventListener ("hashchange", this.onLocationHashChanged.bind(this), true);
        this.link.addEventListener("click", (e) => this.onMagnetLinkClicked(e), false)
        this.bind(".g-signin2", "click", (e) => this.onSignOut(e))
    },

    onSignIn : function(googleUser) {
        
        // alert("signin")
      // var profile = googleUser.getBasicProfile();
      // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      // console.log('Name: ' + profile.getName());
      // console.log('Image URL: ' + profile.getImageUrl());
      // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

      // var user = {
      //   id : profile.getId(),
      //   fullname : profile.getName(),
      //   photo_src : profile.getImageUrl(),
      //   email : profile.getEmail()
      // }
      // this.session.set("user", user);
      // Session.user =  user;
      // var lang = Config.DEFAULT_LANG;
      // this.session.set("currentLanguage", lang);
      // Session.State.currentLanguage =  lang;

      // setTimeout(() =>{
      //       window.postMessage({
      //           type:"redirect",
      //           url: Config.Applications.MAIN
      //       }, "*");
      // },200)
    },

    onSignOut :function (e) {
        e.preventDefault();
        e.stopPropagation();

        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          window.postMessage({
                type:"redirect",
                url: Config.Applications.LOGIN
            }, "*");
        });
    },


    onMagnetLinkClicked : function(e){
        //do nothing when the link is clicked.
        // e.preventDefault();
        // e.stopPropagation();
    },

    onMagnetLinkReady :function(torrent){
        var sharelink = "https://www.addtoany.com/share?linkurl=[url]&amp;linkname=[name]";
            sharelink = this.parseTemplate(sharelink, {name:torrent.files[0].name, url:torrent.magnetURI});
            console.log(sharelink,torrent)
        var link = this.querySelector("#magnet_link");
            link.setAttribute("href", sharelink)
    },

    onLocationHashChanged : function(e){
        console.log(e)
        console.log(location.hash)
    }
});
