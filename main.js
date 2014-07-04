// define variables

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

var synthDelay = audioCtx.createDelay();
var kickDelay = audioCtx.createDelay();
var snareDelay = audioCtx.createDelay();

var synthSource = audioCtx.createBufferSource();
var kickSource = audioCtx.createBufferSource();
var snareSource = audioCtx.createBufferSource();

synthSource.connect(synthDelay);
kickSource.connect(kickDelay);
snareSource.connect(snareDelay);

synthDelay.connect(audioCtx.destination);
kickDelay.connect(audioCtx.destination);
snareDelay.connect(audioCtx.destination);

// get references to controls

var playSynth = document.querySelector('.play-synth');
var stopSynth = document.querySelector('.stop-synth');
var rangeSynth = document.querySelector('.stop-synth + input');

var playKick = document.querySelector('.play-kick');
var stopKick = document.querySelector('.stop-kick');
var rangeKick = document.querySelector('.stop-kick + input');

var playSnare = document.querySelector('.play-snare');
var stopSnare = document.querySelector('.stop-snare');
var rangeSnare = document.querySelector('.stop-snare + input');

// use XHR to load audio tracks, and
// decodeAudioData to decode them and stick them in buffers.
// Then we put the buffers into their sources

function getData(track,source) {
  request = new XMLHttpRequest();
  request.open('GET', track + '.ogg', true);
  request.responseType = 'arraybuffer';


  request.onload = function() {
    var audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
        myBuffer = buffer;
        source.buffer = myBuffer;
        source.loop = true;
      },

      function(e){"Error with decoding audio data" + e.err});

  }

  request.send();
}

// get the three data samples

getData("synth",synthSource);
//getData("kick",kickSource);
//getData("snare",snareSource);

// wire up buttons to stop and play audio

playSynth.onclick = function() {
  synthSource.start();
  this.setAttribute('disabled', 'disabled');
}

stopSynth.onclick = function() {
  synthSource.stop();
  playSynth.removeAttribute('disabled');
}

// playKick.onclick = function() {
//   kickSource.start(0);
//   this.setAttribute('disabled', 'disabled');
// }

// stopKick.onclick = function() {
//   kickSource.stop(0);
//   playKick.removeAttribute('disabled');
// }

// playSnare.onclick = function() {
//   snareSource.start();
//   this.setAttribute('disabled', 'disabled');
// }

// stopSynth.onclick = function() {
//   snareSource.stop();
//   stopSnare.removeAttribute('disabled');
// }