import React from 'react';

// We destructured props ({ title, desc, category }) so we can use them directly
const Card = ({ title, description, category, imageUrl }) => {
  return (
    <div className="col-12 text-center mb-4">
      <div className="card h-100 shadow-sm hover-effect">
        <img src={imageUrl} className="card-img-top" alt={title} style={{ height: "200px", objectFit: "cover" }} />
        
        <div className="card-body">
          <span className="badge bg-secondary mb-2">{category}</span>
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text text-muted">{description}</p>
          <button className="btn btn-outline-primary btn-sm mt-2">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default Card;