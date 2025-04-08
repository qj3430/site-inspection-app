// src/components/InspectionForm.jsx
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// Import all your inspection templates
import RetainingWallInspection from '../assets/inspectionForms/RetainingWallInspectionForm';
import SoilInspection from '../assets/inspectionForms/SoilInspectionForm';

const InspectionForm = () => {
  const { jobId } = useParams();
  const location = useLocation();
  const job = location.state?.job;

  // Map of service types to their corresponding template components
  const inspectionTemplates = {
    'RetainingWall': RetainingWallInspection,
    'Soil': SoilInspection,
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
    <div className="container">
      <h2>Inspection for {job.clientName}</h2>
      <h3>Job ID: {job.id} - {job.serviceType}</h3>

      {/* Render the specific inspection form template */}
      <InspectionTemplate job={job} />
    </div>
  );
};

export default InspectionForm;
