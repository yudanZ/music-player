// Get Dom element
const playElement = document.getElementById('play');
const prevElement = document.getElementById('prev');
const nextElement = document.getElementById('next');
const audioElement = document.getElementById('audio');
const durationElement = document.querySelector('.duration');
const currentItemElement = document.getElementById('current-item');
const progressElement = document.getElementById('progress');
const progressContainerElement = document.getElementById('progress-container');
const titleElement = document.getElementById('title');
const artistElement = document.getElementById('artist');
const imageElement = document.querySelector('img');

let isPlayMusic = false;
let currentAudioTime = 0;
let finishedAudio = audioElement.duration;
let songIndex = 0;

const songs = [
    {
        name: 'zweistimmungen',
        displayName: 'Zwei Stimmungen',
        artist: 'Pinano',
        imgUrl: 'zweistimmungen'
    },
    {
        name: 'Andante',
        displayName: 'Andante',
        artist: 'Pianno',
        imgUrl: 'zweistimmungen'
    },
    {
        name: 'ritterturnier',
        displayName: 'Ritterturnier',
        artist: 'Pianno',
        imgUrl: 'zweistimmungen'
    },
    {
        name: 'dialog',
        displayName: 'Dialog',
        artist: 'Pianno',
        imgUrl: 'zweistimmungen'
    },
    {
        name: 'blackbeard',
        displayName: 'Blackbeard',
        artist: 'Pianno',
        imgUrl: 'zweistimmungen'
    },
    {
        name: 'joke',
        displayName: 'Joke',
        artist: 'Pianno',
        imgUrl: 'zweistimmungen'
    },
    {
        name: 'spielendekatze',
        displayName: 'Spielende Katze',
        artist: 'Pianno',
        imgUrl: 'zweistimmungen'
    },

    {
        name: 'sonnenuntergang',
        displayName: 'Sonnenuntergang',
        artist: 'Pianno',
        imgUrl: 'zweistimmungen'
    },
]

/** control the Play/Pause Button */
function togglePlayMusicButton(){
    isPlayMusic =! isPlayMusic;
    if(isPlayMusic){
        playSong();
        //controlProcess();
    }else {
        pauseSong();
    }
}

function playSong(){
    audioElement.play();
    playElement.classList.remove('fa-play');
    playElement.setAttribute('title', 'Pause')
    playElement.classList.add('fa-pause');
}

function pauseSong(){
    audioElement.pause();
    playElement.classList.add('fa-play');
    playElement.classList.remove('fa-pause');
    playElement.setAttribute('title', 'Play');
}
    
function loadSong(song){
    //console.log(song);
    titleElement.textContent = song.displayName;
    artistElement.textContent = song.artist;
    audioElement.src = `music/${song.name}.mp3`;
    
    imageElement.src = `img/${song.imgUrl}.jpg`;

}

function prevSong(){
    songIndex --;
    if( songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex ++;
    if( songIndex > songs.length -1 ) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function setAudioInitialState()
{   currentAudioTime = 0;
    songIndex = 0;
    const duration = audioElement.duration;
    const durationStr = converteTimestamp(duration);
    durationElement.textContent = durationStr;
    currentItemElement.textContent = '0:00';
    loadSong(songs[songIndex]);
}

function converteTimestamp( duration ){
    var hours = Math.floor( duration / 3600);
    duration = duration -hours * 3600;
    var minutes = Math.floor( duration / 60);
    var seconds = Math.floor(duration - minutes * 60);
    
    return `${hours ? hours + ':' : ''} ${minutes ? minutes + ':' : '0:'}${ seconds > 9 ? seconds : '0' + seconds}`;

    //console.log(durationStr);
}
function upDateCurrentTime(){
    currentAudioTime = audioElement.currentTime;
    var currentTimeStr = converteTimestamp( currentAudioTime)
    currentItemElement.textContent = currentTimeStr;
    let widthPercentage = audioElement.currentTime / audioElement.duration * 100;
    progressElement.style.width = widthPercentage + '%';
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = audioElement;
    audioElement.currentTime = (clickX / width) * duration;
}
setAudioInitialState();

// Event Listener
//Play or Pause Event Listener
playElement.addEventListener('click', togglePlayMusicButton);
audioElement.addEventListener("timeupdate", upDateCurrentTime);
audioElement.addEventListener("ended", nextSong);
progressContainerElement.addEventListener('click', setProgressBar);
prevElement.addEventListener('click', prevSong);
nextElement.addEventListener('click', nextSong);