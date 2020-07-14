import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route
} from "react-router-dom";

import Login from "./components/Login";
import { openRequest } from "./utils/http";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const login = (body, callback) => {
    openRequest("/users/auth/login", "POST", body)
      .then(res => {
        if (res && res.status === 200) {
          localStorage.setItem("token", res.data.token);
          setLoggedIn(true);
          setEmail(res.data.email);
          callback(true, null);
        } else {
          localStorage.removeItem("token");
          setLoggedIn(false);
          setEmail("");
          callback(false, res.data.message);
        }
      })
      .catch();
  };

  return (
    <Router>
      <div className="header-outer">
        <div className="header">
          <h1>My App</h1>
          {loggedIn ? <p>{email}</p> : <NavLink to="/login">Login</NavLink>}
        </div>
      </div>
      <div className="main-outer">
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <div className="main">
                <div className="info">Item</div>
                <div className="item">Item</div>
                <div className="item">Item</div>
                <div className="item">Item</div>
                <div className="item">Item</div>
              </div>
            )}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <Login {...props} loggedIn={loggedIn} login={login} />
            )}
          />
        </Switch>
      </div>
      <div className="footer-outer">
        <div className="footer">
          <div>Footer info left</div>
          <div>Footer info right</div>
        </div>
      </div>
    </Router>
  );
}

export default App;
