import { useState } from 'react';

function ReportTemplate({ template, setTemplate }) {
  const [savedTemplates, setSavedTemplates] = useState([
    { id: 'default', name: 'Default Template' }
  ]);

  const handleTemplateSave = () => {
    const templateContent = document.getElementById('template-editor').innerHTML;
    setTemplate({
      ...template,
      content: templateContent
    });

    // Save to collection of templates
    if (!savedTemplates.find(t => t.name === template.name)) {
      setSavedTemplates([
        ...savedTemplates,
        { id: Date.now(), name: template.name }
      ]);
    }

    alert(`Template "${template.name}" saved successfully!`);
  };

  const handleTemplateLoad = () => {
    alert('Template loaded successfully!');
    // In a real app, you would show a list of saved templates to select from
  };

  return (
    <div className="card">
      <h2>Report Template</h2>
      <p>Customize your report template below. Use {'{placeholders}'} for dynamic content.</p>
      <div className="form-group">
        <label htmlFor="template-name">Template Name</label>
        <input
          type="text"
          id="template-name"
          placeholder="Enter template name"
          value={template.name}
          onChange={(e) => setTemplate({ ...template, name: e.target.value })}
        />
      </div>
      <div
        className="template-editor"
        id="template-editor"
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: template.content }}
      />
      <div style={{ marginTop: '15px' }}>
        <button onClick={handleTemplateSave}>Save Template</button>
        <button onClick={handleTemplateLoad}>Load Template</button>
      </div>
    </div>
  );
}

export default ReportTemplate;
