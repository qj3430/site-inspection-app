import React from "react"

const Preview = (data) => {
  return (
    <div class="report-container">
      <h1>Retaining Wall Inspection Report</h1>

      <table class="site-details-table">
        <tr>
          <th colspan="2">Site Details</th>
          <th colspan="2">Report References</th>
        </tr>
        <tr>
          <td>Client:</td>
          <td><strong>{data.client_name}</strong></td>
          <td>Client Ref No:</td>
          <td>{data.client_ref_num}</td>
        </tr>
        <tr>
          <td>Contact:</td>
          <td>{data.client_contact}</td>
          <td>Project No:</td>
          <td>pln_{data.pln_num}_{data.tsk_num}</td>
        </tr>
        <tr>
          <td>Address:</td>
          <td>{data.client_address}</td>
          <td>Inspection date:</td>
          <td>{data.inspection_date}</td>
        </tr>
      </table>

      <div class="section">
        <h2>Scope of Works</h2>
        <p>
          As requested by the builder, an engineer from this office has visited
          the above-mentioned site to inspect the following {data.structure_wall}
          located along:
        </p>
        <p class="indent">{data.inspection_location}</p>
        <p>
          The purpose of the inspection was to check the existing
          {data.structure_wall} in order to assess the structural requirements for
          the proposed development construction.
        </p>
      </div>

      <div class="section">
        <h2>Inspection Details</h2>
        <p>
          Inspection of the {data.structure_wall} in question consisted of:
        </p>
        <ul>
          {data.inspection_details.map(detail => {
            <li>{detail}</li>
          })}
        </ul>


        <div class="image-container">
          <img src={data.inspection_plan_image} alt="Site Plan" class="report-image" />
          <p class="caption"><strong>Figure 1:</strong> Proposed Site Plan</p>
        </div>
      </div>

      <div>
        {data.sections.map(section => {
          <div class="section">
            <h2>Site Observations</h2>
            <h3>{section.direction} {section.structure_wall}</h3>

            <div class="image-row">
              <div class="image-col">
                <img src={section.locationImage} alt="Inspected Location" class="report-image" />
                <p class="caption"><strong>{section.inspectionLocation}</strong></p>
                <p class="caption"><strong>Figure 2:</strong> Inspected Location</p>
              </div>
              <div class="image-col">
                <img src={section.wallPhoto} alt="Northern Retaining Wall" class="report-image" />
                <p class="caption"><strong>{section.inspectionPhoto}</strong></p>
                <p class="caption"><strong>Photo 1:</strong> Northern Retaining Wall</p>
              </div>
            </div>

            <p>{section.paragraph_1}</p>
            <p>{section.paragraph_2}</p>
            <p>{section.paragraph_3}</p>
            <p>{section.paragraph_4}</p>
          </div>
        })}
        <div class="footer-section">
          <p>
            We trust that the above meets your current requirements. Please do not
            hesitate to contact this office should you have further clarifications.
          </p>
          <p>Yours faithfully,</p>
          <p><strong>Prompt Engineering Pty Ltd</strong></p>
        </div>
      </div>
    </div>
  )
}

export default Preview
