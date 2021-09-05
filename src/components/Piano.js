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
  {loaded: false, url: '/piano/Piano.mf.Ab2_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.A2_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Bb2_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.B2_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.C3_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Db3_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.D3_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Eb3_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.E3_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.F3_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Gb3_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.G3_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Ab3_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.A3_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Bb3_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.B3_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.C4_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Db4_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.D4_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Eb4_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.E4_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.F4_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Gb4_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.G4_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Ab4_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.A4_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Bb4_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.B4_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.C5_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Db5_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.D5_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Eb5_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.E5_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.F5_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Gb5_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.G5_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Ab5_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.A5_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.Bb5_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.B5_1.wav'},
  {loaded: false, url: '/piano/Piano.mf.C6_1.wav'}
];

class Piano {

  static audioContext = audioContext;
  static playNotes(notes, speed) {
    for(let i = 0; i < notes.length; ++i) {
      let gainNode = audioContext.createGain();
      //acGains.push(gainNode);
      let currentTime = audioContext.currentTime;
      gainNode.gain.setValueAtTime(1, currentTime);
      gainNode.gain.setValueAtTime(1, currentTime + speed );
      gainNode.gain.linearRampToValueAtTime(0, currentTime + speed + .03);
      let source = audioContext.createBufferSource();
      //acSources.push(source);
      let note = notes[i];
      source.buffer = pianoSounds[note];
      source.connect(gainNode);
      //source.connect(audioContext.destination);
      gainNode.connect(audioContext.destination);
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
        let url = pianoFiles[note].url;
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

