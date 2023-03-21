"use strict";
const addBox = document.querySelector(".add-box");
const pupupBox = document.querySelector(".popup-box");
const pupupTitle = document.querySelector("#popup_p");
const closeIcon = document.querySelector("#pupup_i");
const addBtn = document.querySelector("#popup_add");
const titleTag = document.querySelector("#popup_inp");
const descTag = document.querySelector("#popup_txt");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const notes = JSON.parse(localStorage.getItem("notes") || []);
let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  titleTag.focus();
  pupupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = "";
  descTag.value = "";
  addBtn.innerText = "Add a new note";
  pupupTitle.innerText = "Add note";
  pupupBox.classList.remove("show");
});

const showNotes = function () {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let liTag = `<li class="note">
  <div class="details">
  <p>${note.title}</p>
    <span
      >${note.description}</span
    >
  </div>
  <div class="bottom-content">
    <span>${note.date}</span>
    <div class="settings">
      <i onclick = "showMenu(this)" class="uil uil-ellipsis-h"></i>
      <ul class="menu">
        <li onclick = "updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
        <li onclick = "deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
      </ul>
    </div>
  </div>
</li>`;

    addBox.insertAdjacentHTML("afterend", liTag);
  });
};
showNotes();
function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName !== "I" || e.target !== elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}
function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}
function updateNote(noteId, title, desc) {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = desc;
  addBtn.innerText = "Save updates";
  pupupTitle.innerText = "Update a note";
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value;
  let noteDesc = descTag.value;
  if (noteTitle || noteDesc) {
    let dateObj = new Date();
    let month = months[dateObj.getMonth()];
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();
    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year}`,
    };

    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});
