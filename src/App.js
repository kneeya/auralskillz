//import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Home from './pages/Home';
import ToneRow from './pages/ToneRow';
import SeventhChords from './pages/SeventhChords';
import { Route, Switch } from 'react-router-dom';

function App(props) {
  return (
    <div className="App">
      <Header basename={props.basename}/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/ToneRow' component={ToneRow}/>
        <Route path='/SeventhChords' component={SeventhChords}/>
      </Switch>
    </div>
  );
}

export default App;
