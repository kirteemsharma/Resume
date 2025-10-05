import React, { useState, useEffect } from 'react';

export default function ResumeSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);
  const [nextOffset, setNextOffset] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (q, off) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/resumes?q=${encodeURIComponent(q)}&limit=${limit}&offset=${off}`);
      const data = await res.json();
      setResults(data.items || []);
      setNextOffset(data.next_offset || null);
    } catch {
      setResults([]);
      setNextOffset(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      setNextOffset(null);
      setOffset(0);
      return;
    }
    fetchResults(query, offset);
  }, [query, offset]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search resumes by name, skills, etc."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOffset(0);
        }}
        style={{ padding: 8, width: '80%', maxWidth: 400 }}
      />
      {loading && <p>Loading results...</p>}
      {!loading && results.length === 0 && query && <p>No results found.</p>}
      <ul>
        {results.map((r) => (
          <li key={r.id}>
            <strong>{r.name}</strong> - Skills: {r.skills}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 10 }}>
        <button onClick={() => setOffset(offset - limit)} disabled={offset === 0}>
          Prev
        </button>
        <button onClick={() => setOffset(nextOffset)} disabled={!nextOffset} style={{ marginLeft: 10 }}>
          Next
        </button>
      </div>
    </div>
  );
}
