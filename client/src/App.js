import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNav from "./components/AppNav"
import Container from "./components/Container"

function App() {
  return (
    <div className="App container-fluid">
      <AppNav />
      <Container />
    </div>
  );
}

export default App;
