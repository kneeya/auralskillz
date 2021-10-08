import React from 'react';
import styled from 'styled-components';
import Piano from '../components/Piano';
import './Pages.css';
import * as util from '../components/util';

let crypto = window.crypto || window.msCrypto;

const CIX = {RootMM : 0,
             RootMm : 1,
             Rootmm : 2,
             Rootdm : 3,
             Rootdd : 4,
             FirstMm : 5,
             Firstmm : 6,
             Firstdm : 7,
             SecondMm : 8,
             Secondmm : 9,
             ThirdMm : 10,
             Thirdmm : 11};

function Checkbox(props) {
  return (
    <label>
      <input
        name={props.name}
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange} />
      {props.label}
    </label>
  );
}

class Configuration extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    let configChange = {checked: e.target.checked, name: e.target.name};
    this.props.handleChange(configChange);
  }

  render() {
    let cs = this.props.chordSelections;
    return (
      <details>
        <summary>Settings</summary>
        <p>Root Position: 
          <Checkbox checked = {cs[CIX.RootMM] === true}
                    name="RootMM"
                    onChange = {this.handleChange}
                    label = "MM7" />
          <Checkbox checked = {cs[CIX.RootMm] === true}
                    name="RootMm"
                    onChange = {this.handleChange}
                    label = "Mm7" />
          <Checkbox checked = {cs[CIX.Rootmm] === true}
                    name="Rootmm"
                    onChange = {this.handleChange}
                    label = "mm7" />
          <Checkbox checked = {cs[CIX.Rootdm] === true}
                    name="Rootdm"
                    onChange = {this.handleChange}
                    label = "dm7" />
          <Checkbox checked = {cs[CIX.Rootdd] === true}
                    name="Rootdd"
                    onChange = {this.handleChange}
                    label = "dd7" />
        </p>
        <p>1st Inverstion: 
          <Checkbox checked = {cs[CIX.FirstMm] === true}
                    name="FirstMm"
                    onChange = {this.handleChange}
                    label = "Mm7" />
          <Checkbox checked = {cs[CIX.Firstmm] === true}
                    name="Firstmm"
                    onChange = {this.handleChange}
                    label = "mm7" />
          <Checkbox checked = {cs[CIX.Firstdm] === true}
                    name="Firstdm"
                    onChange = {this.handleChange}
                    label = "dm7" />
        </p>
        <p>2nd Inversion: 
          <Checkbox checked = {cs[CIX.SecondMm] === true}
                    name="SecondMm"
                    onChange = {this.handleChange}
                    label = "Mm7" />
          <Checkbox checked = {cs[CIX.Secondmm] === true}
                    name="Secondmm"
                    onChange = {this.handleChange}
                    label = "mm7" />
        </p>
        <p>3rd Inversion: 
          <Checkbox checked = {cs[CIX.ThirdMm] === true}
                    name="ThirdMm"
                    onChange = {this.handleChange}
                    label = "Mm7" />
          <Checkbox checked = {cs[CIX.Thirdmm] === true}
                    name="Thirdmm"
                    onChange = {this.handleChange}
                    label = "mm7" />
        </p>
      </details>
    );
  }
}

class SeventhChordsTransport extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnNew = this.handleOnNew.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);
    this.handleOnStop = this.handleOnStop.bind(this);
  }

  handleOnNew() {
    this.props.onNew();
  }

  handleOnPlay() {
    this.props.onPlay();
  }

  handleOnStop() {
    this.props.onStop();
  }

  render() {
    return (
      <div>
        <button id='new'
                onClick={this.handleOnNew}
                className="btn btn-secondary larger extra-padding new-padding">New </button>
        <br />
        <div className="container">
        <button id='play'
                onClick={this.handleOnPlay}
                className="btn btn-secondary larger extra-padding controls">▶️  PLAY</button>
        <button id='stop'
                onClick={this.handleOnStop}
                className="btn btn-secondary larger extra-padding controls">&#x23f9; STOP</button>
                </div>
      </div>
    );
  }
}

class SeventhChordButtons extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectChord = this.onSelectChord.bind(this);
    this.onScore = this.onScore.bind(this);
  }
  
  onSelectChord(e) {
    this.props.onSelectChord(e.target.id);
  }

  onScore() {
    this.props.onScore();
  }

  render() {
    return (
      <div>
        <div className="button-area-line">
          {this.props.chordSelections[CIX.RootMM] === true &&
            <button onClick={this.onSelectChord}
                    id='RootMM' type="button" className="btn btn-secondary">MM7</button>
          }
          {this.props.chordSelections[CIX.RootMm] === true &&
            <button onClick={this.onSelectChord}
                    id='RootMm' type="button" className="btn btn-secondary">Mm7</button>
          }
          {this.props.chordSelections[CIX.Rootmm] === true &&
            <button onClick={this.onSelectChord}
                    id='Rootmm' type="button" className="btn btn-secondary">mm7</button>
          }
          {this.props.chordSelections[CIX.Rootdm] === true &&
            <button onClick={this.onSelectChord}
                    id='Rootdm' type="button" className="btn btn-secondary">dm7</button>
          }<br/>
          {this.props.chordSelections[CIX.Rootdd] === true &&
            <button onClick={this.onSelectChord}
                    id='Rootdd' type="button" className="btn btn-secondary">dd7</button>
          }<br/>
        </div>
        <div className="button-area-line">
          {this.props.chordSelections[CIX.FirstMm] === true &&
            <button onClick={this.onSelectChord}
                    id='FirstMm' type="button" className="btn btn-secondary">Mm65</button>
          }
          {this.props.chordSelections[CIX.Firstmm] === true &&
            <button onClick={this.onSelectChord}
                    id='Firstmm' type="button" className="btn btn-secondary">mm65</button>
          }
          {this.props.chordSelections[CIX.Firstdm] === true &&
            <button onClick={this.onSelectChord}
                    id='Firstdm' type="button" className="btn btn-secondary">dm65</button>
          }<br/>
        </div>
        <div className="button-area-line">
          {this.props.chordSelections[CIX.SecondMm] === true &&
            <button onClick={this.onSelectChord}
                    id='SecondMm' type="button" className="btn btn-secondary">Mm43</button>
          }
          {this.props.chordSelections[CIX.Secondmm] === true &&
            <button onClick={this.onSelectChord}
                    id='Secondmm' type="button" className="btn btn-secondary">mm43</button>
          }
        </div>
        <div className="button-area-line">
          {this.props.chordSelections[CIX.ThirdMm] === true &&
            <button onClick={this.onSelectChord}
                    id='ThirdMm' type="button" className="btn btn-secondary">Mm42</button>
          }
          {this.props.chordSelections[CIX.Thirdmm] === true &&
            <button onClick={this.onSelectChord}
                    id='Thirdmm' type="button" className="btn btn-secondary">mm42</button>
          }
        </div>
        <div className="button-area-line">
          <button id='score' onClick={this.onScore} type="button" className="btn btn-secondary larger">Score</button>
        </div>
      </div>
    );
  }
}

class SeventhChords extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {chordSelections: [true, true, false, false, false, // Root MM, Mm, mm, dm, dd
                                    false, false, false, // First Inversion Mm, mm, dm
                                    false, false, // Second Inversion Mm, mm
                                    false, false], // Third Inversion Mm, mm
                  loadingSamples: false
                 };
    this.defaultMessage = 'TODO make me invisible.';
    this.MIN_MIDI_NOTE = 43; // G2
    this.MAX_MIDI_NOTE = 84; // C6
    this.formulae = [[0, 4, 7, 11], //RootMM
                     [0, 4, 7, 10], //RootMm
                     [0, 3, 7, 10], //Rootmm
                     [0, 3, 6, 10], //Rootdm
                     [0, 3, 6, 9], //Rootdd
                     [0, 3, 6, 8], //FirstMm
                     [0, 4, 7, 9], //Firstmm
                     [0, 3, 7, 9], //Firstdm
                     [0, 3, 5, 9], //SecondMm
                     [0, 3, 5, 8], //Secondmm
                     [0, 2, 6, 9], //thirdMm
                     [0, 2, 5, 9]]; //Thirdmm
    this.currentChord = this.getRandomChordSelection(this.state.chordSelections);
    this.chord = this.generateChord(this.MIN_MIDI_NOTE,
                                    this.MAX_MIDI_NOTE,
                                    this.formulae[this.currentChord]);
    

    this.handleNew = this.handleNew.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleSelectChord = this.handleSelectChord.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.handleConfigChange = this.handleConfigChange.bind(this);
    this.startPlayAfterSoundsLoaded = this.startPlayAfterSoundsLoaded.bind(this);
    this.playNotes = this.playNotes.bind(this);
    this.onSampleLoaded = this.onSampleLoaded.bind(this);

  }

  getRandomChordSelection(selections) {
    let selection = util.getRandomInt(0,selections.length-1);
    while (this.state.chordSelections[selection] === false) {
      selection = util.getRandomInt(0,selections.length-1);
    }
    console.log('Selection: ' + selection);
    return selection;
  }

  handleConfigChange(value) {
    let chordSelections = this.state.chordSelections;
    chordSelections[CIX[value.name]] = value.checked;
    this.setState({chordSelections: chordSelections});

  }

  handleNew() {
    this.currentChord = this.getRandomChordSelection(this.state.chordSelections);
    this.chord = this.generateChord(this.MIN_MIDI_NOTE,
                                    this.MAX_MIDI_NOTE,
                                    this.formulae[this.currentChord]);
  }

  handlePlay() {
    Piano.audioContext.resume().then(() => {
      this.samplesToLoad = 4;
      this.setState({statusMessage: "Loading"});
      Piano.loadSounds(this.chord, this.onSampleLoaded);
    })
  }

  onSampleLoaded() {
    if( this.samplesToLoad > 0 ) {
      this.samplesToLoad--;
      let message = "Loading";
      for(let i = 0; i < (this.state.length - this.samplesToLoad); ++i) {
        message = message +  ".";
      }
      this.setState({statusMessage: message});
    }
    if( this.samplesToLoad === 0 ) {
      this.setState({loadingSamples: false});
      this.startPlayAfterSoundsLoaded();
    }
  }

  startPlayAfterSoundsLoaded() {
    this.setState({statusMessage: this.defaultMessage});
    // delay half a sec before playing the first step
    clearTimeout(this.timerId);
    let delay = 500;
    this.timerId = setTimeout(this.playNotes, delay);
  }

  playNotes() {
      Piano.playNotes(this.chord, 2);
  }

  handleStop() {
    Piano.stop();
  }

  handleSelectChord(value) {
  }

  handleScore() {
  }

  generateChord(minNote, maxNote, formula) {
    let start = util.getRandomInt(minNote, maxNote-formula[3]); // don't blow over the top note
    let chord  = [start, start+formula[1], start+formula[2], start+formula[3]];
    console.log(chord);
    return chord;
  }

  render() {
    return (
      <div>
        <div className="Exercises">
          <div className="center App">
            <div className="bg"></div>
            <Configuration chordSelections={this.state.chordSelections}
                           handleChange = {this.handleConfigChange}/>
            <SeventhChordsTransport onNew={this.handleNew}
                              onPlay={this.handlePlay}
                              onStop={this.handleStop}/>
            <SeventhChordButtons onSelectChord={this.handleSelectChord}
                                 onScore={this.handleScore}
                                 chordSelections={this.state.chordSelections}/>
          </div>
        </div>
      </div>
    );
  }
}

export default SeventhChords;
