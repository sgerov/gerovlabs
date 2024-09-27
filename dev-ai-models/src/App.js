import './App.css';
import ImageUploadPage from './LOTRRaces';
import Models from './Models';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router basename="/ai-models">
      <Routes>
        <Route path="/" element={<Models />} />
        <Route path="/lotr-races" element={<ImageUploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
