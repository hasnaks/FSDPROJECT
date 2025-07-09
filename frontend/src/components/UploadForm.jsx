import React, { useState } from 'react';

const UploadForm = ({ onUpload }) => {
  const [preview, setPreview] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

   

    // Prepare form data for Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'jahanas'); // from Cloudinary dashboard

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dw9teb8dh/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      const imageUrl = data.secure_url;
      onUpload(imageUrl); // 🔄 update form in parent component
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />

    </div>
  );
};

export default UploadForm;
