import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiService } from '@seller/Services/api';
import './ProductDetails.css';
import { fallbackImage } from './productImageLibrary';

const defaultProduct = {
  id: 'mock0',
  name: 'Loose Fit Hoodie',
  price: 24.99,
  oldPrice: 49.99,
  rating: 4.5,
  reviews: 128,
  brand: 'NexTGen',
  description: 'Comfortable and stylish hoodie that works for any occasion. Premium fabric with excellent durability.',
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: ['#1a1a1a', '#ffffff', '#6b5b45', '#2c3e50'],
  stock: 45,
  seller_email: 'seller@example.com',
};

const resolveImageSource = (image, fallback) => {
  if (!image) return fallback;
  if (typeof image !== 'string') return image;
  if (image.startsWith('data:') || image.startsWith('blob:') || image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  if (image.startsWith('/')) return image;
  return `/assets/${image.replace(/^\.?\/?/, '')}`;
};

function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProduct() {
      setLoading(true);
      try {
        const data = await apiService.getListing(id);
        if (!mounted) return;
        const resolved = data || defaultProduct;
        setProduct({
          ...defaultProduct,
          ...resolved,
          image: resolveImageSource(resolved?.image, fallbackImage),
        });
      } catch (error) {
        if (!mounted) return;
        setProduct({
          ...defaultProduct,
          id: id || defaultProduct.id,
          image: fallbackImage,
        });
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadProduct();
    return () => {
      mounted = false;
    };
  }, [id]);

  const current = product || defaultProduct;
  const routeImage = location.state?.image;
  const mainImage = resolveImageSource(routeImage || current.image, fallbackImage);

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = existingCart.findIndex((item) => item.id === current.id);

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push({
        id: current.id,
        name: current.name,
        price: current.price,
        stock: current.stock,
        img: current.image,
        category: 'Apparel',
        size: selectedSize,
        color: current.colors?.[selectedColor] || '#000',
        quantity: quantity,
      });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('storage'));
    navigate('/cart');
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);
    return (
      <>
        {[...Array(full)].map((_, i) => <span key={`full-${i}`}>★</span>)}
        {hasHalf && <span key="half">★</span>}
        {[...Array(empty)].map((_, i) => <span key={`empty-${i}`}>☆</span>)}
      </>
    );
  };

  if (loading) {
    return <div className="pd-loading">Loading...</div>;
  }

  return (
    <div className="pd-container">
      <header className="pd-header">
        <div className="pd-header-left">
          <button type="button" className="pd-back-btn" onClick={() => navigate('/buyer')}>← Back</button>
        </div>
        <div className="pd-header-right">
          <button type="button" className="pd-icon-btn" title="Account">👤</button>
          <button type="button" className="pd-icon-btn" title="Wishlist">♡</button>
          <button type="button" className="pd-icon-btn" onClick={() => navigate('/cart')} title="Cart">🛒</button>
        </div>
      </header>

      <main className="pd-main">
        <section className="pd-gallery">
          <div className="pd-main-image-container">
            <img
              src={mainImage}
              alt={current.name}
              className="pd-main-image"
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
            />
          </div>
        </section>

        <section className="pd-details">
          <div className="pd-header-info">
            <h1 className="pd-title">{current.name}</h1>
            <button type="button" className="pd-wishlist-btn" title="Add to wishlist">♡</button>
          </div>

          <div className="pd-price-section">
            <span className="pd-price">${Number(current.price || 0).toFixed(2)}</span>
            {current.oldPrice && <span className="pd-old-price">${Number(current.oldPrice || 0).toFixed(2)}</span>}
          </div>

          <div className="pd-rating">
            <div className="pd-stars">{renderStars(current.rating || 4.5)}</div>
            <span className="pd-review-count">({current.reviews || 128} reviews)</span>
          </div>

          <p className="pd-description">{current.description}</p>

          <div className="pd-option-group">
            <label className="pd-label">Size</label>
            <div className="pd-sizes">
              {current.sizes?.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`pd-size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="pd-option-group">
            <label className="pd-label">Color</label>
            <div className="pd-colors">
              {current.colors?.map((color, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`pd-color-btn ${selectedColor === idx ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(idx)}
                  title={`Color ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="pd-delivery-info">
            <div className="pd-delivery-item">
              <span className="pd-delivery-icon">📦</span>
              <div>
                <span className="pd-delivery-label">Free Shipping</span>
                <span className="pd-delivery-text">On orders over $50</span>
              </div>
            </div>
            <div className="pd-delivery-item">
              <span className="pd-delivery-icon">⚡</span>
              <div>
                <span className="pd-delivery-label">2-3 Days Delivery</span>
                <span className="pd-delivery-text">Fast delivery available</span>
              </div>
            </div>
          </div>

          <div className="pd-action-group">
            <div className="pd-quantity">
              <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button type="button" className="pd-add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>

          <div className="pd-seller-info">
            <span>👤 Sold by: {current.seller_email?.split('@')[0] || 'Official Store'}</span>
            <span>✓ {current.stock} items in stock</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductDetails;
