const dropArea = document.getElementById("drop-area");
const fileElem = document.getElementById("fileElem");
const previewFrame = document.getElementById("preview-frame");

// Handle file input (manual click or drag)
dropArea.addEventListener("click", () => fileElem.click());

fileElem.addEventListener("change", handleFiles);
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.style.borderColor = "#4caf50";
});
dropArea.addEventListener("dragleave", () => {
  dropArea.style.borderColor = "#aaa";
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.style.borderColor = "#aaa";
  const files = e.dataTransfer.files;
  handleFiles({ target: { files } });
});

// Core zip processing
async function handleFiles(e) {
  const file = e.target.files[0];
  if (!file || !file.name.endsWith(".zip")) {
    alert("Please upload a .zip file containing HTML/CSS/JS files.");
    return;
  }

  const zip = await JSZip.loadAsync(file);
  const htmlFile = Object.keys(zip.files).find(name => name.toLowerCase().endsWith("index.html"));

  if (!htmlFile) {
    alert("Your ZIP must include an index.html file.");
    return;
  }

  const baseURL = URL.createObjectURL(new Blob([])); // base placeholder
  const filesMap = {};

  // Extract all files
  for (const [filename, fileData] of Object.entries(zip.files)) {
    if (!fileData.dir) {
      const blob = await fileData.async("blob");
      const blobUrl = URL.createObjectURL(blob);
      filesMap[filename] = blobUrl;
    }
  }

  // Load index.html and rewrite URLs for CSS/JS
  const htmlText = await zip.files[htmlFile].async("text");
  const rewrittenHTML = htmlText.replace(/(src|href)="(.*?)"/g, (match, attr, url) => {
    const file = filesMap[url] || url;
    return `${attr}="${file}"`;
  });

  const finalBlob = new Blob([rewrittenHTML], { type: "text/html" });
  const finalURL = URL.createObjectURL(finalBlob);
  previewFrame.src = finalURL;
}
