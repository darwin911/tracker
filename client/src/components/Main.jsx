import React, { Component } from "react";
import EntryForm from "./EntryForm";
import UserEntries from "./UserEntries";
import { Doughnut } from "react-chartjs-2";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moodData: {}
    };
  }

  componentDidMount() {
    this.setState({
      moodData: {
        verySad: this.props.userEntries.filter(mood => mood == 0).length
      }
    });
  }

  render() {
    const {
      handleSubmit,
      handleEntryChange,
      entryData,
      userEntries
    } = this.props;

    console.log(
      this.props.userEntries.filter(entry => entry.mood === 1).length
    );

    const data = {
      labels: ["Very Sad", "Sad", "Average", "Happy", "Very Happy"],
      datasets: [
        {
          label: "# of Votes",
          data: [
            this.props.userEntries.filter(entry => entry.mood === 1).length,
            this.props.userEntries.filter(entry => entry.mood === 2).length,
            this.props.userEntries.filter(entry => entry.mood === 3).length,
            this.props.userEntries.filter(entry => entry.mood === 4).length,
            this.props.userEntries.filter(entry => entry.mood === 5).length,
          ],
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
        <UserEntries userEntries={userEntries} />
        <Doughnut data={data} />
      </main>
    );
  }
}

export default Main;
