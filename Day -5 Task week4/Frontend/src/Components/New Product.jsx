import React, { useState, useEffect } from 'react';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SWITCHED API: Now fetching specific 'groceries' category
    fetch('https://dummyjson.com/products/category/groceries')
      .then(res => res.json())
      .then(data => {
        // DummyJSON returns an object { products: [...] }, so we access data.products
        setProducts(data.products); 
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border text-success"></div></div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#198754' }}>
        Grocery Items ({products.length})
      </h2>
      
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <div style={styles.imageContainer}>
              {/* Note: DummyJSON uses 'thumbnail' instead of 'image' */}
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                style={styles.image} 
              />
            </div>
            <div style={styles.info}>
              <h3 style={styles.title}>{product.title}</h3>
              <p style={styles.category}>{product.category}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={styles.price}>${product.price.toFixed(2)}</p>
                {/* Added a small tag for rating just for fun */}
                <span style={{ fontSize: '12px', background: '#e9ecef', padding: '2px 6px', borderRadius: '4px' }}>
                  ⭐ {product.rating}
                </span>
              </div>

              <button style={styles.button}>Add to Expense</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reusing your Grid Styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    transition: 'transform 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  },
  imageContainer: {
    height: '180px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain', // Keeps the image looking good
  },
  info: {
    width: '100%',
    textAlign: 'left',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '10px 0 5px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  category: {
    fontSize: '12px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '10px',
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#198754', // Green color for money/groceries
    margin: '0',
  },
  button: {
    width: '100%',
    padding: '10px',
    marginTop: '15px',
    backgroundColor: '#198754', // Green button
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  }
};

export default Product;