const playlistContainerTag = document.getElementsByClassName("playlistContainer")[0];
const audioTag = document.getElementsByClassName("audioTag")[0];
const currentTimeAndTotalTimeTag = document.getElementsByClassName("currentTimeAndTotalTime")[0];
const currentProgressTag = document.getElementById("currentProgress");
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const playButtonTag = document.getElementsByClassName("playButton")[0];
const backwardButtonTag = document.getElementsByClassName('backwardButton')[0];
const forwardButtonTag = document.getElementsByClassName('forwardButton')[0];

const track = [
    {trackId: "music/track1.mp3", title: "December Nya - Lin Nat"},
    {trackId: "music/track2.mp3", title: "Tsaw Ra Ai Tsaw Hkrup Sai - Ann Naw"},
    {trackId: "music/track3.mp3", title: "Lann Mha Gyee Yey Bey - Wine Suu Khine Thein"},
    {trackId: "music/track4.mp3", title: "Yee Zarr Sar - Sai Sai Kham Hlaing"}
]

let currentMusic = '';
let playCurrentMusicIndex = 0;


for (let i = 0; i < track.length; i++){
    const trackTag = document.createElement("div");
    trackTag.classList.add("trackItem");
    trackTag.textContent = (i + 1).toString() + ". " + track[i].title;
    playlistContainerTag.append(trackTag);
    trackTag.addEventListener("click", () => {
        currentMusic = track[i].trackId;
        audioTag.src = currentMusic;
        isPlay = true;
        playAndPauseButton();
        playCurrentMusicIndex = i;
    })
}

let durationText = "00:00";
let duration = "00:00";

audioTag.addEventListener("loadeddata", () => {
    duration = Math.floor(audioTag.duration);
    durationText = calculateTime(duration);
})

audioTag.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = calculateTime(currentTime);
    currentTimeAndTotalTimeTag.textContent = currentTimeText + " / " + durationText;
    currentProgressTime(currentTime);
})

const calculateTime = (total) => {
    const minutes = Math.floor(total / 60);
    const seconds = (total % 60);

    const minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondsText = seconds < 10 ? "0" + seconds.toString() : seconds;
    return minutesText + ":" + secondsText;
}

const currentProgressTime = (currentTime) => {
    const currentCalculatTime = (500/duration) * currentTime;
    currentProgressTag.style.width = currentCalculatTime.toString() + "px";
}

let isPlay = true;
let musicIndexNumber = 0;

playButtonTag.addEventListener('click', () => {
    const currentTime = Math.floor(audioTag.currentTime);
     if (currentTime === 0) {
        audioTag.src = track[musicIndexNumber].trackId;
        playAndPauseButton();
    } else {
        playAndPauseButton();
    }
})

pauseButtonTag.addEventListener('click', () => {
    playAndPauseButton();
    audioTag.pause();
})

backwardButtonTag.addEventListener('click', () => {
    if (playCurrentMusicIndex === 0) {
        return;
    }
    playCurrentMusicIndex -= 1;
    audioTag.src = track[playCurrentMusicIndex].trackId;
    isPlay = true;
    playAndPauseButton();
})

forwardButtonTag.addEventListener('click', () => {
    if (playCurrentMusicIndex === track.length - 1) {
        return;
    }
    playCurrentMusicIndex += 1;
    audioTag.src = track[playCurrentMusicIndex].trackId;
    isPlay = true;
    playAndPauseButton();
})

const playAndPauseButton = () => {
    if (isPlay) {
        playButtonTag.style.display = 'none';
        pauseButtonTag.style.display = 'inline';
        audioTag.play();
        isPlay = false;
    } else {
        pauseButtonTag.style.display = 'none';
        playButtonTag.style.display = 'inline';
        audioTag.pause();
        isPlay = true;
    }
}