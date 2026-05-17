import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiTrash2, FiCheck } from 'react-icons/fi';
import { apiService } from '../Services/api';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await apiService.getListing(id);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="main-area">Loading...</div>;
  if (!product) return <div className="main-area">Product not found</div>;

  const handleDelete = async () => {
    if (!window.confirm('Delete this listing?')) return;
    try {
      await apiService.deleteListing(product.id);
      navigate('/');
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const markAsSold = async () => {
    try {
      const updated = await apiService.updateListing(product.id, { ...product, status: 'sold' });
      if (updated) setProduct(updated);
      alert('Marked as sold');
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  return (
    <div className="main-area">
      <div className="header" style={{ marginBottom: 20 }}>
        <button className="back-btn" onClick={() => navigate(-1)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <FiArrowLeft /> Back
        </button>
        <h1 style={{ marginTop: 10 }}>{product.name}</h1>
      </div>

      <div className="product-details-container">
        <div className="product-details-card">
          <div className="product-images">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="main-image"
                style={{ objectFit: 'cover', width: '100%', height: '400px', borderRadius: '12px' }}
              />
            ) : (
              <div
                className="no-image"
                style={{ width: '100%', height: '400px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', borderRadius: '12px' }}
              >
                No images available
              </div>
            )}
          </div>

          <div className="product-content">
            <div className="product-header">
              <h1>{product.name}</h1>
              <p className="product-price">EGP {Number(product.price).toFixed(2)}</p>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Listed On:</span>
                <span className="meta-value">{new Date(product.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="action-buttons">
              {product.status !== 'sold' && (
                <button className="btn-sold" onClick={markAsSold}>
                  <FiCheck /> Mark as Sold
                </button>
              )}
              <button className="btn-edit" onClick={() => navigate(`/seller/edit/${product.id}`)}>
                <FiEdit /> Edit Listing
              </button>
              <button className="btn-danger" onClick={handleDelete}>
                <FiTrash2 /> Delete Listing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
