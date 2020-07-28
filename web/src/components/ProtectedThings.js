import React, { useState, useEffect } from "react";
import { authRequest } from "../utils/http";
import CreateProtectedThing from "./CreateProtectedThing";
import ProtectedThing from "./ProtectedThing";

const ProtectedThings = props => {
  const { clearState } = props;
  const [protectedThings, setProtectedThings] = useState([]);
  const [whichThingIsInInputMode, setWhichThingIsInInputMode] = useState(null);

  useEffect(() => {
    const fetchProtectedThings = async () => {
      try {
        const res = await authRequest("/protected-things", "GET");
        if (res.status >= 400 && res.status < 600) {
          clearState();
        } else if (res.status === 200) {
          const protectedThings = res.data || [];
          setProtectedThings(protectedThings);
        }
      } catch (e) {
        console.log("Error fetching data");
      }
    };
    fetchProtectedThings();
  }, [clearState]);

  const changeOneAndFetchProtectedThings = async (body, path) => {
    try {
      const res = await authRequest("/protected-things" + path, "POST", body);
      if (res.status >= 400 && res.status < 600) {
        clearState();
      } else if (res.status === 200) {
        const protectedThings = res.data || [];
        setProtectedThings(protectedThings);
      }
    } catch (e) {
      console.log("Error creating protected thing");
    }
  };

  const handleInputMode = id => {
    setWhichThingIsInInputMode(prevState => (prevState === id ? null : id));
  };

  return (
    <>
      <CreateProtectedThing
        changeOneAndFetchProtectedThings={changeOneAndFetchProtectedThings}
      />
      {protectedThings.map(protectedThing => {
        const { id } = protectedThing || "";
        return (
          <ProtectedThing
            key={id}
            protectedThing={protectedThing}
            inputMode={whichThingIsInInputMode === id ? true : false}
            handleInputMode={handleInputMode}
            changeOneAndFetchProtectedThings={changeOneAndFetchProtectedThings}
          />
        );
      })}
    </>
  );
};

export default ProtectedThings;
