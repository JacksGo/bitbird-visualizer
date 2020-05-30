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
  height = Math.min(height * 1.25, 100);
  spectrum.style.height = height+"%";
}