"use strict";

import { toURLPage } from "../pages/urlPage.js";
import { API_KEY } from "../../server/configs/apiKey.js";
import { youtubeController } from "../../server/youtubeController.js";

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

    if (playlistId !== null) {
      window.localStorage.setItem("playlistId", playlistId);
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
    console.log(playlistId);
    const tracks = await youtubeController.getPlaylistItems(
      API_KEY,
      playlistId
    );
    console.log(tracks);
  }
});
