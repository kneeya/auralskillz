import React from 'react';

function HackSpacer() {
  return (
    <div>
      <br/><br/><br/><br/><br/><br/>
    </div>
  );
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
    this.state = {speed: 1, length: 2};
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
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

  render() {
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
          </div>
        </div>
      </div>
    );
  }
}


export default ToneRow;
