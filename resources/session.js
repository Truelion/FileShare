/**
 * Declare global application-level and session constants.
 * In the future, this could be condensed into one namespace.
 */
Session = {};
Session.State = {};
Session.Demo = {};
Session.Debug = {};
app={};
app.constants={};


/* App Constants */
app.constants.DEFAULT_HOME_APP 	= "activities/Home";
app.constants.EMPLOYEE 			= "Employee";
app.constants.MANAGER 			= "Manager";
app.constants.ADMIN 			= "Admin";
app.constants.PRACTITIONER      = "Practitioner";
Session.State.COPY_RIGHT 		= "&copy; " + (new Date).getFullYear() + ", Automatic Data Processing, Inc.";

/* Session State */
Session.State.appname 		= "ADP.COM Demo (Canada)"
Session.State.build 		= "20170627-1";
Session.State.version 		= "1.0";
Session.State.buildstring 	= Session.State.appname + " v" + Session.State.version + " (" + Session.State.build + ")";
Session.State.Timeout 		= "1 day"; //'mins', 'days' or 'hours'
Session.BasePath = "";

Session.State.currentLanguage = Session.State.currentLanguage||Constants.Languages.EN_US; //set by login screen

Session.Demo = {
    Product : Session.State.appname,
    Version: Session.State.version,
    Build : Session.State.build
};

Session.Demo[Session.State.currentLanguage.CODE] = {
    version: Session.Demo.Version,
    build : Session.Demo.Build
};


Session.Debug = { 
	disableLogging : false, 
	production : false
};


if (Session.Debug.disableLogging && window.console){
    window.console.log = function(){};
    window.console.warn = function(){};
    window.console.debug = function(){};
    window.console.info = function(){};
    window.console.time = function(){};
    window.console.dir = function(){};
    window.console.profile = function(){};
    window.console.clear = function(){};
    window.console.exception = function(){};
    window.console.trace = function(){};
    window.console.assert = function(){};
}

