import React from 'react';

function HackSpacer() {
  return (
    <div>
      <br/><br/><br/><br/><br/><br/>
    </div>
  );
}

function IntervalSelectionBox(props) {
  return (
    <table><tr><td>{props.interval}</td><td>{props.check}</td></tr></table>
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
      <p>
        <div class="button-area-line">
          <button onClick={this.onSelectInterval}
                  id='m2' type="button" class="btn btn-secondary">m2</button>
          <button onClick={this.onSelectInterval}
                  id='M2' type="button" class="btn btn-secondary">M2</button>
          <button onClick={this.onSelectInterval}
                  id='m3' type="button" class="btn btn-secondary">m3</button>
          <button onClick={this.onSelectInterval}
                  id='M3' type="button" class="btn btn-secondary">M3</button><br/>
        </div>
        <div class="button-area-line">
          <button onClick={this.onSelectInterval}
                  id='P4' type="button" class="btn btn-secondary">P4</button>
          <button onClick={this.onSelectInterval}
                  id='tritone' type="button" class="btn btn-secondary">tritone</button>
          <button onClick={this.onSelectInterval}
                  id='P5' type="button" class="btn btn-secondary">P5</button><br/>
        </div>
        <div class="button-area-line">
          <button onClick={this.onSelectInterval}
                  id='m6' type="button" class="btn btn-secondary">m6</button>
          <button onClick={this.onSelectInterval}
                  id='M6' type="button" class="btn btn-secondary">M6</button>
          <button onClick={this.onSelectInterval}
                  id='m7' type="button" class="btn btn-secondary">m7</button>
          <button onClick={this.onSelectInterval}
                  id='M7' type="button" class="btn btn-secondary">M7</button><br/>
        </div>
        <div class="button-area-line">
          <button id='score' onclick='onScore()' type="button" class="btn btn-secondary larger">Score</button>
        </div>
      </p>
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
          <label for='speed'>Speed:</label>
            <select value={this.props.speed} name='speed' id='speed'
                    onChange={this.handleSpeedChange}>
            <option value='6'>Slow(6s)</option>
            <option value='4'>Medium(4s)</option>
            <option value='2'>Fast(2s)</option>
            <option value='1'>Very Fast(1s)</option>
          </select>
        </p>
        <p>
          <label for='length'>Length:</label>
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
                class="btn btn-secondary larger extra-padding new-padding">New </button>
        <br />
        <button id='play'
                onClick={this.handleOnPlay}
                class="btn btn-secondary larger extra-padding">▶️  PLAY</button>
        <button id='stop'
                onClick={this.handleOnStop}
                class="btn btn-secondary larger extra-padding">&#x23f9; STOP</button>
      </div>
    );
  }
}

class ToneRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {speed: 1,
                  length: 2,
                  answers: []};
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleSelectInterval = this.handleSelectInterval.bind(this);
  }

  handleSpeedChange(value) {
    this.setState({speed: value});
  }
  
  handleLengthChange(value) {
    this.setState({length: value});
  }
  
  handleNew() {
  }

  handlePlay() {
  }

  handleStop() {
  }

  handleSelectInterval(value) {
    this.setState({answers: [value]});
  }

  render() {
    const intervalAnswers =
            this.state.answers.map((answer) => 
              <IntervalSelectionBox interval={answer} check="x" />
            );
    return (
      <div>
        <div className="Exercises">
          <div className="App">
            <div class="bg"></div>
            <HackSpacer />
            <ToneRowSettings speed={this.state.speed}
                             onSpeedChange={this.handleSpeedChange}
                             onLengthChange={this.handleLengthChange}/>
            <ToneRowTransport onNew={this.handleNew}
                              onPlay={this.handlePlay}
                              onStop={this.handleStop}/>
            <ToneRowIntervalButtons onSelectInterval={this.handleSelectInterval}/>
            {intervalAnswers}
          </div>
        </div>
      </div>
    );
  }
}


export default ToneRow;
