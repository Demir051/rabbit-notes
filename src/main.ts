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
  }else{
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
      noteItem.classList.add("max-w-sm", "rounded", "overflow-hidden", "shadow-lg", "hover:shadow-2xl", "hover:scale-105", "transition-transform", "duration-300", "ease-in-out");
      noteItem.style.backgroundColor = note.color;
      notesList.appendChild(noteItem);

      const noteCard = document.createElement("div");
      noteCard.classList.add("p-4", "rounded-xl");
      noteItem.appendChild(noteCard);

      const noteTitle = document.createElement("h2");
      noteTitle.classList.add("text-2xl", "text-gray-800");
      noteTitle.textContent = note.title;
      noteCard.appendChild(noteTitle);

      const noteContent = document.createElement("p");
      noteContent.classList.add("text-gray-600", "mt-2");
      noteContent.textContent = note.content;
      noteCard.appendChild(noteContent);

      const heartButton = document.createElement("button");
      heartButton.classList.add("mt-4", "flex", "items-center"), "heartButton";
      heartButton.setAttribute("data-id", `heartButton-${index}`);
      noteCard.appendChild(heartButton);

      const heartIcon = document.createElement("span");
      heartIcon.textContent ="🐰 click me";
      heartButton.appendChild(heartIcon);
    });
  }
};

const heartButton = document.getElementById('heartButton') as HTMLButtonElement;

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

if (heartButton) {
  heartButton.addEventListener('click', addHeart);
}
