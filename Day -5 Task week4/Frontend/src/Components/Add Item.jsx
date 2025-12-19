import React, { useState } from 'react';
import ItemCard from './ItemCard';

const AddItem = ({ items, onAdd, onDelete, onClear, onUpdate }) => {
  const [formData, setFormData] = useState({ title: '', category: '', value: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [msgType, setMsgType] = useState('success');
  
  // New states for editing logic
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  // Switch form to "Edit Mode"
  const handleEditWrapper = (item) => {
    setIsEditing(true);
    setEditId(item.id || item._id); // Handle both local and DB IDs
    setFormData({ 
      title: item.title, 
      category: item.category, 
      value: item.value 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.value) {
      setError('All fields are required!');
      return;
    }

    if (isEditing) {
      // Logic for updating an existing item
      onUpdate({ id: editId, ...formData });
      setMsgType('warning');
      setSuccessMsg('Item updated successfully! 📝');
      setIsEditing(false);
      setEditId(null);
    } else {
      // Logic for adding a new item
      onAdd({ id: Date.now(), ...formData });
      setMsgType('success');
      setSuccessMsg('Item added successfully! ✅');
    }

    setTimeout(() => setSuccessMsg(''), 3000);
    setFormData({ title: '', category: '', value: '' });
  };

  const handleDeleteWrapper = (id) => {
    onDelete(id);
    setMsgType('danger');
    setSuccessMsg('Item deleted successfully! 🗑️');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Expense Project</h2>
      <div className="row">
        <div className="col-md-5">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">{isEditing ? 'Edit Item' : 'Add New Item'}</h4>
            {error && <div className="alert alert-danger p-2">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text" name="title" className="form-control" placeholder="Title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <input type="number" name="value" className="form-control" placeholder="Amount" value={formData.value} onChange={handleChange} />
              </div>
              <button type="submit" className={`btn w-100 ${isEditing ? 'btn-warning' : 'btn-success'}`}>
                {isEditing ? 'Update Item' : 'Add Item'}
              </button>
              {isEditing && (
                <button type="button" className="btn btn-link w-100 mt-2 text-muted" onClick={() => {setIsEditing(false); setFormData({title:'', category:'', value:''})}}>
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
        </div>

        <div className="col-md-7">
          {successMsg && <div className={`alert alert-${msgType} p-2 mb-3 shadow-sm text-center`}>{successMsg}</div>}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Your List ({items.length})</h4>
            {items.length > 0 && <button onClick={onClear} className="btn btn-outline-danger btn-sm">Clear All</button>}
          </div>
          <div className="list-group">
            {items.length === 0 ? <p className="text-muted text-center">No items yet.</p> : null}
            {items.map((item) => (
               <ItemCard key={item.id || item._id} item={item} onDelete={handleDeleteWrapper} onEdit={() => handleEditWrapper(item)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;