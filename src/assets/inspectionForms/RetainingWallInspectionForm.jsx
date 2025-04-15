import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import LocationCapture from '../../components/LocationCapture';
import PhotoUpload from '../../components/PhotoUpload';

const RetainingWallInspectionForm = () => {
	const { jobId } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	// Updated state with essential fields from the template
	const [inspectionData, setInspectionData] = useState({
		// Original fields
		title: '',
		inspectorName: '',
		latitude: '',
		longitude: '',
		date: new Date().toISOString().split('T')[0],
		notes: '',
		jobId: '',
		clientName: '',
		createdDate: '',

		// New fields from template
		clientRefNum: '',
		clientContact: '',
		clientAddress: '',
		inspectionLocation: '',
		structureWall: 'retaining wall', // Default value
		paragraph1: '',
		paragraph2: ''
	});

	const [photos, setPhotos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Pre-populate form with job data if available
	useEffect(() => {
		if (location.state?.job) {
			const job = location.state.job;
			setInspectionData(prev => ({
				...prev,
				title: `Retaining Wall Inspection for ${job.clientName}`,
				jobId: job.id,
				clientName: job.clientName,
				createdDate: job.createdDate
			}));
		}
	}, [location.state]);

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
			console.log('Saving inspection data to server:', inspectionData);
			console.log('Photos:', photos);
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

	return (
		<div>
			<div className="container">
				{/* Job Information Card - Keeping the original style */}
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

				{/* Main Form Card - Keeping the original style */}
				<div>
					<div className="card">
						<h2>Inspection Details</h2>

						{/* Basic Information */}
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

						{/* Client Information */}
						<div className="form-group">
							<label htmlFor="client-name">Client Name</label>
							<input
								type="text"
								id="client-name"
								placeholder="Enter client name"
								value={inspectionData.clientName}
								onChange={(e) => updateInspectionData('clientName', e.target.value)}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="client-ref-num">Client Reference Number</label>
							<input
								type="text"
								id="client-ref-num"
								placeholder="Enter client reference number"
								value={inspectionData.clientRefNum}
								onChange={(e) => updateInspectionData('clientRefNum', e.target.value)}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="client-contact">Client Contact</label>
							<input
								type="text"
								id="client-contact"
								placeholder="Enter client contact"
								value={inspectionData.clientContact}
								onChange={(e) => updateInspectionData('clientContact', e.target.value)}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="client-address">Client Address</label>
							<input
								type="text"
								id="client-address"
								placeholder="Enter client address"
								value={inspectionData.clientAddress}
								onChange={(e) => updateInspectionData('clientAddress', e.target.value)}
							/>
						</div>

						{/* Location Information */}
						<LocationCapture
							latitude={inspectionData.latitude}
							longitude={inspectionData.longitude}
							onLocationChange={(lat, lng) => {
								updateInspectionData('latitude', lat);
								updateInspectionData('longitude', lng);
							}}
						/>

						<div className="form-group">
							<label htmlFor="inspection-location">Inspection Location</label>
							<input
								type="text"
								id="inspection-location"
								placeholder="Describe the location of the retaining walls"
								value={inspectionData.inspectionLocation}
								onChange={(e) => updateInspectionData('inspectionLocation', e.target.value)}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="inspection-date">Inspection Date</label>
							<input
								type="date"
								id="inspection-date"
								value={inspectionData.date}
								onChange={(e) => updateInspectionData('date', e.target.value)}
							/>
						</div>

						{/* Structure Information */}
						<div className="form-group">
							<label htmlFor="structure-wall">Structure Wall Type</label>
							<input
								type="text"
								id="structure-wall"
								placeholder="Enter structure wall type"
								value={inspectionData.structureWall}
								onChange={(e) => updateInspectionData('structureWall', e.target.value)}
							/>
						</div>

						{/* Observations */}
						<div className="form-group">
							<label htmlFor="paragraph-1">Observations (Paragraph 1)</label>
							<textarea
								id="paragraph-1"
								rows="3"
								placeholder="Enter your main observations"
								value={inspectionData.paragraph1}
								onChange={(e) => updateInspectionData('paragraph1', e.target.value)}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="paragraph-2">Additional Observations (Paragraph 2)</label>
							<textarea
								id="paragraph-2"
								rows="3"
								placeholder="Enter any additional observations"
								value={inspectionData.paragraph2}
								onChange={(e) => updateInspectionData('paragraph2', e.target.value)}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="inspection-notes">Notes</label>
							<textarea
								id="inspection-notes"
								rows="4"
								placeholder="Enter any additional notes about the inspection"
								value={inspectionData.notes}
								onChange={(e) => updateInspectionData('notes', e.target.value)}
							/>
						</div>
					</div>

					{/* Photo Upload Section - Keeping the original component */}
					<PhotoUpload photos={photos} setPhotos={setPhotos} />

					{/* Save Button */}
					<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
						<button
							onClick={handleSaveToServer}
							className="button primary"
							disabled={isLoading}
						>
							{isLoading ? 'Saving...' : 'Save Inspection'}
						</button>
					</div>
				</div>

				{/* Loading Indicator */}
				{isLoading && (
					<div className="loading">
						<p>Processing your request...</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default RetainingWallInspectionForm;
