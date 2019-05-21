import React from "react";
import moment from 'moment';

const UserEntries = ({ userEntries }) => {
  return (
    <section>
      {userEntries &&
        userEntries.map(entry => (
          <p key={entry.id}>
            On {moment(entry.createdAt).format("MMMM Do YYYY")} at{" "}
            {moment(entry.createdAt).format("HH:MM:SS")} you're mood was{" "}
            {entry.mood}.
          </p>
        ))}
    </section>
  );
};

export default UserEntries;
