// Use this file only as a guide for first steps using routes. Delete it when you have added your own route files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/usage/routes

  module.exports = [
    {
      id: "get-fav", // route id
      url: "/api/fav", // url in express format
      method: "*", // HTTP method
      variants: [
        {
          id: "success", // variant id
          type: "json", // variant handler id
          options: {
            status: 200, // status to send
            body: {"status": "ok"}, // body to send
          },
        }
      ],
    }
  ];
  