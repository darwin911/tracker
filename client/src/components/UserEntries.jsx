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
            <p>{moment(entry.createdAt).format("h:mm a MMM DD")} you were feeling:{" "}
            <strong>{parseMood(entry.mood)}</strong>.</p>
            <p>Memo: {entry.memo}</p>
            <p>exercise: {entry.exercise ? "Yup" : "Nope"}</p>
          </article>
        ))}
    </section>
  );
};

export default UserEntries;
