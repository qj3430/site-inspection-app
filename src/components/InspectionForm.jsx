// src/components/InspectionForm.jsx
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Import all your inspection templates
import RetainingWallInspection from '../assets/inspectionForms/RetainingWallInspectionForm';
import SoilInspection from '../assets/inspectionForms/SoilInspectionForm';

const InspectionForm = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const job = location.state?.job;

  // Map of service types to their corresponding template components
  const inspectionTemplates = {
    'RetainingWall': RetainingWallInspection,
    'Soil': SoilInspection,
  };

  const handleBackToJobs = () => {
    navigate('/jobs');
  };
  if (!job) {
    return <div>Job information not found. Please go back to the jobs list.</div>;
  }

  // Get the correct template component
  const InspectionTemplate = inspectionTemplates[job.serviceType];

  if (!InspectionTemplate) {
    return <div>No inspection template found for this job type: {job.serviceType}</div>;
  }

  return (
    <div>
      <div style={{
        backgroundColor: 'transparent',
        color: 'black',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={handleBackToJobs}
            style={{
              color: 'black',
              backgroundColor: 'transparent',
              border: '1px solid black',
              padding: '5px 10px',
              marginRight: '15px'
            }}
          >
            ← Back to Jobs
          </button>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Site Inspection Form</h1>
        </div>
      </div>
      {/* Render the specific inspection form template */}
      <InspectionTemplate job={job} />
    </div>
  );
};

export default InspectionForm;
