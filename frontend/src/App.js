import React from 'react';
import ResumeUpload from './components/ResumeUpload';
import ResumeSearch from './components/ResumeSearch';

export default function App() {
  return (
    <div style={{ margin: '0 auto', maxWidth: 800, fontFamily: 'Segoe UI' }}>
      <h1 style={{ textAlign: 'center' }}>ResumeRAG Demo Hackathon</h1>
      <ResumeUpload />
      <hr />
      <ResumeSearch />
    </div>
  );
}
