import React from "react";
import moment from "moment";

const EntryForm = ({ handleSubmit, mood, setMood, userEntries }) => {
  return (
    <form className="mood-form" onSubmit={e => handleSubmit(e)}>
      <h2 className="mood">{mood}</h2>
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

      {userEntries &&
        userEntries.map(entry => (
          <p key={entry.id}>
            On {moment(entry.createdAt).format("MMMM Do YYYY")} at{" "}
            {moment(entry.createdAt).format("HH:MM:SS")} you're mood was{" "}
            {entry.mood}.
          </p>
        ))}

      <button className="submit-btn">Submit</button>
    </form>
  );
};

export default EntryForm;
