// src/components/Header.jsx
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from '@azure/msal-react';
import authService from '../auth/authService'

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated()
  const account = authService.getAccount()

  const handleLogout = async () => {
    await authService.logout()
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
              Welcome, {account?.name || account?.username || 'Engineer'}
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
          <button
            onClick={() => navigate('/login')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid white',
              padding: '5px 10px',
              marginRight: 0
            }}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
