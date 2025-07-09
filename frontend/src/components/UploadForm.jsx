import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please select an image.');

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadedUrl(res.data.imageUrl);
    } catch (error) {
      console.error(error);
      alert('Upload failed. Make sure it’s an image file (png, jpg, jpeg, gif).');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>

      {preview && (
        <div>
          <h4>Preview:</h4>
          <img src={preview} alt="Preview" width="200" />
        </div>
      )}

      {uploadedUrl && (
        <div>
          <h4>Uploaded Image:</h4>
          <img src={uploadedUrl} alt="Uploaded" width="200" />
          <p>URL: <a href={uploadedUrl} target="_blank" rel="noreferrer">{uploadedUrl}</a></p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
