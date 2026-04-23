import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../Services/api';

const placeholder =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
      <rect width="600" height="600" fill="#f4efe7"/>
      <rect x="120" y="140" width="360" height="250" rx="24" fill="#ffffff"/>
      <rect x="192" y="232" width="216" height="106" rx="34" fill="#b2a18e"/>
      <text x="300" y="500" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" fill="#8c755f">Product Image</text>
    </svg>
  `);

export default function SellerOrderDetails(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try{
        const data = await apiService.getOrder(id);
        if(mounted) setOrder(data);
      }catch(e){ console.error('Failed to load order', e); }
      finally{ if(mounted) setLoading(false); }
    })();
    return () => { mounted = false };
  }, [id]);

  if(loading) return <div className="main-area">Loading...</div>;
  if(!order) return <div className="main-area">Order not found</div>;

  return (
    <div className="main-area">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)} style={{backgroundColor:'transparent', border:'none'}}>← Back</button>
        <h1>Order #{order.id}</h1>
      </div>

      <div className="card" style={{padding:20}}>
        <div style={{display:'flex', gap:16}}>
          <div>
            <img src={order.product_info?.image || placeholder} alt={order.product_info?.name} style={{width:220, height:220, objectFit:'cover', borderRadius:8}} />
          </div>
          <div>
            <h2>{order.product_info?.name}</h2>
            <p>Quantity: {order.quantity}</p>
            <p>Buyer: {order.buyer_info?.username} ({order.buyer_info?.email})</p>
            <p>Total: EGP {order.total_price}</p>
            <p>Status: {order.status}</p>
            <p>Ordered at: {new Date(order.created_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
