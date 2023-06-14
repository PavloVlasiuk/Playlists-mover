"use strict";

const requestURL = "http://localhost:5000/storage";

const storage = (() => {
  const _getData = async () => {
    const request = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    return data;
  };

  const _setData = async (data) => {
    const request = await fetch(requestURL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const responseStatus = await request.json();

    return responseStatus;
  };

  const _deleteData = async () => {
    const request = await fetch(requestURL, {
      method: "DELETE",
    });

    const responseStatus = await request.json();

    return responseStatus;
  };

  return {
    getData() {
      return _getData();
    },

    setData(data) {
      return _setData(data);
    },

    deleteData() {
      return _deleteData();
    },
  };
})();
