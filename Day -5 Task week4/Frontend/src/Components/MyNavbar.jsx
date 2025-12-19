import React from 'react';
import { BsWalletFill } from "react-icons/bs";

const MyNavbar = ({ onNavClick }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
      <div className="container">
        {/* Brand Logo - Clicks go to Home */}
        <div 
          className="navbar-brand fw-bold text-primary d-flex align-items-center" 
          style={{ cursor: "pointer" }}
          onClick={() => onNavClick('home')}
        >
           <BsWalletFill className="me-2 pb-1" size={30} />
           Expenses Management
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="nav-link btn btn-link text-decoration-none" onClick={() => onNavClick('home')}>Home</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-decoration-none" onClick={() => onNavClick('project')}>Add Item</button>
            </li>
            
            <li className="nav-item">
              <button className="nav-link btn btn-link text-decoration-none" onClick={() => onNavClick('product')}>New Product</button>
            </li>

            <li className="nav-item">
              <button className="nav-link btn btn-link text-decoration-none" onClick={() => onNavClick('about')}>About</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary ms-3 btn-sm px-4 fw-bold text-white">Login</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;