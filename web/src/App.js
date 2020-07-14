import React from "react";

function App() {
  return (
    <>
      <div className="header-outer">
        <div className="header">
          <h1>My App</h1>
          <button className="menu">MENU</button>
        </div>
      </div>
      <div className="main-outer">
        <div className="main">
          <div className="item">Item</div>
          <div className="item">Item</div>
          <div className="item">Item</div>
          <div className="item">Item</div>
          <div className="item">Item</div>
        </div>
      </div>
      <div className="footer-outer">
        <div className="footer">
          <div>Footer info left</div>
          <div>Footer info right</div>
        </div>
      </div>
    </>
  );
}

export default App;
