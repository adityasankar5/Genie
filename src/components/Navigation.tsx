import { Link, useLocation } from 'react-router-dom';
import '../styles/navigation.scss';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="nav__container">
        <Link 
          to="/" 
          className={`nav__link ${location.pathname === '/' ? 'nav__link--active' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/budget" 
          className={`nav__link ${location.pathname === '/budget' ? 'nav__link--active' : ''}`}
        >
          Budget
        </Link>
        <Link 
          to="/invest" 
          className={`nav__link ${location.pathname === '/invest' ? 'nav__link--active' : ''}`}
        >
          Invest
        </Link>
        <Link 
          to="/chat" 
          className={`nav__link ${location.pathname === '/chat' ? 'nav__link--active' : ''}`}
        >
          Chat
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;