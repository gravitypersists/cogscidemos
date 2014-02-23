function Nav(options) {
	this.options = options;
	this.clickRefs = {};

	// Events to be abstracted into view class
	this._events = {};
	this.on = function addEvent(eventName, f) {
		this._events[eventName] = this._events[eventName] || []
		this._events[eventName].push(f)
	}
	this.trigger = function performEvent(eventName, args) {
		var args = [].slice.call(arguments, 1);
		this._events[eventName].map(function(f){
			f.apply(null, args);
		});
	}
}

Nav.prototype.render = function(el) {
	// consider ways to decouple view and markup, if possible
  var nav = document.createElement("nav");
	var ul = document.createElement("ul");
	this.options.map(function(option){
		var li = document.createElement("li");
		this.clickRefs[option] = li
		li.innerHTML = option;
		li.addEventListener('click', function() { 
			this.trigger("select", option);
			// this isn't scoped to nav
			var elements = document.getElementsByClassName("selected");
			Array.prototype.slice.call(elements).map(function(el) {
				el.className = el.className.replace(/\bselected\b/,'');
			});
			this.click(option);
		}.bind(this));
		ul.appendChild(li);
	}.bind(this));
  nav.appendChild(ul);
	el.appendChild(nav);
}

Nav.prototype.click = function(option) {
	var li = this.clickRefs[option];
	if (!(li.className.indexOf("selected")>-1)) li.className += " selected";
}

// until I pick a module system 
window.Nav = Nav