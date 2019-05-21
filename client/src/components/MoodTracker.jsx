import React, { Component } from "react";
import moment from "moment";

class MoodTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: 0,
      currentMood: null
    };
  }


  render() {
    const { currentMood } = this.state;
    const { handleSubmit, setMood, mood } = this.props;
    return (
      <main>
        <div className="container">

          <h2 className="mood">{mood}</h2>
          <form className="mood-form" onSubmit={e => handleSubmit(e)}>
            <button
              className="face one"
              type="submit"
              value={1}
              onClick={e => setMood(e)}
            />
            <button
              className="face two"
              type="submit"
              value={2}
              onClick={e => setMood(e)}
            />
            <button
              className="face three"
              type="submit"
              value={3}
              onClick={e => setMood(e)}
            />
            <button
              className="face four"
              type="submit"
              value={4}
              onClick={e => setMood(e)}
            />
            <button
              className="face five"
              type="submit"
              value={5}
              onClick={e => setMood(e)}
            />

            <input type="date" />

            {this.props.userEntries &&
              this.props.userEntries.map(entry => (
                <p key={entry.id}>
                  On {moment(entry.createdAt).format("MMMM Do YYYY")} at{" "}
                  {moment(entry.createdAt).format("HH:MM:SS")} you're mood was {entry.mood}.
                </p>
              ))}

            <button className="submit-btn">Submit</button>
          </form>
        </div>
      </main>
    );
  }
}

export default MoodTracker;
