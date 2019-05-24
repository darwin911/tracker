import React from "react";

const EntryForm = ({
  handleSubmit,
  handleEntryChange,
  entryData,
  toggleExercise,
  exercise,
  memo
}) => {
  return (
    <form className="mood-form" onSubmit={e => handleSubmit(e)}>
      <label htmlFor="mood">What's your mood?</label>

      <div>
        <button
          className="face one"
          type="submit"
          name="mood"
          value={1}
          onClick={e => handleEntryChange(e)}
        />
        <button
          className="face two"
          type="submit"
          name="mood"
          value={2}
          onClick={e => handleEntryChange(e)}
        />
        <button
          className="face three"
          type="submit"
          name="mood"
          value={3}
          onClick={e => handleEntryChange(e)}
        />
        <button
          className="face four"
          type="submit"
          name="mood"
          value={4}
          onClick={e => handleEntryChange(e)}
        />
        <button
          className="face five"
          type="submit"
          name="mood"
          value={5}
          onClick={e => handleEntryChange(e)}
        />
      </div>

      <h2 className="mood">{entryData.mood}</h2>

      <label htmlFor="exercise">Did you exercise?</label>
      <input
        type="checkbox"
        id="exercise"
        name="exercise"
        onChange={toggleExercise}
        value={exercise}
      />

      {/* <label htmlFor="alcohol">Did you drink?</label>
      <input
        type="checkbox"
        name="alcohol"
        onChange={toggleAlcohol}
        value={alcohol}
      /> */}

      <br />

      <label htmlFor="memo">Memo: </label>
      <input
        type="text"
        name="memo"
        onChange={e => handleEntryChange(e)}
        value={memo}
      />

      <button className="submit-btn">Submit</button>
    </form>
  );
};

export default EntryForm;
