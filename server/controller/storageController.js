"use strict";

const endpoint = "/storage";
let storage = {};

const handleGetRequest = (req, res) => {
  res.statusCode = 200;

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(storage));
};

const handlePostRequest = (req, res) => {
  let body = "";

  req.on("data", data => {
    body = `{"items": ${data}}`;
  });

  req.on("end", () => {
    try {
      storage = JSON.parse(body);

      res.statusCode = 201;
      res.end(JSON.stringify({ message: "Data stored succesfully" }));
    } catch {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Invalid JSON data" }));
    }
  });
};

const handleDeleteRequest = (req, res) => {
  storage = {};

  res.statusCode = 200;
  res.end(JSON.stringify({ message: "Data deleted succesfully" }));
};

const methods = {
  GET: handleGetRequest,
  POST: handlePostRequest,
  DELETE: handleDeleteRequest,
};

export const router = (req, res) => {
  if (methods.hasOwnProperty(req.method) && req.url === endpoint) {
    methods[req.method](req, res);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not Found" }));
  }
};
