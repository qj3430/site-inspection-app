import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LocationCapture from './LocationCapture';
import PhotoUpload from './PhotoUpload';
import ReportTemplate from './ReportTemplate';
import ReportPreview from './ReportPreview';

function InspectionForm() {
  const { jobId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('inspection');
  const [inspectionData, setInspectionData] = useState({
    title: '',
    inspectorName: currentUser?.name || '',
    latitude: '',
    longitude: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    jobId: '',
    clientName: '',
    createdDate: ''
  });
  const [photos, setPhotos] = useState([]);
  const [template, setTemplate] = useState({
    name: 'Default Template',
    content: `
      <h1>{inspection_title}</h1>
      <p><strong>Job ID:</strong> {job_id}</p>
      <p><strong>Client:</strong> {client_name}</p>
      <p><strong>Inspector:</strong> {inspector_name}</p>
      <p><strong>Date:</strong> {inspection_date}</p>
      <p><strong>Created Date:</strong> {created_date}</p>
      <p><strong>Location:</strong> {latitude}, {longitude}</p>
      <h2>Findings</h2>
      <p>{inspection_notes}</p>
      <h2>Photos</h2>
      <p>{photos}</p>
    `
  });
  const [isLoading, setIsLoading] = useState(false);

  // Pre-populate form with job data if available
  useEffect(() => {
    if (location.state?.job) {
      const job = location.state.job;
      setInspectionData(prev => ({
        ...prev,
        title: `Inspection for ${job.clientName}`,
        jobId: job.id,
        clientName: job.clientName,
        createdDate: job.createdDate
      }));
    }
  }, [location.state]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const updateInspectionData = (field, value) => {
    setInspectionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveToServer = async () => {
    setIsLoading(true);
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Saving data to server:', { inspectionData, photos, template });
      alert('Inspection data saved successfully!');
      // Navigate back to jobs list
      navigate('/jobs');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save inspection data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBackToJobs = () => {
    navigate('/jobs');
  };

  return (
    <div>
      <header style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={handleBackToJobs}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid white',
              padding: '5px 10px',
              marginRight: '15px'
            }}
          >
            ← Back to Jobs
          </button>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Site Inspection Form</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
        </div>
      </header>

      <div className="container">
        <div className="card" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <h2>Job Information</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px' }}>
              <strong>Job ID:</strong> {inspectionData.jobId}
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <strong>Client:</strong> {inspectionData.clientName}
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <strong>Created Date:</strong> {inspectionData.createdDate}
            </div>
          </div>
        </div>

        <div className="tabs">
          <div
            className={`tab ${activeTab === 'inspection' ? 'active' : ''}`}
            onClick={() => handleTabChange('inspection')}
          >
            Inspection
          </div>
          <div
            className={`tab ${activeTab === 'template' ? 'active' : ''}`}
            onClick={() => handleTabChange('template')}
          >
            Report Template
          </div>
          <div
            className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => handleTabChange('preview')}
          >
            Preview
          </div>
        </div>

        {activeTab === 'inspection' && (
          <div>
            <div className="card">
              <h2>Inspection Details</h2>
              <div className="form-group">
                <label htmlFor="inspection-title">Inspection Title</label>
                <input
                  type="text"
                  id="inspection-title"
                  placeholder="Enter inspection title"
                  value={inspectionData.title}
                  onChange={(e) => updateInspectionData('title', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="inspector-name">Inspector Name</label>
                <input
                  type="text"
                  id="inspector-name"
                  placeholder="Enter your name"
                  value={inspectionData.inspectorName}
                  onChange={(e) => updateInspectionData('inspectorName', e.target.value)}
                />
              </div>

              <LocationCapture
                latitude={inspectionData.latitude}
                longitude={inspectionData.longitude}
                onLocationChange={(lat, lng) => {
                  updateInspectionData('latitude', lat);
                  updateInspectionData('longitude', lng);
                }}
              />

              <div className="form-group">
                <label htmlFor="inspection-date">Inspection Date</label>
                <input
                  type="date"
                  id="inspection-date"
                  value={inspectionData.date}
                  onChange={(e) => updateInspectionData('date', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="inspection-notes">Notes</label>
                <textarea
                  id="inspection-notes"
                  rows="4"
                  placeholder="Enter inspection notes"
                  value={inspectionData.notes}
                  onChange={(e) => updateInspectionData('notes', e.target.value)}
                />
              </div>
            </div>

            <PhotoUpload photos={photos} setPhotos={setPhotos} />
          </div>
        )}

        {activeTab === 'template' && (
          <ReportTemplate
            template={template}
            setTemplate={setTemplate}
          />
        )}

        {activeTab === 'preview' && (
          <ReportPreview
            inspectionData={{
              ...inspectionData,
              job_id: inspectionData.jobId,
              client_name: inspectionData.clientName,
              created_date: inspectionData.createdDate
            }}
            photos={photos}
            template={template}
            onSave={handleSaveToServer}
            isLoading={isLoading}
          />
        )}

        {isLoading && (
          <div className="loading">
            <p>Processing your request...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InspectionForm;
