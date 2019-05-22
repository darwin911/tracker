import React from "react";

const EntryForm = ({
  handleSubmit,
  handleEntryChange,
  entryData,
}) => {
  return (
    <form className="mood-form" onSubmit={e => handleSubmit(e)}>
      <h2 className="mood">{entryData.mood}</h2>
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

      {/* current date as default value */}
      {/* <input type="date" name="date" value={entryData.date} onChange={handleEntryChange} /> */}

      <input
        type="number"
        placeholder="Weight (lbs)"
        name="weight"
        min={50}
        value={entryData.weight}
        onChange={handleEntryChange}
        required
      />

      <button className="submit-btn">Submit</button>
    </form>
  );
};

export default EntryForm;
