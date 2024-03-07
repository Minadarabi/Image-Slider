
import './App.css';
import { SliderImg } from './Components/SliderImg';



function App() {
  const page = 3;
  const limit = 8;
  return (
    <div className="App">
   <SliderImg page={page} limit={limit} />

    </div>
  );
}

export default App;
