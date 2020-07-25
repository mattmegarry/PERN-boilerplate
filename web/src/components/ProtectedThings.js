import React, { useState, useEffect } from "react";
import { authRequest } from "../utils/http";
import CreateProtectedThing from "./CreateProtectedThing";

const ProtectedThings = props => {
  const { clearState } = props;
  const [protectedThings, setProtectedThings] = useState([]);

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

  const createProtectedThing = async body => {
    try {
      const res = await authRequest("/protected-things/create", "POST", body);
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

  return (
    <>
      <CreateProtectedThing createProtectedThing={createProtectedThing} />
      {protectedThings.map(thing => {
        const { id, text } = thing || "";
        return (
          <div key={id} className="item">
            {text}
          </div>
        );
      })}
    </>
  );
};

export default ProtectedThings;
