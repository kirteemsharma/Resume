import React, { useState } from 'react';

export default function ResumeUpload() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('');

  const onFileChange = (e) => {
    setFiles(Array.from(e.target.files));
    setStatus('');
  };

  const onUpload = async () => {
    if (!files.length) return setStatus('Please select at least one file!');

    setStatus('Uploading files...');
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Upload failed');
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
