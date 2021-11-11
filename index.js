const { response } = require("express");
const express = require("express");

const app = express();

app.get("/user", (request, response) => {
    return response.json({ message: "Hello World" });
});

app.listen(3333, () => console.log("Listening on port 3333"));
