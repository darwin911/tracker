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

      {/* current date as default value */}
      <input type="date" value={moment(new Date()).format("YYYY-MM-DD")}/>

      <button className="submit-btn">Submit</button>
    </form>
  );
};

export default EntryForm;
