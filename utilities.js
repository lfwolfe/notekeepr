//These utility functions should have generic names since they
//are utility functions but used these names for self commenting
/**
 * adds gets new hash Id and adds note to notes
 * @param {object} note
 * @param {array of objects} notes
 */
const addNote = (note, notes) => {
  let noteId = getNoteHash(note.title);
  note.id = noteId;
  notes.push(note);
  return notes;
};

/**
 * generates a simple hash from title for note id
 * @param {string} title
 */
const getNoteHash = title => {
  const input = [...title];
  let output = input.reduce((prev, curr, index) => {
    return prev + curr.charCodeAt(0) * index;
  }, 0);
  return output;
};

/**
 * updates note in array of notes
 * @param {string} note
 * @param {array of strings} notes
 */
const updateNote = (note, notes) => {
  let updatedNotes = notes.reduce((prev, curr) => {
    if (`${curr.id}` === note.id) {
      prev.push(note);
    } else {
      prev.push(curr);
    }
    return prev;
  }, []);
  return updatedNotes;
};

/**
 *
 * @param {string} searchTerm
 * @param {array of objects} notes
 */
const searchNotes = (searchTerm, notes) => {
  let results = notes;
  if (searchTerm !== "") {
    results = notes.filter(note => {
      return `${note.title} ${note.details}`.indexOf(searchTerm) !== -1;
    });
  }
  return results;
};

/**
 *
 * @param {string} id
 */
const fetchFromLocalStorage = id => {
  const item = localStorage.getItem(id);
  return JSON.parse(item);
};

/**
 *
 * @param {string} id
 * @param {array of object} value
 */
const saveToLocalStorage = (id, value) => {
  localStorage.setItem(id, JSON.stringify(value));
  return value;
};
