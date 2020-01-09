// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Create functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
} 

function updateButton() {
    const icon = this.paused ? '►': '❚ ❚' ;
    toggle.textContent = icon;
}

function skip() {
    // first console.log(this.dataset) to get the value
    // its a string, must be converted to a number
    video.currentTime += parseFloat(this.dataset.skip);
    console.log(this.dataset)
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    //console.log(this.name);
    //console.log(this.value);
}

function handleProgress() {
    // update flex-basis value based on percentage
    // how long is the video and how far are we now
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

// Add event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress); // timeupdate triggers when the video is updating its time code

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);