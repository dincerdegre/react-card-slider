import "./App.css";
import MultiSlider from "./components/multi-slider/MultiSlider";
import dataJSON from "./data/data.json";

function App() {
  return (
    <div className="row">
      <div className="top">
        <h2>Card Slider</h2>
      </div>
      <div className="subHeading">One by One Slider</div>
      <MultiSlider data={dataJSON} />
      <div className="subHeading">Group Slider</div>
      <MultiSlider data={dataJSON} group={1} />
    </div>
  );
}

export default App;
