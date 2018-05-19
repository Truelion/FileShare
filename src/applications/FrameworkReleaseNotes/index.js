namespace("applications.FrameworkReleaseNotes",
{
    '@inherits' : core.Application,
    '@cascade'  : true,
    '@stylesheets' : [ "src/./index.css"],
    '@imports' :[
        // "src/core/ui/menus/oneservice/MegaMenu/index.js",
        // "src/core/ui/FlyoutButton/index.js"
        "src/libs/tracker/src/core/libs/Tracker.src.js"
    ],
    '@traits' : [],

    initialize : function(){
        this.parent(arguments);
        this.dontshow_input = this.querySelector("input#dontshow_input");
        this.dontshow_input.addEventListener("click", this.onDoNotShow.bind(this), false);


        this.$framework = $framework.releases[$framework.releases.length-1];
        this.running_version = this.querySelector("#running_version");
        this.running_version.innerHTML = this.$framework.version + " (build: " + this.$framework.build + ")"
        this.stable_version = this.querySelector("#stable_version");
        this.stable_version.innerHTML = $framework.stable;
        
        var releases = $framework.releases.reverse();
        this.onRenderData({
            table : "framework_release_notes",
            data : $framework,
            items:releases
        });

        core.utilities.URIHelpers.interceptClicks();
        core.utilities.URIHelpers.highlight(this.querySelectorAll("a"));
    },

    track : function(){},

    onDoNotShow : function(){
        if(this.dontshow_input.checked) {
            this.session.set("disable_framework_release_notifications",true);
            alert("You will no longer see this notification again until a future release or when localStorage cache is cleared.")
        } else {
            this.session.set("disable_framework_release_notifications",false);
            alert("OK")
        }
    },

    // onLogOut : function(){
    //     window.postMessage({
    //         type:"redirect",
    //         url: Config.Applications.LOGIN
    //     }, "*");
    // },

    intiDefaultApp : function(){}//ignores MAIN_ACTIVITY
});