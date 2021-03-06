navigator.mediaDevices.getUserMedia({ audio: true }).then(processStream);

let analyser = null;
let override = false;
const data = new Uint8Array(16);

const spectrum = document.getElementById("spectrum");

async function processStream(stream) {
  const context = new AudioContext();
  analyser = context.createAnalyser();
  analyser.fftSize = 32;
  const source = context.createMediaStreamSource(stream);
  source.connect(analyser);
  document.body.classList.remove("hide");
  checkHideHelp();
  requestAnimationFrame(draw);
}

function draw() {
  let frame = requestAnimationFrame(draw);
  analyser.getByteFrequencyData(data);
  let average = 0;
  for (i of data) {
    average += i;
  }
  average /= data.length;
  let height = (average/255)*100;
  height = Math.min(height * 1.6, 93);
  spectrum.style.height = height+"%";
}

let date = correctDateOffset(new Date());

if (date.getUTCMonth() === 4 && date.getUTCDate() === 30 && date.getUTCFullYear() === 2020) {
  document.getElementById("schedule").classList.remove("hide");
}

function updateCurrentArtist() {
  let date = correctDateOffset(new Date());
  let hour = date.getUTCHours();
  let minute = date.getUTCMinutes();
  
  let artist = -1;
  
  if (hour === 12) {
    if (minute < 30) {
      artist = 0;
    } else {
      artist = 1;
    }
  } else if (hour === 13) {
    if (minute < 30) {
      artist = 2;
    } else {
      artist = 3;
    }
  } else if (hour === 14) {
    if (minute < 15) {
      artist = 3;
    } else {
      artist = 4;
    }
  } else if (hour === 15) {
    if (minute < 45) {
      artist = 5;
    } else {
      artist = 6;
    }
  } else if (hour === 16) {
    if (minute < 30) {
      artist = 6;
    } else {
      artist = 7;
    }
  } else {
    artist = -1;
  }
  document.getElementById("current-artist").textContent = `[data-artist='${artist}'] { color: var(--fill-color) }`;
}

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  let trapped = false;
  if (event.key === 'e' || event.key === '1') {
    updateCurrentArtist();
    document.body.classList.toggle("hide");
    trapped = true;
  }
  if (event.key === 's' || event.key === '2') {
    document.getElementById("schedule").classList.toggle("hide");
    trapped = true;
  }
  if (event.key === 'q' || event.key === '3') {
    let elem = document.getElementById("help");
    trapped = true;
    elem.classList.toggle("hide");
    localStorage.setItem('hide_help', elem.classList.contains("hide"));
  }
  if (trapped) {
    event.preventDefault();
  }
});

// Check local storage to see if the user had the help page hidden last.
function checkHideHelp() {
  let data = localStorage.getItem("hide_help");
  if (data === null || data === 'false') {
    document.getElementById("help").classList.remove("hide");
  }
}

// Convert any date .
function correctDateOffset(date) {
  let d = date;
  d.setMinutes(d.getMinutes() + (d.getTimezoneOffset() * -1));
  return d;
}

// Sync updates to the system clock.
// setTimeout(function(){ 
  setInterval(updateCurrentArtist, 15000);
// }, (60 - new Date().getSeconds()) * 1000);

updateCurrentArtist();