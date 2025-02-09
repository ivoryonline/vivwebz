document.addEventListener("DOMContentLoaded", function () {
  const previewWindow = document.getElementById('preview-window');
  const previewImage = document.getElementById('preview-image');
  const previewTitle = document.getElementById('preview-title');

  fetch('https://assets.vivwebz.net/vrchat_files.json')
    .then(response => response.json())
    .then(songs => {
      const picturesArray = Object.values(songs);
      for (const picture of picturesArray) {
        let timestamp = picture.split("t_")[1]; // fuck its one of these again
        timestamp = timestamp.split(".")[0]; // remove the extension
        timestamp = timestamp.replaceAll("_", " "); // replace the _ with a space
        let timestampStart = timestamp.split(" ")[0];
        let timestampEnd = timestamp.split(" ")[1];
        timestampEnd = timestampEnd.replaceAll("-", ":");
        timestamp = timestampStart + " " + timestampEnd;
        document.getElementById("vrc-pictures").innerHTML += `<img src="https://assets.vivwebz.net/${picture}" alt="${timestamp}" data-timestamp="${timestamp}">`;
      }
    })
    .then(() => {
      const galleryImages = document.querySelectorAll('.gallery img');
      galleryImages.forEach(image => {
        image.addEventListener('click', function () {
          previewImage.src = this.src;
          previewTitle.textContent = this.alt;
          previewWindow.style.display = 'block';
        });
      });
    })
    .catch(error => console.error('Error with image listing:', error));

  const npc = document.getElementById('npc');
  const npcTooltip = document.getElementById('npc-tooltip');
  const dialogues = [
    "I'm just your regular, every day, digital dragon.",
    "Vivian put me in charge of her VRChat pictures, I get paid XMR to be here.",
    "I am a sentient, living, artificial-intelligence, stuck inside this website.",
    "VRChat is pretty cool, huh?",
    "My shift ends at 6AM, and starts at 6AM. 24/7 grinding out here."
  ];
  let isDialogueActive = false;
  npc.addEventListener('click', function () {
    if (isDialogueActive) return;
    isDialogueActive = true;
    const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
    npcTooltip.textContent = randomDialogue;
    npcTooltip.classList.remove('tooltip-fade-out');
    npcTooltip.style.display = 'block';
    npcTooltip.classList.add('tooltip-fade-in');
    setTimeout(function () {
      npcTooltip.classList.remove('tooltip-fade-in');
      npcTooltip.classList.add('tooltip-fade-out');
      setTimeout(function () {
        npcTooltip.style.display = 'none';
        npcTooltip.classList.remove('tooltip-fade-out');
        isDialogueActive = false;
      }, 500);
    }, 3000);
  });
  const previewCloseButton = document.getElementById('preview-close-button');

  previewCloseButton.addEventListener('click', function () {
    previewWindow.style.display = 'none';
  });

  const previewTitleBar = document.getElementById('preview-title-bar');
  let isDragging = false;
  let offsetX, offsetY;

  previewTitleBar.addEventListener('mousedown', function (e) {
    isDragging = true;
    const rect = previewWindow.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  document.addEventListener('mousemove', function (e) {
    if (isDragging) {
      previewWindow.style.left = (e.clientX - offsetX) + 'px';
      previewWindow.style.top = (e.clientY - offsetY) + 'px';
    }
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });
});
