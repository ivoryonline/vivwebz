document.addEventListener("DOMContentLoaded", function () {
  const toggleMusicCheckbox = document.getElementById('togglemusic');
  const music = new Audio('bgmusicvrc.mp3');
  music.loop = true;
  toggleMusicCheckbox.addEventListener('change', function () {
    if (this.checked) {
      music.play();
    } else {
      music.pause();
    }
  });

  const galleryImages = document.querySelectorAll('.gallery img');
  const previewWindow = document.getElementById('preview-window');
  const previewImage = document.getElementById('preview-image');
  const previewTitle = document.getElementById('preview-title');
  const previewCloseButton = document.getElementById('preview-close-button');

  galleryImages.forEach(function (img) {
    img.addEventListener('click', function () {
      previewImage.src = img.src;
      previewImage.alt = img.alt;
      previewTitle.textContent = img.dataset.timestamp;
      previewWindow.style.display = 'block';
    });
  });

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
