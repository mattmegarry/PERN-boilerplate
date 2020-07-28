import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ProtectedThing = props => {
  const {
    protectedThing,
    changeOneAndFetchProtectedThings,
    inputMode,
    handleInputMode
  } = props;
  const { id, text } = protectedThing || "";
  const [newText, setNewText] = useState(text);

  const handleSubmit = async event => {
    if (event) {
      event.preventDefault();
    }

    const body = {
      id,
      newText
    };

    handleInputMode(id);
    await changeOneAndFetchProtectedThings(body, "/update");
  };

  const dispatchInputModeInstruction = () => {
    handleInputMode(id);
  };

  return inputMode ? (
    <div className="item">
      <div className="cancel">
        <input
          className="cancel"
          type="button"
          value="Cancel"
          onClick={dispatchInputModeInstruction}
        />
      </div>
      <form onSubmit={event => handleSubmit(event)}>
        <TextareaAutosize
          className="edit-protected-thing"
          value={newText}
          onChange={event => setNewText(event.target.value)}
          onHeightChange={e => {
            console.log("moo");
          }}
        />
        <input
          className="save-edit-protected-thing"
          type="submit"
          value="Save"
        />
      </form>
    </div>
  ) : (
    <div className="item" onClick={dispatchInputModeInstruction}>
      {text}
    </div>
  );
};

export default ProtectedThing;
