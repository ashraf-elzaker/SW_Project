import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Boxes, ShoppingCart, Mail, Settings as SettingsIcon, LogOut, Store } from "lucide-react";
import { apiService } from "@seller/Services/api";
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from './useAuth';


import Dashboard from "@seller/Pages/Dashboard.jsx";
import AddListing from "@seller/Pages/AddListing.jsx";
import Listings from "@seller/Pages/Listing.jsx";
import SellerProductDetails from "@seller/Pages/ProductDetails.jsx";
import Orders from "@seller/Pages/Orders.jsx";
import SellerOrderDetails from "@seller/Pages/SellerOrderDetails.jsx";
import EditListing from "@seller/Pages/EditListing.jsx";
import Messages from "@seller/Pages/Messages.jsx";
import Settings from "@seller/Pages/Settings.jsx";
import BuyerProductDetails from "@buyer/ProductDetails.jsx";


import Cart from "@buyer/Cart.jsx";
import PurchaseNotifications from "@buyer/PurchaseNotifications.jsx";
import SignUpPage from "@buyer/SignUp.jsx";
import Login from "@buyer/login.jsx";
import BuyerDashboard from "@buyer/Buyer_dashboard.jsx";
import BuyerPurchases from "@buyer/BuyerPurchases.jsx";
import BuyerOrderDetails from "@buyer/BuyerOrderDetails.jsx";


function SellerLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const sellerNavLinks = [
    { to: "/seller", label: "Dashboard", end: true, icon: LayoutDashboard },
    { to: "/seller/create-listing", label: "Add Listing", icon: PlusCircle },
    { to: "/seller/listings", label: "Listings", icon: Boxes },
    { to: "/seller/orders", label: "Orders", icon: ShoppingCart },
    { to: "/seller/messages", label: "Messages", icon: Mail },
    { to: "/seller/settings", label: "Settings", icon: SettingsIcon },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="seller-root" style={{ 
      display: "flex", 
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: "#f8f9faff" 
    }}>
      <style>{`
        .seller-topbar {
          position: sticky;
          top: 0;
          z-index: 60;
          padding: 16px 24px;
          min-height: 88px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
          background: linear-gradient(120deg, rgba(255, 249, 236, 0.96) 0%, rgba(248, 238, 219, 0.96) 55%, rgba(242, 226, 198, 0.94) 100%);
          border-bottom: 1px solid rgba(139, 69, 19, 0.22);
          box-shadow: 0 12px 28px rgba(139, 69, 19, 0.12), inset 0 -1px 0 rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(10px);
        }

        .seller-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #6b3f1f;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.5px;
          margin-right: 8px;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.62);
          border: 1px solid rgba(139, 69, 19, 0.16);
        }

        .seller-nav-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .seller-nav-link {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          min-height: 48px;
          padding: 12px 18px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 800;
          color: #6b4e3d;
          background: linear-gradient(135deg, #fff3df 0%, #f7e3c2 100%);
          border: 1px solid rgba(139, 69, 19, 0.2);
          box-shadow: 0 3px 10px rgba(139, 69, 19, 0.08), inset 0 1px 0 rgba(255,255,255,0.6);
          transition: all 0.24s ease;
        }

        .seller-nav-link:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 24px rgba(139, 69, 19, 0.18);
          background: linear-gradient(135deg, #ffeccf 0%, #f0d8ad 100%);
        }

        .seller-nav-link.active {
          color: #fff;
          background: linear-gradient(135deg, #b35f2f 0%, #8B4513 55%, #6f3510 100%);
          border-color: rgba(111, 53, 16, 0.5);
          box-shadow: 0 14px 26px rgba(139, 69, 19, 0.28), inset 0 1px 0 rgba(255,255,255,0.25);
        }

        .seller-user-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .seller-user-pill {
          color: #6b4e3d;
          font-size: 13px;
          font-weight: 700;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(139,69,19,0.18);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.75);
          max-width: 220px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .seller-logout-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 48px;
          border: 1px solid rgba(139, 69, 19, 0.36);
          background: linear-gradient(135deg, #fff 0%, #f7ecdc 100%);
          color: #8B4513;
          border-radius: 999px;
          padding: 11px 18px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 6px 14px rgba(139, 69, 19, 0.12);
          transition: all 0.22s ease;
        }

        .seller-logout-btn:hover {
          background: linear-gradient(135deg, #8B4513 0%, #6f3510 100%);
          color: #fff;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 22px rgba(139, 69, 19, 0.24);
        }

        @media (max-width: 900px) {
          .seller-topbar {
            padding: 12px 14px;
            min-height: 74px;
          }

          .seller-nav-link {
            min-height: 40px;
            padding: 8px 12px;
            font-size: 12px;
          }

          .seller-logout-btn {
            min-height: 40px;
            padding: 8px 12px;
            font-size: 12px;
          }

          .seller-user-pill {
            max-width: 140px;
            font-size: 12px;
            padding: 8px 10px;
          }
        }
      `}</style>

      <header className="seller-topbar">
        <div className="seller-nav-wrap">
          <div className="seller-brand">
            <Store size={16} />
            <span>Seller Panel</span>
          </div>
          {sellerNavLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `seller-nav-link${isActive ? " active" : ""}`}
            >
              <link.icon size={16} />
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="seller-user-actions">
          <span className="seller-user-pill" title={user?.username || user?.email || "Seller"}>
            {user?.username || user?.email || "Seller"}
          </span>
          <button
            onClick={handleLogout}
            className="seller-logout-btn"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <div className="seller-content" style={{ 
        flex: 1, 
        padding: "20px 24px",
        overflowY: "auto"
      }}>
        <div style={{
          width: "100%"
        }}>
          <Outlet /> {}
        </div>
      </div>
    </div>
  );
}

function WTVMarket() {
  const [listings, setListings] = useState([]);
  const [activities, setActivities] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        if (user && user.user_type === 'seller') {
          const data = await apiService.getListings();
          setListings(Array.isArray(data) ? data : []);
        } else {
          setListings([]);
        }

        
        const activityData = await apiService.getActivities();
        setActivities(Array.isArray(activityData) ? activityData : []);
      } catch (err) {
        console.error("Error loading data:", err);
        setListings([]);
        setActivities([]);
      }
    };

    fetchData();
  }, [user]);

  const deleteListing = async (id) => {
    try {
      await apiService.deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Error deleting listing:", err);
    }
  };

  const addListing = async () => {
    try {
      const data = await apiService.getListings();
      setListings(data);

      const activityData = await apiService.getActivities();
      setActivities(activityData);
    } catch (err) {
      console.error("Error reloading listings:", err);
    }
  };

  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<SignUpPage />} />

        {}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />

        {}
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/buyer/purchases" element={<BuyerPurchases />} />
        <Route path="/buyer/purchases/:id" element={<ProtectedRoute allowedRole="buyer"><BuyerOrderDetails /></ProtectedRoute>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/notifications" element={<PurchaseNotifications />} />

  {}
  <Route path="/buyer" element={<ProtectedRoute allowedRole="buyer"><BuyerDashboard /></ProtectedRoute>} />
  <Route path="/buyer/purchases" element={<ProtectedRoute allowedRole="buyer"><BuyerPurchases /></ProtectedRoute>} />
  <Route path="/cart" element={<ProtectedRoute allowedRole="buyer"><Cart /></ProtectedRoute>} />
  <Route path="/notifications" element={<ProtectedRoute allowedRole="buyer"><PurchaseNotifications /></ProtectedRoute>} />

        {}
        <Route path="/seller" element={<ProtectedRoute allowedRole="seller"><SellerLayout /></ProtectedRoute>}>
          <Route
            index
            element={
              <Dashboard
                listings={listings}
                activities={activities}
                onDeleteListing={deleteListing}
              />
            }
          />

          <Route
            path="create-listing"
            element={<AddListing onListingAdded={addListing} />}
          />

          <Route
            path="listings"
            element={
              <Listings listings={listings} onDeleteListing={deleteListing} />
            }
          />

          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<SellerOrderDetails />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />

          <Route path="product/:id" element={<SellerProductDetails />} />
          <Route path="edit/:id" element={<EditListing />} />
        </Route>

        {}
        <Route path="/product/:id" element={<BuyerProductDetails />} />
      </Routes>
    </Router>
  );
}

export default WTVMarket;
