// HTML elemanlarını seçiyoruz
const noteForm = document.getElementById("noteForm") as HTMLFormElement;
const noteTitle = document.getElementById("noteTitle") as HTMLInputElement;
const noteContent = document.getElementById("noteContent") as HTMLTextAreaElement;
const noteColor = document.getElementById("noteColor") as HTMLInputElement;

noteForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  const titleValue: string = noteTitle.value;
  const contentValue: string = noteContent.value;
  const colorValue: string = noteColor.value;

  console.log("Başlık:", titleValue);
  console.log("İçerik:", contentValue);
  console.log("Renk:", colorValue);

  noteForm.reset();
});
