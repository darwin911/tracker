import React from "react";
import moment from "moment";

const parseMood = mood => {
  switch (mood) {
    case 1:
      return "Very Sad";
    case 2:
      return "Sad";
    case 3:
      return "Happy";
    case 4:
      return "Very Happy";
    case 5:
      return "Super happy!";
    default:
      return "no data";
  }
};

const UserEntries = ({ userEntries }) => {
  return (
    <section>
      {userEntries &&
        userEntries.map(entry => (
          <article key={entry.id}>
            {moment(entry.createdAt).format("h:mm a MMM DD")} you were feeling:{" "}
            <strong>{parseMood(entry.mood)}</strong>.
          </article>
        ))}
    </section>
  );
};

export default UserEntries;
