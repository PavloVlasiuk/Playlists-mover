"use strict";

import { spotifyController } from "../../server/spotifyController.js";

const body = document.querySelector(".transfer");
console.log(localStorage.getItem("tracks"));

body.addEventListener("click", async (event) => {
  const queryParams = window.location.search;
  const urlParams = new URLSearchParams(queryParams);
  const code = urlParams.get("code");

  alert("alert");

  const token = await spotifyController.getAccessToken(code);
  console.log(token);
  localStorage.setItem("accessToken", token.access_token);
});

const loadButton = document.querySelector("#load-tracks");

loadButton.addEventListener("click", async (event) => {
  const token = localStorage.getItem("accessToken");
  const tracks = localStorage.getItem("tracks");
  console.log(token);
  console.log(tracks);

  const userId = await spotifyController.getUserId(token);
  console.log(userId);

  const tracksUri = await spotifyController.searchTracks(token, tracks);
  console.log(tracksUri);

  const createdPlaylistId = await spotifyController.createPlaylist(token, userId, "for me");
  console.log(createdPlaylistId);

  spotifyController.addTracksToPlaylist(token, createdPlaylistId, tracksUri);

});
