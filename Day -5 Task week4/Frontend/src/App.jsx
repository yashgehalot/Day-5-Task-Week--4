// 1. CRITICAL FIX: You must import React and hooks at the very top
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. Import your components (ensure these paths match your folder structure)
import MyNavbar from './Components/MyNavbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import AddItem from './Components/Add Item'; // Note: Ensure the file name has a space if that's how it's saved
import About from './Components/About';
import Product from './Components/New Product';

// --- Day 2 Task Form Component ---
const Day2TaskForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/day2-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        setStatusMessage("Success: " + data.message);
      } else {
        setStatusMessage("Error: Could not add user.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("Connection Failed. Check console.");
    }
  };

  return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', margin: 'auto' }}>
      <h3 className="text-primary">Day 2: POST Data Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success w-100">Submit Data</button>
      </form>
      {statusMessage && <div className="alert alert-success mt-3">{statusMessage}</div>}
    </div>
  );
};

// 3. MAIN APP COMPONENT
function App() {
  const [activePage, setActivePage] = useState("home");
  const [items, setItems] = useState([]); 
  const [backendMessage, setBackendMessage] = useState("Connecting...");

  // Helper to get Headers with Token
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token'); 
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // FETCH: Initial Load from MongoDB
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/expenses', {
          headers: getAuthHeaders()
        });
        const data = await response.json();
        if (response.ok) {
          setItems(data);
          setBackendMessage("Backend Working!");
        } else {
          setBackendMessage("Auth Failed - Please Login");
        }
      } catch (err) {
        setBackendMessage("Backend not connected");
      }
    };
    fetchExpenses();
  }, [activePage]); 

  // DELETE: Remove from Backend
  const handleDeleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      const response = await fetch(`http://localhost:3000/api/expenses/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        setItems(items.filter((item) => (item._id || item.id) !== id));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // UPDATE: Edit in Backend
  const handleUpdateItem = async (updatedItem) => {
    const id = updatedItem._id || updatedItem.id;
    try {
      const response = await fetch(`http://localhost:3000/api/expenses/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        const data = await response.json();
        setItems(items.map((item) => ((item._id || item.id) === id ? data : item)));
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // ADD: Save to Backend
  const handleAddItem = async (newItem) => {
    try {
      const response = await fetch('http://localhost:3000/api/expenses', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newItem),
      });
      const data = await response.json();
      if (response.ok) {
        setItems([...items, data]);
      }
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  const handleClearAll = () => { if (window.confirm('Delete all?')) setItems([]); };

  const renderSection = () => {
    switch (activePage) {
      case "home": return <Home />;
      case "project": 
        return (
          <AddItem 
            items={items} 
            onAdd={handleAddItem} 
            onDelete={handleDeleteItem} 
            onUpdate={handleUpdateItem} 
            onClear={handleClearAll} 
          />
        );
      case "product": return <Product />;
      case "about": return <About />;
      case "day2": return <Day2TaskForm />;
      default: return <Home />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <MyNavbar onNavClick={setActivePage} />
      <div className="container mt-3">
        <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded border">
          <div>
            <strong>Backend Status: </strong> 
            <span className={backendMessage.includes("Working") ? "text-success" : "text-danger"}>
              {backendMessage}
            </span>
          </div>
          <button className="btn btn-primary" onClick={() => setActivePage("day2")}>
            Go to Day 2 Task
          </button>
        </div>
      </div>
      <main className="flex-grow-1 mt-4">{renderSection()}</main>
      <Footer />
    </div>
  );
}

// 4. CRITICAL FIX: Ensure this export matches main.jsx
export default App;