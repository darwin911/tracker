import React, { Component } from "react";
import { addEntry } from "../services/helper";
import moment from "moment";

class MoodTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: 0,
      currentMood: null
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    const resp = await addEntry({
      mood: this.state.mood,
      user_id: this.props.currentUser.id
    });
  }

  setMood(e) {
    e.preventDefault();
    this.setState({
      mood: e.target.value
    });
  }

  render() {
    const { currentMood, mood } = this.state;
    return (
      <main>
        <div className="container">
          <h3 className="current-mood">Current Mood {currentMood}</h3>

          <h2 className="score">{mood}</h2>
          <form className="mood-form" onSubmit={e => this.handleSubmit(e)}>
            <button
              className="face one"
              type="submit"
              value={1}
              onClick={e => this.setMood(e)}
            />
            <button
              className="face two"
              type="submit"
              value={2}
              onClick={e => this.setMood(e)}
            />
            <button
              className="face three"
              type="submit"
              value={3}
              onClick={e => this.setMood(e)}
            />
            <button
              className="face four"
              type="submit"
              value={4}
              onClick={e => this.setMood(e)}
            />
            <button
              className="face five"
              type="submit"
              value={5}
              onClick={e => this.setMood(e)}
            />

            <input type="date" />

            {this.props.userEntries &&
              this.props.userEntries.map(entry => (
                <p key={entry.id}>
                  On {moment(entry.createdAt).format("MMMM Do YYYY")} at{" "}
                  {moment(entry.createdAt).format("HH:MM:SS")} you're mood was {entry.mood}.
                </p>
              ))}

            <button className="submit-btn">Pants</button>
          </form>
        </div>
      </main>
    );
  }
}

export default MoodTracker;
