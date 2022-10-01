import Game from "./components/Game";
import './index.css';
function App() {
  return (
    <>
      <div className="app">
        <h1 className="header">Taylor Swift Lyrics Guessing Game</h1>
        <div className="main">
          <Game />
        </div>
      </div>
    </>
  );
}

export default App;
