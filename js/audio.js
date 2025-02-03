let currentAudio = null;
let isAudioPlaying = !1;

function chooseRandomAudioFile() {
    const files = {
        0: "https://dl.sndup.net/3h83r/song%20for%20my%20lost%20ghost%20friends.mp3"
    };

    let random = Math.floor(Math.random() * Object.keys(files).length);

    return files[random];
}

function playAudio() {
    if (isAudioPlaying) {
        return;
    }

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(chooseRandomAudioFile());
    currentAudio.play();
    isAudioPlaying = !0;

    currentAudio.onended = function () {
        currentAudio = null;
        isAudioPlaying = !1;
        playAudio();
    };
}
window.addEventListener("click", function () {
    playAudio();
});
