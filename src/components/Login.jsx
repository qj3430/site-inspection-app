// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../auth/authService'

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    setError('');
    setLoading(true);

    try {
      await authService.login();
      navigate('/jobs');
    } catch (err) {
      console.error("Login error details:", err);
      setError('Failed to sign in: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '400px', margin: '100px auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Engineer Login</h2>

        {error && (
          <div style={{
            backgroundColor: '#ffdddd',
            color: '#c00000',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <p>Click the button below to sign in with your Microsoft account</p>

          <button
            onClick={handleLogin}
            className="btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign in with Microsoft'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
