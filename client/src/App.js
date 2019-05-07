import React from "react";
import "./App.css";
import Header from './components/Header.jsx';
import MoodTracker from './components/MoodTracker.jsx';
import Footer from './components/Footer.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      score: 0
    }

  }

  render() {
    return (
      <div className="App">
        <Header />
        <MoodTracker score={this.state.score}/>
        <Footer />
      </div>
    )
  }
}

export default App;
