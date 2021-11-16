import "./App.css";
import React from "react";

const API_URL = "https://api.quotable.io/random";

function Quote(props) {
  return (
    <>
      <p id="text">
        <span>"</span>
        {props.text}
        <span>"</span>
      </p>
      <span id="author">{props.author}</span>
    </>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      author: "",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const { text, author } = await this.getQuote();
    this.setState({
      text,
      author,
    });
  }

  async getQuote() {
    try {
      let data;
      await fetch(API_URL)
        .then((response) => response.json())
        .then((body) => (data = { author: body.author, text: body.content }));
      return data;
    } catch (error) {
      alert(error);
    }
  }

  handleClick() {
    this.getQuote().then(({ text, author }) => {
      this.setState({
        text,
        author,
      });
    });
  }

  render() {
    return (
      <div id="quote-box">
        <Quote text={this.state.text} author={this.state.author} />
        <div id="controls">
          <a
            href={`https://twitter.com/intent/tweet?text=${this.state.text}`}
            id="tweet-quote"
            target="_blank"
            rel="noreferrer"
          >
            Tweet this quote
          </a>
          <button id="new-quote" onClick={this.handleClick}>
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

export default App;
