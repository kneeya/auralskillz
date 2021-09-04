import React from 'react';
import styled from 'styled-components';
// import './ToneRow.css';

let crypto = window.crypto || window.msCrypto;

function HackSpacer() {
  return (
    <div>
      <br/><br/><br/><br/><br/><br/>
    </div>
  );
}

function IntervalSelectionBox(props) {
  const Input = styled.input`
    background-color: ${props => props.highlight ?
        "palegreen" : "white"};
  `;
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <Input highlight={props.highlight} readOnly value={props.interval} />
            </td>
            <td>
              {props.check}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

class ToneRowIntervalButtons extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectInterval = this.onSelectInterval.bind(this);
    this.onScore = this.onScore.bind(this);
  }
  
  onSelectInterval(e) {
    this.props.onSelectInterval(e.target.id);
  }

  onScore() {
    this.props.onScore();
  }

  render() {
    return (
      <div>
        <div className="button-area-line">
          <button onClick={this.onSelectInterval}
                  id='m2' type="button" className="btn btn-secondary">m2</button>
          <button onClick={this.onSelectInterval}
                  id='M2' type="button" className="btn btn-secondary">M2</button>
          <button onClick={this.onSelectInterval}
                  id='m3' type="button" className="btn btn-secondary">m3</button>
          <button onClick={this.onSelectInterval}
                  id='M3' type="button" className="btn btn-secondary">M3</button><br/>
        </div>
        <div className="button-area-line">
          <button onClick={this.onSelectInterval}
                  id='P4' type="button" className="btn btn-secondary">P4</button>
          <button onClick={this.onSelectInterval}
                  id='tritone' type="button" className="btn btn-secondary">tritone</button>
          <button onClick={this.onSelectInterval}
                  id='P5' type="button" className="btn btn-secondary">P5</button><br/>
        </div>
        <div className="button-area-line">
          <button onClick={this.onSelectInterval}
                  id='m6' type="button" className="btn btn-secondary">m6</button>
          <button onClick={this.onSelectInterval}
                  id='M6' type="button" className="btn btn-secondary">M6</button>
          <button onClick={this.onSelectInterval}
                  id='m7' type="button" className="btn btn-secondary">m7</button>
          <button onClick={this.onSelectInterval}
                  id='M7' type="button" className="btn btn-secondary">M7</button><br/>
        </div>
        <div className="button-area-line">
          <button id='score' onClick={this.onScore} type="button" className="btn btn-secondary larger">Score</button>
        </div>
      </div>
    );
  }
}

class ToneRowSettings extends React.Component {
  constructor(props) {
    super(props);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleLengthChange = this.handleLengthChange.bind(this);
  }

  handleSpeedChange(e) {
    this.props.onSpeedChange(e.target.value);
  }

  handleLengthChange(e) {
    this.props.onLengthChange(e.target.value);
  }

  render() {
    return (
      <div>
        <p>
          <label htmlFor='speed'>Speed:</label>
            <select value={this.props.speed} name='speed' id='speed'
                    onChange={this.handleSpeedChange}>
            <option value='6'>Slow(6s)</option>
            <option value='4'>Medium(4s)</option>
            <option value='2'>Fast(2s)</option>
            <option value='1'>Very Fast(1s)</option>
          </select>
        </p>
        <p>
          <label htmlFor='length'>Length:</label>
          <select value={this.props.length} name='length' id='length' onChange={this.handleLengthChange}>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
            <option value='11'>11</option>
            <option value='12'>12</option>
          </select>
        </p>
      </div>
    );
  }
}

class ToneRowTransport extends React.Component {
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
        <button id='play'
                onClick={this.handleOnPlay}
                className="btn btn-secondary larger extra-padding">▶️  PLAY</button>
        <button id='stop'
                onClick={this.handleOnStop}
                className="btn btn-secondary larger extra-padding">&#x23f9; STOP</button>
      </div>
    );
  }
}

class ToneRow extends React.Component {
  constructor(props) {
    super(props);
    
    this.MIN_MIDI_NOTE = 43; // G2
    this.MAX_MIDI_NOTE = 84; // C6
    this.CHECK = '\u2705';
    this.XMARK = '\u274c';
    this.MAX_LENGTH = 12;

    let initialSequence = this.generateSequence(2, this.MIN_MIDI_NOTE, this.MAX_MIDI_NOTE);
    this.step = 0;
    this.state = {speed: 1,
                  length: 2,
                  answers: [],
                  answer_results: [],
                  sequence: initialSequence,
                  step: 0,
                  gameState: "stateNew"};

    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleSelectInterval = this.handleSelectInterval.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.playNote = this.playNote.bind(this);
    
    let size = this.state.length;
    let answers = [];
    while(size--) {
      answers[size-1]={answer: ''};
    }
    this.state.answers = answers;
  }

  handleScore() {
    let intervalMap = {'m2': 1,
               'M2': 2,
               'm3': 3,
               'M3': 4,
               'P4': 5,
               'tritone': 6,
               'P5': 7,
               'm6': 8,
               'M6': 9,
               'm7': 10,
               'M7': 11 };
    let length = this.state.length;
    let sequence = this.state.sequence;
    let answers = this.state.answers;
    let answerResults = [];
    for(let i = 1; i < length; ++i) {
      let correctInterval = Math.abs(sequence[i]-sequence[i-1]);
      let selectedInterval = intervalMap[answers[i-1].answer];
      if(correctInterval === selectedInterval) {
        answerResults[i-1] = this.CHECK;
      } else {
        answerResults[i-1] = this.XMARK;
      }
    }
    this.setState({answerResults: answerResults});
  }

  handleSpeedChange(value) {
    this.setState({speed: value});
  }
  
  handleLengthChange(value) {
    this.step = -1;
    let size = value;
    let answers = [];
    while(size--) {
      answers[size-1]={answer: ''};
    }
    this.setState({answers: answers});
    this.setState({length: value});
    let sequence = this.generateSequence(value, this.MIN_MIDI_NOTE, this.MAX_MIDI_NOTE);
    this.setState({sequence: sequence});
    this.setState({answerResults: []});
  }
  
  handleNew() {
    this.step = -1;
    let size = this.state.length;
    let answers = [];
    while(size--) {
      answers[size-1]={answer: ''};
    }
    this.setState({answers: answers});
    let sequence = this.generateSequence(this.state.length, this.MIN_MIDI_NOTE, this.MAX_MIDI_NOTE);
    this.setState({sequence: sequence});
    this.setState({answerResults: []});
  }

  handlePlay() {
    // delay half a sec before playing the first step
    this.step = -1;
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.playNote, 500);
  }

  playNote() {
    this.step += 1;
    if( this.step < this.state.length ) {
      this.timerId = setTimeout(this.playNote, this.state.speed * 1000);
    } else {
      this.step--;
    }
    if( this.step > 0 && this.step < this.state.length ) {
      let answers = [...this.state.answers];
      const newAnswers = answers.map((answer, i) => {
        let newAnswer = {...answer};
        return newAnswer;
      })
      this.setState({answers: newAnswers});
    }
  }

  handleStop() {
    clearTimeout(this.timerId);
  }

  handleSelectInterval(value) {
    if(this.step > 0) {
      let answers = [...this.state.answers];
      let answer = {...answers[this.step-1]};
      answer["answer"] = value;
      answers[this.step-1] = answer;
      this.setState({answers: answers});
    }
  }

  generateSequence(length, min, max) {
    let start = this.getRandomInt(min, max-12); // don't blow over the top note
    let toneRow = [start];
    for (let i = 1; i < 12; ++i)
      toneRow.push(++start);
    toneRow = this.shuffle(toneRow);
    toneRow = this.expand(toneRow);
    return toneRow.slice(0,length);
  }

  getRandomInt(min, max) {
    let byteArray = new Uint8Array(1);
    crypto.getRandomValues(byteArray);

    let range = max - min + 1;
    const MAX_RANGE = 256;
    if (byteArray[0] >= Math.floor(MAX_RANGE / range) * range)
      return this.getRandomInt(min,max);
    return min + (byteArray[0] % range);
  }

  shuffle(sequence) {
    let byteArray = new Uint8Array(12);
    crypto.getRandomValues(byteArray);
    let randoms = [];
    for (let i = 0; i < byteArray.length; ++i)
      randoms.push(byteArray[i] / 256);
    for (let i = sequence.length - 1; i > 0; i--) {
      var j = Math.floor(randoms[i] * (i + 1));
      var temp = sequence[i];
      sequence[i] = sequence[j];
      sequence[j] = temp;
    }
    return sequence;
  }

  expand(sequence) {
    let byteArray = new Uint8Array(12);
    crypto.getRandomValues(byteArray);
    for (let i = 0; i < sequence.length; ++i) {
      if (i === 0) continue;
      if (sequence[i] < sequence[i-1]) {
        // note is lower, make sure interval hasn't expanded beyond an octave
        while (sequence[i-1] - sequence[i] > 12) {
          //oops, its greater than an octave, so add an octave
          sequence[i] = sequence[i] + 12;
          //and continue...
        }
        if (byteArray[i]&1) {
          // expand interval
          if (sequence[i] < sequence[i-1]) {
            // note is lower, add an octave if possible
            if (sequence[i] + 12 <= this.MAX_MIDI_NOTE) {
              sequence[i] = sequence[i] + 12;
            }
          }
        }
      } else {
        // note is higher, make sure interval hasn't expanded beyond an octave
        while (sequence[i] - sequence[i-1] > 12) {
          //oops, its greater than an octave, so subtract an octave
          sequence[i] = sequence[i] - 12;
          //and continue...
        }
        if (byteArray[i]&1) {
          // expand interval
          // note is higher, subtract an octave if possible
          if (sequence[i] - 12 >= this.MIN_MIDI_NOTE) {
            sequence[i] = sequence[i] - 12;
          }
        }   
      }
    }
    return sequence;
  }


  render() {
    const Box = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fill,minmax(200px, 1fr));
    `;
    
    return (
      <div>
        <div className="Exercises">
          <div className="App">
            <div className="bg"></div>
            <HackSpacer />
            <ToneRowSettings speed={this.state.speed}
                             onSpeedChange={this.handleSpeedChange}
                             onLengthChange={this.handleLengthChange}/>
            <ToneRowTransport onNew={this.handleNew}
                              onPlay={this.handlePlay}
                              onStop={this.handleStop}/>
            <ToneRowIntervalButtons onSelectInterval={this.handleSelectInterval}
                                    onScore={this.handleScore}/>
            <Box>
            {this.state.answers.map((answer, index) => 
              (<IntervalSelectionBox key={index}
                                     interval={answer["answer"]}
                                     highlight={index === this.step-1}
                                     check={this.state.answerResults &&
                                            this.state.answerResults[index] ?
                                       this.state.answerResults[index] : '' } />
              ))}
            </Box>
          </div>
        </div>
      </div>
    );
  }
}

export default ToneRow;
