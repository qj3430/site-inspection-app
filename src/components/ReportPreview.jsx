// src/components/ReportPreview.jsx (modified to include job fields)
function ReportPreview({ inspectionData, photos, template, onSave, isLoading }) {
  const generateReportContent = () => {
    let content = template.content;

    // Replace placeholders with actual data
    content = content.replace(/{inspection_title}/g, inspectionData.title || 'Untitled Inspection');
    content = content.replace(/{inspector_name}/g, inspectionData.inspectorName || 'Unknown');
    content = content.replace(/{inspection_date}/g, inspectionData.date || 'No date');
    content = content.replace(/{latitude}/g, inspectionData.latitude || 'N/A');
    content = content.replace(/{longitude}/g, inspectionData.longitude || 'N/A');
    content = content.replace(/{inspection_notes}/g, inspectionData.notes || 'No notes provided');

    // New fields
    content = content.replace(/{job_id}/g, inspectionData.job_id || 'No Job ID');
    content = content.replace(/{client_name}/g, inspectionData.client_name || 'No Client');
    content = content.replace(/{created_date}/g, inspectionData.created_date || 'No created date');

    // Replace photos placeholder with actual photos
    if (photos.length > 0) {
      const photosHtml = photos.map(photo =>
        `<div style="margin: 10px; display: inline-block;">
          <img src="${photo.url}" alt="Inspection photo" style="max-width: 200px; max-height: 200px; object-fit: cover;" />
        </div>`
      ).join('');
      content = content.replace(/{photos}/g, photosHtml);
    } else {
      content = content.replace(/{photos}/g, 'No photos attached');
    }

    return content;
  };

  const handleGeneratePDF = () => {
    alert('PDF Generation feature would be integrated here');
    // In a production app, you would use a library like jsPDF or connect to a PDF service
  };

  return (
    <div className="card">
      <h2>Report Preview</h2>
      <div
        id="report-preview"
        style={{
          border: '1px solid #ddd',
          padding: '20px',
          minHeight: '300px',
          marginBottom: '20px',
          backgroundColor: 'white'
        }}
        dangerouslySetInnerHTML={{ __html: generateReportContent() }}
      />
      <div>
        <button onClick={handleGeneratePDF}>Generate PDF</button>
        <button
          className="btn-primary"
          onClick={onSave}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save to Server'}
        </button>
      </div>
    </div>
  );
}

export default ReportPreview;
