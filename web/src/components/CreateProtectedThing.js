import React, { useState } from "react";

const CreateProtectedThing = props => {
  const { createProtectedThing } = props;

  const [text, setText] = useState("");

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }

    const body = {
      text
    };

    createProtectedThing(body);
    setText("");
  };

  return (
    <>
      <div className="create-protected-thing">
        <form onSubmit={event => handleSubmit(event)}>
          <textarea
            className="create-protected-thing"
            value={text}
            onChange={event => setText(event.target.value)}
            placeholder="Add a new one..."
          />
          <input
            className="create-protected-thing"
            type="submit"
            value="Save"
          />
        </form>
      </div>
    </>
  );
};

export default CreateProtectedThing;
