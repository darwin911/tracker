import React, { Component } from "react";
import EntryForm from "./EntryForm";

class Main extends Component {
  render() {
    const { handleSubmit, setMood, mood, userEntries } = this.props;
    return (
      <main>
        <EntryForm
          handleSubmit={handleSubmit}
          setMood={setMood}
          mood={mood}
          userEntries={userEntries}
        />
      </main>
    );
  }
}

export default Main;
