//NOTE: These utility functions could have better names and can be a bit more generic
/**
 * adds gets new hash Id and adds note to notes
 * @param {Object} note
 * @param {Array} notes
 * @return {Array}
 */
const addNote = (note, notes) => {
  let noteId = getNoteHash(note.title);
  note.id = noteId;
  notes.push(note);
  return notes;
};

/**
 * generates a simple hash from title for note id
 * @param {String} title
 * @return {Number}
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
 * @param {Object} note
 * @param {Array} notes
 * @return {Array}
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
 *  filters an array by searchTerm
 * @param {String} searchTerm
 * @param {Array} notes
 * @returns {Array}
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
 * get Object from localstorage
 * @param {String} id
 */
const fetchFromLocalStorage = id => {
  const item = localStorage.getItem(id);
  return JSON.parse(item);
};

/**
 * save Array to localStorage key = id
 * @param {String} id
 * @param {Array} value
 */
const saveToLocalStorage = (id, value) => {
  localStorage.setItem(id, JSON.stringify(value));
  return value;
};
