import { useState } from 'react';

function LocationCapture({ latitude, longitude, onLocationChange }) {
  const [status, setStatus] = useState('');

  const getLocation = () => {
    setStatus('Fetching location...');

    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        onLocationChange(lat, lng);
        setStatus('Location captured successfully');
      },
      () => {
        setStatus('Unable to retrieve your location');
      }
    );
  };

  return (
    <div className="form-group">
      <label>Location</label>
      <div className="location-data">
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => onLocationChange(e.target.value, longitude)}
          readOnly
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => onLocationChange(latitude, e.target.value)}
          readOnly
        />
        <button onClick={getLocation}>Get Location</button>
      </div>
      {status && (
        <div style={{ marginTop: '5px', fontSize: '0.9rem' }}>
          {status}
        </div>
      )}
    </div>
  );
}

export default LocationCapture;
