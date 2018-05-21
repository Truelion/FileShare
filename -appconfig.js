Config = {};

Config.USE_COMPRESSED_BUILD  = false;
Config.FILENAME = "index.*js"
Config.DYNAMICLOAD	= true;
Config.DEBUG = true;
Config.CHARSET = "utf-8";
Config.ROOTPATH = "../../../";
Config.ENVIRONMENT = Session.Debug.production?"prod":"dev";
Config.STORAGEKEY;
Config.APPID = "M1C01228-8E93-4X27-B54B-D49339AZ7CE8";
Config.FOUCDELAY = 300;
Config.FORCE_MOBILE_USERAGENT = false;
Config.LOGGING = false;

Config.Global = {
	PRODUCTION : Session.Debug.production
};


Config.ENABLE_LOGIN  = true;

Config.ENABLE_SPLASH = true;

Config.DEFAULT_ROLE	 = Constants.EMPLOYEE;

Config.DEFAULT_LANG	 = Constants.Languages.EN_US;

Config.PERSIST_SESSION = true;

Config.ALLOW_LANG_SELECTION = true;

Config.SHOW_FRAMEWORK_RELEASE_NOTES = true;

// Config.USE_COMPRESSED_BUILD  = true;

//Shortcuts
Config.Applications = {
	FRAMEWORK_RELEASE_NOTES : "src/applications/FrameworkReleaseNotes/index.html",
	SPLASH: "src/applications/SplashScreen/index.html",
	// LOGINCONFIG : "src/applications/LoginConfigurator/index.html",
	// LOGIN : "src/applications/Login/index.html",
	// LOGIN : "src/applications/Login/index.html",
	LOGIN : "src/applications/LoginOAuth/index.html",
	// MAIN : "src/applications/HelloWorld/index.html",
	MAIN : "src/applications/Main/index.html",
	// MAIN : "src/applications/HTML5Download/index.html",
	// MAIN : "src/applications/Main/index_{Session.user.role}_{Session.State.currentLanguage.CODE}.html",
	PDF : "src/applications/PDFViewer/index.html"
};


Config.Tracking = {
	AUTH_KEYS : {
		DEBUG 		: "CA62F580-B42A-4EFA-B464-4A9F63776F87",
		ADP_DEMO 	: "CA62F580-B42A-4EFA-B464-4A9F63776F87"
	},
	
	ENABLED : true,
	ENABLE_CLEAR_DATA_POPUP : false,
	TRANSFORMER : "ADPAnalyticsTransformer",
	SERVICE_DEBUG_URI : "https://eso-stg1.adpcorp.com/demotracker/Track.aspx",
	SERVICE_PROD_URI  : "https://eso.adp.com/demotracker/Track.aspx",
	XHR_TRANSPORT_METHOD: "POST"
};
Config.Tracking.AUTH_KEY = Session.Debug.production ?
	Config.Tracking.AUTH_KEYS.ADP_DEMO:
	Config.Tracking.AUTH_KEYS.DEBUG;


Config.StorageManager = {
	ENABLED: true,
	STORE_KEY: ("ADPDEMO_" + Config.Tracking.AUTH_KEY),
	PARTITION_SIZE : 4000,//kb,
	WARNING_THRESHOLD_CAPACITY : .80,
	//CAPACITY_WARNING_MSG : "CAPACITY WARNING:\nStorage Quota Exceeded!. New data will be pushed into head, oldest data will be popped from tail-end of partition.",
	CAPACITY_WARNING_MSG : "This demo requires an update for new features and/or data exchange. Please connect to the internet to synchronize.",
	CAPACITY_CHECK_TIMER_INTERVAL : 1200000,//Check storage space every 20mins 
	DO_CAPACITY_CHECK_ON_STARTUP: true
};


//namespace("Config.NetDetect");
Config.NetDetect = {
	ENABLED: true,
	ENABLE_LOGGING:true,
	INTERVAL : 7000,
	HEARTBEAT_DEBUG_URI : "https://eso-stg1.adpcorp.com/demotracker/Heartbeat.aspx",
	HEARTBEAT_PROD_URI  : "https://eso.adp.com/demotracker/Heartbeat.aspx"
}

