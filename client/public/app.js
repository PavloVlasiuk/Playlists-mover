"use strict";

import { toURLPage } from "../pages/urlPage.js";
import { API_KEY } from "../../server/configs/apiKey.js";
import { spotifyController } from "../../server/spotifyController.js";
import { youtubeController } from "../../server/youtubeController.js";
import { toAuthSpotify } from "../pages/authSpotify.js";

const startButton = document.querySelector("#start-button");

startButton.addEventListener("click", () => toURLPage());

const validateURL = (url) => {
  const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/;

  if (!pattern.test(url)) {
    throw new Error("Invalid URL");
    return;
  }
};

const handleInputKeyup = (event) => {
  try {
    const url = event.target.value;
    validateURL(url);
    const params = new URL(url);
    const playlistId = params.searchParams.get("list");

    localStorage.clear();
    
    if (playlistId !== null) {
      localStorage.setItem("playlistId", playlistId);
    } else throw new Error("Invalid url");
  } catch (e) {
    console.log(e);
  }
};

document.addEventListener("keyup", async (event) => {
  event.preventDefault();
  if (event.keyCode === 13 && event.target.matches("#input-url")) {
    handleInputKeyup(event);

    const playlistId = window.localStorage.getItem("playlistId");
    const tracks = await youtubeController.getPlaylistItems(
      API_KEY,
      playlistId
    );
    localStorage.setItem("tracks", JSON.stringify(tracks));
    console.log(localStorage.getItem("tracks"));
    toAuthSpotify();
  }
});

document.addEventListener("click", async (event) => {
  if (event.target.matches("#auth-spotify")) {
    window.location.href = spotifyController.makeRequestURL();
  }
});
