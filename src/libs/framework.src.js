$framework = {
	stable : "1.0.4",
	nightly : "2.0.0",
	current: "2.0.0",
	
	releases :[
		{
			version : "1.0",
			build : "08/27/2017",
			description : "This changeset fixes the ambiguous errors when loading paths that could not be found.",
			notes : [
				"Improved error handling feedback on XmlHttpRequests",
				"Classes now able to resolve @import paths relative to its directory"
			],
			install_notes:"None"
		},
		{
			version : "1.0.1",
			build : "08/28/2017",
			description : "Slight refactoring to remove unnecessary code.",
			notes : [
				"Smaller framework filesize (from 121KB to 114KB)"
			],
			install_notes:"None"
		},
		{
			version : "1.0.2",
			build : "10/16/2017",
			description : "Improved data controller functionality and robustness",
			notes : [
				"StorageController rewritten to support seeding of data(json) into persistent memory.",
				"DataGrid rewritten as bare-bones UI",
				"Framework size reduction, now 108KB."
			],
			install_notes:"None"
		},
		{
			version : "1.0.3",
			build : "11/30/2017",
			description : "Cleaned up console warnings -- mimeTypes of JavaScript, CSS, HTML and JSON load requests",
			notes : [
				"As documented by Mozilla (https://goo.gl/imvBTt), if the server doesn't specify a MIME type, the returned text gets treated like xml and when you receive plain text or something instead of xml you get an error: XML Parsing Error: not well-formed",
				"Fixed by calling xhr.overrideMimeType(<mime type>) before call to .send()",
				"Reduces XML-parse error spaming the console",
				"The @template console warning is no longer shown.",
				"Removed alerts() when StorageController is seeding data for the first time."
			],
			install_notes: "Implement [Config.DEFAULT_LANG] in -appconfig. Ex: <code>Config.DEFAULT_LANG = Constants.Languages.IT_IT;</code><br/>\
			Implement [Config.ALLOW_LANG_SELECTION] bool in -appconfig. Used by Login screens for enable/disabling of language dropdown, relies on Config.DEFAULT_LANG.<br/>\
			Implement [Config.SHOW_FRAMEWORK_RELEASE_NOTES] bool in -appconfig. Turn off/on notifications when framework is updated to latest rev. <code>true</code> by default.<br/>\
			Implemement [Config.Applications.FRAMEWORK_RELEASE_NOTES] and [Config.Applications.LOGINCONFIG] in -appconfig to point to these new required application folders. Example:\
			<br/>\
			<code>\
				Config.Applications = {\
					FRAMEWORK_RELEASE_NOTES : 'src/applications/FrameworkReleaseNotes/index.html',<br/>\
					LOGINCONFIG : 'src/applications/LoginConfigurator/index.html'\
				}\
			</code><br/>"
		},
		{
			version : "1.0.4",
			build : "12/20/2017",
			description : "Critical fixes and improvements",
			notes : [
				"Fixes critical error in StorageControllers#reset() method where var 'name' was not defined. Now uses alloc_name. Previously, calling reset on StorageController sub-classes caused an error, 'Session.localStorage[name] is not defined'.",
				"Fixes error where core.controllers.DataController#getItemById(id) was matching items that had 'undefined' id's with 'undefined' id's that was passed into getItemById(id). Example, calling dataController.getItemById(undefined) would match the first item in the dataset that had an undefined/null 'id'.",
				"DataController base class update() now fires an 'updated' event.",
				"Improvement to core.utilities.URIHelpers. Uri mapping now able to match anchor links and other buttons that are represented by DIVs, Buttons or other textual nodes based on the nodes textContent."
			],
			install_notes:"None"
		},
		{
			version : "2.0.0",
			build : "04/24/2018",
			description : "Framework Improvements",
			notes : [
				"<strong>2.0.0 Breaking Change:</strong><br/>\
				2.0.0 is a breaking major release that is not compatible with any\
				previous application running a version that is older than 2.0 due to numerous internal\
				improvements and modifications especially to Configuration.",
				"<strong>Major Configuration Changes</strong><br/>inline appconfig{} entries\
				in HTML pages are still permitted but keys have changed to Config.* -- see -appconfig.js\
				for global declarations. Can be overridden inline. Overall, inline appconfig{} is now merged\
					into Config{} defined in -appconfig.js to be more streamlined and not separate means\
				of configuring an app",
				"<strong>New Feature: JIT Loading (see: <a href=\"#seamless_presentation\">PPT</a>)</strong><br/>Modified bootoader to download an applications controller just-in-time (JIT).\
				JIT loading is now recommended over hardcoding the script src in &lt;head&gt;,\
				as the framework is able to intelligently load full the source during debug development\
				(index.js) and switch to a compressed build (index.min.js) at production time based on\
				&lt;Session.Debug.production&gt flag setting and &lt;Config.USE_COMPRESSED_BUILD&gt; (-appconfig setting). In debug mode, Class dependencies are also JIT loaded, this includes loading any require statements just-in-time.\
				When the application is compressed, all require statements are traced and baked\
				into a final compressed file (index.min.js) used when &lt;Session.Debug.production=true&gt,\
				and &lt;Config.USE_COMPRESSED_BUILD&gt; is true. Require statements will no longer attempt to load as the dependency graph will be \
				all baked into a single file.",
				"<strong>New Feature: Seamless build tools (see: <a href=\"#seamless_presentation\">PPT</a>)</strong>",
				"<strong>New Feature: Bindings</strong><br/> for terse event-handling, use as such with\
				ES5 Arrow Functions:<br/>\
				<code>\
					this.bind('#changeNameBtn', 'click', () => this.onChangeName());\
				</code>\
				<br/> VS.<br/>\
				<code>\
				var changeNameBtn = this.querySelector('#changeNameBtn');<br/>\
					changeNameBtn.addEventListener('click', this.onChangeName.bind(this), false);\
				</code>\
				<br>\
				As an added benefit, all bindings return an <core.ui.Binding> object which \
				can be used to bind, unbind and toggle the binding on/off, ex:<br/>\
				<code>\
					var b = this.bind('#changeNameBtn', 'click', () => this.onChangeName());<br/>\
						b.unbind(); //disables event listening but can be re-enabled.\
				</code>\
				<br/> VS.<br/>\
				<code>\
					var onChangeName = function(){\
						//do something\
					}.bind(this);<br/>\
					var changeNameBtn = this.querySelector('#changeNameBtn');<br/>\
					changeNameBtn.addEventListener('click', onChangeName, false);<br/>\
					changeNameBtn.removeEventListener('click', onChangeName, false);\
				</code>\
				<br/>\
				Above, listeners can only be removed by proving the exact pointer\
				back to the handler, along with the event name and capture flag. A\
				short-hand cannot be used, the handler must be defined and referenced\
				in this way (W3C Standards).<br/>\
				Bindings call also attach to many Nodes using just one listener,ex:<br/>\
				<code>\
					this.bind('.button', 'click', () => this.onChangeName())\
				</code><br/>\
				If there were 10 .button elements, only 1 listener is attached",
				"<strong>New Feature: Local resource path interpolation.</strong><br/>A Components\
				CSS and HTML can now easily reference assets from its local /resources folder in this\
				manner:<br/>\
				<code>\
					&lt;img src='$ROOT/src/./resources/images/checkmark.png'/&gt;\
				</code>\
				<br/><br/>\
				In CSS, it's roughly the same convention:<br/>\
				<code>\
					background-image:url($ROOT/src/./resources/images/checkmark.png);\
				</code><br/>\
				This path structure is agnostic and there are no hardcoded references\
				down from the root. Components can store one-off assets locally within\
				their own folder and not dirty the global /resources folder\
				which is used for shared assets.<br/<br/>\
				Here, $ROOT is interpolated as appconfig.apppath and 'src/./' is\
				interpolated as the components namespaced folder. Ex, core.ui.Button\
				resolves to core/ui/Button.<br/<br/>\
				Previously this path would resemble: <br/>\
				<code>../../../src/core/ui/Button/resources/images/checkmark.png</code>.<br/><br/>\
				Since core.ui.Button could be used in a different nested Application, the relative root\
				path would change forcing the developer to manually hardcode a fix. In addition, it\
				makes the component less reusable in different projects and/or applications.<br/<br/>\
				Components can now be zipped up or stored on npm and dropped into any application as\
				a whole modular UI part. Note: You must ensure your own dependencies to other libs if\
				the component relies on it."
			],
			install_notes:"None"
		}
	]
}

function run_framework_diagnostics_check(){
	if(!Config.DEFAULT_LANG) {
		console.warn("Config.DEFAULT_LANG is not implemented.")
	}
	else {
		console.info("Config.DEFAULT_LANG passed check")
	}

	if(typeof Config.ALLOW_LANG_SELECTION != "boolean") {
		console.warn("Config.ALLOW_LANG_SELECTION is not implemented. Declare as a boolean")
	} else if(typeof Config.ALLOW_LANG_SELECTION == "boolean") {
		console.info("Config.ALLOW_LANG_SELECTION passed check")
	}


	if(typeof Config.SHOW_FRAMEWORK_RELEASE_NOTES != "boolean") {
		console.warn("Config.SHOW_FRAMEWORK_RELEASE_NOTES is not implemented. Declare as a boolean")
	} else if(typeof Config.SHOW_FRAMEWORK_RELEASE_NOTES == "boolean") {
		console.info("Config.SHOW_FRAMEWORK_RELEASE_NOTES passed check");

		if(typeof Config.Applications.FRAMEWORK_RELEASE_NOTES != "string") {
			console.warn("Config.Applications.FRAMEWORK_RELEASE_NOTES is not declared.")
		} else if(typeof Config.Applications.FRAMEWORK_RELEASE_NOTES == "string") {
			console.info("Config.Applications.FRAMEWORK_RELEASE_NOTES passed check");
		}
	}




	if(typeof Config.Applications.LOGINCONFIG != "string") {
		console.warn("Config.Applications.LOGINCONFIG is not declared but may be commented out. Ensure the application exists.");
	} else if(typeof Config.Applications.LOGINCONFIG == "string") {
		console.info("Config.Applications.LOGINCONFIG passed check");
	}

	var  oXMLHttpRequest = new core.http.XMLHttpRequest;
         oXMLHttpRequest.open("GET", "../../../src/applications/LoginConfigurator/index.js", true);
         if(oXMLHttpRequest.overrideMimeType){
            oXMLHttpRequest.overrideMimeType("text/javascript")
         }
         oXMLHttpRequest.setRequestHeader("Content-type", "text/javascript");
         oXMLHttpRequest.onreadystatechange  = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                if(this.status == 0 || this.status==200){
                	console.info("Successfully detected Application Class: LoginConfigurator");
                }
            }
         }
         oXMLHttpRequest.send(null);
}


appconfig = window.appconfig||Config;

//----------EXTENSIONS----------------
/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2009 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/*
 * Generate a random uuid.
 * http://www.broofa.com/2008/09/javascript-uuid-function/
 * 
 * 
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 * 
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
; Math.uuid = (function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''); 

  return function (len, radix) {
    var chars = CHARS, uuid = [];
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (var i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (var i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  };
})();

// A more compact, but less performant, RFC4122v4 compliant solution:
Math.uuid2 = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
  }).toUpperCase();
};




Math.abbrNum = function(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
    var abbrev = [ "k", "m", "b", "t" ];

    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);

        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.round(number*decPlaces/size)/decPlaces;

             // Handle special case where we round up to the next abbreviation
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }

             // Add the letter for the abbreviation
             number += abbrev[i];

             // We are done... stop
             break;
        }
    }

    return number;
};

if (!Object.prototype.extend) {
    Object.defineProperty(Object.prototype, "extend", {
        enumerable : false,
        configurable : true,
        writable : true,
        value : function(source) {
            for (var property in source) {
                if(source.hasOwnProperty(property)){
                    this[property] = source[property];
                }
            }
            return this;
        }
    });
};

if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
        enumerable : false,
        configurable : true,
        writable : false,
        value : function(prop, handler) {
            var oldval = this[prop], newval = oldval, getter = function() {
                return newval;
            }, setter = function(val) {
                oldval = newval;
                return newval = handler.call(this, prop, oldval, val);
            };
            if (delete this[prop]) {// can't watch constants
                Object.defineProperty(this, prop, {
                    get : getter,
                    set : setter,
                    enumerable : true,
                    configurable : true
                });
            }
        }
    });
};


if (!Object.prototype.addChangeListener) {
    Object.defineProperty(Object.prototype, "addChangeListener", {
        enumerable : false,
        configurable : true,
        writable : true,
        value : function(prop, handler) {
            var oldval = this[prop], 
                newval = oldval, 
                getter = function() {
                    return newval;
                }, 
                setter = function(val) {
                    oldval = newval;
                    var self=this;
                    setTimeout(function(){
                        handler.call(self, prop, oldval, val);
                    },100);
                    return newval = val;//handler.call(this, prop, oldval, val);
                };
            if (delete this[prop]) {// can't watch constants
                Object.defineProperty(this, prop, {
                    get : getter,
                    set : setter,
                    enumerable : true,
                    configurable : true
                });
            }
        }
    });
};


// object.unwatch
if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, "unwatch", {
        enumerable : false,
        configurable : true,
        writable : false,
        value : function(prop) {
            var val = this[prop];
            delete this[prop];
            // remove accessors
            this[prop] = val;
        }
    });
}


toQueryString = function(obj, prefix) {
  var str = [];
  for(var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        toQueryString(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

if(!String.prototype.toHtmlElement){
    String.prototype.toHtmlElement = function(){
        var el;
        var _root = document.createElement('div');
            _root.style.display = "none";
            _root.innerHTML = this;
            if(!_root.firstChild || _root.firstChild.nodeType != 1) {
                el = _root;
                el.removeAttribute("style");
            } else {el = _root.firstChild;}
            return el;
    };
};

//Uses createDocumentFragment()
if(!String.prototype.toDomElement){
    String.prototype.toDomElement = function () {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = this.toString();
        var df= document.createDocumentFragment();
            df.appendChild(wrapper);
        return df.firstChild;
    }
};

function getVendorPrefixed(prop){
    var i, 
    s = window.getComputedStyle(document.documentElement, ''), 
    v = ['ms','O','Moz','Webkit'];
    if( prop in s) return prop;
    prop = prop[0].toUpperCase() + prop.slice(1);
    for( i = v.length; i--; )
        if( v[i] + prop in s) return (v[i] + prop);
};

if(!String.prototype.toVendorPrefix){
    String.prototype.toVendorPrefix = function(){
        return getVendorPrefixed(this.toString());
    }
};


if(!String.prototype.htmlEscape){
    String.prototype.htmlEscape = function(){
      return String(this)
                .replace(/&/g, '&amp;',"g")
                .replace(/"/g, '&quot;',"g")
                .replace(/'/g, '&#39;',"g")
                .replace(/</g, '&lt;',"g")
                .replace(/>/g, '&gt;',"g"); 
    }
};

if(!String.prototype.htmlUnescape){
    String.prototype.htmlUnescape = function(){
      return String(this)
                .replace(/&amp;/g, '&',"g")
                .replace(/&quot;/g, '\"',"g")
                .replace(/&#39;/g, '\'',"g")
                .replace(/&lt;/g, '<',"g")
                .replace(/&gt;/g, '>',"g"); 
    }
};


if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
};


String.prototype.toLocaleString = function(langCode){
  var key = this.toString();
  if(Localization){
    if(Localization[langCode]){
      return Localization[langCode][key]||
             Localization[langCode][key.toLowerCase()]||key;
    } else {
      return key;
    }
  }
  else {
    return key;
  }
};


document.createComponent = function(namespace, element, model){
    var Klass = NSRegistry[namespace];
    return new Klass(model,element);
};


/* inspired by https://gist.github.com/1129031 */
/*global document, DOMParser*/
//https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
/*
    parser = new DOMParser();
    doc = parser.parseFromString("<div>asdsda</div>", "text/html");
 */
(function(DOMParser) {
    "use strict";

    var
      proto = DOMParser.prototype
    , nativeParse = proto.parseFromString
    ;

    // Firefox/Opera/IE throw errors on unsupported types
    try {
        // WebKit returns null on unsupported types
        if ((new DOMParser()).parseFromString("", "text/html")) {
            // text/html parsing is natively supported
            return;
        }
    } catch (ex) {}

    proto.parseFromString = function(markup, type) {
        if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
            var
              doc = document.implementation.createHTMLDocument("")
            ;
                if (markup.toLowerCase().indexOf('<!doctype') > -1) {
                    doc.documentElement.innerHTML = markup;
                }
                else {
                    doc.body.innerHTML = markup;
                }
            return doc;
        } else {
            return nativeParse.apply(this, arguments);
        }
    };
}(DOMParser));

if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
            return fToBind.apply(
                        (this instanceof fNOP && oThis) ? this : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments))
                   );
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    fBound.isBound = true;
    fBound.boundedFunction = fToBind;
    return fBound;
  };
};

if (!Function.prototype.debounce) {
    Function.prototype.debounce = function(wait, immediate) {
        var func = this;
        // 'private' variable for instance
        // The returned function will be able to reference this due to closure.
        // Each call to the returned function will share this common timer.
        var timeout;           
    
        // Calling debounce returns a new anonymous function
        return function() {
            // reference the context and args for the setTimeout function
            var context = this, 
            args = arguments;
    
            // this is the basic debounce behaviour where you can call this 
            // function several times, but it will only execute once [after
            // a defined delay]. 
            // Clear the timeout (does nothing if timeout var is undefined)
            // so that previous calls within the timer are aborted.
            clearTimeout(timeout);   
    
            // Set the new timeout
            timeout = setTimeout(function() {
    
                 // Inside the timeout function, clear the timeout variable
                 timeout = null;
    
                 // Check if the function already ran with the immediate flag
                 if (!immediate) {
                   // Call the original function with apply
                   // apply lets you define the 'this' object as well as the arguments 
                   //    (both captured before setTimeout)
                   func.apply(context, args);
                 }
            }, wait);
    
            // If immediate flag is passed (and not already in a timeout)
            //  then call the function without delay
            if (immediate && !timeout) 
                func.apply(context, args);  
         }; 
    }
};


if(!Function.prototype.delay){
  Function.prototype.delay = function(millisec, scope) {
    scope = scope||this;
    // Remove the seconds from the parameters to pass the this function.
    var args = [].slice.call(arguments, 2);
    // Call this function with the specified parameters in the specified amount
    // of seconds.
    var fnThis = this;
    return setTimeout(function() {
      fnThis.apply(scope, args);
    }, millisec);
  };
};

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
};

if(!Array.prototype.toArray){
    Array.prototype.toArray = function(o){
        return [].slice.call(o,0);
    };
};


if(!Array.prototype.where){
    Array.prototype.where = function(exp){
        var exp = new Function("$", "return " + exp);
        var arr=[];
        for(var i=0; i<=this.length-1; i++){
            if(exp(this[i])){
                arr.push(this[i])
            }
        }
        return arr;
    };
}

if("logging" in Config && Config.LOGGING != true) {
  for(var k in console){
      console[k]=function(){};
  }
};


window.getParameterByName = function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.href);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};



window.onerror = function(message, url, linenumber) {
  try{console.error("JavaScript error: " + message + " on line " + linenumber + " for " + url)}
  catch(e){}
};


;( function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelRequestAnimationFrame = window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());




prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})();


//--------------LIBS------------------

var Observer = function() {
    this.observations = [];
    this.subscribers  = {};
};
 
var Observation = function(name, func) {
    this.name = name;
    this.func = func;
};
 
Observer.prototype = {
    addEventListener : function(eventName, callback, capture){
        if (!this.subscribers[eventName]) {
            this.subscribers[eventName] = [];}
        this.subscribers[eventName].push(new Observation(eventName, callback));
    },
    
    dispatchEvent : function(eventName, data, scope) {
        scope = (scope||this||window);
        var funcs = this.subscribers[eventName]||[];
   	        funcs.forEach(function notify_observer(observer) { 
                observer.func.call(scope, data); 
            });  
    },
    
    removeEventListener : function(eventName, callback){
        var subscribers = this.subscribers[eventName]||[];
            subscribers.remove(function(i) {
                return i.name === eventName && i.func === callback;
            });
    }
};

//require core.data.CircularBuffer

function Ecmascript6ClassTranspiler(){};
Ecmascript6ClassTranspiler.prototype.transpile = function(src, doc){
	//if(doc){this.transpileDocument(); return;}
	//if(!src || !src.indexOf("@transpile") >=0){return src;}
	if(src.indexOf("@transpile") == -1) {return src;}

	var func = /(function|[A-Za-z\s?]*)(\([a-zA-Z]*\))\{/gm;
	src = src.replace(func, function(fullmatch, funcName, argments, index, match){
	    return  (/function/gm.test(funcName))? (funcName + argments + "{") : (funcName + " : function" + argments + "{")
	});

	var clsNm = /class\s+([A-Za-z\.]+)[\n\s]*(extends\s([A-Za-z\.]+))?[\s\n]*(with\s+([A-Za-z\.\,\s]+))?\{/gm;
	src = src.replace(clsNm, function(fullmatch, classNm, _extends, ext, withStatement, withClasses){
	    //alert("withClasses: " + withClasses);
	    var inherits = ext? ("'@inherits' : " + ext + ",\n"):"";
	    var mixins = withClasses? ("'@traits' : [" + withClasses + "],\n"):"";
	    return " namespace('" +  classNm + "', {" + inherits + mixins;
	});

	var staticMembers = /static\s+([A-Za-z\s?]*)/gm;
	src = src.replace(staticMembers, function(fullmatch, funcName){
	    return  ("'@static " + funcName.trim() + "'").trim();
	});


	var commaDelemiter = /\}([\n\s]*\b[a-zA-Z\s]*)\:\s*function/gm;
	src = src.replace(commaDelemiter, function(fullmatch, closingCurly){
	    return fullmatch.replace("}","},");
	});

	var cctor = /constructor\s?/gm;
	src = src.replace(cctor, function(fullmatch, argments){
	    return  "initialize"
	});

	var superParent = /super([\.A-Za-z0-9]*)?/gm;
	src = src.replace(superParent, function(fullmatch, superParentStatement){
		//alert(fullmatch);
		if(fullmatch) { return "this.parent"}
	    return ""
	});

	src = src.replace(/['"]\@transpile['"][;]*/,"");

	return src + ");\n";
};

Ecmascript6ClassTranspiler.prototype.transpileDocument = function(){
	var self=this;
	var scripts = document.querySelectorAll("script[type='text/es6']");
		scripts = [].slice.call(scripts,0);
		//alert(scripts.length)
	for (var i=0; i<=scripts.length-1; i++) {
		var _script = scripts[i];
		this.Read(_script.getAttribute("src"), function(src){
			var transpiledSrc = self.Build(src);
			//alert("inline src: \n" + transpiledSrc);
			//script.setAttribute("type", "text/javascript");
			//script.setAttribute("charset", (config.charset || "utf-8"));
			//_script.removeAttribute("src");
			_script.parentNode.removeChild(_script);
			//script.text = transpiledSrc;

			var head   = document.getElementsByTagName("head").item(0);
			var script = document.createElement("script");
				script.setAttribute("type", "text/javascript");
				script.setAttribute("charset", (Config.CHARSET || "utf-8"));
				script.text = transpiledSrc;
				head.appendChild(script);
		})
	}
};

Ecmascript6ClassTranspiler.prototype.Build = function(source){
	var self=this;
	var finished = false;
    var reg 	 = /\/\/\=\s*require\s([0-9A-Za-z\-\_\.\/\\]*)/im; ///\'@require\s([0-9A-Za-z\-\_\.\/\\]*)\'/im;
    var usages   = {};

    var code = source;
    do {
    	code = code.replace(reg, function(fullmatch, _namespace, index, match){
            //var path = namespace;//self.ResolvePath(namespace);
            var s;
        	//if(!usages[path]) {
				//usages[path] = true;
				self.TryRead(_namespace, function(src){
					s = src;
				}, function(failure){s=failure});
			//} else {s=""}
            return s||"";
        });
        finished = (!reg.test(code)) ? 1:0; 
    }
    while (!finished);
    return code
};

Ecmascript6ClassTranspiler.prototype.ResolvePath = function(nsPath){
    var path = (/\.js$/.test(nsPath)) ? 
    	nsPath : "src/" + (nsPath.replace(/\./ig, "/") + ".js");
    return path;
};


Ecmascript6ClassTranspiler.prototype.Read = function(path, cbSuccess, cbFailure){
  var self=this;
  var oXMLHttpRequest = new XMLHttpRequest;
  		try {
	        oXMLHttpRequest.open("GET", (Config.ROOTPATH||appconfig.apppath) + path, false);
	        oXMLHttpRequest.setRequestHeader("Content-type", "text/javascript");
	        if(oXMLHttpRequest.overrideMimeType){
                oXMLHttpRequest.overrideMimeType("text/javascript")
             }
                 
	        oXMLHttpRequest.onreadystatechange  = function() {
	            if (this.readyState == XMLHttpRequest.DONE) {
	                if(this.status == 200 || this.status == 0) {
	                  var _src=this.responseText;
	                  if(_src && _src.length > 0){
	                      _src = self.transpile(_src);
	                      cbSuccess(_src);
	                  }
	                  else{
	                    cbFailure? cbFailure(_src,oXMLHttpRequest):null;
	                  }
	                }
	                else {
	                  cbFailure? cbFailure(this.statusText,this):null;
	                }
	            }
	         }
	         oXMLHttpRequest.send(null);
     	} catch(e){
     		console.warn(e.message + ": " + path)
     		//alert(e.message + ": " + path)
     		cbFailure? cbFailure(null,oXMLHttpRequest):null;
     	}
};


Ecmascript6ClassTranspiler.prototype.TryRead = function(_namespace, cbS, cbF){
  var self = this;
  var paths = [];
  if(/\.js$/.test(_namespace)){
  	paths.push(_namespace);
  } else{
	  var classname_path = ("src/" + _namespace.replace(/\./g,"/") + ".js");
	  var filename_path  = ("src/" + _namespace.replace(/\./g,"/") + "/index.js");
	  paths.push(filename_path);
	  paths.push(classname_path);
	  
  }
  var used = [];
  var success=false;
  var src = "";

  var succCb = function(_src){//success
    src = _src;
    success = true;
  };

  var failCb = function(_src){//failure
    success = false;
  };

  for(var i=0; i<=paths.length-1; i++){
    var path = paths[i];
    if(used.indexOf(path) >=0){continue}
    used.push(path);
    this.Read(path,succCb,failCb);
    if(success) {break;}
  };

  success ? 
    cbS(src): 
    cbF("//Unable to load <" + _namespace + "> from: " + paths.join(" Or "));
};








; (function(env) {
    var importedFiles={};
    var Class;
    env.NSRegistry = env.NSRegistry||{};
    env.Class = Class = function(){};
        Class.prototype = {
            preInitialize: function(){
                var res = this.initialize.apply(this, arguments);
                this.initializeTraits(arguments);
                return res;
            },
            
            initialize       : function() {return this;},
            
            hasOwnMember : function(key){
                try{return this.constructor.prototype.hasOwnProperty(key)}
                catch(e){return this.hasOwnProperty(key);}
            },
            
            initializeTraits : function(){
                var traits = this["@traits"]||[];
                for(var i=0; i<=traits.length-1; i++){
                    var trait = traits[i];
                    if(typeof trait == "function"){
                        new trait(this,arguments);
                    }
                    else if(trait && trait.initialize) {}
                }
            }
        };
    
    
    env.namespace = function(ns, def){
        if(def && typeof def == "object"){
            def.namespace = ns;
            def.classname = /([a-zA-Z]*)$/.test(ns) ? RegExp.$1:"Anonymous";
        }
        var n = createNS(ns);
        env.NSRegistry[ns] = n[0][n[1]] = def ?
            createClass(def,ns) : {};
    };
    
    
    var createNS = function(aNamespace){
        var scope       = env;
        var parts       = aNamespace.split(/\./g); 
        var classname   = parts.pop();
            
        for (var i = 0; i <= parts.length - 1; i++) {
            scope = scope[parts[i]]||(scope[parts[i]] = {});
        };
        return [scope,classname];
    };
    
    /*var createClass = function(properties){
        if(typeof properties == "function"){return properties}
        var obj = (properties["@inherits"]||Class);
        var traits = (properties["@traits"]||{});
        if (typeof(obj) === "function") {
            var F = function(){}; //optimization
                F.prototype = obj.prototype;
                
            var klass = function() {
                return this.preInitialize.apply(this, arguments);
            };
            klass.prototype = new F();
            inheritProperties(klass.prototype, properties);
            klass.prototype.constructor = klass;
            klass.prototype.ancestor = obj;
            inheritTraits(klass.prototype, traits);
        }
        return klass;
    };*/
    
    var createClass = function(properties, ns){
        if(typeof properties == "function"){return properties}
        loadImports(properties, ns);
        delete properties["@imports"];
        delete properties["@import"];
        var obj = properties["@inherits"];
        //(properties["@inherits"]||Class);
        /*if(!properties["@inherits"] && ("@inherits" in properties) && properties["@imports"]){
            loadImports(properties["@imports"], ns);
            obj = properties["@inherits"];
            alert(properties["@inherits"])
        } else{
            properties["@inherits"] = Class;
            obj = properties["@inherits"];
        }
        delete properties["@imports"];*/
       if(!("@inherits" in properties)) {
           obj = properties["@inherits"] = Class;
       }
       else if(typeof obj == "string") {
           var inheritedNS = obj;
           obj = properties["@inherits"] = (NSRegistry[obj]);
           if(!obj){
               throw new TypeError(ns + " inherits from a class, " +inheritedNS + " - that is not defined")
           }
       }
       else {
           obj = properties["@inherits"] = (properties["@inherits"]);
           if(!obj){
               throw new TypeError(ns + " inherits from a class that is not defined.")
           }
       }
        
        var traits = (properties["@traits"]||{});
        if (typeof(obj) === "function") {
            var F = function(){}; //optimization
                F.prototype = obj.prototype;
                
            var klass = function() {
                return this.preInitialize.apply(this, arguments);
            };
            klass.prototype = new F();
            inheritTraits(klass.prototype, traits);
            inheritProperties(klass.prototype, properties);
            klass.prototype.constructor = klass;
            klass.prototype.ancestor = obj;
            inheritStaticMembers(klass, obj, properties);
            // inheritTraits(klass.prototype, traits);
        }
        return klass;
    };

    var inheritStaticMembers = function(klass, ancestor, properties){
        for(var key in ancestor) {
            if(ancestor.hasOwnProperty(key)) {
                klass[key] = ancestor[key];
            }
        }
        for(var key in properties) {
            if(key.indexOf('@static ')>=0 && properties.hasOwnProperty(key)) {
                var propName = key.split(/\s+/)[1];
                klass[propName] = properties[key];
            }
        }
    };
    
    var loadImports = function(properties, ns){
        var amdSupported = true;
        var forceImports = false;
        var self=this;
        if(Config && ("AMD" in Config) && Config.AMD==false){
            amdSupported=false;
        }
        if(!("@forceimports" in properties) || properties["@forceimports"]==false){
            forceImports=false;
        } else {
            forceImports=true;
        }
        if(!amdSupported && !forceImports) {return}

        var imports = properties["@imports"]||properties["@import"]||[];
        for(var i=0; i<=imports.length-1; i++){
           imports[i] = relativeToAbsoluteFilePath(imports[i], ns);
        }
        for(var i=0; i<=imports.length-1; i++) {
            if(importedFiles[imports[i]]) {
               //console.info("@imports from cache:",imports[i]);
               continue;
            } else{
                 var  oXMLHttpRequest = new XMLHttpRequest;
                 oXMLHttpRequest.open("GET", imports[i], false);
                 oXMLHttpRequest.setRequestHeader("Content-type", "text/javascript");
                 if(oXMLHttpRequest.overrideMimeType){
                    oXMLHttpRequest.overrideMimeType("text/javascript")
                 }
                 oXMLHttpRequest.onreadystatechange  = function() {
                    if (this.readyState == XMLHttpRequest.DONE) {
                      if(this.status == 0 || this.status == 200){
                        var head   = document.getElementsByTagName("head").item(0);
                        var scripts = head.getElementsByTagName("script");
                        var script = document.createElement("script");
                            script.setAttribute("type", "text/javascript");
                            script.setAttribute("charset", (Config.CHARSET || "utf-8"));
                            var _src=this.responseText;
                            //if(_src.indexOf("class") >=0){
                                //debugger;
                                var ecmaTranspiler = new Ecmascript6ClassTranspiler;
                                _src = ecmaTranspiler.transpile(_src);
                                _src = ecmaTranspiler.Build(_src);
                                //alert(_src)
                            //}
                            script.text = _src;
                            head.appendChild(script);
                            //console.info("@imports loaded:",imports[i]);
                            importedFiles[imports[i]]=true;
                      }
                      else {
                        console.error("Javascript 404: Unable to load @imports file: " + imports[i] + " from Class: " + ns)
                      }
                    }
                 }
                 oXMLHttpRequest.send(null);
            }
        }
    };
    
    var relativeToAbsoluteFilePath = function(path, ns){
        var apppath = Config.ROOTPATH? (Config.ROOTPATH + "/") : "";
        ns = ns||this.namespace;

        if(path.indexOf("~/") >= 0){
            path = path.replace("~/", apppath);
        } else if(path.indexOf("./") >= 0){
            path = path.replace("./", apppath + ns.replace(/\./gim,"/") + "/");
        } 
        else if(path.indexOf("http") == 0){
            return path;
        }
        else{
            if(path.indexOf(Config.ROOTPATH)<0){
                path = apppath + path
            }
        }
        path = /http:/.test(path)? path : path.replace("//","/");
        if(path.indexOf(".html")>=0 && engine != TemplateEnginePlugins.Kruntch){
            path = path.replace(/\.html/, engine.ext+".html");
        }
        return path;
    };
    
    var inheritTraits = function(klass, properties){
        var _traits = properties; 
        if (_traits) {
            var traits = [];
            if (_traits.reverse) {
                traits = traits.concat(_traits.reverse());}
            else {traits.push(_traits);}
            var trait;
            for (var i = 0; (trait = traits[i]); i++) {
                if (typeof trait == "object") {
                    inheritProperties(klass, trait)
                }
            }
        }
        return klass;
    };
        
    var inheritProperties = function(dest, src, fname){
        if (!src || !dest) {return;}
        if (arguments.length === 3) {
            var ancestor    = dest[fname], 
                descendent  = src[fname], 
                method      = descendent;
                
            descendent = function() {
                var ref     = this.parent;
                this.parent = ancestor;
                var result  = method.apply(this, arguments);
                if(ref) {
                    this.parent = ref;
                }
                else { delete this.parent }
                return result;
            };
            descendent.valueOf  = function() { return method;};
            descendent.toString = function() { return method.toString();};
            dest[fname] = descendent;
        }
        else {
            for (var prop in src) {
                if (dest[prop] && typeof(src[prop]) === 'function') { 
                    inheritProperties(dest, src, prop);
                }
                else { dest[prop] = src[prop]; }
            }
        }
        return dest;
    };
})(this);


namespace("js.Trait", {
	initialize : function(){}
});


/*********************************************************************
 ::USAGE::
    Abstract class -- not to be used by developers directly. Instead, subclasses
    of this class should be used: Example, see: <<core.http.XMLHttpRequest>>
 **********************************************************************/


namespace("core.http.ResourceLoader", {
    open : function(method, path , async){
        console.info("calling core.http.ResourceLoader with url: ", path)
        var resolvedUrl = core.http.UrlRouter.resolve(path);
        console.log("core.http.ResourceLoader resolved", path, " to " + resolvedUrl)

        return resolvedUrl||path;
    },
    
    send : function(){
        
    },
    
    getDefaultMethod : function(meth){
        meth = meth||"GET";
        return meth;
    },
    
    getParameterSeperator : function(url){
        var sep = (url.indexOf("?")>=0)?"&":"?";
        return sep;
    }
});


namespace("core.http.XMLHttpRequest", {
    '@inherits': core.http.ResourceLoader,
    
    
    initialize : function(){
        this.async = true;
        this.oXMLHttpRequest = new XMLHttpRequest;
        this.oXMLHttpRequest.onreadystatechange  = this.onstatechange.bind(this);
        return this;
    },
    
    addEventListener : function(type, handler, capture){
        capture = (typeof capture == "boolean") ? capture:false;
        this.oXMLHttpRequest.addEventListener(type, handler, capture);
    },

    overrideMimeType : function(mimeType){
        this.oXMLHttpRequest.overrideMimeType(mimeType);
    },
    
    /*open : function(method, path , async){
        this.method = method||this.getDefaultMethod();
        var url = this.parent(this.method, path , async);
        if(this.method.toLowerCase() == "get"){
            url = url + this.getParameterSeperator(url) + (this.params?toQueryString(this.params):"");
        }

        this.oXMLHttpRequest.open(this.method, url, ((typeof async == "boolean")?async:true));
    },*/

    open : function(method, path , async, params){
        async   = ((typeof async == "boolean")?async:this.async);
        method  = method||this.getDefaultMethod();
        
        //path    = core.http.UrlRouter.resolve(path||this.uri);
        //path    = path + this.createQueryString(method,path,this.params);
        this.async  = async;
        this.method = method;
        this.params = params||{};
        path = this.buildPath(path);

        this.oXMLHttpRequest.open(method, path, async);
        return this;
    },

    buildPath : function(path){
        path = core.http.UrlRouter.resolve(path||this.uri);
        if(/\{([a-zA-Z0-9\.]+)\}/g.test(path)){
            path = this.createRESTfulUrl(path)
        }
        else{
            path  = path + this.createQueryString(this.method,path,this.params);
        }
        return path;
    },

    createRESTfulUrl : function(path){
        var self=this;
        path = path.replace(/\{([a-zA-Z0-9\.]+)\}/g, function(){
          var propName = arguments[1];
          return (self.params[propName]||eval(propName)||"")
        });

        return path;
    },

    createQueryString : function(method, url, params){
        if(Config.ENVIRONMENT == "dev" && method == "GET"){
            return this.getParameterSeperator(url) + (params?toQueryString(params):"");
        } else {
            return "";
        }
    },
    
    setRequestHeader : function(prop, value){
        //oXMLHttpRequest.setRequestHeader("Content-type", "text/javascript");
        if(prop && value){
            this.oXMLHttpRequest.setRequestHeader(prop, value);
        }    
    },
    
    send : function(data){
        var parsedString="";
        if(this.method.toLowerCase()=="post"){
            if(data && typeof data == "object"){
                parsedString = JSON.stringify(data)
            }
            else{
                parsedString=data;
            }
        }
        this.oXMLHttpRequest.send(parsedString);
    },
    
    onstatechange : function(){
        this.onreadystatechange.call(this.oXMLHttpRequest,this.oXMLHttpRequest);
    },
    
    onreadystatechange : function(){}
});


/*********************************************************************
 ::USAGE::
 
    var  oXMLHttpRequest = new core.http.XMLHttpRequest;
         oXMLHttpRequest.open("GET", "apps/Sample/main.js", true);
         oXMLHttpRequest.setRequestHeader("Content-type", "text/javascript");
         oXMLHttpRequest.onreadystatechange  = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                console.log(this.responseText)
            }
         }
         oXMLHttpRequest.send(null);
 **********************************************************************/



namespace("core.http.XMLHttpRequest", {
    '@inherits': core.http.ResourceLoader,
    
    
    initialize : function(){
        this.async = true;
        this.oXMLHttpRequest = new XMLHttpRequest;
        this.oXMLHttpRequest.onreadystatechange  = this.onstatechange.bind(this);
        return this;
    },
    
    addEventListener : function(type, handler, capture){
        capture = (typeof capture == "boolean") ? capture:false;
        this.oXMLHttpRequest.addEventListener(type, handler, capture);
    },

    overrideMimeType : function(mimeType){
        this.oXMLHttpRequest.overrideMimeType(mimeType);
    },
    
    /*open : function(method, path , async){
        this.method = method||this.getDefaultMethod();
        var url = this.parent(this.method, path , async);
        if(this.method.toLowerCase() == "get"){
            url = url + this.getParameterSeperator(url) + (this.params?toQueryString(this.params):"");
        }

        this.oXMLHttpRequest.open(this.method, url, ((typeof async == "boolean")?async:true));
    },*/

    open : function(method, path , async, params){
        async   = ((typeof async == "boolean")?async:this.async);
        method  = method||this.getDefaultMethod();
        
        //path    = core.http.UrlRouter.resolve(path||this.uri);
        //path    = path + this.createQueryString(method,path,this.params);
        this.async  = async;
        this.method = method;
        this.params = params||{};
        path = this.buildPath(path);

        this.oXMLHttpRequest.open(method, path, async);
        return this;
    },

    buildPath : function(path){
        path = core.http.UrlRouter.resolve(path||this.uri);
        if(/\{([a-zA-Z0-9\.]+)\}/g.test(path)){
            path = this.createRESTfulUrl(path)
        }
        else{
            path  = path + this.createQueryString(this.method,path,this.params);
        }
        return path;
    },

    createRESTfulUrl : function(path){
        var self=this;
        path = path.replace(/\{([a-zA-Z0-9\.]+)\}/g, function(){
          var propName = arguments[1];
          return (self.params[propName]||eval(propName)||"")
        });

        return path;
    },

    createQueryString : function(method, url, params){
        if(Config.ENVIRONMENT == "dev" && method == "GET"){
            return this.getParameterSeperator(url) + (params?toQueryString(params):"");
        } else {
            return "";
        }
    },
    
    setRequestHeader : function(prop, value){
        //oXMLHttpRequest.setRequestHeader("Content-type", "text/javascript");
        if(prop && value){
            this.oXMLHttpRequest.setRequestHeader(prop, value);
        }    
    },
    
    send : function(data){
        var parsedString="";
        if(this.method.toLowerCase()=="post"){
            if(data && typeof data == "object"){
                parsedString = JSON.stringify(data)
            }
            else{
                parsedString=data;
            }
        }
        this.oXMLHttpRequest.send(parsedString);
    },
    
    onstatechange : function(){
        this.onreadystatechange.call(this.oXMLHttpRequest,this.oXMLHttpRequest);
    },
    
    onreadystatechange : function(){}
});


/*********************************************************************
 ::USAGE::
 
    var  oXMLHttpRequest = new core.http.XMLHttpRequest;
         oXMLHttpRequest.open("GET", "apps/Sample/main.js", true);
         oXMLHttpRequest.setRequestHeader("Content-type", "text/javascript");
         oXMLHttpRequest.onreadystatechange  = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                console.log(this.responseText)
            }
         }
         oXMLHttpRequest.send(null);
 **********************************************************************/


namespace("core.http.WebAction", {
    '@inherits': core.http.XMLHttpRequest,
    
    
    initialize : function(uri, params, config, async){
        this.parent(uri, params);
        this.uri = uri;
        this.params = params;
        this.config=config||{};
        this.async=((typeof async == "boolean")?async:true);;
        return this;
    },
    
    setAsync : function(bool){
        this.async=bool;
    },
    
    open : function(method, path , async){
        async   = ((typeof async == "boolean")?async:this.async);
        method  = method||this.getDefaultMethod();
        
        //path    = core.http.UrlRouter.resolve(path||this.uri);
        //path    = path + this.createQueryString(method,path,this.params);
        this.async  = async;
        this.method = method;
        path = this.buildPath(path);

        this.oXMLHttpRequest.open(method, path, async);
        this.oXMLHttpRequest.setRequestHeader("Content-type", "text/plain");
        if(this.oXMLHttpRequest.overrideMimeType){
            this.oXMLHttpRequest.overrideMimeType("text/plain");
        }
        
        return this;
    },

    buildPath : function(path){
        path = core.http.UrlRouter.resolve(path||this.uri);
        if(/\{([a-zA-Z0-9\.]+)\}/g.test(path)){
            path = this.createRESTfulUrl(path)
        }
        else{
            path  = path + this.createQueryString(this.method,path,this.params);
        }
        return path;
    },

    createRESTfulUrl : function(path){
        var self=this;
        path = path.replace(/\{([a-zA-Z0-9\.]+)\}/g, function(){
          var propName = arguments[1];
          var propval = "";
          try{
            propval = eval(propName);
          } catch(e){propval=""};
          
          return (self.params[propName]||propval)
        });

        return path;
    },

    setParameter : function(key,value){
        this.params[key]=value;
    },
    
    createRequestHeaders : function(){
        if(Config.ENVIRONMENT != "dev" && this.method == "POST"){
            this.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        }
    },
    
    createQueryString : function(method, url, params){
        if(Config.ENVIRONMENT == "dev" && method == "GET"){
            return this.getParameterSeperator(url) + (params?toQueryString(params):"");
        } else {
            return "";
        }
    },
    
    createPostParams : function(params){
        if(Config.ENVIRONMENT != "dev" && this.method == "POST"){
            return (params?toQueryString(params):"");
        } else {
            return "";
        }
    },
    
    invoke : function(options){
        this.options = options;
        this.open();
        try{
            this.createRequestHeaders();
            this.send(this.createPostParams(this.params));
        } catch(e){
            alert("invoke: " +e.message)
        }
    },
    
    onstatechange : function(){
        var r = this.oXMLHttpRequest;
        if(r.readyState == XMLHttpRequest.DONE){
            if(r.status == 0||r.status == 200){
                if(this.isFailure(r)){
                    this.onFailure(r);
                } else{
                    try{
                        var data = JSON.parse(r.responseText);
                        if(typeof data != "object"){
                            this.onReject(r,data);
                       } else {
                            if (data) {
                                this.onSuccess(r);
                            } 
                        }
                    } catch(e){
                       this.onReject(r); 
                    }
                }
            }
            else {
                this.onFailure(r);
            }
        }
        //this.onreadystatechange.call(this.oXMLHttpRequest,this.oXMLHttpRequest);
    },
    
    onLogout : function(){
        console.warn("in logout function!");
        var resolvedUrl = core.http.UrlRouter.resolve("$.DATA.LOGOUT");
        location.href=resolvedUrl;
    },
    
    onReject : function(xhr){
        if(this.options.onReject) {this.options.onReject(xhr); }
        application.dispatchEvent("notification",true,true,{
            type:"UserError",
            message:("An http error occurred:\n" + xhr.responseText),
            httpresponse:xhr
        }); 
    },
    
    onSuccess : function(xhr){
        this.options.onSuccess(xhr, xhr.responseText);
    },
    
    onFailure : function(xhr){
        var errorMessage = "";
        if(xhr.status == 0||xhr.status == 200){
            if(xhr.responseText.length <=0){
                errorMessage = "200 Unknown Error -- response was empty";
            } else {
                errorMessage="200 Unknown Error: " + xhr.statusText;
            }
        } 
        else if(xhr.status == 400){
            errorMessage = "400 Bad Request -- request contains incorrect syntax";
        }
        else if(xhr.status == 401){
            errorMessage = "401 Unauthorized access to"
        }
        else if(xhr.status == 403){
            errorMessage = "403 Forbidden -- file permission protection"
        }
        else if(xhr.status == 404){
            errorMessage = "404 Resource Not Found";
        }
        else if(xhr.status == 500){
            errorMessage = "500 Internal Server Error -- server encountered an unexpected condition"
        }
        else if(xhr.status == 501){
            errorMessage = "501 Not Implemented -- HTTP method not supported"
        }
        else if(xhr.status == 502){
            errorMessage = "502 Bad Gateway -- Error due to improperly configured proxy, server overload or firewall issue"
        }
        else if(xhr.status == 503){
            errorMessage = "503 Temporarily not able to handle requests due to overload or maintenance occuring on server"
        }
        else if(xhr.status == 504){
            errorMessage = "504 Gateway Timeout"
        }
        else if(xhr.status == 507){
            errorMessage = "507 Insufficient Storage -- server is out of free memory"
        }
        else if(xhr.status == 509){
            errorMessage = "509 Bandwidth Exceeded -- bandwidth limit imposed by the system administrator has been reached"
        }
        else if(xhr.status == 510){
            errorMessage = "510 Not Extended -- an extension attached to the HTTP request is not supported"
        }
        else{
            errorMessage=xhr.statusText;
            //console.error(xhr.statusText,xhr);  
        }
        
        if(this.config.handleErrors){
            this.options.onFailure(xhr, xhr.responseText);
        } else {
            if(this.uri != ROUTES.DATA.HEARTBEAT){
                Session.State.lastHttpError = errorMessage;
                application.dispatchEvent("notification",true,true,{
                    type:"NetworkError",
                    message:errorMessage||"An unknown network error occurred",
                    httpresponse:xhr
                });
            }
        }
        console.error(errorMessage + " -- " +  xhr.responseURL);
    },
    
    isFailure : function(xhr){
        if(xhr.status == 0||xhr.status == 200){
            if(xhr.responseText.length <= 0){
                return true;
            }
            else {
                try{
                   var data = JSON.parse(xhr.responseText);
                   if(data && typeof data == "object"){
                       return false;
                   }
                } catch(e){
                    return true
                }
            }
        } else {
            return true
        }
    }
});


namespace("core.http.WebIterator", {
    '@inherits': core.http.WebAction,
    
    
    initialize : function(uri, params, name, owner){
        this.parent(uri, params);
        this.name=name;
        this.owner=owner;
        this.dir=1;
        this.configureDataMappings({
            total:"total", 
            count:"count"
        });
        return this;
    },

    configureDataMappings : function(mapping){
        this.data_mapping = mapping;
    },
    
    isIterable : function(){
        return true;
    },
    
    totalPages : function(){
        var totalPages = 1;
        if(this.data){
            var totalRecords = this.getTotalRecords();
            totalPages   = totalRecords/this.itemsPerPage();
        }
        return Math.ceil(totalPages);
    },
    
    currentPage : function(){
        var page = this.params.page;
        return page;
    },
    
    itemsPerPage : function(){
        /*var count = this.data_mapping.count||this.params.count;
        return count;*/
        var count_json_path = this.data_mapping.count;
        var f = new Function("$", "return $." + count_json_path);
        return f(this.data);
    },
    
    isLastPage : function(){
        var currentPage  = this.currentPage();
        return (this.isIterable()==false) || (currentPage == this.totalPages());
    },

    isFirstPage : function(){
        var currentPage  = this.currentPage();
        return (this.isIterable()==false) || currentPage == 1;
    },
    
    updatePagingOptions : function(){
        //var options = this.params.pagingOptions;
        if(this.isIterable()) {
            var currentPage  = this.currentPage();
            if(this.dir==1){
                if(currentPage < this.totalPages()){
                    this.params.page++;
                }
            } else {
                if(currentPage > 1){
                    this.params.page--;
                } else if(currentPage <= 0){
                    this.params.page=1;
                }
            }
        }
    },
    
    next : function(options){
        this.dir=1;
        this.updatePagingOptions();
        this.invoke(options);
    },
    
    previous : function(options){
        this.dir=0;
        this.updatePagingOptions();
        this.invoke(options);
    },
    
    refresh : function(){
        this.invoke();
    },
    
    invoke : function(options){
        /*this.options = options;
        if(this.isIterable()) {
            (this.dir==1)? this.next(options) : this.previous(options);
        }
        else {
            this.parent.invoke.call(this,options);
        }*/
        this.updatePagingOptions();
        this.parent(options);
    },
    
    setDirection : function(num){
        this.dir = (typeof num == "number" && (num >-1 && num <=1))? num:1;
    },
    
    getTotalRecords : function(data, path){
        var total_json_path = this.data_mapping.total;
        var f = new Function("$", "return $." + total_json_path);
        return f(this.data);
    },
    
    /*onstatechange : function(){
        var r = this.oXMLHttpRequest;
        if(r.readyState == XMLHttpRequest.DONE){
            if(r.status == 0){
                if(r.responseText.length <= 0){
                    this.onFailure(r, r.responseText)
                }
                else if(r.responseText.length > 0){
                    this.onSuccess(r, r.responseText)
                }
            }
            else if(r.status == 200){
                if(r.responseText.length <= 0){
                    this.onFailure(r, r.responseText)
                }
                else if(r.responseText.length > 0){
                    this.onSuccess(r, r.responseText)
                }
            }
            else if(r.status != 200){
                this.onFailure(r, r.responseText)
            }
        }
        //this.onreadystatechange.call(this.oXMLHttpRequest,this.oXMLHttpRequest);
    },*/
    
    onSuccess : function(r, responseText){
        var data = JSON.parse(r.responseText);
        this.data=data;
        if(this.isIterable()) {
            (this.dir==1)?
                this.onNext(r, data):
                this.onPrevious(r, data);
        }
        //this.parent.onSuccessHook.call(this,data);
    },
    
    onNext : function(xhr, data){
        console.log("onNext",data);
        this.options.onNext(xhr, data);
    },
    
    onPrevious : function(xhr, data){
        console.log("onPrevious",data);
        this.options.onPrevious(xhr, data);
    }

    
    /*open : function(method, path , async){
        async   = ((typeof async == "boolean")?async:true);
        method  = method||this.getDefaultMethod();
        path    = core.http.UrlRouter.resolve(path||this.uri);
        path    = path + this.createQueryString(method,path,this.params);
        this.async  = async;
        //this.uri    = path;
        this.method = method;
        
        this.oXMLHttpRequest = new XMLHttpRequest;
        this.oXMLHttpRequest.onreadystatechange  = this.onstatechange.bind(this);
        this.oXMLHttpRequest.open(method, path, async);
        return this;
    }*/
});


/**********************USAGE

var it;

if(!it){
  it = new core.http.WebIterator(ROUTES.DATA.PAGINATION_TEST,{
    page:1,
    count:3
  });
}

it.next()
it.totalPages()
 **************************/

namespace("core.http.ClassLoader", 
{
    '@traits': [new Observer],

    initialize : function(){
        this.observations = [];
        this.subscribers  = {};
        return this;
    },
    
    load : function(_namespace,filepath) {
        var self = this;
        var src;
        //var nsPath = filepath?filepath:("src/" + _namespace.replace(/\./g,"/") + ".js");
        var cbSuccess = function(src){
            src = es6Transpiler.Build(src);
            var head   = document.getElementsByTagName("head").item(0);
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("charset", (Config.CHARSET || "utf-8"));
            script.text = src;
            head.appendChild(script);
            if(NSRegistry[_namespace]) {
                var data = {Class: NSRegistry[_namespace], source: src, path: filepath};
                self.dispatchEvent("load", data, self)
            } else {
                
            }
        };

        var cfFailure = function(src, xhr){
            self.dispatchEvent("fail", xhr, self)
        }
        var es6Transpiler = new Ecmascript6ClassTranspiler();
            filepath?
                es6Transpiler.Read(filepath,cbSuccess, cfFailure):
                es6Transpiler.TryRead(_namespace,cbSuccess, cfFailure);

            
    }
});


/*********************************************************************
 ::USAGE::
 
    var c = new core.http.ClassLoader;
    
    c.addEventListener("load", function(data){
        console.info(data)
    });
    c.addEventListener("fail", function(){
        alert("failed")
    });
    
    c.load("com.Employee")
 **********************************************************************/



namespace("core.http.ScriptLoader", 
{
    '@inherits': core.http.ResourceLoader,
    
    initialize : function(){
        this.readyState = 0;
        this.status     = null;
        this.statusText = null;
        this.headNode   = document.getElementsByTagName("head").item(0);
    },
    
    open : function( iMethod, iURL, iAsync) {
        var url = this.parent(iMethod, iURL , iAsync);
        this.method = "GET";
        this.URL    = url;
    },
    
    send : function() {
        this.script = this.createScript(this.URL);
        var self            = this;
        var onLoad          = function() {
            self.status     = 200;
            self.statusText = "OK";
            self.readyState = 4;
            if (self.onreadystatechange) {
                self.onreadystatechange();
            }
        }
        var onReadyStateChange = function( iEvent ) {
            var e = (iEvent?iEvent:window.event).target?(iEvent?iEvent:window.event).target:(iEvent?iEvent:window.event).srcElement;
            if (e.readyState === "loaded" || e.readyState === "complete") {
                onLoad();
            }
        }
        if (navigator.product === "Gecko") {
            this.script.onload = onLoad;
        }
        else {
            this.script.onreadystatechange = onReadyStateChange;
        }
        
        this.headNode.appendChild(this.script);
        this.readyState = 1;
        if (this.onreadystatechange) {
            this.onreadystatechange(self);
        }
    
    },
    
    createScript : function(_src){
        var head   = document.getElementsByTagName("head").item(0);
        var scripts = head.getElementsByTagName("script");
        var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("charset", (config.charset || "utf-8"));
            script.setAttribute("src", _src);
            return script;
    }
});


/*********************************************************************
 ::USAGE::
 
    var c = new core.http.ScriptLoader();
    c.open("GET", "apps/Desktop/main.js");
    c.onreadystatechange = function(){
        if(this.readyState == 4){
            alert(apps.Desktop) //apps.Desktop object should exist
        }
    }
    
    c.send();
 **********************************************************************/

namespace("core.http.Router", {
    initialize : function(){
        this.routes = {};    
    },

    process : function(ROUTES){
        for(var KEY in ROUTES) {
           if(typeof ROUTES[KEY] == "object"){
                this.add(ROUTES[KEY])
           } 
           else if(typeof ROUTES[KEY] == "string"){
               this.add(KEY, ROUTES[KEY])
           }
        }
    },
    
    add : function(key, handler){
        this.routes[key] = handler;
    },
    
    contains : function(route){
        return this.routes[route];
    },
    
    
    
    resolve : function(href,matches) {
        if(typeof href == "string" && href.indexOf("$.") == 0){
             var exp = new Function("$", "return " + href);
             href = exp(ROUTES)||href;
        }
        if ( typeof href == "object") {
            return this.resolve_object(href)
        } else {
            for (var regex in this.routes) {
                var entry = this.routes[regex]
                if ( typeof entry == "string") {
                    var exp = new RegExp(regex);
                    var matches = href.match(exp);
                    if (matches && matches.length > 0) {
                        var val = this.routes[regex];
                        if ( typeof val == "function") {
                            return val(href, matches);
                        } else {
                            return val;
                        }
                    }
                }
            }

            return href;
        }
    },

    
    resolve_object : function(OBJ){
        if(OBJ){
            if(!OBJ[Config.ENVIRONMENT]){
                console.error("No URI/Route defined for: " + Config.ENVIRONMENT, OBJ)
            }
            return OBJ[Config.ENVIRONMENT];
        }
        return false;
    },
    
    getParameterSeperator : function(url){
        var sep = (url.indexOf("?")>=0)?"&":"?";
    }
}); 


core.http.UrlRouter = new core.http.Router;
/*core.http.UrlRouter.add("/artist\\?([a-z]+)", function(e, matches){
    //console.log(matches);
    return "resources/data/test.txt"
});
core.http.UrlRouter.add("apps/Desktop/main.js", function(e, matches){
    //console.log(matches);
    return "apps/Desktop/main.js"
});*/

namespace("core.traits.EventBus", {
	subscribers : {},
	observers:[],

	initialize : function(host){
		this.host = host;
		this.host.bus = this;
	},
	
	addEventListener : function(eventName, cb){
		if(!this.subscribers[eventName]){
			this.subscribers[eventName] = [];
		}
		this.subscribers[eventName].push({name:eventName, callback:cb});
	},
	
	dispatchEvent : function(eventName, bubbles, cancelable, data, scope) {
        scope = (scope||this.host||this||window);
        var ns = scope.namespace||"";
        	ns = ns.length > 0 ? (ns + "::"):ns;
        var observers = this.subscribers[ns+eventName]||[];
        for(var i=0; i<=observers.length-1; i++){
        	var observer = observers[i];
        	observer.callback.call(scope, data); 
        } 
   },
   
   removeEventListener : function(eventName, callback){
        var observers = this.subscribers[eventName]||[];
        for(var i=0; i<=observers.length-1; i++){
        	var observer = observers[i];
        	if(observer.name == eventName && observer.callback == callback) {
        		observers.splice(i,1);
        	}
        }
    }
});

namespace("core.traits.ResourcePathTransformer");

core.traits.ResourcePathTransformer = {
    resourcepath : function (filepath, ns){
        filepath = filepath||"";
        var apppath = Config.ROOTPATH||"";
        filepath = filepath.replace("[$theme]", ("themes/"+Config.THEME));
        filepath = filepath.replace("[$icon]",  ("themes/"+Config.THEME) + "/images/icons/");

        var path = apppath + filepath;
        return this.relativeToAbsoluteFilePath(path, ns);
    },
    
    relativeToAbsoluteFilePath : function(path, ns){
        var self=this;
            var engine = this.getTemplateParser();
            var engineWarningMsg = this.namespace + "#renderDOMTree() - is specifying a template engine api, '" + engine.name + "', that is not found. Defaulting to 'Kruntch'.";
                engine = engine.isAvailable()?
                    engine:
                    (function(){
                        console.warn(engineWarningMsg); 
                        return self.getDefaultTemplateEngine()
                    })();


        var apppath = Config.ROOTPATH? (Config.ROOTPATH + "/") : "";
        ns = ns||this.namespace;

        if(path.indexOf("~/") >= 0){
            path = path.replace("~/", apppath);
        } else if(path.indexOf("./") >= 0){
            path = path.replace("./", apppath + ns.replace(/\./gim,"/") + "/");
        } 
        else if(path.indexOf("http") == 0){
            return path;
        }
        else{
            if(path.indexOf(Config.ROOTPATH)<0){
                path = apppath + path
            }
        }
        path = /http:/.test(path)? path : path.replace("//","/");
        if(path.indexOf(".html")>=0 && engine != TemplateEnginePlugins.Kruntch){
            path = path.replace(/\.html/, engine.ext+".html");
        }
        return path;
    }
};

namespace("core.traits.InitializeApplicationData");

core.traits.InitializeApplicationData = {
    initialize : function () {
        this.parent();
        application.db = {};
        application.db.user = Session.localStorage.session["user"];//core.data.StorageManager.get("user");
        Session.user = application.db.user;
    }
};

namespace("core.EventBus");
core.EventBus = {
	subscribers : {},
	observers:[],
	
	addEventListener : function(eventName, cb){
		if(!this.subscribers[eventName]){
			this.subscribers[eventName] = [];
		}
		this.subscribers[eventName].push({name:eventName, callback:cb});
	},
	
	dispatchEvent : function(eventName, bubbles, cancelable, data, scope) {
        scope = (scope||this||window);
        var observers = this.subscribers[eventName]||[];
        for(var i=0; i<=observers.length-1; i++){
        	var observer = observers[i];
        	observer.callback.call(scope, data); 
            //TODO: Add support for stopping propagation of events.
        } 
   },
   
    removeEventListener : function(eventName, callback){
        var observers = this.subscribers[eventName]||[];
        for(var i=0; i<=observers.length-1; i++){
        	var observer = observers[i];
        	if(observer.name == eventName && observer.callback == callback) {
        		observers.splice(i,1);
        	}
        }
    }
};


namespace("core.data.StorageManager");
core.data.StorageManager = {
  isInitialized : false,

  initialize : function(key){
    if(this.isInitialized){
      console.warn("core.data.StorageManager: already initialized");
      return this;
    } else {
      this.key=key;
      var str = localStorage.getItem(key)||"{}";
      this.data = JSON.parse(str);
      this.initStorageCapacity();
      this.startCapacityCheckTimer();
      if(Config.StorageManager.DO_CAPACITY_CHECK_ON_STARTUP){
        this.thresholdCapacityCheck();
      }
      this.isInitialized=true;
    }
  },

  startCapacityCheckTimer : function(){
    var self=this;
    this.timer = setInterval(function(){
      self.thresholdCapacityCheck();
    },Config.StorageManager.CAPACITY_CHECK_TIMER_INTERVAL);
  },
  
  initStorageCapacity : function(){
    var str = JSON.stringify(this.data);
    var byt = str.length*2;
    var kbs = byt/1024;
    var mbs = kbs/1024;
    var max = Config.StorageManager.PARTITION_SIZE;
    this.size = {
      used : kbs,
      free : max-kbs, //4,800kb
      total: max
    };
    core.EventBus.dispatchEvent("storage:changed", true, true, this.size, this);
  },


  reset : function(ns, persist){
      persist = (typeof persist=="boolean")?persist:false;
      if(!this.data) { this.data = {}};
      this.data[ns] = null;
      delete this.data[ns];
      if(persist){
        this.persist();
      }
      this.initStorageCapacity();
  },

  clean : function(){
    localStorage.setItem(this.key,"{}");
    var str = localStorage.getItem(this.key)||"{}";
    this.data = JSON.parse(str);
    this.initStorageCapacity();
  },
  
  find : function(ns, id){
    return this.data[ns]||[];
  },
  
  commit : function(){
      this.persist();
  },

  getKBytes : function(obj){
    if(!obj){return 0;}
    var byt = JSON.stringify(obj).length*2;
    return byt/1024;//in kb
  },

  canFit : function(obj){
    if(!obj) { return true}
    var kbs = this.getKBytes(obj);
    if(kbs > this.size.free){
      return false;
    }
    return true;
  },

  exceedsTotalQuota : function(obj){
    var kbs = this.getKBytes(obj);
    return kbs > this.size.total;
  },

  thresholdCapacityCheck : function(obj){
    var val = this.size.used/this.size.total;
    if(val >= Config.StorageManager.WARNING_THRESHOLD_CAPACITY) {
      alert(Config.StorageManager.CAPACITY_WARNING_MSG);
    }
  },

  set : function(ns, obj, persist){
    persist = typeof persist=="boolean"?persist:false;
    if(this.canFit(obj)){
      this.data[ns] = obj;
      (persist && this.persist());
      this.initStorageCapacity();
    } else {
      console.warn("Object cannot fit into storage space");
    }
  },

  get : function(ns){
    return this.data[ns];
  },

  persist : function(){
    try {
        localStorage.setItem(this.key, JSON.stringify(this.data))
    } catch(e){
        console.error(e);
    }
  },
  
  store : function(ns, obj, persist){
    this.data[ns] = (this.data[ns]||[]);
    
    if(this.canFit(obj)) {      
      this.data[ns].unshift(obj);
      (persist && this.persist());
      this.initStorageCapacity();
    } else {
      if(!this.exceedsTotalQuota(obj)) {
        if(this.data[ns].length > 0){
          console.warn("STORAGE SPACE LIMIT: New data will be stored at the head, the oldest item will be popped off the tail end.");
          this.data[ns].pop();
          this.initStorageCapacity();
          this.store(ns, obj, persist);
        } else {
          throw new Error("The object/data being stored is larger than the total capacity of the allocated localStorage space of: " + this.size.total + "kb")
        }
      }
      else {
        throw new Error("The object/data being stored is larger than the total capacity of the allocated localStorage space of: " + this.size.total + "kb")
      }
    }
  },

  
  remove : function(ns, persist){
    persist = typeof persist=="boolean"?persist:false;
    var ref = this.data[ns];
    var self=this;
    if(ref){
      return {
        all : function(){
          self.data[ns] = null;
          if(persist){
            core.data.StorageManager.persist();
          }
          core.data.StorageManager.initStorageCapacity();
        },

        where : function(exp){
          var res = ref.where(exp);
          for (var i = 0; i <= res.length-1; i++){
            var item = res[i];
            for (var j = 0; j <= ref.length-1; j++){
              var storedItem = ref[j];
              if(item && (item.oid == storedItem.oid)){
                ref.splice(j,1);
              }
            }
          }
          if(persist){
            core.data.StorageManager.persist();
          }
          core.data.StorageManager.initStorageCapacity();
        }
      };
    }
    return {
        where : function(exp){
            return []
        },
        all : function(){
          return true;
        }
    };
  }
};

namespace("core.data.CircularBuffer",{
  initialize : function(size, arr){
    this.size = size||20000;
    this.buf = (arr||new Array());
    this.readI = 0;
    this.writeI = 0;
    this.trim()
  },
  
  trim : function(){
    this.buf.splice(this.size);
  },
  
  read : function(){
    var o = this.buf[this.readI];
    this.readI = (this.readI+1)%this.size;
    return o;
  },
  
  write : function(o, callback){
    if(o instanceof Array){this.writeArray(o);return};
    this.buf[this.writeI] = o;
    this.writeI = (this.writeI+1)%this.size;
    callback(this);
  },

  writeArray : function(arr){
    for(var i=0; i<=arr.length-1; i++){
      var o = arr[i];
      this.write(o);
    }
  },

  isFull : function(){
    return this.buf.length == this.size;
  },

  data : function(){
    return this.buf;
  }
});

//////////////////////////////////////////////////
//
//  the stringifier is based on
//    http://json.org/json.js as of 2006-04-28 from json.org
//  the parser is based on 
//    http://osteele.com/sources/openlaszlo/json
//

if (typeof rison == 'undefined')
    window.rison = {};

/**
 *  rules for an uri encoder that is more tolerant than encodeURIComponent
 *
 *  encodeURIComponent passes  ~!*()-_.'
 *
 *  we also allow              ,:@$/
 *
 */
rison.uri_ok = {  // ok in url paths and in form query args
            '~': true,  '!': true,  '*': true,  '(': true,  ')': true,
            '-': true,  '_': true,  '.': true,  ',': true,
            ':': true,  '@': true,  '$': true,
            "'": true,  '/': true
};

/*
 * we divide the uri-safe glyphs into three sets
 *   <rison> - used by rison                         ' ! : ( ) ,
 *   <reserved> - not common in strings, reserved    * @ $ & ; =
 *
 * we define <identifier> as anything that's not forbidden
 */

/**
 * punctuation characters that are legal inside ids.
 */
// this var isn't actually used
//rison.idchar_punctuation = "_-./~";  

(function () {
    var l = [];
    for (var hi = 0; hi < 16; hi++) {
        for (var lo = 0; lo < 16; lo++) {
            if (hi+lo == 0) continue;
            var c = String.fromCharCode(hi*16 + lo);
            if (! /\w|[-_.\/~]/.test(c))
                l.push('\\u00' + hi.toString(16) + lo.toString(16));
        }
    }
    /**
     * characters that are illegal inside ids.
     * <rison> and <reserved> classes are illegal in ids.
     *
     */
    rison.not_idchar = l.join('')
    //idcrx = new RegExp('[' + rison.not_idchar + ']');
    //console.log('NOT', (idcrx.test(' ')) );
})();
//rison.not_idchar  = " \t\r\n\"<>[]{}'!=:(),*@$;&";
rison.not_idchar  = " '!:(),*@$";


/**
 * characters that are illegal as the start of an id
 * this is so ids can't look like numbers.
 */
rison.not_idstart = "-0123456789";


(function () {
    var idrx = '[^' + rison.not_idstart + rison.not_idchar + 
               '][^' + rison.not_idchar + ']*';

    rison.id_ok = new RegExp('^' + idrx + '$');

    // regexp to find the end of an id when parsing
    // g flag on the regexp is necessary for iterative regexp.exec()
    rison.next_id = new RegExp(idrx, 'g');
})();

/**
 * this is like encodeURIComponent() but quotes fewer characters.
 *
 * @see rison.uri_ok
 *
 * encodeURIComponent passes   ~!*()-_.'
 * rison.quote also passes   ,:@$/
 *   and quotes " " as "+" instead of "%20"
 */
rison.quote = function(x) {
    if (/^[-A-Za-z0-9~!*()_.',:@$\/]*$/.test(x))
        return x;

    return encodeURIComponent(x)
        .replace(/%2C/g, ',')
        .replace(/%3A/g, ':')
        .replace(/%40/g, '@')
        .replace(/%24/g, '$')
        .replace(/%2F/g, '/')
        .replace(/%20/g, '+');
};


//
//  based on json.js 2006-04-28 from json.org
//  license: http://www.json.org/license.html
//
//  hacked by nix for use in uris.
//

(function () {
    var sq = { // url-ok but quoted in strings
               "'": true,  '!': true
    },
    s = {
            array: function (x) {
                var a = ['!('], b, f, i, l = x.length, v;
                for (i = 0; i < l; i += 1) {
                    v = x[i];
                    f = s[typeof v];
                    if (f) {
                        v = f(v);
                        if (typeof v == 'string') {
                            if (b) {
                                a[a.length] = ',';
                            }
                            a[a.length] = v;
                            b = true;
                        }
                    }
                }
                a[a.length] = ')';
                return a.join('');
            },
            'boolean': function (x) {
                if (x)
                    return '!t';
                return '!f'
            },
            'null': function (x) {
                return "!n";
            },
            number: function (x) {
                if (!isFinite(x))
                    return '!n';
                // strip '+' out of exponent, '-' is ok though
                return String(x).replace(/\+/,'');
            },
            object: function (x) {
                if (x) {
                    if (x instanceof Array) {
                        return s.array(x);
                    }
                    // WILL: will this work on non-Firefox browsers?
                    if (typeof x.__prototype__ === 'object' && typeof x.__prototype__.encode_rison !== 'undefined')
                        return x.encode_rison();

                    var a = ['('], b, f, i, v, ki, ks=[];
                    for (i in x)
                        ks[ks.length] = i;
                    ks.sort();
                    for (ki = 0; ki < ks.length; ki++) {
                        i = ks[ki];
                        v = x[i];
                        f = s[typeof v];
                        if (f) {
                            v = f(v);
                            if (typeof v == 'string') {
                                if (b) {
                                    a[a.length] = ',';
                                }
                                a.push(s.string(i), ':', v);
                                b = true;
                            }
                        }
                    }
                    a[a.length] = ')';
                    return a.join('');
                }
                return '!n';
            },
            string: function (x) {
                if (x == '')
                    return "''";

                if (rison.id_ok.test(x))
                    return x;

                x = x.replace(/(['!])/g, function(a, b) {
                    if (sq[b]) return '!'+b;
                    return b;
                });
                return "'" + x + "'";
            },
            undefined: function (x) {
                throw new Error("rison can't encode the undefined value");
            }
        };


    /**
     * rison-encode a javascript structure
     *
     *  implemementation based on Douglas Crockford's json.js:
     *    http://json.org/json.js as of 2006-04-28 from json.org
     *
     */
    rison.encode = function (v) {
        return s[typeof v](v);
    };

    /**
     * rison-encode a javascript object without surrounding parens
     *
     */
    rison.encode_object = function (v) {
        if (typeof v != 'object' || v === null || v instanceof Array)
            throw new Error("rison.encode_object expects an object argument");
        var r = s[typeof v](v);
        return r.substring(1, r.length-1);
    };

    /**
     * rison-encode a javascript array without surrounding parens
     *
     */
    rison.encode_array = function (v) {
        if (!(v instanceof Array))
            throw new Error("rison.encode_array expects an array argument");
        var r = s[typeof v](v);
        return r.substring(2, r.length-1);
    };

    /**
     * rison-encode and uri-encode a javascript structure
     *
     */
    rison.encode_uri = function (v) {
        return rison.quote(s[typeof v](v));
    };

})();




//
// based on openlaszlo-json and hacked by nix for use in uris.
//
// Author: Oliver Steele
// Copyright: Copyright 2006 Oliver Steele.  All rights reserved.
// Homepage: http://osteele.com/sources/openlaszlo/json
// License: MIT License.
// Version: 1.0


/**
 * parse a rison string into a javascript structure.
 *
 * this is the simplest decoder entry point.
 *
 *  based on Oliver Steele's OpenLaszlo-JSON
 *     http://osteele.com/sources/openlaszlo/json
 */
rison.decode = function(r) {
    var errcb = function(e) { throw Error('rison decoder error: ' + e); };
    var p = new rison.parser(errcb);
    return p.parse(r);
};

/**
 * parse an o-rison string into a javascript structure.
 *
 * this simply adds parentheses around the string before parsing.
 */
rison.decode_object = function(r) {
    return rison.decode('('+r+')');
};

/**
 * parse an a-rison string into a javascript structure.
 *
 * this simply adds array markup around the string before parsing.
 */
rison.decode_array = function(r) {
    return rison.decode('!('+r+')');
};


/**
 * construct a new parser object for reuse.
 *
 * @constructor
 * @class A Rison parser class.  You should probably 
 *        use rison.decode instead. 
 * @see rison.decode
 */
rison.parser = function (errcb) {
    this.errorHandler = errcb;
};

/**
 * a string containing acceptable whitespace characters.
 * by default the rison decoder tolerates no whitespace.
 * to accept whitespace set rison.parser.WHITESPACE = " \t\n\r\f";
 */
rison.parser.WHITESPACE = "";

// expose this as-is?
rison.parser.prototype.setOptions = function (options) {
    if (options['errorHandler'])
        this.errorHandler = options.errorHandler;
};

/**
 * parse a rison string into a javascript structure.
 */
rison.parser.prototype.parse = function (str) {
    this.string = str;
    this.index = 0;
    this.message = null;
    var value = this.readValue();
    if (!this.message && this.next())
        value = this.error("unable to parse string as rison: '" + rison.encode(str) + "'");
    if (this.message && this.errorHandler)
        this.errorHandler(this.message, this.index);
    return value;
};

rison.parser.prototype.error = function (message) {
    if (typeof(console) != 'undefined')
        console.log('rison parser error: ', message);
    this.message = message;
    return undefined;
}
    
rison.parser.prototype.readValue = function () {
    var c = this.next();
    var fn = c && this.table[c];

    if (fn)
        return fn.apply(this);

    // fell through table, parse as an id

    var s = this.string;
    var i = this.index-1;

    // Regexp.lastIndex may not work right in IE before 5.5?
    // g flag on the regexp is also necessary
    rison.next_id.lastIndex = i;
    var m = rison.next_id.exec(s);

    // console.log('matched id', i, r.lastIndex);

    if (m.length > 0) {
        var id = m[0];
        this.index = i+id.length;
        return id;  // a string
    }

    if (c) return this.error("invalid character: '" + c + "'");
    return this.error("empty expression");
}

rison.parser.parse_array = function (parser) {
    var ar = [];
    var c;
    while ((c = parser.next()) != ')') {
        if (!c) return parser.error("unmatched '!('");
        if (ar.length) {
            if (c != ',')
                parser.error("missing ','");
        } else if (c == ',') {
            return parser.error("extra ','");
        } else
            --parser.index;
        var n = parser.readValue();
        if (typeof n == "undefined") return undefined;
        ar.push(n);
    }
    return ar;
};

rison.parser.bangs = {
    t: true,
    f: false,
    n: null,
    '(': rison.parser.parse_array
}

rison.parser.prototype.table = {
    '!': function () {
        var s = this.string;
        var c = s.charAt(this.index++);
        if (!c) return this.error('"!" at end of input');
        var x = rison.parser.bangs[c];
        if (typeof(x) == 'function') {
            return x.call(null, this);
        } else if (typeof(x) == 'undefined') {
            return this.error('unknown literal: "!' + c + '"');
        }
        return x;
    },
    '(': function () {
        var o = {};
        var c;
        var count = 0;
        while ((c = this.next()) != ')') {
            if (count) {
                if (c != ',')
                    this.error("missing ','");
            } else if (c == ',') {
                return this.error("extra ','");
            } else
                --this.index;
            var k = this.readValue();
            if (typeof k == "undefined") return undefined;
            if (this.next() != ':') return this.error("missing ':'");
            var v = this.readValue();
            if (typeof v == "undefined") return undefined;
            o[k] = v;
            count++;
        }
        return o;
    },
    "'": function () {
        var s = this.string;
        var i = this.index;
        var start = i;
        var segments = [];
        var c;
        while ((c = s.charAt(i++)) != "'") {
            //if (i == s.length) return this.error('unmatched "\'"');
            if (!c) return this.error('unmatched "\'"');
            if (c == '!') {
                if (start < i-1)
                    segments.push(s.slice(start, i-1));
                c = s.charAt(i++);
                if ("!'".indexOf(c) >= 0) {
                    segments.push(c);
                } else {
                    return this.error('invalid string escape: "!'+c+'"');
                }
                start = i;
            }
        }
        if (start < i-1)
            segments.push(s.slice(start, i-1));
        this.index = i;
        return segments.length == 1 ? segments[0] : segments.join('');
    },
    // Also any digit.  The statement that follows this table
    // definition fills in the digits.
    '-': function () {
        var s = this.string;
        var i = this.index;
        var start = i-1;
        var state = 'int';
        var permittedSigns = '-';
        var transitions = {
            'int+.': 'frac',
            'int+e': 'exp',
            'frac+e': 'exp'
        };
        do {
            var c = s.charAt(i++);
            if (!c) break;
            if ('0' <= c && c <= '9') continue;
            if (permittedSigns.indexOf(c) >= 0) {
                permittedSigns = '';
                continue;
            }
            state = transitions[state+'+'+c.toLowerCase()];
            if (state == 'exp') permittedSigns = '-';
        } while (state);
        this.index = --i;
        s = s.slice(start, i)
        if (s == '-') return this.error("invalid number");
        return Number(s);
    }
};
// copy table['-'] to each of table[i] | i <- '0'..'9':
(function (table) {
    for (var i = 0; i <= 9; i++)
        table[String(i)] = table['-'];
})(rison.parser.prototype.table);

// return the next non-whitespace character, or undefined
rison.parser.prototype.next = function () {
    var s = this.string;
    var i = this.index;
    do {
        if (i == s.length) return undefined;
        var c = s.charAt(i++);
    } while (rison.parser.WHITESPACE.indexOf(c) >= 0);
    this.index = i;
    return c;
};

namespace("browser.DeviceInfo");
browser.DeviceInfo = {
	initialize : function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1) {
					return data[i].identity;
				}
			}
			else 
				if (dataProp) {
					return data[i].identity;
				}
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) {
			return;
		};
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "MSIE",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]
};
browser.DeviceInfo.initialize();

/*!
 * JavaScript Cookie v2.1.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function () {
            window.Cookies = OldCookies;
            return api;
        };
    }
}(function () {
    function extend () {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[ i ];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init (converter) {
        function api (key, value, attributes) {
            var result;
            if (typeof document === 'undefined') {
                return;
            }

            // Write

            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);

                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }

                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}

                if (!converter.write) {
                    value = encodeURIComponent(String(value))
                        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                } else {
                    value = converter.write(value, key);
                }

                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);

                return (document.cookie = [
                    key, '=', value,
                    attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
                    attributes.path    && '; path=' + attributes.path,
                    attributes.domain  && '; domain=' + attributes.domain,
                    attributes.secure ? '; secure' : ''
                ].join(''));
            }

            // Read

            if (!key) {
                result = {};
            }

            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling "get()"
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;

            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var name = parts[0].replace(rdecode, decodeURIComponent);
                var cookie = parts.slice(1).join('=');

                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }

                try {
                    cookie = converter.read ?
                        converter.read(cookie, name) : converter(cookie, name) ||
                        cookie.replace(rdecode, decodeURIComponent);

                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }

                    if (key === name) {
                        result = cookie;
                        break;
                    }

                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {}
            }

            return result;
        }

        api.set = api;
        api.get = function (key) {
            return api(key);
        };
        api.getJSON = function () {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};

        api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };

        api.withConverter = init;

        return api;
    }

    return init(function () {});
}));

UserAgent = {
    isIE : function(){
        return /Trident/.test(navigator.userAgent);
    },
    
    isMobile : function(){
       return Config.FORCE_MOBILE_USERAGENT || /Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    isIpad : function(){
       return /iPad/i.test(navigator.userAgent);
    },
    
    isAndroid: function() {
        return /Android/i.test(navigator.userAgent);
    },
    
    isBlackBerry: function() {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    
    isIOS: function() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    
    isWindowsMobile: function() {
        return /IEMobile/i.test(navigator.userAgent);
    }
};

!function(e,t){function r(e){return" "==e||"\r"==e||"\n"==e?!0:!1}function n(e){return e>="a"&&"z">=e||e>="A"&&"Z">=e?!0:!1}function a(e){return e>="0"&&"9">=e?!0:!1}function s(e){return 1==n(e)||1==a(e)?!0:!1}function o(e){return":"==e||"_"==e||"-"==e||"!"==e||1==s(e)?!0:!1}function l(e){return/^\d+$/.test(e)}function f(e){return!isNaN(parseFloat(e))&&isFinite(e)}function u(e){return e.slice(0)}function h(e,t){var r={};for(m in e)r[m]=e[m];for(m in t)r[m]=t[m];return r}function c(e){return h({},e)}function v(e){var t=c(e);t.sub={};for(var r in e.sub)t.sub[r]=v(e.sub[r]);return t}function p(e,t,r,n){var i,a=e+"",s=-1;if("string"==typeof t){if(!n)return e.split(t).join(r);for(i=t.toLowerCase();-1!==(s=a.toLowerCase().indexOf(t,s>=0?s+r.length:0));)a=a.substring(0,s)+r+a.substring(s+t.length)}return a}function d(e){return e.indexOf("&")>-1&&(e=p(e,"&amp;","&",!0),e=p(e,"&lt;","<",!0),e=p(e,"&gt;",">",!0)),e}function g(e){var r=e.split(".");return r==t||null==r||0==r.length?"":r[r.length-1]}function w(e,r){for(var n=e,i=r.split("."),a=0;a<i.length;a++)n=e,e=e[i[a]],"function"==typeof e&&(e=e.call(n));return(e==t||null==e)&&(e=""),e}function y(e,t,r){return new Function("return ("+e.root.conditions[r]+")").call(t)}function b(e,t,r){return new Function("return ("+e.root.wheres[r]+")").call(t)}function x(e,r,n,i){var a={items:[],names:[],lookup:{},at:function(e){return 1==f(e)?this.items[e]:this.lookup[e]}},s=w(r,n);if(s==t)return a;var o=[];if(!(s instanceof Array)){var l=[];o=[];for(var h in s)o.push(h),l.push(s[h]);s=l}if(i!=t){for(var c=new Function("return ("+e.root.wheres[i]+")"),m=[],v=[],p=0;p<s.length;p++){var d=s[p],g=o[p];d.Root=r.Root,d.Parent=r,d.Parents=u(r.Parents),d.Parents.push(r),oitem.Family=r.Family,1==c.call(d)&&(m.push(d),null!=g&&null!=g&&v.push(g))}s=m,o=v}a.items=s,a.names=o;for(var y=0;y<a.names.length;y++)a.lookup[a.names[y]]=a.items[y];return a}function A(e){var r={any:t,first:t,last:t,empty:t,nth:[]};for(var n in e.sub){var i=e.sub[n];if(i.host=e,"first"==i.name)r.first=i;else if("last"==i.name)r.last=i;else if("empty"==i.name)r.empty=i;else if("nth"==i.name){r.nth.push({template:i,every:t,at:t,where:t});var a=r.nth[r.nth.length-1];if(a.every=i.attrs.every,a.at=i.attrs.at,a.where=i.attrs.where,a.at!=t&&a.at.indexOf(",")>-1){var s=a.at.split(",");a.at=s[0];for(var o=1;o<s.length;o++)r.nth.push({template:v(i),every:a.every,at:s[o],where:a.where})}}}r.any=c(e),r.any.host=e,r.any.sub={};for(var n in e.sub){var i=e.sub[n];"first"==i.name||"last"==i.name||"empty"==i.name||"nth"==i.name?r.any.text=p(r.any.text,n,"",!0):r.any.sub[n]=i}return r.first!=t||r.last!=t||r.empty!=t||r.nth.length>0?r.hasTargets=!0:r.hasTargets=!1,r}function k(e,r,n,i){e.details==t&&(e.details=A(e));var a=t;if(1==e.details.hasTargets)if(e.details.first!=t&&0==r)a=e.details.first;else if(e.details.last!=t&&r==n-1)a=e.details.last;else if(e.details.empty!=t&&-1==r&&0==n)a=e.details.empty;else for(var s=0;s<e.details.nth.length;s++){if(e.details.nth[s].every!=t&&r%e.details.nth[s].every==0){if(e.details.nth[s].where!=t&&0==b(e,i,e.details.nth[s].where))continue;a=e.details.nth[s].template;break}if(e.details.nth[s].at!=t&&r==e.details.nth[s].at){if(e.details.nth[s].where!=t&&0==b(e,i,e.details.nth[s].where))continue;a=e.details.nth[s].template;break}if(e.details.nth[s].where!=t&&1==b(e,i,e.details.nth[s].where)){a=e.details.nth[s].template;break}}return a==t&&n>0&&(a=e.details.any),a}function O(e){var r={first:t,last:t,empty:t,nth:[]};for(var n in e.sub){var i=e.sub[n];if(i.host=e,"first"==i.name)r.first=i;else if("last"==i.name)r.last=i;else if("empty"==i.name)r.empty=i;else if("nth"==i.name){r.nth.push({template:i,at:t});var a=r.nth[r.nth.length-1];if(a.at=i.attrs.at,a.at!=t&&a.at.indexOf(",")>-1){var s=a.at.split(",");a.at=s[0];for(var o=1;o<s.length;o++)r.nth.push({template:v(i),at:s[o]})}}}return r}function N(e){var t=null;if(1==y(e,e.view,e.attrs.condition)){t=c(e),t.sub={};for(var r in e.sub){var n=e.sub[r];"elseif"==n.name||"else"==n.name?t.text=p(t.text,r,"",!0):t.sub[r]=n}}else{var a=[];for(var r in e.sub){var n=e.sub[r];if("elseif"==n.name)a.push(n);else if("else"==n.name){a.push(n);break}}for(i=0;i<a.length;i++){if("else"==a[i].name){t=a[i];break}if(1==y(e,e.view,a[i].attrs.condition)){t=a[i];break}}}return null!=t?H(t,e.view):""}function T(e){var r="",n=x(e,e.view,e.attrs.each,e.attrs.where);if(n.items.length>0)for(var i=0;i<n.items.length;i++){var a=n.items[i];if(null!=a&&a!=t){var s=a.toString(),o=n.names!=t&&n.names.length>0?n.names[i]:(i+1).toString(),l=s!=t&&s!={}.toString()?s:"",f=k(e,i,n.items.length,a);if(f!=t){var u={familyName:g(e.attrs.each)};f.index=o,f.count=n.items.length,f.str=l,r+=H(f,a,u)}}}else{var f=k(e,-1,0,null);f!=t&&(f.index=-1,f.count=0,f.str="",r+=H(f,e.view))}return r}function F(e){var r="",n=x(e,e.view,e.attrs["in"],e.attrs.where);if(e.details==t&&(e.details=O(e)),n.items.length>0)for(var i=0;i<e.details.nth.length;i++){var a=n.at(e.details.nth[i].at);if(null!=a&&a!=t){var s=a.toString(),o=e.details.nth[i].at,l=s!=t&&s!={}.toString()?s:"",f=e.details.nth[i].template,u={familyName:g(e.attrs["in"])};f.index=o,f.count=n.items.length,f.str=l,r+=H(f,a,u)}}else{var f=e.details.empty;f!=t&&(f.index=-1,f.count=0,f.str="",r+=H(f,e.view))}return r}function _(e){var r=w(e.view,e.attrs.to);if(r==t)return"";var n={familyName:g(e.attrs.to)};return H(e,r,n)}function P(e,n,i){var a=0,s=0,l=i.text,f={name:"",root:e.root,parent:e,view:t,text:"",attrs:{},sub:{}};for("<"==l.charAt(a)&&a++;a<l.length&&1==r(l.charAt(a));)a++;for(;a<l.length&&1==o(l.charAt(a));)f.name+=l.charAt(a++);for(f.name=f.name.toLowerCase();a<l.length;){for(var u="";a<l.length&&1==r(l.charAt(a));)a++;if("/"==l.charAt(a)||">"==l.charAt(a))break;for(;a<l.length&&1==o(l.charAt(a));)u+=l.charAt(a++);for(u=u.toLowerCase();a<l.length&&1==r(l.charAt(a));)a++;if("="==l.charAt(a)){for(a++;a<l.length&&1==r(l.charAt(a));)a++;if('"'==l.charAt(a)||"'"==l.charAt(a)){var h=l.charAt(a);a++,s=l.indexOf(h,a),f.attrs[u]=l.slice(a,s).trim(),a=s+1}}}if(a==l.length||">"==l.charAt(a))for(;1==n.HasMoreTokens();){if(i=n.NextToken(),1==i.iskeyelement){if(0!=i.isend)break;var c="_k1_st_"+(f.root.baseid++).toString();f.sub[c]=P(f,n,i),i={text:c,iskeyelement:!1}}f.text+=i.text}return f}function S(e){var t=new z(e.pre);for(e.text="",e.sub={};1==t.HasMoreTokens();){var r=t.NextToken();if(1==r.iskeyelement){var n="_k1_st_"+(e.baseid++).toString();e.sub[n]=P(e,t,r),r={text:n,iskeyelement:!1}}e.text+=r.text}return e}function j(e){e.properties=new Object,e.scripts=new Object,e.code=new Object,e.conditions=new Object,e.wheres=new Object,e.pre=e.raw;for(var t,n;(t=e.pre.indexOf("{{"))>=0;){var i="_k1_"+(e.baseid++).toString();n=e.pre.indexOf("}}",t);var a=e.pre.slice(t,n+2);e.pre=[e.pre.slice(0,t),i,e.pre.slice(n+2)].join(""),e.scripts[i]=d(a.trim())}for(t=0;(t=e.pre.indexOf("[",t))>=0;){n=e.pre.indexOf("]",t);var s=e.pre.slice(t,n+1);if(0==l(s.substring(1,s.length-1).trim())){var i="_k1_"+(e.baseid++).toString();e.pre=[e.pre.slice(0,t),i,e.pre.slice(n+1)].join(""),e.properties[i]=s.trim()}else t=n}for(;(t=e.pre.indexOf("{"))>=0;){var i="_k1_"+(e.baseid++).toString();n=e.pre.indexOf("}",t);var o=e.pre.slice(t,n+1);e.pre=[e.pre.slice(0,t),i,e.pre.slice(n+1)].join(""),e.code[i]=d(o.trim())}return this.parsePropCodes=function(i){var a=new Object;for(t=0;(t=e.pre.indexOf(i,t))>=0;){for(;0==r(e.pre.charAt(t))&&"="!=e.pre.charAt(t);)t++;for(;1==r(e.pre.charAt(t));)t++;if("="==e.pre.charAt(t)){for(t++;1==r(e.pre.charAt(t));)t++;if('"'==e.pre.charAt(t)||"'"==e.pre.charAt(t)){var s=e.pre.charAt(t);t++,n=e.pre.indexOf(s,t);var o="_k1_"+(e.baseid++).toString(),l=e.pre.slice(t,n);e.pre=[e.pre.slice(0,t),o,e.pre.slice(n)].join(""),a[o]=d(l.trim())}}}return a},e.conditions=this.parsePropCodes("condition"),e.wheres=this.parsePropCodes("where"),e}function R(e,r){var n={tio:r,baseid:(new Date).getTime(),name:"root",raw:t,pre:t,root:t,parent:t,view:t,text:"",sub:{}};n.root=n;var i=/^[a-z0-9]+$/i;return 1==i.test(e)?n.raw=r.Read(e):n.raw=e,n=j(n),n=S(n)}function C(r,n,i,a){(a==t||null==a)&&(a={}),a.Root=i.root!=t?i.root.view:t,a.Parent=i.parent!=t?i.parent.view:t,i.parent!=t&&i.parent.view!=t&&i.parent.view.Parents!=t?(a.Parents=u(i.parent.view.Parents),a.Parents.push(i.parent.view)):a.Parents=[];var s=a;if(i.bindings==t){i.bindings=[];for(var o in r)i.text.indexOf(o)>=0&&(i.bindings.push(o),i.text=p(i.text,o,"",!0))}s=h(s,n),s.Ready=t;for(var l=0;l<i.bindings.length;l++){var o=i.bindings[l],f=r[o];f=f.substring(2,f.length-2).trim(),f="return {"+f+"}",s=h(s,new Function(f).call(s))}return s.familyName!=t&&null!=s.familyName&&i.parent!=t?(1==e.depluralize&&"s"==s.familyName.charAt(s.familyName.length-1)&&(s.familyName=s.familyName.substring(0,s.familyName.length-1)),s.Family=i.parent.view.Family!=t?h({},i.parent.view.Family):{},s.Family[s.familyName]=s):s.Family==t&&(s.Family={}),s}function H(e,r,n){e.view=C(e.root.scripts,r,e,n),e.host!=t&&(e.host.view=e.view);var i=e.text.toString();for(var a in e.sub){var s="",o=e.sub[a];o.view=e.view,"if"==o.name?s=N(o):"for"==o.name?s=T(o):"with"==o.name?s=F(o):"apply"==o.name&&(s=_(o)),i=p(i,a,s,!0)}for(var l in e.root.code)if(i.indexOf(l)>=0){var f=e.root.code[l];f=f.substring(1,f.length-1),i=p(i,l,new Function(f).call(e.view),!0)}for(var u in e.root.properties)if(i.indexOf(u)>=0){var h=e.root.properties[u];h=h.substring(1,h.length-1).trim(),i="#"==h?p(i,u,e.index,!0):"##"==h?p(i,u,e.count,!0):"$"==h?p(i,u,e.str,!0):p(i,u,w(e.view,h),!0)}return i}function L(e,r,n){var i=R(e,n),a=H(i,r);return n!=t&&null!=n&&n.Write(e,a),i.view.Ready!=t&&i.view.Ready.call(i.view),a}var M={"if":!0,"for":!0,"with":!0,elseif:!0,"else":!0,first:!0,last:!0,nth:!0,empty:!0,apply:!0,to:!0},z=function(e){function n(){return a>=s.length?!1:!0}function i(){if(0==this.HasMoreTokens())return{text:"",iskeyelement:!1};for(var e="";a<s.length;){for(var n=!1,i=0;a<s.length&&"<"!=s.charAt(a);)e+=s.charAt(a++);for(i=a,i++;i<s.length&&1==r(s.charAt(i));)i++;if("/"==s.charAt(i))for(n=!0,i++;i<s.length&&1==r(s.charAt(i));)i++;for(var l="";i<s.length&&1==o(s.charAt(i))&&">"!=s.charAt(i);)l+=s.charAt(i++);if(l=l.trim(),1==M[l]){if(""!=e)return{text:e,iskeyelement:!1};for(a=i,e="<"+(1==n?"/":"")+l;a<s.length&&">"!=s.charAt(a);)e+=s.charAt(a++);return e+=">",a++,{text:e,iskeyelement:!0,isend:n}}a=i,""!=l&&l!=t&&null!=l&&(e+="<"+(1==n?"/":"")+l)}return{text:e,iskeyelement:!1}}var a=0,s=e;return{HasMoreTokens:n,NextToken:i}},W=function(e){function r(e,t){e.innerHTML=t}function n(n,i){return e!=t&&null!=e?e.Write!=t?void e.Write(i):void r(e,i):void 0}function i(r){if(e!=t&&e.Read!=t)return e.Read(r);for(var n=document.getElementsByTagName("*"),i=0;i<n.length;i++){var a=n[i].getAttribute("data-templateid");if(a!=t&&null!=a&&a==r)return"TEXTAREA"==n[i].nodeName.toUpperCase()?n[i].value:n[i].innerHTML}return""}return{Read:i,Write:n}};e.depluralize=!0,e.Apply=function(e,r,n,i,a){var s="";try{s=L(e,r,new W(n)),i!=t&&i(s)}catch(o){null!=a&&a(o)}return s},e.ApplyAsynch=function(t,r,n){return new Promise(function(i,a){window.setTimeout(function(){e.Apply(t,r,n,i,a)},1)})},e.Bind=function(e,t){var r=R(e,new W(document,{}));return C(r.root.scripts,t,r)}}(window.Kruntch=window.Kruntch||{});


TemplateEnginePlugins = {
	Kruntch : {
		name : "Kruntch",
		ext : ".kruntch",
		parseTemplate : function(templateString, data){
			if(Kruntch) {
	    		var text = Kruntch.Apply(templateString, data);
	        	return text;
	    	} else {
	    		console.warn("TemplateEnginePlugins.parseTemplate() - Kruntch template api not defined.");
	    		return templateString;
	    	}
	    },
	    isAvailable : function(){
	    	return (typeof Kruntch !== 'undefined' && Kruntch !== null)
	    }
	},

	EST : {
		name : "ECMAScriptTemplates",
		ext : ".est",
		parseTemplate : function(templateString, data){
			if(TemplateEngine) {
	    		var text = TemplateEngine.parse(templateString, null, data);//Kruntch.Apply(templateString, data);
	        	return text;
	    	} else {
	    		console.warn("TemplateEnginePlugins.parseTemplate() - ECMAScriptTemplates template api not defined.");
	    		return templateString;
	    	}
	    },
	    isAvailable : function(){
	    	return (typeof TemplateEngine !== 'undefined' && TemplateEngine !== null)
	    }
	},

	Mustache : {
		name : "Mustache",
		ext : ".mustache",
		parseTemplate : function(templateString, data){
			if(Mustache) {
	    		var text = Mustache.render(templateString, data);
	        	return text;
	    	} else {
	    		console.warn("TemplateEnginePlugins.parseTemplate() - Mustache template api not defined.");
	    		return templateString;
	    	}
	    },
	    isAvailable : function(){
	    	return (typeof Mustache !== 'undefined' && Mustache !== null)
	    }
	},

	Handlebars : {
		name : "Handlebars",
		ext : ".handlebars",
		parseTemplate : function(templateString, data){
			if(Handlebars) {
				var template = Handlebars.compile(templateString);
				var text    = template(data);
	        	return text;
	    	} else {
	    		console.warn("TemplateEnginePlugins.parseTemplate() - Handlebars template api not defined.");
	    		return templateString;
	    	}
	    },
	    isAvailable : function(){
	    	return (typeof Handlebars !== 'undefined' && Handlebars !== null)
	    }
	}
};

/**
 * The UrlHashState constructor runs during parent app initialize().
 * It is triggered before the app is unloaded or when app is first loaded.
 * It detects any hash/fragments in the url and will auto-launch the
 * matching app with params.
 *
 * @example
 * A url like this, when pasted into the address bar and executed will trigger the UrlHashState
 * trait to spawn up a new instance of the app, apps/SearchResults and pass inthe keyword
 * params into the app.
 */

UrlHashState = {
    initialize : function(){
      var self=this;
       this.parent();
       //this.addEventListener('showdashboard', this.onReturnToDashboardHash.bind(this), false);
       this.addEventListener("appopened", this.onApplicationOpened2.bind(this), false);
       this.initializeURLHashing();
       window.onbeforeunload = function () {
           /*if(self.isLoggedIn) {
               return "Exit? If you leave now, any unsaved data will be lost."
           }
           else{
                
           }*/
       }
    },
    
    onApplicationOpened2 : function(e){
        window.location.hash = rison.encode(e.data);   
    },
    
    initializeURLHashing : function(){
        var self=this;
        var defaultHashPath = rison.encode({appref:app.constants.DEFAULT_HOME_APP});
        this.addEventListener("statechanged", function(){
            var currentHash = window.location.hash||"";
                currentHash = currentHash.replace("#","");
            var appinfo;

            if(currentHash.indexOf("?")==0){
              var json = self.QueryStringToJSON(currentHash.substr(1));
              var encodedVal = rison.encode(json);
              currentHash = encodedVal;
            }
            
            try {
              appinfo = rison.decode(decodeURIComponent(currentHash));
            } catch(e){
              if(!appinfo || !appinfo.appref){
                window.location.hash=defaultHashPath;
              }
            }

            if(appinfo && appinfo.appref && appinfo.appref.length>0){
              var ns = appinfo.appref.replace("/",".");
              var _app = self.currentRunningApplication;
              if(!_app || _app.namespace != ns){
                  self.dispatchEvent("openapp",true,true,appinfo)
              }
              else if(_app && _app.namespace == ns){
                    _app.onResume({data:appinfo})
                  //self.dispatchEvent("openapp",true,true,appinfo)
              }
            }
        }, false);

        // var h = window.location.hash;
        // if(!h||(h && h.length <=0)){
        //     window.location.hash = defaultHashPath;
        // }
    },


    QueryStringToJSON : function(qs) {
      qs = qs || location.search.slice(1);

      var pairs = qs.split('&');
      var result = {};
      pairs.forEach(function(pair) {
          var pair = pair.split('=');
          var key = pair[0];
          var value = decodeURIComponent(pair[1] || '');

            if( result[key] ) {
                if( Object.prototype.toString.call( result[key] ) === '[object Array]' ) {
                    result[key].push( value );
                } else {
                    result[key] = [ result[key], value ];
                }
            } else {
                result[key] = value;
            }
        });

        return JSON.parse(JSON.stringify(result));
    },
    
    
    onReturnToDashboardHash : function(e){
        var defaultHashPath = rison.encode({appref:app.constants.DEFAULT_HOME_APP});
        window.location.hash = defaultHashPath;
    } 
};

namespace("core.traits.Paginator", {
    '@traits' : [new Observer],

    initialize : function (options) {
        this.data = options.data;
        this.pageSize = options.pageSize;
        this.currentPage=("currentPage" in options)? options.currentPage:0;
    },

    next : function(){
        if(this.currentPage==this.totalpages()){this.currentPage--};
        var d = this.data.slice(this.currentPage*this.pageSize, (this.currentPage+1)*this.pageSize);
        this.currentPage++;
        this.dispatchEvent("change", {type: "next", currentPage:this.currentPage});
        this.dispatchEvent("next", {currentPage:this.currentPage});
        return d;
    },

    update : function(){
        var d = this.data.slice((this.currentPage-1)*this.pageSize, (this.currentPage)*this.pageSize);
        this.dispatchEvent("change", {type: "next", currentPage:this.currentPage});
        return d;
    },

    previous : function(){
        if(this.currentPage<=1){this.currentPage=1;}
        else{this.currentPage--}
        var previousPage = this.currentPage;
        var d = this.data.slice((previousPage*this.pageSize)-this.pageSize, (previousPage)*this.pageSize);
        this.dispatchEvent("change", {type: "previous", currentPage:this.currentPage});
        this.dispatchEvent("previous", {currentPage:this.currentPage});
        return d;
    },

    current : function(){
        if(this.currentPage<=1){this.currentPage=1;}
        if(this.currentPage==this.totalpages()){this.currentPage--};
        var d = this.data.slice(this.currentPage*this.pageSize, (this.currentPage+1)*this.pageSize);
        return d;
    },

    pagenumber : function(){
        return this.currentPage;
    },

    totalpages : function(){
        return Math.ceil(this.data.length/this.pageSize);
    },

    totalrecords : function(){
        return this.data.length;//Math.ceil(this.data.length/this.pageSize);
    },

    islastpage : function(){
        return this.currentPage >= this.totalpages();
    },

    isfirstpage : function(){
        return this.currentPage <= 1;
    },

    resetindex : function(){
        this.currentPage = 0;
    },

    first : function(){
        this.resetindex();
        this.dispatchEvent("change", {type: "first", currentPage:this.currentPage});
    },

    last : function(){
        this.currentPage = this.totalpages();
        this.dispatchEvent("change", {type: "last", currentPage:this.currentPage});
    },

    resizepage : function(size){
        this.pageSize = size || this.pageSize;
        this.resetindex();
        this.dispatchEvent("change", {type: "resize", currentPage:this.currentPage});
    },

    pagesize : function(){
        return this.pageSize;
    }
});



//-------------------MODELS--------------------
namespace("core.vo.Model", {
	initialize : function (_data) {
		this.data = _data;
		
		if(this.data && !("id" in this.data)){
			this.data.id = Math.uuid(8);
		}

		// for(var key in this.data){
		// 	if(this.data.hasOwnProperty(key)){
		// 		this[key] = this.data[key];
		// 	}
		// }
		return this;
	},

	isValid : function(){
		return true;
	},

	value : function(){
		return this.data;
	},

	getBlankCopy : function(){
		for(var key in this.data){
			if(this.data.hasOwnProperty(key)){
				this.data[key] = "";
			}
		}
		/*for(var key in data){
			if(data.hasOwnProperty(key)){
				this.data[key] = data[key];
			}
		}*/
		this.data.id = Math.uuid(8);
		return this.data;
	}
})



namespace("core.vo.Account", {
	'@inherits' : core.vo.Model,

	initialize : function (data) {
		if(!data) {return}
		this.parent(data);
		if(!this.data.last_login_date) {
			this.data.last_login_date = new Date().getTime();
		}
	},

	isValid : function(){
		if(!this.data || 
		   !this.data.last_login_date || 
		   !this.data.username) {
			return false;
		}
		else {
			var lastDate = new Date(this.data.last_login_date);
			var today = new Date();
			var millisec = today - lastDate;
			//var minutes = (millisec / (1000 * 60)).toFixed(1);
			var timeout = Session.State.Timeout||"20 mins";
			var timeout_regx = timeout.match(/([0-9]+)\s([A-Za-z]+)/);
			var duration;
			var unitType = timeout_regx[2];
			var unitVal = parseInt(timeout_regx[1]);

			if(unitType.indexOf("day")>=0){
				duration = Math.round(millisec / 86400000); // days
			}
			else if(unitType.indexOf("min")>=0){
				duration = (millisec / (1000 * 60)).toFixed(1); //minutes
			}
			else if(unitType.indexOf("hour")>=0){
				duration = Math.round((millisec % 86400000) / 3600000); // hours
			}
			else {
				duration = (millisec / (1000 * 60)).toFixed(1); //minutes
			}
			if(duration > unitVal){
				return false;
			}
			else {
				return true;
			}
		}
	},

	touch : function(){
		this.data.last_login_date = new Date().getTime();
		core.data.StorageManager.commit();
	}
});



//----------------CONTROLLERS------------------



namespace("core.controllers.Filter", {
 
    initialize : function(data){
        this.data = data;
        this.items = this.data.items.slice(0, this.data.items.length-1);
    },

    where : function(condition){
        this.items = this.items.where(condition);
    },

    getData : function(){
        return {
            table : this.data.table,
            items : this.items
        }
    }
});


namespace("core.controllers.DataController", {
    '@datatype' : core.vo.Model,
    '@traits'   : [Observer.prototype],
    observations : [],
    subscribers  : {},


    initialize : function(host, async){
        var self=this;
        if(!application.db){
            application.db = {};
        }
        this.host = host;
        this.async = typeof async == "boolean"?async:false;
        return this;
    },

    load : function(uri, params){
        force = (typeof force == "boolean") ? force:false;
        uri = uri || this.CONFIG;
        if(!this.getData() || force){
            var self=this;
                params=params||{};
            try{
                var a = new core.http.WebAction(uri,params,{},this.async);
                a.invoke({
                    onSuccess  : this.onDownloaded.bind(this),
                    onFailure  : this.onDownloadFailure.bind(this),
                    onRejected : this.onDownloadFailure.bind(this)
                })
            } catch(e){
                console.error("Check your data controller data path. " + this.namespace +"#load(uri, params) -- " + e.message);
            }
        } else {
            this.dispatchEvent("loaded", {controller: this, data:this.getData(), response:null, fromcache:true}, this);
        }
    },

    getRouteConfig : function(){
        return this.CONFIG ?
            this.CONFIG.config : null;
    },

    getData : function(){
        if(this.filter) {
            return this.filter.getData()
        } else {
            var config = this.getRouteConfig();
            var table_name = config ? config.table:this.table;

            return application.db[table_name];
        }
    },

    setData : function(name,data){
        this.table = name;
        application.db[name] = data;
    },

    onDownloaded : function(r, responseText){
        try{
            try{
                var _data = JSON.parse(responseText);
            }
            catch(e) {
                console.error(e.message, e);
            }
            if(_data){
                this.onDataReceived(_data, r);
            }
        }
        catch(e){
            console.error(e.message,responseText)
        }
    },

    onDataReceived : function(_data, xhr){
        var self=this;
        _data = this.onInitializeModelDataObjects(_data);
        this.setData(_data.table, _data);
        _data = this.getData();

        this.paginator = new core.traits.Paginator({
            data : _data.items,
            pageSize : 3,
            currentPage:0
        });
        this.dispatchEvent("loaded", {controller: this, data:_data, response:xhr, fromcache:false}, this);
        if(this.host){
            if(this.host.onDownloadComplete){
                console.warn(self.host.namespace + "#onDownloadComplete() - Deprecated. Use addEventListener('loaded', callback, false) to be notified when data is loaded and ready for use.");
                setTimeout(function(){
                    self.host.onDownloadComplete(_data, self);
                },100);
            }
            else {
                console.warn(this.host.namespace + " should implement #onDownloadComplete(_data) to be notified when the data controller has loaded it's data and ready for use.");
            }
        }
    },

    getPaginator : function(size,cpage){
        size =  typeof size ==  "number" ? size:10;
        cpage = typeof cpage == "number" ? cpage:0;

        return new core.traits.Paginator({
            data : this.getData().items,
            pageSize : size,
            currentPage:cpage
        });
    },

    onInitializeModelDataObjects : function(data){
        /*var tablename = data.table;
        var items = data.items||[];
        for(var i=0; i<=items.length-1; i++) {
            var item = items[i];
            var Model = this['@datatype'];
            var modelObject = new Model(item);
            data.items.splice(i,1, modelObject);
        }
        ;*/
        return data;
    },

    onDownloadFailure : function(r, responseText){
        //alert("error downloading " + this.namespace + " data");
        console.error("onDownloadFailure(): ", responseText)
    },

    getItemById : function (id) {
        var data = this.getData();
        if(data){
            var items = data.items;
            var item = null;

            for(var i=0; i<=items.length-1; i++) {
                item = items[i];
                if(item.id){
                    if(item && item.id == id) {
                        break;
                    }
                }
            }
            return item;
        }
    },

    getItemCopy : function(){
        var data = this.getData();
        var data_COPY = {};
        var item = data.items[0];
        for(var key in item){
            if(item.hasOwnProperty(key)){
                data_COPY[key] = item[key];
            }
        }
        return data_COPY;
    },

    getItemByIndex : function(index){
        var data = this.getData();
        return data.items[index]
    },

    sort : function(attrb, sorterFunc){
        var data = this.getData();
        sorterFunc = sorterFunc||function (a, b) {
          if (a[attrb] > b[attrb]) {
            return 1;
          }
          if (a[attrb] < b[attrb]) {
            return -1;
          }
          // a must be equal to b
          return 0;
        };

        console.info("sorting items by column attrb: " + attrb)
        data.items.sort(sorterFunc);
        this.dispatchEvent("sorted", {controller: this, sortby:attrb}, this);

    },

    insert : function(obj){
        var data = this.getData();
        if(!obj instanceof this['@datatype']) {
            throw new Error("<obj> being inserted should be of type <core.vo.Model> or an object that inherits from it.");
        } 
        else {
            if(obj.isValid()){
                var val = obj.value();
                if(!val.id){
                    val.id = Math.uuid(8);
                }
                data.items.push(obj.value());
                this.dispatchEvent("insert", {controller: this, value:val}, this);
                return obj.value();
            }
        }
    },

    getFilteredDataset : function(column_name, value){
        var data = this.getData();
        value = (value||"").toLowerCase();
        var dataset = JSON.parse(JSON.stringify(data));
        dataset.items = [];
        if(data){
            var items = data.items;
            var item = null;

            for(var i=0; i<=items.length-1; i++) {
                item = items[i];
                if(item) {
                    var val = (item[column_name]||"").toLowerCase();
                    if(val.indexOf(value) >=0){
                        dataset.items.push(item);
                    }
                }
            }
        };

        function updateColumnFilterValue(dataset, column_name, value){
            for(var j=0; j<=dataset.columns.length-1; j++ ){
                var column = dataset.columns[j];
                if(column.path == column_name){
                    column.filter.value = value;
                }
            }
            return dataset;
        };

        dataset = updateColumnFilterValue(dataset, column_name, value);
        return dataset;
    },

    getEmptyDataSet : function(){
        var dataset = JSON.parse(JSON.stringify(this.getData()));
        dataset.items = [];
        return dataset;
    },

    remove : function(id, items){
        var data = this.getData();
        items = items||data.items;
        var item = null;
        var removed=false;

        for(var i=0; i<=items.length-1; i++) {
            item = items[i];
            if(item && item.id == id) {
                data.items.splice(i,1);
                this.dispatchEvent("removed", item, this);
                removed = true;
                break;
            }
        }
        return removed;
    },

    update : function(sourceObj){
        var existingObj = this.getItemById(sourceObj.id);
        existingObj.extend(sourceObj);
        this.dispatchEvent("updated", {controller:this, object:existingObj}, true);
        return existingObj;
    },

    removeByQuery : function(query){
        var data  = this.getData();
        var items = data.items.where(query);
        for(var i=0; i<=items.length-1; i++){
            var item = items[i];
            var inx = data.items.indexOf(item);
            if(inx>=0){
                data.items.splice(inx,1);
            }
        }
        this.dispatchEvent("removed", true, this);
    },

    applyFilter : function(condition){
        this.removeFilters();
        var filter = new core.controllers.Filter(this.getData());
            filter.where(condition);
        this.filter = filter;
        this.dispatchEvent("filtered", {controller: this, filter:filter}, this);
    },

    removeFilters : function(){
        this.filter = null;
    }
});



namespace("core.controllers.AccountDataController", {
    '@inherits' : core.controllers.DataController,
    CONFIG:ROUTES.DATA.ACCOUNTS,

	initialize : function(host, async){
		this.parent(host, async);
		if(!this.getData()){
			this.load(this.CONFIG);
		}
	},

	getUserByRole : function(role){
		if(this.getData()){
			var items = this.getData().items;
			var item = null;
			var found = null;

			for(var i=0; i<=items.length-1; i++) {
				item = items[i];
				if(item) {
					if(item.role.toLowerCase() == role.toLowerCase()) {
						found = item;
						break;
					}
				}
			}
			return found;
		}
	},
	
	getCurrentUser : function(){
		return this.getUserById(Session.user.id);
	},

	getUserById : function(id){
		if(this.getData()){
			var items = this.getData().items;
			var item = null;
			var found = null;

			for(var i=0; i<=items.length-1; i++) {
				item = items[i];
				if(item) {
					if(item.id == id) {
						found = item;
						break;
					}
				}
			}
			return found;
		}
	},

	getUserByAccount : function(username, password){
		console.info("Searching for a user by username, password");
		if(this.getData()){
			var items = this.getData().items;
			return items.where("$.username=='" + username +"' && $.password=='" + password + "'")[0];
		}
	},

	getAllUsers : function(){
		var items = this.getData().items;
		return items||[];
	}
});




/**
Used for reading, writing, modifying localStorage.
**/
namespace("core.controllers.StorageController", {
    '@inherits' : core.controllers.DataController,
    initialize : function(){
        this.allocate("session");
        //this.addEventListener("loaded", this.onLoad.bind(this), false);
    },

    allocate : function(name){
        if(!Session.localStorage){
            Session.localStorage = {};
        }
        this.alloc_name = name;

        Session.localStorage[name] = core.data.StorageManager.get(this.alloc_name)||{};
        Session.localStorage[name].items = Session.localStorage[name].items||[];
        Session.localStorage[name].table = this.alloc_name;
    },

    getData : function(){
        return Session.localStorage[this.alloc_name];
    },

    reset : function(commit){
        Session.localStorage[this.alloc_name] = {};
        Session.localStorage[this.alloc_name].items = [];
        Session.localStorage[this.alloc_name].table = this.alloc_name;
        
        if(commit){
            this.commit();
        }
        //this.allocate();
    },

    load : function(params){
        
        var self=this;
        var _data = this.getData();
        if( _data){
            var items = (_data instanceof Array)?_data:_data.items;
                items = items||[];
            this.paginator = new core.traits.Paginator({
                data : items,
                pageSize : 10,
                currentPage:0
            });
        }
        if(!_data.isSeeded){
            this.load_seed_data(function(data){
                // alert("seeding:" + data)
                var items = data.items||data.result;
                if(data && items){
                    items.forEach(function(item){
                        _data.items.push(item)
                    })
                }
                _data.isSeeded = true;
                self.commit();
                self.dispatchEvent("loaded", {
                    data:_data, 
                    response:null, 
                    fromcache:true,
                    controller: self
                }, self);
            },params);
        } else{
            self.dispatchEvent("loaded", {
                data:_data, 
                response:null, 
                fromcache:true,
                controller: self
            }, self);
        }
    },

    // onLoad : function(){
    //     alert("loaded")
    // },

    load_seed_data : function(cb,params){
        var self=this;
        params=params||{};
        var async = false;
        try{
            var a = new core.http.WebAction(this.SEED_DATA_URI,params,{},async);
            a.invoke({
                onSuccess  : this.onSeedDataloaded.bind(this,cb),
                onFailure  : this.onDownloadFailure.bind(this),
                onRejected : this.onDownloadFailure.bind(this)
            })
        } catch(e){
            console.error("Check your data controller data path. " + this.namespace +"#load(uri, params) -- " + e.message);
        }

    },

    onSeedDataloaded : function(cb, r, responseText){
        var _data;
        try{
            try{
                _data = JSON.parse(responseText);
            }
            catch(e) {
                console.error(e.message, e);
            }
            if(_data){
                cb(_data, r);
            }
        }
        catch(e){
            console.error(e.message,responseText)
        }
    },

    set : function(key,val, commit){
        var data = this.getData();
            data[key] = val;
            // if(commit){
                this.commit();
            // }
    },

    get : function(key){
        var data = this.getData();
        return data[key];
    },


    find : function(whereCondition){//ex: .find("$.status == 'Approved'")
        console.warn(this.namespace + "#find() -- is deprecated. Use .where() instead.");
        return this.where(whereCondition);
    },

    where : function(whereCondition){//ex: .find("$.status == 'Approved'")
        var data = this.getData();
        return data.items.where(whereCondition);
    },

    store : function(key,data){
        console.warn(this.namespace + "store() - deprecated. Use .insert(object) to store an object using this data controller.")
    },

    insert : function(obj, commit){
        var data = this.getData();
        var item = null;

        if(!obj instanceof this['@datatype']) {
            throw new Error(this.namespace + "insert(obj) - obj being inserted should be of type <core.vo.Model> or an object that inherits from it.");
        } 
        else {
            if(obj.isValid()){
                var val = item = obj.value();
                if(!val.id){
                    val.id = Math.uuid(8);
                }
                data.items.push(obj.value());
                this.dispatchEvent("insert", {controller: this, value:val}, this);
                item = obj.value();
            } else {
                console.error(this.namespace + "#insert(obj) - Object of type <" + obj.namespace + "> being inserted is not valid.", obj);
                return;
            }
        }

        if(item) {
            if(commit){
                this.commit();
            }
        } else {
            console.error("Hmm, object didn't save right.", data);
        }
        // console.log("yyy", data)
        return item;
    },

    commit : function(){
        core.data.StorageManager.set(this.alloc_name, this.getData(), true);
    }
});


//---------------------UI----------------------
SimpleTemplateEngine = {
    parseTemplate : function(templateString, data){
        return templateString;
    }
};



namespace('core.models.ComponentModel', {
	"@traits": [new Observer],


	initialize: function(data, element) {
		this.resetListeners();
		this.resetModel(data);
		this.setElement(element);
	},
	
	setElement : function(element){
		this.element = element||this;
	},
	
    
	start: function() {},
	
	resetListeners: function() {
		this.observations = [];
		this.subscribers = {};
	},
	
	resetModel: function(data) {
		this.data = data;
	},
	
	set: function(prop, value) {
		this.data[prop] = value;
		this.dispatchEvent("modelchanged", {
			model: this,
			name: prop
		});
	},
	
	get: function(prop) {
		return this.data[prop]; 
    },
	
	isValid: function() {
        var self = this;
		return true;
	},

	find: function(jsonquery) {
		
	},
	
	registerUI:function(){},
	
	resolve: function(path, obj){
			var scope       = obj||window;
			var nsParts     = path.split(/\./); 
			//console.warn(nsParts)
			for (var i = 0; i <= nsParts.length - 1; i++) {
					if(i >= nsParts.length - 1) {
						return scope[nsParts[i]]
					}
					else {
		            	scope = scope[nsParts[i]];
		           }
                            //console.info(scope)
			};
			return scope; 
	}
});



namespace("core.traits.CSSStyleUtilities");

core.traits.CSSStyleUtilities = {
	__getInheritableStylesheets : function(){
        var ancestor    = this.ancestor;
        var classes     = [];
        var ancestors   = [];
        var stylesheets = [];
        
        //debugger;
        if(this["@cascade"]) {
            while(ancestor){
                classes.unshift(ancestor.prototype.classname);
                var styles = ancestor.prototype["@stylesheets"]||[];
                //stylesheets = stylesheets.concat(styles)
                    ancestors.unshift(ancestor);
                    for(var i=0; i<=styles.length-1; i++){ 
                        stylesheets.push(this.relativeToAbsoluteFilePath(styles[i], ancestor.prototype.namespace));     
                    }
                    
                if(ancestor.prototype["@cascade"]) {
                    ancestor = ancestor.prototype.ancestor;
                }
                else { ancestor=null; break; }
            };

            var this_styles = this["@stylesheets"]||[];
            for(var i=0; i<=this_styles.length-1; i++){ 
                stylesheets.unshift(this.relativeToAbsoluteFilePath(this_styles[i],this.namespace));     
            }
        }
        else {
            stylesheets = ([].concat(this["@stylesheets"]||[]));
        }
        this.classList = classes;
        this.classList.push(this.classname);
        return stylesheets;
    },

    loadcss: function(url){
        var self=this;
        var usingSking=false;
        var stylesheets = window.loaded_stylesheets;
        if (!stylesheets) {
            window.loaded_stylesheets = {};
            stylesheets = window.loaded_stylesheets;}
        
        //alert("stylesheets[url]: " + (stylesheets[url]||url))
        if(stylesheets[url]){
            self.__onStylesheetLoaded(stylesheets[url]); 
            return;
        }   
        if((Config.SKIN && stylesheets[Config.SKIN])){
            return;
        }
        if(Config.SKIN && !stylesheets[Config.SKIN]) {url=Config.SKIN; usingSking=true;}
        var something_went_wrong = "Error loading stylesheets. Expected an array of style urls or a single url to a stylesheet for this component.";
        var styles = (url||this["@stylesheets"]);

        if(styles) {
            if(styles instanceof Array) {
                styles = styles.reverse();
                for(var i=0; i<=styles.length-1; i++) {
                    //debugger;
                    var path = styles[i];//this.resourcepath(styles[i]);
                    this.loadcss(path);
                }
            }
            else if(typeof styles === "string" && styles.indexOf("http") != 0) {
                //var path = this.resourcepath(styles);
                var path = styles;
                if(stylesheets[path]){return}
                    
                var stylenode= document.createElement('style');
                    stylenode.setAttribute("type", 'text/css');
                    stylenode.setAttribute("rel", 'stylesheet');
                    stylenode.setAttribute("href", path);
                    stylenode.setAttribute("media", 'all');
                    stylenode.setAttribute("component", this.namespace||"");
                    //head.appendChild(stylenode);
                    this.appendStyleSheet(stylenode);
                    stylesheets[path] = stylenode;
                    var oXMLHttpRequest;
                        try{
                            oXMLHttpRequest = new core.http.XMLHttpRequest;
                        } catch(e){
                            oXMLHttpRequest = new XMLHttpRequest;
                        };
                        oXMLHttpRequest.open("GET", path, true);
                        oXMLHttpRequest.setRequestHeader("Content-type", "text/css");
                        if(oXMLHttpRequest.overrideMimeType){
                            oXMLHttpRequest.overrideMimeType("text/css")
                        }

                        oXMLHttpRequest.onreadystatechange  = function() {
                            if (this.readyState == XMLHttpRequest.DONE) {
                                //if (this.status == 200) {
                                    var _cssText = self.cssTransform(this.responseText);
                                    self.setCssTextAttribute(_cssText, stylenode); 
                                    self.__onStylesheetLoaded(stylenode);           
                                //}
                            }
                        }
                        oXMLHttpRequest.send(null);
            }
            else if(styles && styles.indexOf("http") == 0){
                var cssNode = document.createElement('link');
                cssNode.type = 'text/css';
                cssNode.setAttribute("component", this.namespace||"");
                cssNode.rel = 'stylesheet';
                cssNode.href = this.resourcepath(styles);
                this.appendStyleSheet(cssNode);
                stylesheets[styles] = cssNode;
                self.__onStylesheetLoaded(cssNode);
            }
            else{
                try{console.warn("Unable to resolve path to stylesheet. Invalid uri: '" + styles + "'")} catch(e){}
            }
        }
        else {}
        
    },
    
    cssTransform : function(_cssText){
		var self=this;
		try{
    		_cssText = _cssText.replace(/resource\(([A-Z0-9a-z\'\"\s\_\.\/\\\-.\$\[\]]*)\)/img, function(){
    		    return "url(" + self.resourcepath(arguments[1]) + ")"
    		});
            _cssText = this.onInterpolateResourcePaths(_cssText);
		} catch(e){console.warn("CSS parse warning: unable to parse custom css function 'resourcepath()'")}
		return _cssText;
	},
    
    onStylesheetLoaded : function (style){},
    
    __onStylesheetLoaded : function(style){
    	this.onStylesheetLoaded(style)
    },
    
    setCssTextAttribute : function(_cssText, stylenode){
		if (stylenode && stylenode.styleSheet) {
            stylenode.styleSheet.cssText = _cssText;
        }
        else {
            stylenode.appendChild(document.createTextNode(_cssText));
        }
	},
    
    
	getStyle : function (styleProp, element) {
	    element = element||this.element;
        if (element.currentStyle){
            var y = element.currentStyle[styleProp];
        }
        else if (window.getComputedStyle) {
            var y = document.defaultView.getComputedStyle(element,null).getPropertyValue(styleProp);
        }
        return y;
	},
	
	up : function(classname, element){
	  	classname = classname.replace(".","");
	  	element   = element||this.element;
	  	while(element && !this.hasClass(classname,element)){
	  		element=element.parentNode;
		};
	  	return element;
	},
	
	down : function(classname, element){
		element   = element||this.element;
	  	return this.querySelector(classname, element);
	},
	
	addClass: function(name, element) {
		element = element||this.element;
		
		if (!this.hasClass(name, element)) { 
			element.className += (element.className ? ' ' : '') + name; 
		}
	},
	
	hasClass : function (name, element) {
		element = element || this.element;
	  //return ((element || this.element).className.indexOf(classname) >= 0);
		return (element.className.indexOf(name) >=0)//new RegExp('(\\s|^)'+name+'(\\s|$)').test(element.className);
	},
	
	removeClass : function(name, element){
		element = element||this.element;
		if (this.hasClass(name, element)) {
      		element.className = element.className.replace(
      			new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
   		}
	},
	
	toggleClass : function(className, element){
		element = element||this.element;
		if(this.hasClass(className,element)) {
    		this.removeClass(className,element)
    	}
    	else{
    		this.addClass(className,element)
    	}
	},
	
	createStyleDocument : function (callback) {
		window.loadedstylesheets = window.loadedstylesheets||{};
		if(window.loadedstylesheets[this.namespace]) {
			return;
		}
		var cssCode 		= (this.cssText && this.cssText.indexOf("<%") >= 0) ?
			this.parseTemplate(this.cssText,{}):
			this.cssText;
			
		if(!cssCode || cssCode.length <= 0) { return };
		this.stylesheet = document.createElement('style');
		this.stylesheet.setAttribute("type", 'text/css');
		this.stylesheet.setAttribute("rel", 'stylesheet');
		this.stylesheet.setAttribute("component", this.namespace||"");
		
		
        if (this.stylesheet.styleSheet) {
            this.stylesheet.styleSheet.cssText = cssCode;
        }
        else {
            this.stylesheet.appendChild(document.createTextNode(cssCode));
        }
        this.appendStyleSheet(this.stylesheet)
		window.loadedstylesheets[this.namespace] = true;
		return this.stylesheet;
	},
	
	appendStyleSheet : function(stylesheet){
		var headNode 		= application.head;
		var configscript 	= application.configscript;
		headNode.insertBefore(stylesheet, configscript);
	}
};


namespace("core.ui.Node", {
    
    addEventListener : function(type, callback, capture, element){
    	capture = (typeof capture == "boolean") ? capture : false;
    	element = element||this.element;
    	if(callback && !callback.isBound) {
			callback = callback.bind(this);
		}
		
		return element.addEventListener(type, callback, capture);
    },

    querySelectorAll : function(cssSelector, element){
        element = element || this.element;
        if(document.querySelectorAll) {
            return [].toArray(element.querySelectorAll(cssSelector))}
        else {
            throw new Error("'#querySelectorAll()' api not defined")
        }
    },
    
    querySelector : function(cssSelector, element){
        element = element || this.element;
        if(document.querySelector) {
            return element.querySelector(cssSelector);}
        else {
            throw new Error("'#querySelector()' api not defined");
        }
    },
    
    removeEventListener : function(type, callback, capture, element){
    	element = element||this.element;
    	return element.removeEventListener(type, callback, capture)
    },
    
    dispatchEvent : function(type, bubbles, cancelable, eventdata, element){
    	element 	= element||this.element;
    	bubbles 	= (typeof bubbles 	 == "boolean") ? bubbles 	: true;
    	cancelable 	= (typeof cancelable == "boolean") ? cancelable : true;
    	var evt 	= document.createEvent("Event");
		evt.initEvent(type, bubbles, cancelable);
		evt.data 	= eventdata;
		
		element.dispatchEvent(evt);
		return evt;
    },
    
    createEvent : function(type, bubbles, cancelable, eventdata){
    	bubbles 	= (typeof bubbles 	 == "boolean") ? bubbles 	: true;
    	cancelable 	= (typeof cancelable == "boolean") ? cancelable : true;
    	var evt 	= document.createEvent("Event");
			evt.initEvent(type, bubbles, cancelable);
			evt.data= eventdata;
		return evt;
    },
    
    
    parentNode: function(element){
    	element = element||this.element;
		return element.parentNode;
    },
    
    childNodes: function(element){
    	element = element||this.element;
		return element.childNodes;
    },
    
    firstChild: function(element, elementOnly){
		element = element||this.element;
        var fc = element.firstChild;
        if(elementOnly) {
	        while (fc&&fc.nodeType != 1) {
	            fc = fc.nextSibling;
	        }
        }
        return fc;
    },
    
    lastChild: function(element, elementOnly){
		element = element||this.element;
        var lc = element.lastChild;
        if(elementOnly) {
	        while (lc.nodeType != 1) {
	            lc = lc.previousSibling;
	        }
        }
        return lc;
    },
    
    hasChildNode : function (child, parent) {
		parent = parent||this.element;
		if (parent === child) { 
			return false; 
		}
		while (child && child !== parent) { 
			child = child.parentNode; 
		}
	   return child === parent;
	},
    
    previousSibling: function(element, elementOnly){
		element = element || this.element;
		element = element.previousSibling;
		var args = arguments;
        if(elementOnly) {
	        while (element && element.nodeType != 1) {
	        	element = element.previousSibling
	        }
       	}
        return element;
    },
    
    nextSibling: function(element, elementOnly){
		element = element || this.element;
		element = element.nextSibling;
		if(elementOnly) {
	        while (element && element.nodeType != 1) {
	        	element = element.nextSibling
	        }
       	}
		return element;
    },
    
    attributes: function(){
		element = element || this.element;
		return element.attributes;
    }, //NamedNodeMap
    
    ownerDocument: function(element){
    	element = element || this.element;
		return element.ownerDocument;
    },
    
	insertBefore: function(newNode, refNode){
		var el = refNode||this.element;
		return el.parentNode.insertBefore(newNode, el);
    },
	
	insertAfter : function(newNode, refNode) {
		var el = refNode||this.element;
		return el.parentNode.insertBefore(newNode, this.nextSibling(el));
	},
	
	swapNode : function(b) {
	    var a = this.element;
	    var t = a.parentNode.insertBefore(document.createTextNode(""), a);
	    b.parentNode.insertBefore(a, b);
	    t.parentNode.insertBefore(b, t);
	    t.parentNode.removeChild(t);
	    return this;
	},
    
    replaceChild : function(newChild, oldChild){
    	oldChild = oldChild||this.element;
		return oldChild.parentNode.replaceChild(newChild, oldChild);
	},
    
    removeChild : function(element){
		element = element||this.element;
		return element.parentNode.removeChild(element);
	},
    
    appendChild : function(child, slot, element){
		element = element||this.element;
		slot = (typeof slot === "string") ? this.querySelector(slot) : slot;
		slot = (slot)? slot:element;
		slot.appendChild((child instanceof core.ui.Node || child.element) ? child.element:child);
		return child;
	},
    
    hasChildNodes: function(){
		return (this.childNodes().length > 0);
    },
    
    cloneNode : function(deep){
		deep = (typeof deep !== "undefined")? deep:true;
		return new this.constructor({}, this.element.cloneNode(deep));
	},
    
    getBoundingClientRect : function(element) {
        element = element||this.element;
        if (element.getBoundingClientRect) {
            // (1)
            var box = element.getBoundingClientRect();
            
            var body    = document.body
            var docElem = document.documentElement
            
            // (2)
            var scrollTop   = window.pageYOffset || docElem.scrollTop || body.scrollTop;
            var scrollLeft  = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
            
            // (3)
            var clientTop   = docElem.clientTop || body.clientTop || 0
            var clientLeft  = docElem.clientLeft || body.clientLeft || 0
            
            // (4)
            var top  = box.top  + (scrollTop  - clientTop);
            var left = box.left + (scrollLeft - clientLeft);
            
            return { 
                top: Math.round(top), 
                left: Math.round(left),
                right:  Math.round(box.right),
                bottom:  Math.round(box.bottom),
                width : Math.round(box.right - left),
                height: Math.round(box.bottom - top)
            }
        }
        else {
            //console.warn(this.namespace + "#getBoundingClientRect() - not supported by 'this.element' node on this device.")
            var top=0, left=0, right=0, bottom=0, width=0, height=0;
            while(element) {
                top  = top  + parseInt(element.offsetTop, 10);
                left = left + parseInt(element.offsetLeft,10);
                right = left + element.offsetWidth;
                bottom = top + element.offsetHeight;
                width = element.offsetWidth;
                height = element.offsetHeight;
                element = element.offsetParent;       
            };
            return {top: top, left: left, right:right, bottom:bottom, width:width, height:height};
        }
    },
    
    hittest : function(component) {
        if(!component){ return false }
        var compare,bounds;
        if( component instanceof core.ui.Node){
            compare = component.getBoundingClientRect();
        }
        else if(component && ("left" in component) && ("top" in component)){
            compare = component;
        }
        else {
            throw new Error(this.namespace + "#hittest(component); expected an instance of\
            core.ui.Node or {top:<int>, left:<int>}");
        }
        bounds = this.getBoundingClientRect();
        return (compare.left > bounds.left && compare.top > bounds.top && compare.left < bounds.right && compare.top < bounds.bottom);
    },
    
    getAttribute : function(attrName, element){
        element = element||this.element;
        if(element && typeof element == "string") {
            element = this.querySelector(element)||this.element;
        }
        var val = element.getAttribute(attrName);
        if(isNaN(val) == false && (/^\d+$/.test(val))) {
            return parseInt(val, 10);
        } else {
            return val;
        }
    },

    getParentBySelector : function ( elem, selector ) {
        elem = elem ||this.element;
        for ( ; elem && elem !== document; elem = elem.parentNode ) {
            if ( elem.matches( selector ) ) return elem;
        }
        return null;
    },

    getAllParentsBySelector : function ( elem, selector ) {
        elem = elem ||this.element;
        var parents = [];
        for ( ; elem && elem !== document; elem = elem.parentNode ) {
            if ( selector ) {
                if ( elem.matches( selector ) ) {
                    parents.push( elem );
                }
            } else {
                parents.push( elem );
            }
        }
        return parents;
    },

    getParentBySelectorUntil : function ( elem, terminator, selector ) {
        elem = elem || this.element;
        var parent_node = null;
        for ( ; elem && elem !== document; elem = elem.parentNode ) {
            if ( terminator ) {
                if ( elem.matches( terminator ) ) break;
            }
            if ( selector ) {
                if ( elem.matches( selector ) ) {
                    parent_node =  elem;
                    break;
                }
            }
        }
        return parent_node;
    },

    getRealTargetFromEvent : function(e, selector, terminator){
        var el = e.target;
        return this.getParentBySelectorUntil(el, terminator, selector);
    }
});


namespace("core.ui.HtmlComponent", {
    '@inherits':    core.ui.Node,
    '@cascade' :    false,
	'@traits'  :    [
		core.traits.ResourcePathTransformer, 
		core.traits.CSSStyleUtilities
	],
	'@model'   :    core.models.ComponentModel,
	'@stylesheets': [],
	'@htmlparser' : SimpleTemplateEngine,
	
	preInitialize : function(model, element, domready_func) {
        try {
            var self=this;
            if(element && element.prototype instanceof core.ui.Node){return;}
            this.setDomReadyCallback(domready_func);
            this.onHashChanged_Handler = this.onHashChanged.bind(this);
            this.onPreRender(model, element);
            this.setModel(model);
            this.setElement(element);
            this.setPrototypeInstance();
            this.setNamespace();
            this.setUUID();
            this.rerouteEvents();
            this.setStyleDocuments();
            this.renderDOMTree();
        } 
        catch(e){
            var msg = this.namespace + ".prototype.preInitialize() - " + e.message;
            console.error(msg, this);
        }
        return this;
    },
    
    initialize : function(model, element, domready_func) {
        
        return this;
    },
    
    setDomReadyCallback : function(cb){
        this.domReadyHandler = cb;
    },
    
    onDomReady : function(el){
        this.onRender(this.model, this.element);
        
        if(this.domReadyHandler){
            this.domReadyHandler(el, this);
        }
        try{
            this.initializeChildComponents();
            this.initializeTraits();
            this.initialize(this.model, this.element);
        }catch(e){
            var msg = this.namespace + ".prototype.preInitialize() - " + e.message;
            try{console.error(msg)} catch(e){};
        }
    },

    
    setStyleDocuments : function(){
        this.createStyleDocument();
        this.setClassList();
        this.loadcss(this.__getInheritableStylesheets());
    },
    
    getComponentByQuery : function(cssSelector){
    	var el = this.querySelector(cssSelector);
    	return (el)? el.prototype:el;
    },

    getComponentByNamespace : function(namespace){
    	var el = this.querySelector("*[namespace='" + namespace + "']");
    	return (el)? el.prototype:el;
    },
    
    onPreRender : function(model, element){},
    
    onRender: function(componentModel, componentElement){
        this.dispatchEvent("rendered",true,true,{});
    },
    
    dispose : function(){
    	application.removeEventListener("statechanged", this.onHashChanged_Handler, false);
    },
	
	setClassList : function(){
		//classList is defined in core.traits.CSSStyleUtilities.__getInheritableStylesheets();
		if(!this.classList){
			var ancestor	= this.ancestor;
	        var classes 	= [];
	        var ancestors 	= [];
	        var stylesheets = [];
	        
	        if(this["@cascade"]) {
	        	while(ancestor){
	        		classes.unshift(ancestor.prototype.classname);
	        		ancestor = (ancestor.prototype["@cascade"])?
	        			ancestor.prototype.ancestor:null;
	        		if(!ancestor) break;
		        }
	        }
	        this.classList = classes;
	        this.classList.push(this.classname);
       	}
	    if(!this["@cascade"]) {
	    	this.addClass(this.classname);
	    }
	    else {
        	this.addClass(this.classList.join(" "), this.element);
	    }
	},
	
	initializeChildComponents : function(el){
	    el = el||this;
		var self=this;
		this.components = {};
		var _childNodes = el.querySelectorAll("*[namespace]");
			for(var i=0; i<=_childNodes.length-1; i++){
				var node = _childNodes[i];
				if(!node || node.nodeType != 1) { continue };
                if(node.prototype && (node.prototype instanceof core.ui.Node)){continue};
                if(node.inProgress) {continue};
                node.inProgress=true;
                var ns      = node.getAttribute("namespace");
                var Class   = NSRegistry[ns];
                var cid     = node.getAttribute("name");
                var f = function(el){};
                if(Class && node) {
                	var component = new Class(null, node, f);
               		self.components[cid] = component;
                }
			};
	},
	
	onHashChanged : function(e){
		
	},
	
	rerouteEvents : function(){
		var self=this;
		application.addEventListener("statechanged", this.onHashChanged_Handler, false);
	    
		this.addEventListener("mouseover", function(e){
			var relTarget = e.relatedTarget;
      		if (self.element === relTarget || self.hasChildNode(relTarget)){ return; }
			else{ self.dispatchEvent("hoverover", true, true, {})}
		}, true);
		
		this.addEventListener("mouseout", function(e){
			var relTarget = e.relatedTarget;
      		if (self.element === relTarget || self.hasChildNode(relTarget)){ return; }
			else{ self.dispatchEvent("hoverout", true, true, {})}
		}, true);
	},
	
	zIndex : function(element){
		element = element||this.element;
		if(!this.globalzindex){this.globalzindex=0};
		this.globalzindex = this.globalzindex + 1;
		return this.globalzindex;
	},
	
	nodeIndex : function(){
		var index = -1;
		var nodes = this.element.parentNode.childNodes;
		for (var i = 0; i<=nodes.length-1; i++) {
			if(!nodes[i] || nodes[i].nodeType != 1){continue}
			index++;
		    if (nodes[i] == this.element){break;}
		}
		return index;
	},
	
	parentComponent : function(element){
		element = element||this.element;
		var parent = element.parentNode;
		while(parent){
			if(parent && parent.prototype && parent.getAttribute("namespace")){
				break;
			} else {
				parent = parent.parentNode;
			}
		}
		return parent;
	},
	
	offset : function(elem) {
		elem = elem||this.element;;
	
		var x = elem.offsetLeft;
		var y = elem.offsetTop;
	
		while (elem = elem.offsetParent) {
			x += elem.offsetLeft;
			y += elem.offsetTop;
		}
	
		return { left: x, top: y };
	},

	innerHTML : "<div></div>",
	
	setModel : function(jsonobj) {
		jsonobj = jsonobj||{};
		this.model = (jsonobj && jsonobj instanceof this["@model"]) ?
			jsonobj : new this["@model"](jsonobj||{}, this.element);
		return this.model;
	},
	
	setElement : function(element){
	    var canvas, el;
		el = this.element = element||document.createElement("div");
		if(this.element.prototype){return this.element;}
		return this.element;
    },
    
    renderDOMTree : function(){
        var el = this.element;
        var self=this;
        var canvas = this.querySelector(".canvas")||this.firstChild(null,true);
        this.canvas = canvas;
        
        if(el.childNodes.length<=0 || !canvas){
            if(!canvas){
                canvas=document.createElement("div"); 
                el.appendChild(canvas);  
            }
            this.canvas = canvas;
         	
            var path = this.constructor.prototype["@template-uri"]||
            		   (function(){
            		   	return self.constructor.prototype["@href"]}());

            if(path) {
                var oXMLHttpRequest;
                try{
                    oXMLHttpRequest = new core.http.XMLHttpRequest;
                } catch(e){
                    oXMLHttpRequest = new XMLHttpRequest;
                };
                    path = (typeof path=="string")?this.relativeToAbsoluteFilePath(path):path;
                    oXMLHttpRequest.open("GET", path, true);
                    oXMLHttpRequest.setRequestHeader("Content-type", "text/plain");
                    oXMLHttpRequest.onreadystatechange  = function() {
                        if (this.readyState == XMLHttpRequest.DONE) {
                            var htmltext = this.responseText;
                            self.constructor.prototype.innerHTML = htmltext;
                            self.constructor.prototype["@href"]=null;
                            self.constructor.prototype["@template-uri"]=null;
                            var view = self.parseElement();
                            canvas.appendChild(view);
                            self.innerHTML=canvas.outerHTML;
                            self.onDomReady(el);          
                        }
                    }
                    oXMLHttpRequest.send(null);
            } else {
               var view = this.parseElement();
               canvas.appendChild(view);
               self.onDomReady(el);
            }
        }
        else {
            self.onDomReady(el);
        }
        
        this.addClass("canvas", canvas);
        return el;
    },
	
	setUUID : function(){
		var uuid = Math.uuid(16);
		this.cuuid = uuid; // "c" for control
		this.element.setAttribute("cuuid", uuid);
	},
	
	setNamespace : function(){
		this.element.setAttribute("namespace", this.namespace);
	},
	
	getNamespace : function(){
		return this.element.getAttribute("namespace");
	},
	
	getPrototypeInstance : function(){
		return this.element.prototype;
	},
	
	setPrototypeInstance : function(){
		this.element.prototype = this;
	},
	
	get : function(key){
		return this.model.get(key)
	},
	
	set : function(key,val) {
		this.model.set(key,val);
	},
	
	getTemplateParser : function(){
       return TemplateEnginePlugins.Kruntch;
    },

    getDefaultTemplateEngine : function(){
       return TemplateEnginePlugins.Kruntch;
    },

    parseTemplate : function (template, _json) {
    	var self=this;
        var engine = this.getTemplateParser();
        var engineWarningMsg = this.namespace + "#getTemplateParser() - is specifying a template engine api, '" + engine.name + "', that is not found. Defaulting to 'Kruntch'.";
        engine = engine.isAvailable()?
        		 	engine:
        		 	(function(){
        		 		console.warn(engineWarningMsg); 
        		 		return self.getDefaultTemplateEngine()
        		 	})();
        return (engine.parseTemplate(template,_json||{}));
    },

	parseElement : function (template, json){
        var innerHTML = (typeof this.innerHTML === "function") ?
            this.innerHTML() : this.innerHTML;
         innerHTML = json?
            this.parseTemplate(innerHTML, json):
            innerHTML;
            
         if (innerHTML && innerHTML.length > 0) {
         	return this.onInterpolateResourcePaths(innerHTML).toHtmlElement()
         }
         else {
            throw new Error(this.namespace + "#parseElement(). Invalid xhtml generated from 'template' string. Value of 'html' is: "+ html);
         }
    },

    onInterpolateResourcePaths : function(html){
    	var path = this.namespace.replace(/\./gmi,"/");
    	//var html = "test $ROOT/src/./resources/images/checkmark.png";
		html = html.replace(/(src\/)\.(\/)/gmi,("$1" + path) + "$2");
		html = html.replace(/\$ROOT/gmi, Config.ROOTPATH);
		html = html.replace(/\/\//gmi, "/");
		return html;
    },
	
	resetzindex : function(){
		this.element.style["zIndex"] = 0;
	},
	
	cloneNode : function() {
		var elm   = this.element.cloneNode(true);
		var model = {}.extend(this.model.model);//js.extend({},this.model.model);
		var clone = new this.constructor(model||{},elm);
		return clone;
	},


	bind : function(el, evtName, handler){
        var self=this;
        el = (el instanceof core.ui.Binding)?
            el : el.element||el||this.element;

        if(typeof el == "string") {
            var _handler = function(e){
                var t = self.getRealTargetFromEvent(e,el);
                if(t) {
                    handler(e);
                }
            };
            this.element.addEventListener(evtName, _handler, false);
            var b = new core.ui.Binding(this.element, evtName, _handler);
            return b;
        } else {
            el.addEventListener(evtName, handler, false);
            if(!(el instanceof core.ui.Binding)){
                var b = new core.ui.Binding(el, evtName, handler);
                return b;
            }
        }
    },
	
	set : function(accessor){},
	
	get : function(keypath, accessor, e){}

});



namespace("core.ui.Binding", {
  '@traits' : [new Observer],

  initialize : function(el, evtName, handler){
    this.observations = [];
    this.subscribers  = {};

    this.element = el;
    this.evtName = evtName;
    this.handler = handler;
    this.bound=true;
  },

  unbind : function(){
    this.element.removeEventListener(this.evtName, this.handler, false);
    console.log("unbound", this.evtName,this.handler);
    this.bound=false;
  },

  bind : function(){
    this.element.addEventListener(this.evtName, this.handler, false);
    console.log("bounded", this.element);
    this.bound=true;
  },

  toggle : function(){
    this.bound?
      this.unbind():
      this.bind();

    this.dispatchEvent("change", {isbound:this.bound, target:this.element, binding:this}, this)
  }
});


namespace("core.ui.WebComponent", 
{
    '@inherits' : core.ui.HtmlComponent,
    '@stylesheets' : [],
    "@cascade"  : true,
    
    onRenderData : function(data, initChildComponents){
        this.initTemplateDefinitions(data);
        this.renderTemplate(data, data.table, initChildComponents);
    },

    initTemplateDefinitions : function(data){
        if(!this.templates){
            this.templates = {};
        }

        if(!this.templates[data.table]){
            this.templates[data.table] = {
                template : this.querySelector("#" + data.table + "-template"),
                div : this.querySelector("#" + data.table + "-container")||this.querySelector("#" + data.table)
            };
        }
        return this.templates;
    },
    
    renderTemplate : function(data, templateName, initChildComponents, autoInsert){
        initChildComponents = typeof initChildComponents=="boolean"?initChildComponents:false;
        autoInsert = typeof autoInsert=="boolean"?autoInsert:true;
        
        var templates = this.initTemplateDefinitions(data);

        var templateDefinition = templates[templateName];
        if(!templateDefinition){
            alert("error, no '" +templateName+ "' template found to render data");
            return;
        } 
        
        if(!templateDefinition.template){
            throw new Error("No matching template found in html to render/populate data for template named: '" + templateName + "' in component: " + this.namespace, this);
        }
        if(!templateDefinition.div){
            throw new Error("No matching template container found in html to render/populate data for template named: '" + templateName + "' in component: " + this.namespace + "\nExpectting a <div> container to wrap a template", this);
        }

        if(templateDefinition.template.parentNode){
            templateDefinition.template.parentNode.removeChild(templateDefinition.template);
        }
        // var text = Kruntch.Apply(templateDefinition.template.innerHTML, data);
        var text = this.parseTemplate(templateDefinition.template.innerHTML, data);
        var d = document.createElement(templateDefinition.parentTagName||"div");
        d.innerHTML = text;
        
        var container = d;
        if(!container){
            throw new Error("No matching template container found in html to render/populate data for template named: '" + templateName + "' in component: " + this.namespace + "\nExpectting a <div> container to wrap a template", this);
        }

        if(autoInsert){
            if(typeof templateDefinition.div == "string"){
                container = this.querySelector(templateDefinition.div);
            } else{
                container = templateDefinition.div;
            }
            if(!container){
                throw new Error("No matching template container found in html to render/populate data for template named: '" + templateName + "' in component: " + this.namespace, this);
            }
            if(templateDefinition.parentTagName){
                container.innerHTML="";
                container.appendChild(d);
            } else{
                container.innerHTML=d.innerHTML;
            }
        }
        if(initChildComponents){
            this.initializeChildComponents(container);
        }
        return container;
    },

    renderDOMTree : function(){
        var el = this.element;
        var self=this;
        
        var firstChild = this.firstChild(null,true);
        var path = this.constructor.prototype["@template-uri"]||
                   (function(){
                    return self.constructor.prototype["@href"]}());


        if(!firstChild){
            if(path) {
                var oXMLHttpRequest;
                try{
                    oXMLHttpRequest = new core.http.XMLHttpRequest;
                } catch(e){
                    oXMLHttpRequest = new XMLHttpRequest;
                };
                    path = (typeof path=="string")?this.relativeToAbsoluteFilePath(path):path;
                    oXMLHttpRequest.open("GET", path, true);
                    oXMLHttpRequest.setRequestHeader("Content-type", "text/plain");
                    if(oXMLHttpRequest.overrideMimeType){
                        oXMLHttpRequest.overrideMimeType("text/plain");
                    }

                    oXMLHttpRequest.onreadystatechange  = function() {
                        if (this.readyState == XMLHttpRequest.DONE) {
                            var htmltext = this.responseText;
                                htmltext = htmltext.replace("[$theme]",self.resourcepath("[$theme]"),"igm");
                                htmltext = htmltext.replace("[$icon]",self.resourcepath("[$icon]"),"igm")
                            self.constructor.prototype.innerHTML = htmltext;
                            self.constructor.prototype["@href"]=null;
                            self.constructor.prototype["@template-uri"]=null;
                            var view = self.parseElement();
                            self.element.appendChild(view);
                            self.innerHTML=self.element.outerHTML;
                            self.onDomReady(el);          
                        }
                    }
                    oXMLHttpRequest.send(null);
            } else {
               var view = this.parseElement();
               self.element.appendChild(view);
               self.onDomReady(el);
            }
        }
        else {
            self.onDomReady(el);
        }
        
        var canvas = this.firstChild(null,true)
        //this.addClass("canvas", canvas);
        this.canvas = canvas;
        return el;
    },
    
    renderNode : function(data, templateName, initChildComponents){
        return this.renderTemplate(data, templateName, initChildComponents, false);
    },
    
    onFocus : function(){},
    
    getModalValue : function() {
        console.info("Implement getModalValue() in " + this.namespace + " to return a value when the modal is confirmed as OK/Save.")
        return null;
    },
    
    getPreviousSibling : function(n) {
        x = n.previousSibling;
        while (x && x.nodeType != 1) {
            x = x.previousSibling;
        }
        return x;
    },
    
    getNextSibling : function(n) {
        if (n != null){
            x = n.nextSibling;
            while (x != null && x.nodeType != 1) {
                x = x.nextSibling;
            }
            return x;
        }
    },

    innerHTML:
    '<div></div>'
});

namespace("core.ui.WebApplication", 
{
    '@inherits'     : core.ui.WebComponent,
    '@stylesheets'  : [],
    "@cascade"      : true,
    
    initialize : function() {
        this.parent();
        this.setUserAgentClasses();
    },
    
    setUserAgentClasses : function(){
        if(UserAgent.isMobile() || Config.FORCE_MOBILE_USERAGENT){
            this.element.classList.add("mobile");
            if(UserAgent.isAndroid()){
                this.element.classList.add("android");
            }
            else if(UserAgent.isIOS()){
                this.element.classList.add("ios");
            } 
            else if(UserAgent.isWindowsMobile()){
                this.element.classList.add("iemobile");
            }
        }
    },

    allowRefreshCycle : function(){
        return true;
    },
    
    onScreenResized : function(){
        console.info("Screen Resized detected by current application: ", this)    
    },

    onRefresh : function(){
        console.info(this.namespace + " onRefresh() handler triggered (app heartbeat).");    
    },

    onResume : function(e){
        console.info(this.namespace + " onResume() handler triggered.");    
    },
    
    onFocus : function(e){
        this.setActivityState(true);
        application.requestRefreshCycle(this);
        console.info(this.namespace + " onFocus() handler triggered");    
    },
    
    
    onBlur : function(e){
        this.setActivityState(false);
        console.info(this.namespace + " onBlur() handler triggered. Inactive.");    
    },
    
    onActivated : function(e){
        console.info(this.namespace + " onActivated() handler triggered. Loaded from disk.");    
    },
    
    run : function() {
        this.dispatchEvent("load", true, true, {component:this});
    },
    
    setActivityState : function(bool){
        this._is_active_and_focused = bool;
    },
    
    isFocused : function(bool){
        return this._is_active_and_focused == true;
    },
    
    
    modalize : function(component){
        //e.preventDefault();
        //e.stopPropagation();
        var modal = new core.ui.ModalScreen;
            modal.setZindex(application.absoluteZindex());
            modal.owner = this;
            modal.appendChild(component.element||component);
            modal.addEventListeners();
            return modal;
    }
});

 

namespace("core.ui.Panel", {
    '@inherits' : core.ui.WebComponent,
    "@cascade"  : true,
    '@stylesheets' :["~/resources/[$theme]/Panel.css"],
    
    initialize : function(){
        this.title          = this.querySelector(".title");
        this.container      = this.querySelector(".panel-container");
        this.resizeButton   = this.querySelector(".panel-options .resize.button");
        this.closeButton    = this.querySelector(".panel-options .close.button");
        this.cancelButton    = this.querySelector(".button-bar .cancel.button");
        
        if(this.resizeButton){
            this.resizeButton.addEventListener("click", this.onResizePanel.bind(this), false);
        }
        if(this.closeButton){
            this.closeButton.addEventListener("click", this.onClosePanel.bind(this), false);
        }
        if(this.cancelButton){
            this.cancelButton.addEventListener("click", this.onCancelPanel.bind(this), false);
        }
    },
    
    onResizePanel : function(){
          
    },
    
    onClosePanel : function(){
        
    },
    
    onCancelPanel : function(e){
        this.dispatchEvent("panelcanceled",true,true,{component:this});
    },
    
    setTitle : function(strTitle){
        this.title.innerHTML = strTitle;
    },
    
    getTitle : function(strTitle){
        return this.title.getAttribute("data-title")||this.title.innerHTML;
    },
    
    appendChild : function(el){
        this.container.appendChild(el.element||el);
    },
    
    innerHTML:
    '<div class="panel">\
        <div class="title panel-title"></div>\
        <div class="panel-container"></div>\
    </div>'
});


namespace("core.ui.WindowPanel", {
    '@inherits' : core.ui.Panel,
    "@cascade"  : true,
    
    onResizePanel : function(){
       this.dispatchEvent("resizeapp", true, true, {component:this})
    },
    
    onClosePanel : function(){
        this.dispatchEvent("close", true, true, {component:this})
    }
});

namespace("core.ui.ModalScreen", 
{
    '@inherits'     : core.ui.WebComponent,
    '@stylesheets'  : [],
    "@cascade"      : true,
    
    initialize : function() {
        document.body.appendChild(this.element);
        this.addEventListener("click", this.onModalWantsToExit.bind(this),false);
        this.initializeExitButton();
        this.initializeConfirmButton();
    },

    initializeConfirmButton : function(){
        var btn = this.getConfirmButton();
        if(btn) {
            btn.addEventListener("click", this.onConfirmModal.bind(this), false);
        }
    },

    getConfirmButton : function(){
        return this.querySelector("#ok-btn");
    },

    onConfirmModal : function(e){
        e.preventDefault();
        e.stopPropagation();
        var evt = this.dispatchEvent("confirmmodal", true, true, {dialog:this, originalEvent:e, modaldata:this.getModalValue()});
        
        if(!evt.defaultPrevented) {
            this.hide();
        }
    },

    getModalValue : function(){
        return {}
    },

    initializeExitButton : function(){
        var btn = this.getExitButton();
        if(btn) {
            btn.addEventListener("click", this.onExitModal.bind(this), false);
        }
    },

    onExitModal : function(e){
        e.preventDefault();
        e.stopPropagation();
        var evt = this.dispatchEvent("exitmodal", true, true, {dialog:this, originalEvent:e});
        if(!evt.defaultPrevented) {
            this.close();
        }
    },

    open : function(e){
        application.setModalScreen(this);
        try { this.componentOwner.onFocus(e) }
        catch(err){
            console.error(err.message)
        }
    },

    close : function(){
        try{this.hide();}
        catch(e){
            console.error(e)
        }
    },

    getExitButton : function(){
        return this.querySelector(".dijitDialogCloseIcon");
    },

    isDismissable : function(){
        return true;
    },

    onModalWantsToExit : function(e){
        if(this.isDismissable()) {
            if(e.target.classList.contains("ModalScreen")){
                this.hide();
            }
        }
    },

    hide : function(){
        this.element.classList.remove("active");
    },

    show : function(){
        this.element.classList.add("active");
        this.element.style.zIndex = application.absoluteZindex();
    },
    
    setZindex : function(index){
        this.element.style.zIndex = index;
    },
    
    appendChild : function(el) {
        this.element.appendChild(el.element||el);
        this.setComponent(el);
    },
    
    setComponent : function(el){
        this.componentOwner = el instanceof core.ui.WebComponent?el:el.prototype;
    },
    
    innerHTML:
    '<div></div>',

    cssText : '\
    .ModalScreen {\
        width: 100%;\
        height: 100%;\
        background-color: rgba(0,0,0,.5);\
        left: 0;\
        top: 0;\
        position: fixed;\
        display: none;\
        z-index: 1000;\
    }\
    .ModalScreen > div{\
        top: 50%;\
        left: 50%;\
        transform: translate3d(-50%, -50%,0);\
    }\
    .ModalScreen.active {\
        display: block !important;\
    }'
    
});



//-----------------BOOTLOADER------------------
/*
	Copyright © 2013 ΩF:∅ Working Group contributors.
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
	associated documentation files (the "Software"), to deal in the Software without restriction, including 
	without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
	sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
	subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all copies or substantial 
	portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN 
	NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
Commented: 4/19/2018 to use improved loader below

document.addEventListener("DOMContentLoaded", function(){ 
	function bootup(){
		var timerId;
		var Application = NSRegistry[window.appconfig.namespace];
		if( Application) {
			timerId && clearTimeout(timerId);
			window.application = new Application(window.appconfig, document);
		}
		else { timerId = setTimeout(bootup,100) }
	};	
	
	bootup();
}, false);
*/


document.addEventListener("DOMContentLoaded", function(){ 
	function bootup(){
		var timerId;
    var ns = Config.NAMESPACE || window.appconfig.namespace;
    var config = Config||window.appconfig;

    if(Config.DYNAMICLOAD) {
      console.log("Using dynamic application loading..");
      console.log("\t -> auto-importing script tag for: " + ns);
      var c = new core.http.ClassLoader;
          c.addEventListener("load", function(data){
              var Application = NSRegistry[ns];
              if( Application) {
                timerId && clearTimeout(timerId);
                window.application = new Application(config, document);
                console.log("Running Simul8 Framework: v" + ($framework.current||$framework.stable));
              }
              else { timerId = setTimeout(bootup,100) }
          }, false);

          // var ns = window.appconfig.namespace;
          var filename_path  = ("src/" + ns.replace(/\./g,"/") + "/index");
          if(Config.USE_COMPRESSED_BUILD){
            var path = filename_path + ".min.js";
            console.log("\t -> with compressed build: " + path);
            c.load(ns,path);
          }
          else {
            var path = filename_path + ".js";
            console.log("\t -> non-compressed file: " + path);
            c.load(ns);
          }
    } else {
      console.log("using non-dynamic application loading..");
      console.log("\t -> reference script tag for: " + ns);
      var Application = NSRegistry[ns];
      if( Application) {
        console.log("\t -> " + ns + " found, initializing app.");
        timerId && clearTimeout(timerId);
        window.application = new Application(config, document);
        console.log("Running Simul8 Framework: v" + ($framework.current||$framework.stable));
      }
      else { timerId = setTimeout(bootup,100) }
    }
	};	
	
	bootup();
}, false);




namespace("core.Application", {
    '@inherits' : core.ui.WebComponent,
    '@cascade'  : true,
    '@traits'   : [],
    '@stylesheets' : [],
    

    preInitialize : function(model, element) {
        window.application  = this;
        this.head           = document.getElementsByTagName("head")[0];
        this.configscript   = document.querySelector("script[id='config']")||
                              document.querySelector("script");
        core.data.StorageManager.initialize(Config.StorageManager.STORE_KEY);
        this.session = new core.controllers.StorageController;
        this.parent(model, element.body||element);
        return this;
    },


    initialize : function () {
        var self = this;
        this.parent(arguments);
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        this.initAgentClasses();
    },

    isUserSessionValid : function(){
        if(!this.account) {
            this.account = new core.vo.Account(this.db.user);
        };
        return this.account.isValid();
    },

    onRender : function(e){
        var self=this;
        setTimeout(function(){self.element.style.opacity=1;},Config.FOUCDELAY);
    },

    getLocationHash : function(){
        var hash = location.hash.replace("#","");
        var params = rison.decode(hash);
        return params;
    },

    setLocationHash : function(params){
        location.hash = "#" + rison.encode(params);
    },

    globalzindex : 600000,
    
    absoluteZindex : function(nodeReference){
        this.globalzindex = this.globalzindex + 1;
        return this.globalzindex;
    },

    onDeviceReady : function(){
        if(navigator.splashscreen){
            navigator.splashscreen.hide();
        }
    },

    initAgentClasses : function(){
        if(UserAgent.isMobile() || Config.FORCE_MOBILE_USERAGENT){
            var device =
            UserAgent.isAndroid()?
                "android":
                    UserAgent.isIOS()?
                        "ios":
                           UserAgent.isWindowsMobile()?
                             "iemobile":"computer";
        }
        document.body.setAttribute("browser", browser.DeviceInfo.browser);
        document.body.setAttribute("os", browser.DeviceInfo.OS);
        document.body.setAttribute("device", device);
    }
});
