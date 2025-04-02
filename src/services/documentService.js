// src/services/documentService.js
import { Document, Packer, Paragraph, TextRun, ImageRun, Table, TableCell, TableRow } from 'docx';
import { saveAs } from 'file-saver';

export const generateInspectionReport = async (inspectionData, photos, template) => {
	// Create a new document
	const doc = new Document({
		sections: [
			{
				properties: {},
				children: [
					new Paragraph({
						children: [
							new TextRun({
								text: inspectionData.title || "Untitled Inspection",
								bold: true,
								size: 32
							})
						]
					}),
					new Paragraph({
						children: [
							new TextRun({
								text: `Inspector: ${inspectionData.inspectorName || "Unknown"}`,
								size: 24
							})
						]
					}),
					new Paragraph({
						children: [
							new TextRun({
								text: `Date: ${inspectionData.date || "No date"}`,
								size: 24
							})
						]
					}),
					new Paragraph({
						children: [
							new TextRun({
								text: `Location: ${inspectionData.latitude || "N/A"}, ${inspectionData.longitude || "N/A"}`,
								size: 24
							})
						]
					}),
					new Paragraph({
						children: [
							new TextRun({
								text: "Findings",
								bold: true,
								size: 28
							})
						]
					}),
					new Paragraph({
						children: [
							new TextRun({
								text: inspectionData.notes || "No notes provided",
								size: 24
							})
						]
					})
				]
			}
		]
	});

	// If there are photos, add them
	if (photos && photos.length > 0) {
		// Adding a photos section header
		doc.addSection({
			children: [
				new Paragraph({
					children: [
						new TextRun({
							text: "Photos",
							bold: true,
							size: 28
						})
					]
				})
			]
		});

		// Since browser doesn't have direct file access, we need to convert images to base64
		// This is a simplified approach - for production, consider using a table layout for photos
		const photoPromises = photos.map(async (photo) => {
			return new Promise((resolve) => {
				const reader = new FileReader();
				reader.onload = () => {
					// Convert to Uint8Array for docx library
					const arrayBuffer = reader.result;
					const uint8Array = new Uint8Array(arrayBuffer);
					resolve(uint8Array);
				};
				reader.readAsArrayBuffer(photo.file);
			});
		});

		const photoBuffers = await Promise.all(photoPromises);

		// Add each photo
		for (const photoBuffer of photoBuffers) {
			doc.addSection({
				children: [
					new Paragraph({
						children: [
							new ImageRun({
								data: photoBuffer,
								transformation: {
									width: 400,
									height: 300
								}
							})
						]
					})
				]
			});
		}
	}

	// Generate and save the document
	const buffer = await Packer.toBlob(doc);
	saveAs(buffer, `${inspectionData.title || "inspection"}_report.docx`);

	return true;
};
