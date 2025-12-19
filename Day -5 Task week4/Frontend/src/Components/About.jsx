import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-5 text-center mx-auto" style={{ maxWidth: '600px', borderRadius: '15px' }}>
        
        {/* Title */}
        <h1 className="fw-bold text-primary mb-3">About Us</h1>
        
        {/* Description */}
        <p className="lead text-muted mb-4">
          Hi! I am a Full Stack Developer student. This project is built using React to manage expenses efficiently without using external routing libraries.
        </p>

        <hr className="my-4" />

        {/* Contact Details Section */}
        <h4 className="mb-4">Contact Information</h4>

        <div className="d-flex flex-column gap-3 align-items-center">
          
          {/* Mobile */}
          <div className="d-flex align-items-center gap-2 p-2 border rounded w-100 justify-content-center bg-light">
            <span className="fs-5">📞</span>
            <span className="fw-bold">Mobile:</span>
            <span>+91 92045 22552</span>
          </div>

          {/* Email */}
          <div className="d-flex align-items-center gap-2 p-2 border rounded w-100 justify-content-center bg-light">
            <span className="fs-5">✉️</span>
            <span className="fw-bold">Email:</span>
            <span>student@example.com</span>
          </div>

          {/* LinkedIn */}
          <div className="d-flex align-items-center gap-2 p-2 border rounded w-100 justify-content-center bg-light">
            <span className="fs-5">🔗</span>
            <span className="fw-bold">LinkedIn:</span>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-decoration-none">
              linkedin.com/in/your-profile
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;