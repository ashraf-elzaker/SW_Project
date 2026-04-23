import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuyerPurchases.css';
import { productImages, fallbackImage } from './productImageLibrary';

export default function BuyerPurchases() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('#7d8755');

  const gallery = useMemo(() => productImages.slice(0, 5), []);
  const [activeImage, setActiveImage] = useState(gallery[0]);

  const recentlyViewed = [
    { id: 1, name: 'Lottie', price: 250.99, image: productImages[3] },
    { id: 2, name: 'Primrose', price: 320.99, image: productImages[1] },
    { id: 3, name: 'Lettie', price: 243.99, image: productImages[2] },
  ];

  const colorOptions = ['#eb9a45', '#a9a39a', '#7f8ea8', '#7d8755', '#2d5672'];

  return (
    <div className="bp-page">
      <header className="bp-header">
        <div className="bp-left-nav">
          <button type="button" className="bp-icon-btn" aria-label="menu">≡</button>
          <button type="button" className="bp-nav-btn" onClick={() => navigate('/buyer')}>Sofas</button>
          <button type="button" className="bp-nav-btn">Chairs</button>
          <button type="button" className="bp-nav-btn">Beds</button>
        </div>

        <h1 className="bp-brand">Furniture</h1>

        <div className="bp-right-nav">
          <button type="button" className="bp-icon-btn" aria-label="account">◌</button>
          <button type="button" className="bp-icon-btn" aria-label="favorite">♡</button>
          <button type="button" className="bp-icon-btn" onClick={() => navigate('/cart')} aria-label="cart">🛒</button>
        </div>
      </header>

      <main className="bp-main">
        <section className="bp-gallery-col">
          <div className="bp-main-image-wrap">
            <img src={activeImage || fallbackImage} alt="Selected product" className="bp-main-image" />
          </div>

          <div className="bp-recently">
            <div className="bp-recently-head">
              <p>Recently viewed</p>
              <div>
                <button type="button" className="bp-mini-nav">‹</button>
                <button type="button" className="bp-mini-nav">›</button>
              </div>
            </div>
            <div className="bp-recent-grid">
              {recentlyViewed.map((item) => (
                <article key={item.id} className="bp-recent-card" onClick={() => setActiveImage(item.image)}>
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <strong>$ {item.price.toFixed(2)}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bp-info-col">
          <div className="bp-info-grid">
            <div className="bp-thumbs">
              {gallery.map((thumb) => (
                <button
                  key={thumb}
                  type="button"
                  className={`bp-thumb ${activeImage === thumb ? 'is-active' : ''}`}
                  onClick={() => setActiveImage(thumb)}
                >
                  <img src={thumb} alt="product view" />
                </button>
              ))}
            </div>

            <div className="bp-details">
              <div className="bp-title-row">
                <h2>Ilana</h2>
                <button type="button" className="bp-fav">♡</button>
              </div>
              <p className="bp-desc">
                A sectional sofa or an L shaped sofa can make a great addition to your living room based on your needs.
              </p>
              <p className="bp-price">$ 430.99</p>
              <p className="bp-reviews">★ ★ ★ ★ ☆ <span>441 reviews</span></p>

              <p className="bp-label">Colour</p>
              <div className="bp-colors">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`bp-color ${selectedColor === color ? 'is-active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color}
                  />
                ))}
              </div>

              <div className="bp-actions-row">
                <button type="button" className="bp-buy-btn" onClick={() => navigate('/cart')}>
                  Buy Now
                </button>
                <button type="button" className="bp-cart-btn" onClick={() => navigate('/cart')}>
                  Add to basket
                </button>
              </div>

              <div className="bp-meta-line">
                <p>Dispatched in 5 - 7 weeks</p>
                <span>›</span>
              </div>
              <a href="#shipping" className="bp-link">Why the longer lead time?</a>
              <div className="bp-meta-line">
                <p>Home Delivery - $ 10</p>
                <span>›</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
