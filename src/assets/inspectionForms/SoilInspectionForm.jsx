import { useState } from 'react';

const SoilInspectionForm = ({ job }) => {
	const [formData, setFormData] = useState({
		wallHeight: '',
		wallMaterial: '',
		cracksPresent: false,
		// Other retaining wall specific fields
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission
		console.log('Submitting retaining wall inspection', formData);
	};

	return (
		<form onSubmit={handleSubmit}>
			<h3>Soil Inspection</h3>

			<div className="form-group">
				<label>{job.id} </label>
				<label>{job.inpsectionType} </label>
				<label>Wall Height (ft)</label>
				<input
					type="number"
					name="Soiltype"
					value={formData.wallHeight}
					onChange={handleChange}
					required
				/>
			</div>

			{/* Add other fields specific to retaining wall inspections */}

			<button type="submit">Submit Inspection</button>
		</form>
	);
};

export default SoilInspectionForm;
