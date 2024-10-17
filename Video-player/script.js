const videoElement = document.getElementById('video');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const author = document.getElementById('author');  
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-bar');
const volumeSlider = document.getElementById('volume');
const speedSelect = document.getElementById('speed');

 const videos = [
    { title: 'Dugsiiye Demo Day', author: 'Dugsiiye', src: './videos/Dugsiiye_Demo_Day___Full_Stack_Mentorship(144p).mp4' }, 
    { title: 'Deeqaha waxbarasho', author: 'Abdirahman Caseer', src: './videos/Deeqahaan_waxbarasho_sanadkasta_xarayso!(144p).mp4' }, 
    { title: 'For the rest of my life song', author: 'Maher Zain', src: './videos/Maher_Zain_-_For_The_Rest_Of_My_Life___Official_Music_Video(360p).mp4' }
 ];

let videoIndex = 0;
let isPlaying = false;
let speed = 1;

// Load video function
function loadVideo(video) {
    title.textContent = video.title;
    author.textContent = video.author; 
    videoElement.src = video.src;
}
loadVideo(videos[videoIndex]);

// Play video
function playVideo() {
    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause');
    videoElement.play();
    isPlaying = true;
}

// Pause video
function pauseVideo() {
    playBtn.querySelector('i').classList.remove('fa-pause');
    playBtn.querySelector('i').classList.add('fa-play');
    videoElement.pause();
    isPlaying = false;
}

// Next video
function nextVideo() {
    pauseVideo();
    setTimeout(() => {
        videoIndex++;
        if (videoIndex > videos.length - 1) {
            videoIndex = 0;
        }
        loadVideo(videos[videoIndex]);
        playVideo();
    }, 300);
}

// Previous video
function prevVideo() {
    pauseVideo();
    setTimeout(() => {
        videoIndex--;
        if (videoIndex < 0) {
            videoIndex = videos.length - 1;
        }
        loadVideo(videos[videoIndex]);
        playVideo();
    }, 300);
}

// Update progress
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;

    if (isNaN(duration)) return;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    currentTimeEl.textContent = `${durationMinutes}:${durationSeconds}`;

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    durationEl.textContent = `${currentMinutes}:${currentSeconds}`;

    videoElement.playbackRate = speed;
}

// Set progress (on progress bar click)
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = videoElement.duration;

    if (isNaN(duration)) return;

    const newTime = (clickX / width) * duration;
    videoElement.currentTime = newTime;
}

// Event listeners
playBtn.addEventListener('click', () => {
    isPlaying ? pauseVideo() : playVideo();
});

nextBtn.addEventListener('click', nextVideo);
prevBtn.addEventListener('click', prevVideo);

videoElement.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

volumeSlider.addEventListener('input', (e) => {
    videoElement.volume = e.target.value;
});

speedSelect.addEventListener('change', (e) => {
    speed = parseFloat(e.target.value);
    videoElement.playbackRate = speed;
});

videoElement.addEventListener('loadeddata', updateProgress);
