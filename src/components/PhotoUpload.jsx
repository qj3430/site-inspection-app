import { useRef } from 'react';

function PhotoUpload({ photos, setPhotos }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file)
    }));

    setPhotos([...photos, ...newPhotos]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removePhoto = (id) => {
    const updatedPhotos = photos.filter(photo => photo.id !== id);
    // Revoke object URL to avoid memory leaks
    const photoToRemove = photos.find(photo => photo.id === id);
    if (photoToRemove) {
      URL.revokeObjectURL(photoToRemove.url);
    }
    setPhotos(updatedPhotos);
  };

  return (
    <div className="card">
      <h2>Photos</h2>
      <div className="form-group">
        <label htmlFor="photo-upload">Upload Photos</label>
        <input
          type="file"
          id="photo-upload"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        <div className="photo-preview">
          {photos.map(photo => (
            <div key={photo.id} className="photo-item">
              <img src={photo.url} alt="Inspection" />
              <button
                className="remove"
                onClick={() => removePhoto(photo.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotoUpload;
