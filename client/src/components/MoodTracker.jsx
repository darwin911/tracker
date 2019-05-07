import React, { Component } from "react";

class MoodTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: 0,
      currentMood: null
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmit!')
    this.setState({
      currentMood: this.state.mood
    })
  }

  setMood(e) {
    e.preventDefault();
    this.setState({
      mood: e.target.value
    });
  }

  render() {
    const { currentMood, mood } = this.state;
    const today = new Date()
    console.log(today.getTime())
    return (
      <main>
        <div className="container">

          <h3 className="current-mood">Current Mood {currentMood}</h3>

          <h2 className="score">{mood}</h2>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <button
              className="face one"
              type="submit"
              value={1}
              onClick={e => this.setMood(e)}/>
            <button
              className="face two"
              type="submit"
              value={2}
              onClick={e => this.setMood(e)}/>
            <button
              className="face three"
              type="submit"
              value={3}
              onClick={e => this.setMood(e)}/>
            <button
              className="face four"
              type="submit"
              value={4}
              onClick={e => this.setMood(e)}/>
            <button
              className="face five"
              type="submit"
              value={5}
              onClick={e => this.setMood(e)}/>

            <button className="submit-btn">Pants</button>
          </form>
        </div>
      </main>
    );
  }
}

export default MoodTracker;
