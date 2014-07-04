// define variables

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

var synthDelay = audioCtx.createDelay();
var kickDelay = audioCtx.createDelay();
var snareDelay = audioCtx.createDelay();

var destination = audioCtx.destination;

// synthSource.connect(synthDelay);
// kickSource.connect(kickDelay);
// snareSource.connect(snareDelay);

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

var buffers = [];

// use XHR to load audio tracks, and
// decodeAudioData to decode them and stick them in buffers.
// Then we put the buffers into their sources

function getData(track) {
  var request = new XMLHttpRequest();
  request.open('GET', track + '.ogg', true);
  request.responseType = 'arraybuffer';


  request.onload = function() {
    audioCtx.decodeAudioData(request.response, function(buffer) {
        myBuffer = buffer;
        buffers.push(myBuffer);
      },

      function(e){"Error with decoding audio data" + e.err});

  }

  request.send();
}

// get the three data samples

getData('synth');
getData('kick');
getData('snare');

// wire up buttons to stop and play audio.
// Because buffer sources are only a one shot
// playing method, you have to create a new one
// each time you play the sound.

var synthSource;

playSynth.onclick = function() {
  synthSource = audioCtx.createBufferSource();
  synthSource.buffer = buffers[2];
  synthSource.loop = true;
  synthSource.start();
  synthSource.connect(synthDelay);
  synthDelay.connect(destination);
  this.setAttribute('disabled', 'disabled');
}

stopSynth.onclick = function() {
  synthSource.disconnect(synthDelay);
  synthDelay.disconnect(destination);
  synthSource.stop();
  playSynth.removeAttribute('disabled');
}

var kickSource;

playKick.onclick = function() {
  kickSource = audioCtx.createBufferSource();
  kickSource.buffer = buffers[0];
  kickSource.loop = true;
  kickSource.start();
  kickSource.connect(kickDelay);
  kickDelay.connect(destination);
  this.setAttribute('disabled', 'disabled');
}

stopKick.onclick = function() {
  kickSource.disconnect(kickDelay);
  kickDelay.disconnect(destination);
  kickSource.stop();
  playKick.removeAttribute('disabled');
}

var snareSource;

playSnare.onclick = function() {
  snareSource = audioCtx.createBufferSource();
  snareSource.buffer = buffers[1];
  snareSource.loop = true;
  snareSource.start();
  snareSource.connect(snareDelay);
  snareDelay.connect(destination);
  this.setAttribute('disabled', 'disabled');
}

stopSnare.onclick = function() {
  snareSource.disconnect(snareDelay);
  snareDelay.disconnect(destination);
  snareSource.stop();
  playSnare.removeAttribute('disabled');
}

// Control the amount of delay each audio
// track has before it plays each time

rangeSynth.oninput = function() {
  var delay = rangeSynth.value;
  synthDelay.delayTime.value = delay;
}

rangeKick.oninput = function() {
  var delay = rangeKick.value;
  kickDelay.delayTime.value = delay;
}

rangeSnare.oninput = function() {
  var delay = rangeSnare.value;
  snareDelay.delayTime.value = delay;
}