React = {}
React.Behavior = (function(){
function init() {
    if (arguments.callee.done) return;
    arguments.callee.done = true;
    if (_timer) clearInterval(_timer);

//YOUR INIT CODE GOES HERE
$("twitterlink").onclick = twitter;

//bug fix for background image flickers in Internet Explorer 
//IE6 submit button hovers
/*@cc_on @*/
/*@if (@_win32)
	document.execCommand("BackgroundImageCache", false, true);  
	var inputElements = document.getElementsByTagName("input")
	for (var i=0; i<inputElements.length; i++) {
		if (inputElements[i].getAttribute("type") == "submit"){
			inputElements[i].onmouseover = inputElements[i].onfocus =  function(){
				addClass(this, "hover");
			}
			inputElements[i].onmouseout = inputElements[i].onblur = function(){
				removeClass(this, "hover");
			}
		}
	};
/*@end @*/

};
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", init, false);
};
/*@cc_on @*/
/*@if (@_win32)
(function () {
	try {
		document.documentElement.doScroll('left');
	} catch (e) {
		setTimeout(arguments.callee, 50);
		return;
	}
	// no errors, fire
	init();
})();
/*@end @*/
if (/WebKit/i.test(navigator.userAgent)) { // sniff
    var _timer = setInterval(function() {
        if (/loaded|complete/.test(document.readyState)) {
            init(); // call the onload handler
        }
    }, 10);
};
window.onload = init;

function $() {
	var elements = [];
	for (var i = 0; i < arguments.length; i++) {
		var element = arguments[i];
		if (typeof element == 'string')
			element = document.getElementById(element);
		if (arguments.length == 1)
			return element;
		elements.push(element);
	}
	return elements;
};
function insertAfter(parent, node, referenceNode) {
      parent.insertBefore(node, referenceNode.nextSibling);
};
function preloadImages(){
	var pics = [];
	for(var i=0;i<arguments.length;i++){
        pics[i]=new Image();
        pics[i].src=arguments[i];
		}
};
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
	}
	return [curleft,curtop];
};
function getElementsByClass(theclass,node) {
    var classElements = [];
	var i;
	if ( node == null ) {
        node = document
	}
    if (node.getElementsByClassName) {
		var tempCollection = node.getElementsByClassName(theclass);
		for (i = 0; i < tempCollection.length ; i++) {
			classElements.push(tempCollection[i])
		}
	}
	else {
		var els = node.getElementsByTagName("*");
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\s)"+theclass+"(\\s|$)");
		for (i = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				classElements.push(els[i]);
			}
		}
	}
	return classElements;
};
function ajax( options ) {
    options = {
        type: options.type || "POST",
        url: options.url || "",
        timeout: options.timeout || 5000,
        onComplete: options.onComplete || function(){},
        onError: options.onError || function(){},
        onSuccess: options.onSuccess || function(){},
        data: options.data || ""
    };
	if ( typeof XMLHttpRequest == "undefined" )
    	XMLHttpRequest = function(){
        	return new ActiveXObject(
            	navigator.userAgent.indexOf("MSIE 5") >= 0 ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP"
        );
    };
	var xml = new XMLHttpRequest();
    xml.open(options.type, options.url, true);
    var requestDone = false;
    setTimeout(function(){
         requestDone = true;
    }, options.timeout);
    xml.onreadystatechange = function(){
        if ( xml.readyState == 4 && !requestDone ) {
            if ( httpSuccess( xml ) ) {
                options.onSuccess( httpData( xml, options.data ) );
            } else {
                options.onError();
            }
            options.onComplete();
            xml = null;
        }
    };
    xml.send(null);
    function httpSuccess(r) {
        try {
            return !r.status && location.protocol == "file:" ||
                ( r.status >= 200 && r.status < 300 ) ||
                r.status == 304 ||
                navigator.userAgent.indexOf("Safari") >= 0 && typeof r.status == "undefined";
        } catch(e){}
        return false;
    }
    function httpData(r,type) {
    	switch (type) {
			case  "xml" :
				data=r.responseXML;
				break;
			case "script" :
				data=eval(r.responseText);
				break;
			case "text" :
				data=r.responseText;
				break;				
			default:
				data=r.responseText;
				break;				
			}
       return data;
    }
};
function getFirstChild(element) {
    element = element.firstChild;
    return element && element.nodeType != 1 ? nextSibling(element) : element;
};
function getPreviousSibling(element) {
    do {
        element = element.previousSibling;
    } while ( element && element.nodeType != 1 );
    return element;
};
function getNextSibling(element) {
    do {
        element = element.nextSibling;
    } while ( element && element.nodeType != 1 );
    return element;
};
function getLastChild(element) {
   element = elem.lastChild;
    return element && element.nodeType != 1 ? prevSibling(element) : element;
};

function addEvent(element, type, handler) {
	if (!handler.$$guid) handler.$$guid = addEvent.guid++;
	if (!element.events) element.events = {};
	var handlers = element.events[type];
	if (!handlers) {
		handlers = element.events[type] = {};
		if (element["on" + type]) {
			handlers[0] = element["on" + type];
		}
	}
	handlers[handler.$$guid] = handler;
	element["on" + type] = handleEvent;
};
addEvent.guid = 1;
function removeEvent(element, type, handler) {
	if (element.events && element.events[type]) {
		delete element.events[type][handler.$$guid];
	}
};
function handleEvent(event) {
	var returnValue = true;
	event = event || fixEvent(window.event);
	var handlers = this.events[event.type];
	for (var i in handlers) {
		this.$$handleEvent = handlers[i];
		if (this.$$handleEvent(event) === false) {
			returnValue = false;
		}
	}
	return returnValue;
};
function fixEvent(event) {
	event.preventDefault = fixEvent.preventDefault;
	event.stopPropagation = fixEvent.stopPropagation;
	return event;
};
fixEvent.preventDefault = function() {
	this.returnValue = false;
};
fixEvent.stopPropagation = function() {
	this.cancelBubble = true;
};
function addClass(element, className) {
    if (!hasClass(element, className)) {
      element.className += (element.className ? " " : "") + className;
    }
};
function hasClass(element, className) {
    var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)");
    return regexp.test(element.className);
};
function removeClass(element, className) {
    var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
    element.className = element.className.replace(regexp, "$2").trim();
};
function toggleClass(element, className) {
    if (hasClass(element, className)) {
      removeClass(element, className);
    } else {
      addClass(element, className);
    }
};
function getText(e) {
    var t = "";
	e = e.childNodes || e;
	for ( var j = 0; j < e.length; j++ ) {
        t += e[j].nodeType != 1 ?
            e[j].nodeValue : text(e[j].childNodes);
    }
    return t;
};
if(!Array.prototype.push) {
	function array_push() {
		for(var i=0;i<arguments.length;i++){
			this[this.length]=arguments[i]
		};
		return this.length;
	}
	Array.prototype.push = array_push;
};
if(!Array.prototype.inArray) {
	Array.prototype.inArray = function (value) {
		var i;
		for (i=0; i < this.length; i++) {
			if (this[i] === value) {
				return true;
			}
		}
		return false;
	}
};
String.prototype.trim = function() {
  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

function twitterSearch(obj) {
	//this is the div I'm writing the content to
	var tDiv = document.getElementById("twitter");
	var user, bgcolor, tweet, postedAt, icon, userURL;
	//start the ul
	tDiv.innerHTML = "<ul>"
	for (i=0;i<obj.results.length;i++) {
		//Look at me use the JavaScript modulus operator to do even/odd rows.
		if(i % 2) {
			bgcolor="#efefef"
		} else {
			bgcolor="#ddd"
		}
		//we need to get some data out of the object
		//and populate some variables.
		//i could do this inline in the string below, 
		//but this is way easier for you to read
		icon = obj.results[i].profile_image_url;
		user = obj.results[i].from_user;
		userURL = "http://twitter.com/"+user;
		tweet = urlify(obj.results[i].text); // parse urls
		postedAt = obj.results[i].created_at;
		//and here I mash it all up into a fancy li
		tDiv.innerHTML +="<li style='background-color:"+bgcolor+"; background-image: url("+icon+")'><strong><a href='"+userURL+"'>"+user+"</a></strong>: "+tweet+" <br/><span class='time'>("+postedAt+" GMT)</span> </li>";
	}
	//and close the UL
	tDiv.innerHTML += "</ul>";
}
function twitter() {
   var twitterJSON = document.createElement("script");
   twitterJSON.type="text/javascript"
   twitterJSON.src="http://search.twitter.com/search.json?callback=React.Behavior.publicTwitterSearch&q=%23eclipse&count=20"
   document.getElementsByTagName("head")[0].appendChild(twitterJSON);
   return false;
}

function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    })
}


	return {
//PUBLIC METHODS AND ATTRIBUTES GO HERE
// IN THE RETURNED OBJECT
		//Methods look like this
		//method1 : function(){ alert(method1")},
		publicTwitterSearch : function(results) { twitterSearch(results) }
		
		//called React.Behavior.method1();
		//Attrributes look like this
		//attribute1 : value,
		//accessed as React.Behavior.attribute1
	};
})();