/** @jsx React.DOM */

var SpanTest = React.createClass({
  render: function() {
        //  cannot use "for" html attribute for labels
    return (
      <div className={"spanTest "+(this.state.incorrect?"incorrect":"")+(this.state.answeredCorrectly?"correct":"")}> 
        <input type="checkbox" onChange={this.handleNumbers} checked={this.state.useNumbers} /> 
        <label className="label">Numbers</label>
        <input type="checkbox" onChange={this.handleAlpha} checked={this.state.useAlphabet}/>
        <label className="label">Alphabet</label>
        <button className={this.state.started?"hidden":""} onClick={this.start}>Start</button>
        <input type="text" value={this.state.answer} 
                readOnly={this.state.readOnly} 
                onChange={this.handleInput} 
                onKeyUp={this.handleSubmit}
                className={(this.state.answeredCorrectly)?"mainInput correct":"mainInput"}
                ref="mainInput"/>
        <span className="message">Incorrect, the answer was {this.state.incorrect}</span>
        <span className="userLevel">{this.state.userLevel-1}</span>
      </div>
    );
  },

  ui: function(ref) { return this.refs[ref].getDOMNode(); },
  getInitialState: function() {
    return {readOnly: true, useNumbers:true, useAlphabet:false, answer:"", incorrect:false, started:false, userLevel:3};
  },

  handleInput: function(e) {
    if (this.state.incorrect) return this.start();
    var input = e.target.value;
    this.setState({answer:input.toUpperCase()});
  },

  handleSubmit: function(e) {
    if (e.keyCode === 13) {
      if (this.state.incorrect) return this.start();
      var input = e.target.value;
      var correct = this.string.slice(0, this.state.userLevel);
      if (input !== correct) {
        this.setState({incorrect:correct});
        return;
      };
      if (input.length === this.state.userLevel) {
        this.setState({answeredCorrectly:true, userLevel:this.state.userLevel+1});
        setTimeout(function(){this.cycle()}.bind(this), 1000);
      }
    }
  },

  handleNumbers: function(e) {
    this.setState({
      useNumbers:!this.state.useNumbers, 
      useAlphabet:(!this.state.useNumbers) ? this.state.useAlphabet : true
    });
  },
  
  handleAlpha: function(e) {
    this.setState({
      useAlphabet:!this.state.useAlphabet, 
      useNumbers:(!this.state.useAlphabet) ? this.state.useNumbers : true
    });
  },

  cycle: function() {
    var self = this;
    // render the puzzle
    self.setState({readOnly:true, answeredCorrectly:false});
    for (var i=1; i<=self.state.userLevel; i++) {
      setTimeout(function(i){
        return function() {
          // animate the individual characters one by one
          self.setState({answer:self.string.slice(0,i)});
          if (i == self.state.userLevel) {
            setTimeout(function(){
              // Give back to user for input
              self.setState({readOnly:false, answer:""});
              self.ui("mainInput").focus();
            }, 1000)
          }
        }
      }(i), i*300);
    }
  },

  randomString: function(length) { // Generates random string of length based on state
    var pool = (this.state.useAlphabet ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "").concat(this.state.useNumbers ? "1234567890" : ""); 
    return Array.apply(null, {length: length}).map(function(){
      return pool[~~(Math.random()*pool.length)];
    }).join("");
  },

  start: function() {
    var self = this;
    this.string = this.randomString(20);
    // this state update takes a bit longer than it should :/
    this.setState({incorrect:false, started:true, userLevel:3, answeredCorrectly:false, answer:""}, function() {
      setTimeout(self.cycle(), 1000);
    });
  }
});


// until I pick a module system
// not a fan of what I need to do to fit this component into my app's interface for components
window.Span = function Span() {
  this.render = function(el) {
    React.renderComponent(<SpanTest />, el);
  }
};
