import React, { useState, useEffect } from "react";
import { authRequest } from "../utils/http";

const ProtectedThings = props => {
  const { clearState } = props;
  const [protectedThings, setProtectedThings] = useState([]);

  useEffect(() => {
    const fetchProtectedThings = async () => {
      try {
        const res = await authRequest("/protected-things", "GET");
        if (res.status === 401) {
          clearState();
        } else {
          const protectedThings = res.data || [];
          setProtectedThings(protectedThings);
        }
      } catch (e) {
        console.log("Error fetching data");
      }
    };
    fetchProtectedThings();
  }, [clearState]);

  return (
    <>
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
