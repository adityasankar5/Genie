import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Budget from './pages/Budget';
import Invest from './pages/Invest';
import Chat from './pages/Chat';
import Navigation from './components/Navigation';
import './styles/index.scss';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;