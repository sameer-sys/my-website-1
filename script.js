const fileInput = document.getElementById("fileElem");
const uploadBtn = document.getElementById("uploadBtn");
const progress = document.getElementById("progress");
const result = document.getElementById("result");
const dropArea = document.getElementById("drop-area");

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.style.borderColor = "#4caf50";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.style.borderColor = "#bbb";
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.style.borderColor = "#bbb";
  fileInput.files = e.dataTransfer.files;
});

uploadBtn.addEventListener("click", () => {
  const file = fileInput.files[0];
  if (!file || !file.name.endsWith(".zip")) {
    alert("Please select a .zip file with index.html inside.");
    return;
  }

  const formData = new FormData();
  formData.append("zipfile", file);

  progress.style.display = "block";
  result.innerHTML = "";

  fetch("https://tiinyhost-sameer.onrender.com/upload", {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(data => {
      progress.style.display = "none";
      result.innerHTML = data;
    })
    .catch(err => {
      progress.style.display = "none";
      result.innerHTML = "❌ Upload failed. Try again.";
      console.error(err);
    });
});
