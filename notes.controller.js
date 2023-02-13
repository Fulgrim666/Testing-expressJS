const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPaths = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);

  await saveNotes(notes);
  console.log(chalk.bgBlue("note was added!"));
}
async function saveNotes(note) {
  await fs.writeFile(notesPaths, JSON.stringify(note));
}
async function getNotes() {
  const notes = await fs.readFile(notesPaths, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgGreen("here is list of notes"));
  notes.forEach((element) => {
    console.log(chalk.redBright(element.id), chalk.blue(element.title));
  });
}
async function deleteNote(id) {
  const notes = await getNotes();
  notes.filter((note) => note.id !== id);
  await saveNotes(notes);
  console.log(chalk.red(`Note ${id} was removed`));
}
module.exports = {
  addNote,
  printNotes,
  deleteNote,
  getNotes,
};
