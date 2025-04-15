import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ isConnected }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { currentUser, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <header style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Site Inspection App</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isAuthenticated ? (
          <>
            <span style={{ marginRight: '15px' }}>
              Welcome, {currentUser?.name || 'Engineer'}
            </span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid white',
                padding: '5px 10px',
                marginRight: 0
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={navigate('/login')}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid white',
                padding: '5px 10px',
                marginRight: 0
              }}
            >
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
