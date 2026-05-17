
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ListingsTable({ searchQuery, listings, onDeleteListing, loading }) {
  const navigate = useNavigate();

  if (loading) {
    return <div className="listings">Loading listings...</div>;
  }

  const filtered = listings.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return '#e9f7ea';
      case 'sold': return '#f0f0f0';
      case 'expired': return '#ffe6e6';
      default: return '#f0f0f0';
    }
  };

  const getStatusTextColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return '#2b7a3b';
      case 'sold': return '#555';
      case 'expired': return '#d32f2f';
      default: return '#555';
    }
  };

  return (
    <div className="listings">
      <h2>Latest Listings</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="product-info">
                  <div className="product-name">{item.name}</div>
                </div>
              </td>
              <td className="price">EGP {Number(item.price).toFixed(2)}</td>
              <td>
                <span
                  className="status-badge"
                  style={{
                    backgroundColor: getStatusColor(item.status),
                    color: getStatusTextColor(item.status)
                  }}
                >
                  {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : '—'}
                </span>
              </td>
              <td>
                <div className="actions">
                  <button
                    className="action-btn view"
                    onClick={() => navigate(`/seller/product/${item.id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
                        onDeleteListing(item.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>
                No listings found matching your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
