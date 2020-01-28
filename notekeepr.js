const STORAGE_KEY = "notekeeprNotes";

/**
 *
 * @param {event object} e
 */
const openNewNoteFormHandler = e => {
  const createNoteFormRef = document.querySelector(".add-note");
  const saveButtonRef = document.querySelector(".button.save");
  const myNotesRef = document.querySelector(".my-notes");
  createNoteFormRef.classList.add("show");
  myNotesRef.classList.add("hide");
  saveButtonRef.addEventListener("click", saveNoteHandler);
  if (
    e.target.getAttribute("data-type") &&
    e.target.getAttribute("data-type") === "update"
  ) {
    preFillForm(e);
    saveButtonRef.setAttribute("data-type", "update");
    saveButtonRef.setAttribute(
      "data-note-id",
      e.target.getAttribute("data-note-id")
    );
  } else {
    clearForm();
    saveButtonRef.removeAttribute("data-type");
    saveButtonRef.removeAttribute("data-note-id");
  }
};
/**
 *
 */
const clearForm = () => {
  document.querySelector("#title").value = "";
  document.querySelector("#note").value = "";
};

/**
 *
 * @param {event object} e
 */
const preFillForm = e => {
  const noteRef = e.target;
  const noteKey = noteRef.getAttribute("data-note-id");
  const notes = fetchFromLocalStorage(STORAGE_KEY);
  const note = notes.filter(curr => {
    return `${curr.id}` === noteKey;
  });
  const titleRef = document.querySelector("#title");
  const detailsRef = document.querySelector("#note");
  titleRef.value = note[0].title;
  detailsRef.value = note[0].details;
};

/**
 *
 * @param {event object} e
 */
const saveNoteHandler = e => {
  const notes = fetchFromLocalStorage(STORAGE_KEY) || [];
  const noteTitleRef = document.querySelector("#title");
  const noteDetailsRef = document.querySelector("#note");
  let updatedNotes = notes;
  if (
    e.target.getAttribute("data-type") &&
    e.target.getAttribute("data-type") === "update"
  ) {
    updatedNotes = updateNote(
      {
        id: e.target.getAttribute("data-note-id"),
        title: noteTitleRef.value,
        details: noteDetailsRef.value
      },
      notes
    );
  } else {
    updatedNotes = addNote(
      { title: noteTitleRef.value, details: noteDetailsRef.value },
      notes
    );
  }
  saveToLocalStorage(STORAGE_KEY, updatedNotes);
  cancelNoteHandler();
  displayNotes(updatedNotes);
};

/**
 *
 * @param {event object} e
 */
const cancelNoteHandler = e => {
  const createNoteFormRef = document.querySelector(".add-note");
  const myNotesRef = document.querySelector(".my-notes");
  createNoteFormRef.classList.remove("show");
  myNotesRef.classList.remove("hide");
};

/**
 *
 * @param {array of objects} notes
 */
const displayNotes = notes => {
  const notesRef = document.querySelector(".notes-list");
  let ulRef = document.createElement("ul");
  const allNotes = notes.reduce((prev, curr) => {
    let liRef = document.createElement("li");
    liRef.innerText = curr.title;
    liRef.setAttribute("data-note-id", curr.id);
    liRef.setAttribute("data-type", "update");
    liRef.setAttribute("title", curr.title);
    liRef.addEventListener("click", openNewNoteFormHandler);
    prev.appendChild(liRef);
    return prev;
  }, ulRef);
  notesRef.innerHTML = "";
  notesRef.appendChild(ulRef);
  return allNotes;
};

/**
 *
 * @param {event object} e
 */
const searchNotesHandler = e => {
  const notes = fetchFromLocalStorage(STORAGE_KEY); //should use a debounce here
  const searchText = e.target.value.trim();
  const filteredNotes = searchNotes(searchText, notes);
  displayNotes(filteredNotes);
};

/**
 * initialize page
 */
(function() {
  const cancelAddNewNoteRef = document.querySelector(".button.cancel");
  const addNewNoteRef = document.querySelector(".add-note-button");
  const searchBoxRef = document.querySelector("#search-title");

  displayNotes(fetchFromLocalStorage(STORAGE_KEY) || []);
  addNewNoteRef.addEventListener("click", openNewNoteFormHandler);
  cancelAddNewNoteRef.addEventListener("click", cancelNoteHandler);
  searchBoxRef.addEventListener("keyup", searchNotesHandler);
})();
