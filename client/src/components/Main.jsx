import React, { Component } from "react";
import EntryForm from "./EntryForm";
import UserEntries from "./UserEntries";

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
        <UserEntries userEntries={userEntries}/>
      </main>
    );
  }
}

export default Main;
