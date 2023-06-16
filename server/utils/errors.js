"use strict";

const errorStatus = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  500: "Internal Server Error",
};

export const checkResponseStatus = (response) => {
  if (errorStatus.hasOwnProperty(response.status)) {
    throw new Error(errorStatus[response.status]);
  } else if (!response.ok) {
    throw new Error(`HTTP error occured, status ${response.status}`);
  }
};
