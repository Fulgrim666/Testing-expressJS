const chalk = require("chalk");
const express = require("express");
const port = 3000;
const fs = require("fs/promises");
const { addNote, getNotes, deleteNote } = require("./notes.controller");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, resp) => {
  resp.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: false,
  });
});
app.post("/", async (req, resp) => {
  await addNote(req.body.title);
  resp.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  await deleteNote(req.params.id);
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`server has been started on port: ${port}`));
});
