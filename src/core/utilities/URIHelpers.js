namespace("core.utilities.URIHelpers");

core.utilities.URIHelpers = {
    interceptClicks : function(){
        document.body.addEventListener("click", this.onLinkClicked.bind(this), false);
    },

    setTargetWindow : function(target){
        this.targetWindow = target;
    },

    getTargetWindow : function(target){
        return this.targetWindow||window;
    },

    evalUrl : function (path) {
        console.warn("Deprecated: core.utilities.URIHelpers.evalUrl() - use core.utilities.URIHelpers.eval() instead");
        return this.eval(path);
    },

    onLinkClicked : function(e){
        var self=this;

        var aTag = core.ui.HtmlComponent.prototype.getRealTargetFromEvent(e, "a", "body");
        // var val = aTag?aTag.href:e.target.textContent;
        var val = "";
        if(aTag) {
            var href = aTag.getAttribute("href").trim();//href.trim();
            // debugger;
            if(!href || href == "#" || href == "" || href.indexOf(":void") >=0) {
                val = (aTag.textContent.trim().length > 0)?
                aTag.textContent:(application.classname + "_" + aTag.id);
            } else {
                val = href;
            }
        } else {
            val = e.target.textContent;
        }
        val = val.trim();

        if(val && val.length > 0) {
            e.preventDefault();
            var mapped_uri = core.utilities.URIHelpers.map(val);
            if(mapped_uri){
                var href = core.utilities.URIHelpers.eval(mapped_uri);
                if(href) { 
                    var qstring = val.split("?")[1];
                        qstring = qstring||"";
                    var url = href + ("?" + qstring);
                    this.track(url);
                    setTimeout(function() {
                        
                        // location.href = url;
                        var target = self.getTargetWindow();
                            target.location.href = url;
                    },100)
                }
                else {

                }
            }
        }
    },

    track : function(data) {
        if(typeof data == "string"){
            var urlparts = data.split("/")
            // u[u.length-2]
            application.track({
                "Type": "event", 
                "Action": "click", 
                "Category": urlparts[urlparts.length-2], 
                "Label": data
            })
        }
        else if(typeof data == "object"){
            application.track(data)
        }
    },

    map : function(url){
        for(var regex in ROUTES.URL_MAPPING) {
            var r = new RegExp(regex);
            var matches = url.match(r);
            if(matches) {
                return ROUTES.URL_MAPPING[regex]
            }
        }
        console.warn("core.utilities.URIHelpers.map(): No URL_MAPPING defined for:\n" + url)
        return null;
    },

    eval : function(path){
        path = path.replace(/\{([a-zA-Z0-9\.\_\-]+)\}/gim, function(){
            return eval(arguments[1]);
        });
        return path;
    },

    //TODO:revisit this logic to handle links that are not true <A> tags.
    highlight : function(all_links){
        all_links = [].slice.call(all_links||document.body.querySelectorAll("a"));
        for(var regex in ROUTES.URL_MAPPING) {
            var r = new RegExp(regex);
            all_links.forEach(function(a){
                var href = a.getAttribute("href");
                var matches = href && href.match(r);
                if(matches) {
                    a.classList.remove("active");
                    setTimeout(function(){
                        a.classList.add("active");
                    },200)
                }
            });
        }
    }
};