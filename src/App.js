import './App.css';
import StartPage from './components/StartPage';
import WelcomePage from './components/WelcomePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <StartPage />
          </Route>
          <Route exact path="/home">
            <WelcomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
