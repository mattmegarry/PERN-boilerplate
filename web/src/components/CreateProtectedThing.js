import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const CreateProtectedThing = props => {
  const { changeOneAndFetchProtectedThings } = props;
  const [text, setText] = useState("");

  const handleSubmit = async event => {
    if (event) {
      event.preventDefault();
    }

    const body = {
      text
    };

    try {
      await changeOneAndFetchProtectedThings(body, "/create");
      setText("");
    } catch (e) {}
  };

  return (
    <>
      <div className="create-protected-thing">
        <form onSubmit={event => handleSubmit(event)}>
          <TextareaAutosize
            autoFocus
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
