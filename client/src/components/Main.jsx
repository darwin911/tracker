import React, { Component } from "react";
import EntryForm from "./EntryForm";
import UserEntries from "./UserEntries";
// import { Line, Bar } from "react-chartjs-2";
import moment from "moment";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moodData: {}
    };
  }

  randomColors(n) {
    const colorsArray = [];
    for (let i = 0; i < n; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      colorsArray.push(`rgba(${r}, ${g}, ${b}, 0.7)`);
    }
    return colorsArray;
  }

  render() {
    const {
      handleSubmit,
      handleEntryChange,
      entryData,
      userEntries,
      exercise,
      toggleExercise,
      memo,
    } = this.props;

    const opts = {

    };

    const data = {
      labels: this.props.userEntries.map(entry =>
        moment(entry.createdAt).format("h:mm a MMM DD")
      ),
      datasets: [
        {
          label: "Mood",
          fill: false,
          data: this.props.userEntries.map(entry => entry.mood),
          backgroundColor: "rgba(200, 100, 100, 0.5)",
          borderColor: "rgba(150, 150, 150, 0.5)",
          borderWidth: 1
        }
      ]
    };
    return (
      <main>
        <EntryForm
          handleEntryChange={handleEntryChange}
          handleSubmit={handleSubmit}
          entryData={entryData}
          userEntries={userEntries}
          toggleExercise={toggleExercise}
        />
        <UserEntries userEntries={userEntries} />
        {/* <Line data={data} options={opts} /> */}
      </main>
    );
  }
}

export default Main;
