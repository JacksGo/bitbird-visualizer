navigator.mediaDevices.getUserMedia({ audio: true }).then(processStream);

let analyser = null;
const data = new Uint8Array(16);

const spectrum = document.getElementById("spectrum");

async function processStream(stream) {
  const context = new AudioContext();
  analyser = context.createAnalyser();
  analyser.fftSize = 32;
  const source = context.createMediaStreamSource(stream);
  source.connect(analyser);
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

function updateCurrentArtist() {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  
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
  }
  document.getElementById("current-artist").textContent = `[data-artist='${artist}'] { color: var(--fill-color) }`;
}

// Sync updates to the system clock.
// setTimeout(function(){ 
  setInterval(updateCurrentArtist, 15000);
// }, (60 - new Date().getSeconds()) * 1000);

updateCurrentArtist();