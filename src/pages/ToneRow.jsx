import React from 'react';
import styled from 'styled-components';
// import './ToneRow.css';

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
    visibility: ${props => props.hidden ?
        "hidden" : "visible"};
  `;
  return (
    <div hidden={props.hidden}>
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
  }
  
  onSelectInterval(e) {
    this.props.onSelectInterval(e.target.id);
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
          <button id='score' onclick='onScore()' type="button" className="btn btn-secondary larger">Score</button>
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
    this.step = 0;
    this.state = {speed: 1,
                  length: 2,
                  answers: [],
                  step: 0,
                  gameState: "stateNew"};

    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleSelectInterval = this.handleSelectInterval.bind(this);
    this.playNote = this.playNote.bind(this);
    
    const MAX_LENGTH = 12;
    let size = MAX_LENGTH;
    let answers = [];
    while(size--) {
      let isHidden = size < this.state.length ? false : true;

      answers[size-1]={answer: '', hidden: isHidden, highlight: false};
    }
    this.state.answers = answers;
  }

  handleSpeedChange(value) {
    this.setState({speed: value});
  }
  
  handleLengthChange(value) {
    const MAX_LENGTH = 12;
    let size = MAX_LENGTH;
    let answers = [];
    while(size--) {
      let isHidden = size < value ? false : true;
      answers[size-1]={answer: '', hidden: isHidden};
    }
    this.setState({answers: answers});
    this.setState({length: value});
  }
  
  handleNew() {
    const MAX_LENGTH = 12;
    let size = MAX_LENGTH;
    let answers = [];
    while(size--) {
      let isHidden = size < this.state.length ? false : true;

      answers[size-1]={answer: '', hidden: isHidden};
    }
    this.setState({answers: answers});
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
        if(i === this.step-1) {
          newAnswer["highlight"] = true;
        } else {
          newAnswer["highlight"] = false;
        }
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
            <ToneRowIntervalButtons onSelectInterval={this.handleSelectInterval}/>
            <Box>
            {this.state.answers.map((answer, index) => 
              (<IntervalSelectionBox key={index}
                                     interval={answer["answer"]}
                                     hidden={answer["hidden"]}
                                     highlight={answer["highlight"]}
                                     check="" />
              ))}
            </Box>
          </div>
        </div>
      </div>
    );
  }
}

export default ToneRow;
