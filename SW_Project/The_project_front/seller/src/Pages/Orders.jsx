import React, { useEffect, useState } from 'react';
import { apiService } from '../Services/api';

export default function Orders(){
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let polling = true;

    const load = async () => {
      try {
        const data = await apiService.getSellerOrders();
        if (mounted) setOrders(data || []);
      } catch (e) {
        console.error('Failed to load seller orders', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    
    load();

    
    const interval = setInterval(() => {
      if (polling) load();
    }, 5000);

    return () => { mounted = false; polling = false; clearInterval(interval); };
  }, []);

  return (
    <div className="main-area">
      <div className="header">
        <h1>Orders</h1>
        <p className="subtitle">Recent orders for your listings</p>
      </div>
      <div className="card" style={{padding: 20}}>
        {loading ? (
          <p>Loading orders…</p>
        ) : orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div>
            {orders.map(order => (
              <div key={order.id} style={{borderBottom: '1px solid #eee', padding: 12}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    {order.product_info?.image ? <img src={order.product_info.image} alt="" style={{width:80, height:80, objectFit:'cover', borderRadius:8}} /> : <div style={{width:80, height:80, backgroundColor:'#f1f1f1', borderRadius:8}}/>}
                    <div>
                      <strong>Order #{order.id}</strong>
                      <div>Product: {order.product_info?.name}</div>
                      <div>Quantity: {order.quantity}</div>
                      <div>Buyer: {order.buyer_info?.username} ({order.buyer_info?.email})</div>
                    </div>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <div>Total: EGP {order.total_price}</div>
                    <div>Status: {order.status}</div>
                    <div>Date: {new Date(order.created_at).toLocaleString()}</div>
                    <div style={{display:'flex', gap:8, justifyContent:'flex-end', marginTop:8}}>
                      <button className="action-btn" onClick={() => window.location.href = `/seller/orders/${order.id}`}>View</button>
                      {order.status !== 'shipped' && (
                        <button
                          className="action-btn"
                          style={{backgroundColor:'#f0ad4e', color:'#fff'}}
                          onClick={async () => {
                            try {
                              await apiService.updateOrder(order.id, { status: 'shipped' });
                              
                              const data = await apiService.getSellerOrders();
                              setOrders(data || []);
                            } catch (e) {
                              console.error('Failed to mark shipped', e.response?.data || e);
                              alert('Failed to update order status');
                            }
                          }}
                        >
                          Mark Shipped
                        </button>
                      )}
                      {order.status !== 'completed' && (
                        <button
                          className="action-btn"
                          style={{backgroundColor:'#28a745', color:'#fff'}}
                          onClick={async () => {
                            try {
                              await apiService.updateOrder(order.id, { status: 'completed' });
                              const data = await apiService.getSellerOrders();
                              setOrders(data || []);
                            } catch (e) {
                              console.error('Failed to mark completed', e.response?.data || e);
                              alert('Failed to update order status');
                            }
                          }}
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
