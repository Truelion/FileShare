//=require core.vo.Model


namespace("core.models.UserAccount", {
	'@inherits' : core.vo.Account,

	initialize : function (data) {
		data.username = data.username||Math.uuid(8);//username is required.
		this.parent(data);

	},

	isValid : function(){
		this.parent();
		if(!this.data.first_name) {
			throw new Error(this.namespace + "#isValid() - the users first_name is required.");
			return false;
		}
		if(!this.data.last_name) {
			throw new Error(this.namespace + "#isValid() - the users last_name is required.");
			return false;
		}
		if(!this.data.role) {
			throw new Error(this.namespace + "#isValid() - the users role is required.");
			return false;
		}
		return true;;
	}
});