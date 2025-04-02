function Header({ isConnected }) {
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
      <div>
        <span id="connection-status">
          {isConnected ? 'Connected' : 'Offline'}
        </span>
      </div>
    </header>
  );
}

export default Header;
