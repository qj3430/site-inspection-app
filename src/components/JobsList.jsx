import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Generate 10 dummy jobs for testing
const generateDummyJobs = () => {

  // Define service types for testing
  const serviceTypes = [
    'RetainingWall',
    'StructuralInspection',
    'SoilTesting',
    'FoundationInspection',
    'DrainageAssessment'
  ];

  const jobs = [];
  for (let i = 1; i <= 10; i++) {
    const jobId = `JOB-${2025}${i.toString().padStart(3, '0')}`;
    const clientName = `Client ${i}`;

    // Assign a service type - cycle through the array
    const serviceType = serviceTypes[(i - 1) % serviceTypes.length];

    // Create a random date within the last 30 days
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30));

    jobs.push({
      id: jobId,
      clientName,
      createdDate: createdDate.toISOString().split('T')[0],
      status: i % 3 === 0 ? 'Completed' : 'Pending',
      location: `Site ${i}`,
      description: `Inspection for ${clientName} at Site ${i}`,
      priority: i % 5 === 0 ? 'High' : i % 2 === 0 ? 'Medium' : 'Low',
      serviceType: serviceType
    });
  }
  return jobs;
};

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    // Simulate API call to fetch jobs
    const fetchJobs = async () => {
      try {
        // In a real app, this would be an API call
        // For demo, we'll just use our dummy data function
        const data = generateDummyJobs();
        setJobs(data);
      } catch (err) {
        setError('Failed to fetch jobs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobSelect = (job) => {
    // Navigate to inspection form with job ID as parameter
    navigate(`/inspection/${job.id}`, { state: { job } });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading jobs...</div>
      </div>
    );
  }

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
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Site Inspection App</h1>
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
        <h2>Your Assigned Jobs</h2>

        {error && (
          <div style={{ backgroundColor: '#ffdddd', color: '#c00000', padding: '10px', borderRadius: '4px' }}>
            {error}
          </div>
        )}

        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Job ID</th>
                  <th style={tableHeaderStyle}>Client Name</th>
                  <th style={tableHeaderStyle}>Service Type</th>
                  <th style={tableHeaderStyle}>Created Date</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={tableHeaderStyle}>Priority</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                      No jobs assigned to you at this time.
                    </td>
                  </tr>
                ) : (
                  jobs.map(job => (
                    <tr key={job.id} style={tableRowStyle}>
                      <td style={tableCellStyle}>{job.id}</td>
                      <td style={tableCellStyle}>{job.clientName}</td>
                      <td style={tableCellStyle}>
                        <span style={{
                          backgroundColor: '#e6f7ff',
                          color: '#1890ff',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}>
                          {job.serviceType}
                        </span>
                      </td>
                      <td style={tableCellStyle}>{job.createdDate}</td>
                      <td style={tableCellStyle}>
                        <span style={{
                          backgroundColor: job.status === 'Completed' ? '#e6f7ee' : '#fff8e6',
                          color: job.status === 'Completed' ? '#2ecc71' : '#f39c12',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}>
                          {job.status}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        <span style={{
                          backgroundColor:
                            job.priority === 'High' ? '#ffecec' :
                              job.priority === 'Medium' ? '#ecf8ff' : '#f0f0f0',
                          color:
                            job.priority === 'High' ? '#e74c3c' :
                              job.priority === 'Medium' ? '#3498db' : '#7f8c8d',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}>
                          {job.priority}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        <button
                          onClick={() => handleJobSelect(job)}
                          style={{ margin: 0 }}
                        >
                          Start Inspection
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Table styles
const tableHeaderStyle = {
  backgroundColor: '#f5f5f5',
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd'
};

const tableRowStyle = {
  borderBottom: '1px solid #f0f0f0'
};

const tableCellStyle = {
  padding: '12px 15px'
};

export default JobsList;
