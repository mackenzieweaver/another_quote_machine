import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

function randomNumber(arr) {
  return Math.floor(Math.random() * arr.quotes.length);
}

function newColor(currentColor) {
  let nextColor = colors[Math.floor(Math.random() * colors.length)];
  document.getElementById('body').animate([{backgroundColor: currentColor}, {backgroundColor: nextColor}], {duration: 1000, fill: 'forwards'});
  return nextColor;
}

const quoteBlockStyle = {
  backgroundColor: "white",
  borderRadius: "5px",
  width: "60vw",
  padding: "3rem 3rem",
  textAlign: "right"
}

class Quote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      allQuotes: [],
      randQuoteNum: Math.floor(Math.random() * 102),
      color: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      randQuoteNum: randomNumber(this.state.allQuotes),
      color: newColor(this.state.color)
    })
  }

  componentDidMount() {
    fetch(url).then(res => res.json()).then(result => {
      this.setState({
        isLoaded: true,
        allQuotes: result,
        color: newColor(this.state.color)
      })
    }, error => {
      this.setState({
        isLoaded: true,
        error
      });
    });
  }

  render() {
    const { error, isLoaded, allQuotes } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div id="quote-box" style={quoteBlockStyle}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <i className="fas fa-quote-left fa-2x" style={{color: this.state.color}}></i>
            <p id="text" style={{width: '100%', textAlign: 'right'}}>{' ' + allQuotes.quotes[this.state.randQuoteNum].quote}</p>
          </div>
          <p id="author">{allQuotes.quotes[this.state.randQuoteNum].author}</p>
          <div id="clickable" style={{ display: "flex", justifyContent: "space-between" }}>
            <a id="tweet-quote" href="https://twitter.com/intent/tweet" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter-square fa-2x" style={{color: this.state.color}}></i></a>
            <Button id="new-quote" className="btn btn-light" style={{backgroundColor: this.state.color, color: "white"}} onClick={this.handleClick}>New Quote</Button>
          </div>
        </div>
      );
    }
  }
}

class About extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      visiblity: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    console.log(this.state.visiblity);
    this.setState(state => ({visibility: !state.visibility}));
  }

  render(){
    if(this.state.visibility){
      return (
        <div style={{color: 'white'}}>
          <Button onClick={this.handleClick} className="btn btn-light" style={{color: 'black', backgroundColor: 'white'}}>About this page</Button><br/>
          <p>Quotes displayed on this website come from <a href={url}>here</a></p>
          <p>This website is a project built after completing the Front End Libraries section on <a href="https://www.freecodecamp.org/learn" style={{color: 'white'}} target="_blank" rel="noopener noreferrer">Free Code Camp</a>.</p>
          <p>Built with React and Bootstrap, it fetches the json data in the lifecycle method componentDidMount.</p>
          <p>Once the promise is fulfilled a calculation is ran to choose a random quote and color to display.</p>
        </div>
      );
    } else {
      return (
        <Button onClick={this.handleClick} className="btn btn-light" style={{color: 'black', backgroundColor: 'white'}}>About this page</Button>
      );
    }
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Quote />
        <p style={{ textAlign: "center", color: "white" }}>by <a href="https://github.com/mackenzieweaver" style={{color: "white"}}>mackenzie</a></p>
        <About />
      </div>
    );
  }
}

export default App;