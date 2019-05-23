import React, { Component } from "react";
import EntryForm from "./EntryForm";
// import UserEntries from "./UserEntries";
import { Line } from "react-chartjs-2";
import moment from "moment";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moodData: {}
    };
  }

  render() {
    const {
      handleSubmit,
      handleEntryChange,
      entryData,
      userEntries
    } = this.props;

    const data = {
      labels: this.props.userEntries.map(entry =>
        moment(entry.createdAt).format("h:mm a MMM DD")
      ),
      datasets: [
        {
          label: "Your moods over time",
          fill: false,
          // data: this.props.userEntries.map(entry => entry.mood),
          data: [0, ...this.props.userEntries.map(entry => entry.mood)],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)"
          ],
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
        />
        {/* <UserEntries userEntries={userEntries} /> */}
        <Line data={data} />
      </main>
    );
  }
}

export default Main;
