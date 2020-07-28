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

  const deleteProtectedThing = async () => {
    const body = { id };

    handleInputMode(id);
    await changeOneAndFetchProtectedThings(body, "/delete");
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
        />
        <div className="protected-thing-control-buttons">
          <input
            className="delete"
            type="button"
            value="Delete"
            onClick={deleteProtectedThing}
          />
          <input
            className="save-edit-protected-thing"
            type="submit"
            value="Save"
          />
        </div>
      </form>
    </div>
  ) : (
    <div className="item" onClick={dispatchInputModeInstruction}>
      {text}
    </div>
  );
};

export default ProtectedThing;
