'use strict';

export const toAuthSpotify = () => {
  document.querySelector(".content-flow").innerHTML = `
    <div class="container">
      <button id="auth-spotify">Click</button>
    </div>
  `;
};