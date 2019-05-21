import React, { Component } from "react";
import EntryForm from "./EntryForm";
import UserEntries from "./UserEntries";

class Main extends Component {
  render() {
    const {
      handleSubmit,
      handleEntryChange,
      entryData,
      userEntries
    } = this.props;
    return (
      <main>
        <EntryForm
          handleEntryChange={handleEntryChange}
          handleSubmit={handleSubmit}
          entryData={entryData}
          userEntries={userEntries}
        />
        <UserEntries userEntries={userEntries} />
      </main>
    );
  }
}

export default Main;
