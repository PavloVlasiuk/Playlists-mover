'use strict';

export const toAuthSpotify = () => {
  document.querySelector("main").innerHTML = `
    <div class="content-flow-spotify">
      <img class="spotify-logo" src="../public/styles/images/spotify.png"/>
      <h3 class="flow-header-spotify">
        Access to the account
      </h3>
      <button id="access-button">Go</button>

    </div>
  `;
};