************REQUIREMENTS FOR CAPTURING WEBPAGE SNAPSHOTS************


Install the Mozilla Add-on: "Mozilla Archive Format 4.1.0"
	>> https://addons.mozilla.org/en-US/firefox/addon/mozilla-archive-format/?src=userprofile


This add-on captures the most accurate HTML clone 
of a webpage as a .MAFF archive or HTML. 


**********************CAPTURING A WEBPAGE *************************

In Firefox, click [File -> Save As]
Save the page to 'trunk/src/applications':
- Create a folder for the captured page with Uppercase naming.
- Save the page as index.html
- Create an index.js
- Create an index.css
You should now have 3 core files and an asset folder:
	- index.html, 
	- index.js, 
	- index.css
	- index_files/                 <-- Folder with captued html assets


Localization Features:
Alternatively, you could save this page in this
naming format:
- index_en-US.html
- index_en-US_files/               <-- Folder with captued html assets


Localization + Role-based Features:
Alternatively, you could save this page in this
format:
- index_Employee_en-US.html
- index_Employee_en-US_files/      <-- Folder with captued html assets




********************** SETUP A WEBPAGE *************************

In index.html, insert the following HTML snippet 
towards the bottom of the closing </head> tag and
change the the namespace config to math your view 
controller namespace:

<!--====================== INSERT: OFFLINE DEMO LIBS ===================-->
        <link rel="stylesheet" type="text/css" href="../../../resources/css/animate.css"/>
        <link rel="stylesheet" type="text/css" href="../../../resources/css/font-awesome.min.css"/>
        <link rel="stylesheet" type="text/css" href="../../../resources/css/fonts.css"/>
  
        <!-- CONSTANTS  -->
        <script src="../../../resources/constants.js"></script>
        <script> Session = top.Session; </script>
        <!-- CONFIG -->

        <!-- LIBS & UTILITIES -->
        <!--script src="../../../src/libs/TemplateEnginePlugins.js"></script-->

        <script src="../../../-appconfig.js"></script>
        <script id="config">
            appconfig = {
                version     : "1.0",
                appid       : "M1C01228-8E93-4X27-B54B-D49339AZ7CE8",
                namespace   : "applications.Main",
                storagekey  : "myApp",
                charset     : "utf-8",
                environment : Session.Debug.production?"prod":"dev",
                theme       : "Default",
                AMD         : true,
                foucdelay   : 300,
                debug       : false,
                logging     : true,
                fullscreenmode  : true,
                ismobile    : true,
                apppath     : "../../../",
                heartbeat   : false
            };  
        </script>
        <script src="../../../resources/routes.js"></script>
        <!-- FRAMEWORK -->
        <script src="../../../src/libs/framework.src.js"></script>
        <script src="../../../resources/labels.js"></script>
        <!-- LIBS & UTILITIES -->
        <script src="../../../src/core/ui/MegaMenu/index.js"></script>
        <!-- COMMON TRAITS -->
        <!-- MODEL/VOs -->
        <!-- DATA CONTROLLERS -->
        <!-- UI COMPONENTS -->
        <script src="../../../src/core/utilities/URIHelpers.js"></script>
        <script src="../../../src/core/ui/OfflineApplication.js"></script>
        <!-- MAIN APPLICATION -->
        <script src="index.js"></script>
<!--====================== END INSERT: OFFLINE DEMO LIBS ===================-->





Power the snapshot using a view controller, see 
<applications.Login> or <applications.Main> for 
an example of how to write your code-behind view 
controller.

Use this view-controller to get started.
Rename the namespace and update it in 
the <head> tag area to match(above).



namespace("applications.HelloWorld",
{
    '@inherits' : core.ui.OfflineApplication,
    '@cascade'  : true,
    '@stylesheets' : [ "src/./index.css"],
    '@imports' :[
        "src/core/ui/LogoutConfirmBox/index.js",
        "src/core/ui/MegaMenu/index.js",
        "src/core/ui/MastheadUtilityNav/index.js"
    ],

    initialize : function(){
        this.parent(arguments);
    },

    onRender : function(){
        var user = this.session.get("user");
        alert(user.fullname)
    }
});








********************** TESTING A WEBPAGE *************************

Modify resources/data/megamenu-<role>.json to link
to your new captured webpage app. You can also test
by create an href link to your app:

<a href="src/applications/HelloWorld/index.html">Click</a>


or dispatch a 'redirect' event at anytime from anywhere
within the app to trigger a redirect:

this.dispatchEvent("redirect", true, true, {url : "src/applications/HelloWorld/index.html"})




