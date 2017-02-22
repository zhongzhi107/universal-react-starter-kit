import React from 'react';
import Helmet from 'react-helmet';

/**
 * NotFound Component
 */
export default function NotFound() {
  return (
    <div className="container">
      <Helmet title="Not found" />
      <h1>Doh! 404!</h1>
      <p>These are <em>not</em> the droids you are looking for!</p>
    </div>
  );
}
