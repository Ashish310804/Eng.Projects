import React from "react";

function Guide() {
  return (
    <div className="container mt-5">
      <h2 className="text-danger text-center mb-4">GasMap LPG Guide</h2>

      {/* Safety Tips */}
      <div className="card bg-dark text-white p-3 mb-3 shadow">
        <h4 className="text-danger">
          <i className="fas fa-shield-alt me-2"></i>
          Safety Tips
        </h4>
        <ul>
          <li>Always check for gas leakage regularly</li>
          <li>Keep cylinder in a ventilated area</li>
          <li>Turn off regulator when not in use</li>
        </ul>
      </div>

      {/* Usage Tips */}
      <div className="card bg-dark text-white p-3 mb-3 shadow">
        <h4 className="text-danger">
          <i className="fas fa-chart-line me-2"></i>
          Usage Tips
        </h4>
        <ul>
          <li>Track daily pressure drop using GasMap</li>
          <li>Use medium flame for efficient cooking</li>
          <li>Avoid unnecessary gas usage</li>
        </ul>
      </div>

      {/* Warning Levels */}
      <div className="card bg-dark text-white p-3 mb-3 shadow">
        <h4 className="text-danger">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Warning Levels
        </h4>
        <ul>
          <li>Above 50 PSI → Safe</li>
          <li>20–50 PSI → Moderate</li>
          <li>Below 20 PSI → Refill Soon</li>
        </ul>
      </div>

      {/* Emergency */}
      <div className="card bg-dark text-white p-3 shadow">
        <h4 className="text-danger">
          <i className="fas fa-phone-alt me-2"></i>
          Emergency
        </h4>
        <ul>
          <li>If leakage detected, turn off regulator immediately</li>
          <li>Do NOT use electrical switches</li>
          <li>Call emergency gas service</li>
        </ul>
      </div>
    </div>
  );
}

export default Guide;