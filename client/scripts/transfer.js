"use strict";

import {spotifyController} from "../../server/spotifyController.js";
import {storage} from "../../server/storageRequests.js";
import {getURLParam} from "./utils/URLService.js";

const loadButton = document.querySelector("#button");

document.addEventListener("DOMContentLoaded", async (event) => {
  const codeURL = window.location.href;
  const code = getURLParam(codeURL, "code");

  const token = await spotifyController.getAccessToken(code);

  localStorage.setItem("accessToken", token.access_token);
});

loadButton.addEventListener("click", async (event) => {
  const token = localStorage.getItem("accessToken");
  const tracks = await storage.getData();

  const userId = await spotifyController.getUserId(token);

  const tracksUri = await spotifyController.searchTracks(token, tracks);

  const createdPlaylistId = await spotifyController.createPlaylist(token, userId, "po-finsky");

  await spotifyController.addTracksToPlaylist(token, createdPlaylistId, tracksUri);
  await storage.deleteData();

});
