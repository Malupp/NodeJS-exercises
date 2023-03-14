import express from "express";

const app = express();

app.get("/movies", (req, res) => {
  res.json([{ name: "The Great War" }, { name: "Matrix" }]);
});

export default app;
