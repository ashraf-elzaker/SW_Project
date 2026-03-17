import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCards from "../Components/DashboardCards";
import { apiService } from '../Services/api';

export default function Dashboard({ listings = [] }) {
  const navigate = useNavigate();

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    
    const token = localStorage.getItem('wtv_access_token');
    const user = localStorage.getItem('currentUser');
    
    if (!token || !user) {
      
      navigate('/login', { replace: true });
    }

    
    let mounted = true;
    let polling = true;

    const loadRecent = async () => {
      try {
        const data = await apiService.getSellerOrders();
        if (mounted) setRecentOrders(data || []);
      } catch (e) {
        console.error('Failed to load recent orders', e);
      }
    };

    
    loadRecent();

    
    const interval = setInterval(() => {
      if (polling) loadRecent();
    }, 6000);

    return () => { mounted = false; polling = false; clearInterval(interval); };
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Overview of your marketplace</p>
      </div>

      {}
      <DashboardCards />

      {}
      <hr className="divider" />

      {}
      <div className="section">
        <h2 className="section-title">Latest Listings</h2>
        <table className="simple-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings && listings.length > 0 ? (
              listings.slice(0, 5).map((listing) => (
                <tr key={listing.id}>
                  <td>
                    <div className="product-info">
                      <div className="product-name">{listing.name}</div>
                      <div className="product-category">{listing.category}</div>
                    </div>
                  </td>
                  <td className="price">EGP {Number(listing.price).toFixed(2)}</td>
                  <td>{listing.status || 'active'}</td>
                  <td>
                    <div style={{display:'flex', gap:8}}>
                      <button className="action-btn" onClick={() => window.location.href = `/seller/product/${listing.id}`}>View</button>
                      <button className="action-btn" onClick={() => window.location.href = `/seller/edit/${listing.id}`}>Edit</button>
                      <button className="action-btn" style={{backgroundColor:'#e74c3c', color:'#fff'}} onClick={async () => {
                        if(!confirm('Delete listing?')) return;
                        try {
                          const res = await fetch(`/api/products/${listing.id}/`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('wtv_access_token')}` } });
                          if(res.ok) window.location.reload();
                          else alert('Failed to delete listing');
                        } catch(e){ console.error(e); alert('Failed to delete listing'); }
                      }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  No listings found. Create your first listing!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {}
      <hr className="divider" />

      {}
      <div className="section">
        <h2 className="section-title">Recent Sales</h2>
        <div className="activity-section">
          {recentOrders && recentOrders.length > 0 ? (
            recentOrders.slice(0,5).map(order => (
              <div key={order.id} className="activity-item">
                <strong className="activity-title">Order #{order.id} — {order.product_info?.name}</strong>
                <p className="activity-desc">Buyer: {order.buyer_info?.username} — Qty: {order.quantity} — Total: EGP {order.total_price}</p>
                <div style={{display:'flex', gap:8, marginTop:8}}>
                  <button className="action-btn" onClick={() => window.location.href = `/seller/orders/${order.id}`}>View</button>
                  <button className="action-btn" onClick={() => window.location.href = `/seller/product/${order.product}`}>View Product</button>
                </div>
              </div>
            ))
          ) : (
            <div className="activity-item">
              <strong className="activity-title">No recent sales</strong>
              <p className="activity-desc">You have not made any sales yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}