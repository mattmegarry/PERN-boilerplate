import React from "react";

import ProtectedThings from "./ProtectedThings";

const Home = props => {
  const { loggedIn, clearState } = props;
  return loggedIn ? (
    <ProtectedThings clearState={clearState} />
  ) : (
    <div className="info">
      <p>WELCOME to the Hompage</p>
    </div>
  );
};

export default Home;
