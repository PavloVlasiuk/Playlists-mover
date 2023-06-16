'use strict';

const messageBox = document.querySelector(".invalid-url-box");

export const showMessage = () => {
  messageBox.innerHTML = `
   <h3 class="invalid-url">
      Invalid URL: Check that you have entered the URL correctly.
   </h3>
`;
};

export const hideMessage = () => {
  messageBox.innerHTML = "";
};

