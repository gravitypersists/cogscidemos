function Stroop() {}

Stroop.prototype.render = function(el) {
	el.innerHTML = "Oh hai"
}

// until I pick a module system 
window.Stroop = Stroop