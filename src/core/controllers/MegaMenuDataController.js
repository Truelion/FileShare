//require core.controllers.DataController

namespace("core.controllers.MegaMenuDataController", {
    '@inherits' : core.controllers.StorageController,
    SEED_DATA_URI:ROUTES.DATA.MEGA_MENU,

	initialize : function(host, async){
		this.allocate("mega-menu");
		// if(!this.getData()){
		// 	this.load(this.CONFIG, {
		// 		role : Session.user.role,
		// 		country: Session.State.currentLanguage.CODE
		// 	});
		// }
	}
});