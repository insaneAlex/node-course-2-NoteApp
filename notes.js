const fs = require('fs');

const fetchNotes = () => {
  try {
    let notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const saveNodes = (notesToSave) => {
  fs.writeFileSync('notes-data.json', notesToSave);
}

const addNote = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body
  };

  let duplicateNotes = notes.filter(note => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNodes(JSON.stringify(notes));
    return note;
  }
};

const getAll = () => {
  const all = fetchNotes();
  return all;
};
const getNote = title => {
  let notes = fetchNotes();
  let note = [];

  for (const el of notes) {
    if (el.title === title) {
      note = el;
      break;
    }
  }

  if (note.length === 0) {
    console.log('Not found!');
  } else {
    return note;
  }
}

const removeNote = (title) => {
  let notes = fetchNotes();
  let newNote = notes.filter(obj => obj.title !== title);
  fs.writeFileSync('notes-data.json', JSON.stringify(newNote));
}

const logNote = note => {
  debugger;
  console.log('-----')
  console.log(`Title: ${note.title}`)
  console.log(`Body : ${note.body}`)
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
}