// import logo from './logo.svg';
import "./App.css";
// fetch redux store var then use a selector on it
import { useSelector } from "react-redux";

function App() {
  const fetchedState = useSelector((state) => state);
  console.log("Fetched state:", fetchedState);

  return (
    <div>
      <h1>Counter App</h1>
      <h2>{fetchedState}</h2>
    </div>
  );
  /*  return (
     <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> 
  );*/
}

export default App;
