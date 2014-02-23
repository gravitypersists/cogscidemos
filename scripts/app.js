// this is pretty ugly, not made to be readable (experimental)
window.onload = function() {
  function App() {

    var views = {
      "Span": Span,
      "Stroop Interference":Stroop,
      "Associative Inhibition":Stroop,
    }

    var options = [];
    for(var o in views) options.push(o);
    var nav = new Nav(options);
    nav.on("select", function(option){ 
      this.loadView(option);
    }.bind(this));

    this.render = function(el) {
      this.el = el;
      nav.render(this.el);
      var div = document.createElement("div");
      // Not a fan of using this as a means for marking up html for css
      div.className = "viewContainer";
      this.view = document.createElement("div");
      this.view.className = "mainView";
      div.appendChild(this.view);
      this.el.appendChild(div);
    }

    this.loadView = function(option) {
      var Klass = views[option];
      new Klass().render(this.view);
      nav.click(option);
    }
    
  }
  var x = new App();
  x.render(Array.prototype.slice.call(document.getElementsByTagName('script')).pop().parentNode);
  x.loadView("Span");
}