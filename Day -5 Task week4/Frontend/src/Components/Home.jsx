import React, { useState } from 'react';

// --- COMPONENT: 
const InteractiveCard = ({ title, description, buttonText, imageUrl }) => {
  const [liked, setLiked] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <div className="col-md-4 mb-4">
      <div 
        className="card h-100 shadow-sm border-0 overflow-hidden" 
        style={{ 
            transition: '0.3s',
            opacity: isDone ? 0.7 : 1, 
            transform: isDone ? 'scale(0.98)' : 'scale(1)'
        }}
      >
        {/* IMAGE CONTAINER */}
        <div className="card-img-top bg-light d-flex align-items-center justify-content-center p-4">
            <img 
                src={imageUrl} 
                alt={title} 
                style={{ 
                    height: '100px', 
                    width: '100px', 
                    objectFit: 'contain',
                    filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' 
                }} 
                // Fallback if image fails
                onError={(e) => {e.target.src = 'https://placehold.co/100x100?text=Icon'}}
            />
        </div>

        <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title fw-bold" style={{ textDecoration: isDone ? 'line-through' : 'none' }}>
            {title}
          </h5>
          
          <p className="card-text text-muted small flex-grow-1">{description}</p>

          {/* BUTTONS */}
          <div className="d-flex justify-content-center gap-2 my-3">
            <button 
                onClick={() => setLiked(!liked)} 
                className={`btn btn-sm ${liked ? 'btn-danger' : 'btn-outline-danger'}`}
            >
                {liked ? '❤️' : '🤍 Like'}
            </button>

            <button 
                onClick={() => setIsDone(!isDone)} 
                className="btn btn-sm btn-outline-secondary"
            >
                {isDone ? '✓' : 'Done'}
            </button>

            <button 
                onClick={() => setExpanded(!expanded)} 
                className="btn btn-sm btn-outline-primary"
            >
                {expanded ? '▲' : '▼'}
            </button>
          </div>

          {/* EXPANDED CONTENT */}
          {expanded && (
            <div className="alert alert-light border small mb-3 text-start">
               <strong>🔍 Details:</strong><br/>
               Status: {isDone ? "Completed" : "Pending"}<br/>
               Likes: {liked ? 1 : 0}
            </div>
          )}

          {/* COUNTER */}
          <div className="d-flex justify-content-center align-items-center gap-2 mb-3 bg-light p-1 rounded">
             <button className="btn btn-dark btn-sm rounded-circle" style={{width:'30px', height:'30px'}} onClick={() => count > 0 && setCount(count - 1)}>-</button>
             <span className="fw-bold mx-2">Qty: {count}</span>
             <button className="btn btn-dark btn-sm rounded-circle" style={{width:'30px', height:'30px'}} onClick={() => setCount(count + 1)}>+</button>
          </div>

          <button className="btn btn-primary w-100 fw-bold">{buttonText}</button>
        </div>
      </div>
    </div>
  );
};


// --- MAIN PAGE COMPONENT ---
const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

 const expenseImg = "https://img.icons8.com/3d-fluency/94/money-bag.png";
 const budgetImg = "https://img.icons8.com/3d-fluency/94/calculator.png"; 
 const historyImg = "https://img.icons8.com/3d-fluency/94/document.png";
 const heroImg = "https://img.freepik.com/free-vector/flat-design-finance-leaders-concept-illustration_23-2149153848.jpg";
 
  const themeStyles = {
    backgroundColor: darkMode ? '#121212' : '#f8f9fa',
    color: darkMode ? '#ffffff' : '#000000',
    minHeight: 'calc(100vh - 56px)',
    padding: '40px 0',
    transition: 'background-color 0.3s ease'
  };

  return (
    <div style={themeStyles}>
      <div className="container">
        
        {/* DARK MODE */}
        <div className="d-flex justify-content-end mb-4">
            <button 
                onClick={() => setDarkMode(!darkMode)}
                className="btn btn-dark d-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm"
                style={{ border: '1px solid #444' }}
            >
                {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
        </div>

        {/* HERO SECTION */}
        <div className="container py-5">
            <div className="row align-items-center mb-5">
                <div className="col-lg-6">
                    <h1 className="display-4 fw-bold text-primary">Join New Club</h1>
                    <p className="lead text-muted mb-4">
                        Stop managing money alone. Track expenses, set group budgets, and achieve financial freedom.
                    </p>
                    <button className="btn btn-primary btn-lg px-4 me-2">Join Now</button>
                    <button className="btn btn-outline-secondary btn-lg px-4">Demo</button>
                </div>
                <div className="col-lg-6 text-center">
                    {/* Reliable 3D Hero Image */}
                    <img 
                        src={heroImg} 
                        alt="Finance Hero" 
                        className="img-fluid" 
                        style={{ maxHeight: '350px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}
                    />
                </div>
            </div>
        </div>

        {/* CARDS GRID */}
        <div className="row g-4">
            <InteractiveCard 
                title="Team Expense" 
                description="Record your daily expenses with category and amount detail."
                buttonText="Add Expense"
                imageUrl={expenseImg} 
            />
            <InteractiveCard 
                title="Budget Plan" 
                description="Set monthly budget and track your spending limits."
                buttonText="Set Budget"
                imageUrl={budgetImg} 
            />
            <InteractiveCard 
                title="View History" 
                description="Check all your past transactions and expense records."
                buttonText="Check History"
                imageUrl={historyImg} 
            />
        </div>

      </div>
    </div>
  );
};

export default Home;