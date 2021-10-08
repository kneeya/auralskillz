import {basename} from '../index';

let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let pianoSounds = [];
let pianoFiles =
[
  {loaded: false, url: ''}, // MIDI 0
  {loaded: false, url: ''}, // MIDI 1
  {loaded: false, url: ''}, // MIDI 2
  {loaded: false, url: ''}, // MIDI 3
  {loaded: false, url: ''}, // MIDI 4
  {loaded: false, url: ''}, // MIDI 5
  {loaded: false, url: ''}, // MIDI 6
  {loaded: false, url: ''}, // MIDI 7
  {loaded: false, url: ''}, // MIDI 8
  {loaded: false, url: ''}, // MIDI 9
  {loaded: false, url: ''}, // MIDI 10
  {loaded: false, url: ''}, // MIDI 11
  {loaded: false, url: ''}, // MIDI 12
  {loaded: false, url: ''}, // MIDI 13
  {loaded: false, url: ''}, // MIDI 14
  {loaded: false, url: ''}, // MIDI 15
  {loaded: false, url: ''}, // MIDI 16
  {loaded: false, url: ''}, // MIDI 17
  {loaded: false, url: ''}, // MIDI 18
  {loaded: false, url: ''}, // MIDI 19
  {loaded: false, url: ''}, // MIDI 20
  {loaded: false, url: ''}, // MIDI 21
  {loaded: false, url: ''}, // MIDI 22
  {loaded: false, url: ''}, // MIDI 23
  {loaded: false, url: ''}, // MIDI 24
  {loaded: false, url: ''}, // MIDI 25
  {loaded: false, url: ''}, // MIDI 26
  {loaded: false, url: ''}, // MIDI 27
  {loaded: false, url: ''}, // MIDI 28
  {loaded: false, url: ''}, // MIDI 29
  {loaded: false, url: ''}, // MIDI 30
  {loaded: false, url: ''}, // MIDI 31
  {loaded: false, url: ''}, // MIDI 32
  {loaded: false, url: ''}, // MIDI 33
  {loaded: false, url: ''}, // MIDI 34
  {loaded: false, url: ''}, // MIDI 35
  {loaded: false, url: ''}, // MIDI 36
  {loaded: false, url: ''}, // MIDI 37
  {loaded: false, url: ''}, // MIDI 38
  {loaded: false, url: ''}, // MIDI 39
  {loaded: false, url: ''}, // MIDI 40
  {loaded: false, url: ''}, // MIDI 41
  {loaded: false, url: ''}, // MIDI 42
  {loaded: false, url: '/piano/Piano.mf.G2_1.wav'}, // MIDI 43
  {loaded: false, url: '/piano/Piano.mf.Ab2_1.wav'},// MIDI 44
  {loaded: false, url: '/piano/Piano.mf.A2_1.wav'}, // MIDI 45
  {loaded: false, url: '/piano/Piano.mf.Bb2_1.wav'},// MIDI 46
  {loaded: false, url: '/piano/Piano.mf.B2_1.wav'}, // MIDI 47
  {loaded: false, url: '/piano/Piano.mf.C3_1.wav'}, // MIDI 48
  {loaded: false, url: '/piano/Piano.mf.Db3_1.wav'},// MIDI 49
  {loaded: false, url: '/piano/Piano.mf.D3_1.wav'}, // MIDI 50
  {loaded: false, url: '/piano/Piano.mf.Eb3_1.wav'},// MIDI 51
  {loaded: false, url: '/piano/Piano.mf.E3_1.wav'}, // MIDI 52
  {loaded: false, url: '/piano/Piano.mf.F3_1.wav'}, // MIDI 53
  {loaded: false, url: '/piano/Piano.mf.Gb3_1.wav'},// MIDI 54
  {loaded: false, url: '/piano/Piano.mf.G3_1.wav'}, // MIDI 55
  {loaded: false, url: '/piano/Piano.mf.Ab3_1.wav'},// MIDI 56
  {loaded: false, url: '/piano/Piano.mf.A3_1.wav'}, // MIDI 57
  {loaded: false, url: '/piano/Piano.mf.Bb3_1.wav'},// MIDI 58
  {loaded: false, url: '/piano/Piano.mf.B3_1.wav'}, // MIDI 59
  {loaded: false, url: '/piano/Piano.mf.C4_1.wav'}, // MIDI 60
  {loaded: false, url: '/piano/Piano.mf.Db4_1.wav'},// MIDI 61
  {loaded: false, url: '/piano/Piano.mf.D4_1.wav'}, // MIDI 62
  {loaded: false, url: '/piano/Piano.mf.Eb4_1.wav'},// MIDI 63
  {loaded: false, url: '/piano/Piano.mf.E4_1.wav'}, // MIDI 64
  {loaded: false, url: '/piano/Piano.mf.F4_1.wav'}, // MIDI 65
  {loaded: false, url: '/piano/Piano.mf.Gb4_1.wav'},// MIDI 66
  {loaded: false, url: '/piano/Piano.mf.G4_1.wav'}, // MIDI 67
  {loaded: false, url: '/piano/Piano.mf.Ab4_1.wav'},// MIDI 68
  {loaded: false, url: '/piano/Piano.mf.A4_1.wav'}, // MIDI 69
  {loaded: false, url: '/piano/Piano.mf.Bb4_1.wav'},// MIDI 70
  {loaded: false, url: '/piano/Piano.mf.B4_1.wav'}, // MIDI 71
  {loaded: false, url: '/piano/Piano.mf.C5_1.wav'}, // MIDI 72
  {loaded: false, url: '/piano/Piano.mf.Db5_1.wav'},// MIDI 73
  {loaded: false, url: '/piano/Piano.mf.D5_1.wav'}, // MIDI 74
  {loaded: false, url: '/piano/Piano.mf.Eb5_1.wav'},// MIDI 75
  {loaded: false, url: '/piano/Piano.mf.E5_1.wav'}, // MIDI 76
  {loaded: false, url: '/piano/Piano.mf.F5_1.wav'}, // MIDI 77
  {loaded: false, url: '/piano/Piano.mf.Gb5_1.wav'},// MIDI 78
  {loaded: false, url: '/piano/Piano.mf.G5_1.wav'}, // MIDI 79
  {loaded: false, url: '/piano/Piano.mf.Ab5_1.wav'},// MIDI 80
  {loaded: false, url: '/piano/Piano.mf.A5_1.wav'}, // MIDI 81
  {loaded: false, url: '/piano/Piano.mf.Bb5_1.wav'},// MIDI 82
  {loaded: false, url: '/piano/Piano.mf.B5_1.wav'}, // MIDI 83
  {loaded: false, url: '/piano/Piano.mf.C6_1.wav'}  // MIDI 84
];

let onSourceEnded = (e) => {
  //console.log(acSources);
  acSources.splice(acSources.indexOf(e.srcElement), 1);
  //console.log(acSources);
};

let acSources = [];

class Piano {

  static audioContext = audioContext;

  static stop() {
    for (let i = 0; i < acSources.length; ++i) {
      if(acSources[i]) acSources[i].stop();
    }
  }

  static playNotes(notes, speed) {
    for(let i = 0; i < notes.length; ++i) {
      let gainNode = audioContext.createGain();
      //acGains.push(gainNode);
      let currentTime = audioContext.currentTime;
      let noteOffTime = Number(currentTime) + Number(speed);
      let decayOffTime = Number(noteOffTime) + .03;
      //console.log(decayOffTime);
      gainNode.gain.setValueAtTime(1, currentTime);
      gainNode.gain.setValueAtTime(1, noteOffTime);
      gainNode.gain.linearRampToValueAtTime(0, decayOffTime);
      let source = audioContext.createBufferSource();
      let note = notes[i];
      source.buffer = pianoSounds[note];
      source.connect(gainNode);
      //source.connect(audioContext.destination);
      gainNode.connect(audioContext.destination);
      acSources.push(source);
      source.onended = onSourceEnded;
      source.start();
      //console.log('I played a sound');
    }
  }

  static loadSounds(notes, progressCallback) {
    let notesToLoad = [];
    for (let i = 0; i < notes.length; ++i) {
      if (pianoFiles[notes[i]].loaded === false) {
        notesToLoad.push(notes[i]);
      }
    }
     notesToLoad = notes;

    for (let i = 0; i < notesToLoad.length; ++i) {
      let note = notesToLoad[i];
      if (pianoFiles[note].loaded === true) {
        progressCallback();
      } else {
        let url = basename + pianoFiles[note].url;
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";
        request.onload = function() {
          audioContext.decodeAudioData(
            request.response,
            function(buffer) {
              pianoSounds[note] = buffer;
              pianoFiles[note].loaded = true;
              //console.log('sound decoded');
              progressCallback();
            },
            function(error) {
              console.error('error decoding audio data', error);
            }
          );
        }
        request.onerror = function() {
          console.error('error when retrieving piano sample');
        }
        request.send();
      }
    }
  }
}

export default Piano

