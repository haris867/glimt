import "./App.css";
import OrientationLock from "./components/orientationLock";
import Page from "./components/page";
import "./scss/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App w-100 h-100">
      <OrientationLock />
      <Page />
    </div>
  );
}

export default App;
