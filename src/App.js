import './App.css';
import MultiSlider from './components/multi-slider/MultiSlider';
import dataJSON from './data/data.json';

function App() {
  return (
    <div className="row">
      <MultiSlider data={dataJSON} />
    </div>
  );
}

export default App;
