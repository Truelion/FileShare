
TemplateEnginePlugins = {
	Kruntch : {
		parseTemplate : function(templateString, data){
			if(Kruntch) {
	    		var text = Kruntch.Apply(templateString, data);
	        	return text;
	    	} else {
	    		console.warn("TemplateEnginePlugins.parseTemplate() - Kruntch template api not defined.");
	    		return templateString;
	    	}
	    }
	},

	Mustache : {
		parseTemplate : function(templateString, data){
			if(Mustache) {
	    		var text = Mustache.render(templateString, data);
	        	return text;
	    	} else {
	    		console.warn("TemplateEnginePlugins.parseTemplate() - Mustache template api not defined.");
	    		return templateString;
	    	}
	    }
	},

	Handlebars : {
		parseTemplate : function(templateString, data){
			if(Handlebars) {
				var template = Handlebars.compile(templateString);
				var text    = template(data);
	        	return text;
	    	} else {
	    		console.warn("TemplateEnginePlugins.parseTemplate() - Handlebars template api not defined.");
	    		return templateString;
	    	}
	    }
	}
};
