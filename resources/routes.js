/* These ROUTES define URI's for any resource (json, css, html, js)
 * that may be used by the application. Each route has one URI for
 * each environment. Hardcoded url's are not recommended in the app.

 * Only the URI for the current environment is used. For example,
 * To get a list of employee ACCOUNTS (resources/data/user-{role}.json),
 * a call like this is crafted internally inside a data controller:



    var params = {role : "Employee"};   //'role' is a token in the route
    var async = true;
    var req = new core.http.WebAction(ROUTES.DATA.ACCOUNTS, params, {}, async);
        req.invoke({
            onSuccess  : dataReady,
            onFailure  : failure,
            onRejected : failure
        });

        var failure     = function(xhr, responseText){};
        var dataReady   = function(xhr, responseText){
            var data = JSON.parse(responseText);
        };


    Internally, our apps usually will not craft low-level XHR requests
    like these because it is handled by the <core.data.DataController>
    base-class. Since all DataControllers (Ex: AccountsDataController)
    are sub-classes of the baseclass <DataController>, only the route needs
    to be provided by the controllers, the base class preforms the 
    low-level requests and supplies back parsed JSON data.

    The object-oriented approach to work with employee accounts will
    look like this in our demo code:

    var accountsDataController = new core.data.AccountDataController;
        accountsDataController.getEmployeeByRole("Employee");

 */



ROUTES = {
    activities :{
        HOME : {
            dev: Config.ROOTPATH + "src/activities/Home/index.js",
            staging: Config.ROOTPATH + "src/activities/Home/index.js",
            test : Config.ROOTPATH + "src/activities/Home/index.js",
            prod : Config.ROOTPATH + "src/activities/Home/index.js"
        }
    },
    
    HTML : {
        HOME : {
            dev: Config.ROOTPATH + "src/activities/Home/index.html",
            staging: Config.ROOTPATH + "src/activities/Home/index.html",
            test : Config.ROOTPATH + "src/activities/Home/index.html",
            prod : Config.ROOTPATH + "src/activities/Home/index.html"
        },
        LOGIN: {
            dev : Config.ROOTPATH + "src/activities/Login/index.html",
            staging : Config.ROOTPATH + "src/activities/Login/index.html",
            test : Config.ROOTPATH + "src/activities/Login/index.html",
            prod : Config.ROOTPATH + "src/activities/Login/index.html"
        }
    },
    
    DATA:{  
        ACCOUNTS : {
            config : {
                table: "accounts"
            },
            dev: Config.ROOTPATH + "resources/data/accounts.json",
            staging: Config.ROOTPATH + "resources/data/accounts.json",
            test : Config.ROOTPATH + "resources/data/accounts.json",
            prod : Config.ROOTPATH + "resources/data/accounts.json"
        },

        PAY_EQUITY : {
            config : {
                table: "pay_equity"
            },
            dev: Config.ROOTPATH + "resources/data/benchmarks/pay_equity.json",
            staging: Config.ROOTPATH + "resources/data/benchmarks/pay_equity.json",
            test : Config.ROOTPATH + "resources/data/benchmarks/pay_equity.json",
            prod : Config.ROOTPATH + "resources/data/benchmarks/pay_equity.json"
        },
		MEGA_MENU : {
            config : {
                table: "mega-menu"
            },
            dev: Config.ROOTPATH + "resources/data/megamenu/{country}/{role}.json",
            staging: Config.ROOTPATH + "resources/data/megamenu/{country}/{role}.json",
            test : Config.ROOTPATH + "resources/data/megamenu/{country}/{role}.json",
            prod : Config.ROOTPATH + "resources/data/megamenu/{country}/{role}.json"
        },
        STATE_TOPOLOGY : {
            config : {
                table: "topology"
            },
            dev: Config.ROOTPATH + "resources/data/state_converted.json",
            staging: Config.ROOTPATH + "resources/data/state_converted.json",
            test : Config.ROOTPATH + "resources/data/state_converted.json",
            prod : Config.ROOTPATH + "resources/data/state_converted.json"
        },
        ANNUAL_WAGES_BY_LOCATION : {
            config : {
                table: "getAnnualWageCostByLocation"
            },
            dev: Config.ROOTPATH + "resources/data/getAnnualWageCostByLocation.json",
            staging: Config.ROOTPATH + "resources/data/getAnnualWageCostByLocation.json",
            test : Config.ROOTPATH + "resources/data/getAnnualWageCostByLocation.json",
            prod : Config.ROOTPATH + "resources/data/getAnnualWageCostByLocation.json"
        },
        REGIONS : {
            config : {
                table: "regions"
            },
            dev: Config.ROOTPATH + "resources/data/regions.json",
            staging: Config.ROOTPATH + "resources/data/regions.json",
            test : Config.ROOTPATH + "resources/data/regions.json",
            prod : Config.ROOTPATH + "resources/data/regions.json"
        },
        SESSION : {
            config : {
                table: "session"
            },
            dev: Config.ROOTPATH + "resources/data/session.json",
            staging: Config.ROOTPATH + "resources/data/session.json",
            test : Config.ROOTPATH + "resources/data/session.json",
            prod : Config.ROOTPATH + "resources/data/session.json"
        }
    },
    
    URL_MAPPING : {
        // "#logout" : Config.ROOTPATH + Config.Applications.LOGIN
    }
};
