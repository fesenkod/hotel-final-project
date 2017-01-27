/**
 * Adds support to IE8 for the following properties:
 *
 *     Element.childElementCount
 *     Element.firstElementChild
 *     Element.lastElementChild
 *     Element.nextElementSibling
 *     Element.previousElementSibling
 */
(function(){
	"use strict";


	var patches = {

		firstElementChild: function(){
			for(var nodes = this.children, n, i = 0, l = nodes.length; i < l; ++i)
				if(n = nodes[i], 1 === n.nodeType) return n;
			return null;
		},

		lastElementChild: function(){
			for(var nodes = this.children, n, i = nodes.length - 1; i >= 0; --i)
				if(n = nodes[i], 1 === n.nodeType) return n;
			return null;
		},

		nextElementSibling: function(){
			var e = this.nextSibling;
			while(e && 1 !== e.nodeType)
				e = e.nextSibling;
			return e;
		},

		previousElementSibling: function(){
			var e = this.previousSibling;
			while(e && 1 !== e.nodeType)
				e = e.previousSibling;
			return e;
		},

		childElementCount: function(){
			for(var c = 0, nodes = this.children, n, i = 0, l = nodes.length; i < l; ++i)
				(n = nodes[i], 1 === n.nodeType) && ++c;
			return c;
		}
	};

	for(var i in patches)
		i in document.documentElement ||
		Object.defineProperty(Element.prototype, i, {get: patches[i]});
}());



/** IE8< polyfill for addEventListener */
(function(){
	if(!document.createElement("div").addEventListener){

		var cache = "_eventListeners",


		/** Ties an event listener to an element. */
		addEvent = function(name, fn){
			var THIS = this;
			if(!(cache in THIS))    THIS[cache]       = {};
			if(!THIS[cache][name])  THIS[cache][name] = [];

			/** Check that we're not adding duplicate listeners for this event type. */
			var handlers = THIS[cache][name], i;
			for(i in handlers)
				if(fn === handlers[i][0]) return;

			handlers.push([fn, fn = function(fn){
				return function(e){
					var e = e || window.event;
					if(!("target" in e))    e.target          = e.srcElement;
					if(!e.preventDefault)   e.preventDefault  = function(){this.returnValue = false;}
					return fn.call(THIS, e);
				};
			}(fn)]);

			THIS.attachEvent("on" + name, fn);
		},



		/** Removes an event listener from an element. */
		removeEvent = function(name, fn){
			var THIS = this;
			if(!(cache in THIS))    THIS[cache]       = {};
			if(!THIS[cache][name])  THIS[cache][name] = [];

			var handlers = THIS[cache][name], i;
			for(i in handlers){
				if(fn === handlers[i][0]){
					THIS.detachEvent("on"+name, handlers[i][1]);
					delete handlers[i];
				}
			}
		};


		Object.defineProperty(Element.prototype, "addEventListener",    {value: addEvent});
		Object.defineProperty(Element.prototype, "removeEventListener", {value: removeEvent});
		document.addEventListener     = addEvent;
		document.removeEventListener  = removeEvent;

		/** Reroute the window's add/removeEventListener methods to the document, since IE8 has "issues" with events bubbling to the window, apparently. */
		window.addEventListener       = function(){ addEvent.apply(document, arguments);    };
		window.removeEventListener    = function(){ removeEvent.apply(document, arguments); };
	}
}());


(function () {
  if (!document.getElementsByClassName) {
    window.Element.prototype.getElementsByClassName = document.constructor.prototype.getElementsByClassName = function (classNames) {
      classNames || (classNames = '*');
      classNames = classNames.split(' ').join('.');

      if (classNames !== '*') {
        classNames = '.' + classNames;
      }

      return this.querySelectorAll(classNames);
    };
  }

})();
