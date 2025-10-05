import React, { useState } from 'react';

export default function ResumeUpload() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('');

  const onFileChange = (e) => {
    setFiles(Array.from(e.target.files));
    setStatus('');
  };

  const onUpload = async () => {
    if (files.length === 0) {
      setStatus('Please select at least one file!');
      return;
    }

    setStatus('Uploading files...');
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    try {
      const response = await fetch('http://localhost:4000/api/resumes', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed with status ' + response.status);
      }

      setStatus('Files uploaded successfully!');
      setFiles([]);
    } catch (err) {
      setStatus('Upload error: ' + err.message);
    }
  };

  return (
    <div>
      <input multiple type="file" onChange={onFileChange} />
      <button onClick={onUpload} style={{ marginLeft: 10, padding: '5px 10px' }}>
        Upload
      </button>
      <div style={{ marginTop: 10 }}>
        {status && <strong>{status}</strong>}
        {files.length > 0 && (
          <ul>
            {files.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
