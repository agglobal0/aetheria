import React from 'react';
import { Link } from 'react-router-dom';

export default function Author() {
  return (
    <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
      <h2>Page Not Found</h2>
      <Link to="/essays" className="btn btn-primary" style={{ marginTop: '1rem' }}>Return to Essays</Link>
    </div>
  );
}
