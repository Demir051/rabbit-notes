interface Note {
  title: string;
  content: string;
  color: string;
}

const noteForm = document.getElementById("noteForm") as HTMLFormElement;
const noteTitle = document.getElementById("noteTitle") as HTMLInputElement;
const noteContent = document.getElementById("noteContent") as HTMLTextAreaElement;
const noteColor = document.getElementById("noteColor") as HTMLInputElement;

noteForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  const titleValue: string = noteTitle.value;
  const contentValue: string = noteContent.value;
  const colorValue: string = noteColor.value;

  if (!titleValue || !contentValue) {
    alert("Please fill in all fields!");
    return;
  } else {
    const note = {
      title: titleValue,
      content: contentValue,
      color: colorValue,
    }

    let notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.push(note);

    localStorage.setItem('notes', JSON.stringify(notes));
    alert('Note added successfully!');
    location.reload();

  }


  noteForm.reset();
});

window.onload = (): void => {
  const notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");

  const notesList = document.getElementById("notesList");

  if (notesList) {
    notes.forEach((note: Note, index: number) => {

      const noteItem = document.createElement("div");
      noteItem.setAttribute("data-id", `noteItem-${index}`);
      noteItem.classList.add("h-48","max-w-sm", "rounded-xl", "overflow-hidden", "shadow-lg", "hover:shadow-2xl", "hover:scale-105", "transition-transform", "duration-300", "ease-in-out");
      noteItem.style.backgroundColor = note.color;
      notesList.appendChild(noteItem);

      const noteCard = document.createElement("div");
      noteCard.classList.add("w-full", "max-w-lg", "h-full", "p-4", "overflow-auto");
      noteItem.appendChild(noteCard);

      const noteTitle = document.createElement("h2");
      noteTitle.classList.add("text-2xl", "text-black","inline");
      noteTitle.textContent = note.title;
      noteCard.appendChild(noteTitle);

      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fa-solid", "fa-trash","ml-5","cursor-pointer", "text-lg");
      noteCard.appendChild(trashIcon);

      const line = document.createElement("hr");
      line.classList.add("my-2");
      noteCard.appendChild(line);

      const noteContent = document.createElement("p");
      noteContent.classList.add("text-black", "mt-2","max-w-full");
      noteContent.textContent = note.content;
      noteCard.appendChild(noteContent);

      const heartButton = document.createElement("button");
      heartButton.classList.add("mt-4", "flex", "items-center", "heartButton", "mt-0");
      heartButton.setAttribute("data-id", `heartButton-${index}`);
      noteCard.appendChild(heartButton);

      const heartIcon = document.createElement("span");
      heartIcon.textContent = "🐰 click me";
      heartButton.appendChild(heartIcon);

      trashIcon.addEventListener("click", () => {

        noteItem.remove();

        let notes = JSON.parse(localStorage.getItem("notes") || "[]");
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
      });

    });
  }
  
  const heartButtons = document.querySelectorAll<HTMLButtonElement>("button[data-id^='heartButton-']");

  heartButtons.forEach((button) => {
    button.addEventListener("click", addHeart);
  });
};

const addHeart = () => {
  const heart = document.createElement('span');
  heart.classList.add('heart');
  heart.innerHTML = '❤️'; 
  
  const randomX = Math.random() * window.innerWidth; 
  heart.style.left = `${randomX}px`;
  heart.style.top = `-${Math.random() * 50}px`;
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 3000);
};
  
