import React from "react";

function Header() {
  return (
    <div className="App">
      <div class="wrapper">
        <nav>
          <span id="brand">
            <a>AURAL SKILLZ</a>
          </span>

          <ul id="menu">
            <li>
              <a href="index.html">HOME</a>
            </li>
            <li>
              <a href="exercises.html">EXERCISES</a>
            </li>
          </ul>

          <div id="toggle">
            <div class="span">MENU</div>
          </div>
        </nav>

        <div id="resize">
          <div class="close-btn">close</div>

          <ul id="menu">
            <li>
              <a href="index.html">
                HOME<span>.</span>
              </a>
            </li>
            <li>
              <a href="exercises.html">
                EXERCISES<span>.</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
