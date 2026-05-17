import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../Services/api';
import { 
  Save, X, Upload, Image, Package, Tag, 
  DollarSign, Layers, FileText, ArrowLeft,
  Sparkles, CheckCircle, AlertCircle, Loader,
  Camera, Edit3, Hash, ShoppingBag, Star
} from 'lucide-react';

export default function EditListing(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [hoveredField, setHoveredField] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Categories with icons and colors
  const categories = [
    { id: 'wood', name: 'Wood', icon: '🪵', color: '#8B4513', bg: '#FDF6E3' },
    { id: 'metal', name: 'Metal', icon: '⚙️', color: '#4A5568', bg: '#EDF2F7' },
    { id: 'furniture', name: 'Furniture', icon: '🪑', color: '#A0522D', bg: '#F5F5DC' },
    { id: 'electronics', name: 'Electronics', icon: '📱', color: '#2563EB', bg: '#DBEAFE' },
    { id: 'uncategorized', name: 'Other', icon: '📦', color: '#6B7280', bg: '#F3F4F6' },
  ];

  useEffect(() => {
    let mounted = true;
    (async () => {
      try{
        const data = await apiService.getListing(id);
        if(mounted){
          setName(data.name || '');
          setCategory(data.category || '');
          setDescription(data.description || '');
          setPrice(data.price || '');
          setStock(data.stock || 1);
          setImagePreview(data.image || null);
        }
      }catch(e){ 
        console.error('Failed to fetch listing', e);
        // Show error toast or message
      }
      finally{ if(mounted) setLoading(false); }
    })();
    return () => { mounted = false };
  }, [id]);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if(!f) return;
    setImageFile(f);
    setImagePreview(URL.createObjectURL(f));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Product name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!price || price <= 0) newErrors.price = 'Valid price is required';
    if (!stock || stock < 1) newErrors.stock = 'Stock must be at least 1';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const save = async () => {
    if (!validateForm()) {
      // Shake animation on error
      const form = document.querySelector('.form-card');
      form.style.animation = 'shake 0.5s ease';
      setTimeout(() => form.style.animation = '', 500);
      return;
    }

    setSaving(true);
    try{
      const form = new FormData();
      form.append('name', name);
      form.append('description', description);
      form.append('price', price);
      form.append('stock', stock);
      form.append('category', category || 'uncategorized');
      if(imageFile) form.append('image', imageFile);
      
      await apiService.updateListing(id, form);
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/seller/listings');
      }, 1500);
    }catch(e){
      console.error('Save error', e);
      alert('Failed to update listing: ' + (e.response?.data?.detail || e.message));
    } finally {
      setSaving(false);
    }
  };

  // Get current category details
  const currentCategory = categories.find(c => c.id === category) || categories[4];

  if(loading) {
    return (
      <div className="main-area">
        <style>{styles}</style>
        <div className="loading-container">
          <div className="loading-spinner">
            <Loader size={48} className="spinner" color="#D2691E" />
          </div>
          <p style={{ marginTop: '1rem', color: '#8B4513', fontSize: '1.1rem' }}>Loading your listing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-area">
      <style>{styles}</style>
      
      {/* Success Overlay */}
      {success && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">
              <CheckCircle size={48} color="#10B981" />
            </div>
            <h2>Success!</h2>
            <p>Your listing has been updated</p>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        </div>
      )}

      {/* Header with creative design */}
      <div className="header">
        <button className="back-button" onClick={()=>navigate('/seller/listings')}>
          <ArrowLeft size={20} />
        </button>
        <div className="header-content">
          <div className="header-icon">
            <Edit3 size={24} color="white" />
          </div>
          <div>
            <h1>Edit Listing</h1>
            <p>Update your product details</p>
          </div>
        </div>
        <div className="header-badge">
          <Sparkles size={16} color="#FFD700" />
          <span>Premium Edit</span>
        </div>
      </div>

      <div className="form-card">
        {/* Product Image Section */}
        <div className="image-section">
          <div 
            className={`image-uploader ${imagePreview ? 'has-image' : ''}`}
            onMouseEnter={() => setHoveredField('image')}
            onMouseLeave={() => setHoveredField(null)}
            onClick={() => document.getElementById('file-input').click()}
          >
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="preview" className="image-preview" />
                <div className="image-overlay">
                  <Camera size={24} color="white" />
                  <span>Change photo</span>
                </div>
              </>
            ) : (
              <div className="upload-placeholder">
                <Upload size={32} color={currentCategory?.color || '#D2691E'} />
                <p>Click to upload product photo</p>
                <small>PNG, JPG up to 5MB</small>
              </div>
            )}
            <input 
              id="file-input"
              type="file" 
              accept="image/*" 
              onChange={handleFile} 
              style={{ display: 'none' }}
            />
          </div>
          
          {imagePreview && (
            <div className="image-actions">
              <button 
                className="image-action-btn"
                onClick={() => {
                  setImagePreview(null);
                  setImageFile(null);
                }}
              >
                <X size={16} />
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="form-fields">
          {/* Product Name */}
          <div 
            className={`form-group ${hoveredField === 'name' ? 'hovered' : ''} ${errors.name ? 'error' : ''}`}
            onMouseEnter={() => setHoveredField('name')}
            onMouseLeave={() => setHoveredField(null)}
          >
            <label>
              <Package size={16} color="#D2691E" />
              Product Name
              <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <input 
                value={name} 
                onChange={(e)=>setName(e.target.value)}
                placeholder="e.g., Wooden Dining Table"
                className={errors.name ? 'error' : ''}
              />
              {name && <CheckCircle size={16} className="input-success" color="#10B981" />}
            </div>
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Category */}
          <div 
            className={`form-group ${hoveredField === 'category' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredField('category')}
            onMouseLeave={() => setHoveredField(null)}
          >
            <label>
              <Tag size={16} color="#D2691E" />
              Category
            </label>
            <div className="category-selector">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`category-option ${category === cat.id ? 'selected' : ''}`}
                  style={{ 
                    backgroundColor: category === cat.id ? cat.color : cat.bg,
                    color: category === cat.id ? 'white' : cat.color,
                    borderColor: cat.color
                  }}
                  onClick={() => setCategory(cat.id)}
                >
                  <span className="category-icon">{cat.icon}</span>
                  <span className="category-name">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div 
            className={`form-group ${hoveredField === 'description' ? 'hovered' : ''} ${errors.description ? 'error' : ''}`}
            onMouseEnter={() => setHoveredField('description')}
            onMouseLeave={() => setHoveredField(null)}
          >
            <label>
              <FileText size={16} color="#D2691E" />
              Detailed Description
              <span className="required">*</span>
            </label>
            <div className="textarea-wrapper">
              <textarea 
                value={description} 
                onChange={(e)=>setDescription(e.target.value)}
                placeholder="Describe your product in detail..."
                rows={5}
                className={errors.description ? 'error' : ''}
              />
            </div>
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          {/* Price and Stock */}
          <div className="form-row">
            <div 
              className={`form-group small ${hoveredField === 'price' ? 'hovered' : ''} ${errors.price ? 'error' : ''}`}
              onMouseEnter={() => setHoveredField('price')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <label>
                <DollarSign size={16} color="#D2691E" />
                Price
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <span className="currency-symbol">EGP</span>
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e)=>setPrice(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={errors.price ? 'error' : ''}
                />
              </div>
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            <div 
              className={`form-group small ${hoveredField === 'stock' ? 'hovered' : ''} ${errors.stock ? 'error' : ''}`}
              onMouseEnter={() => setHoveredField('stock')}
              onMouseLeave={() => setHoveredField(null)}
            >
              <label>
                <Layers size={16} color="#D2691E" />
                Stock
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input 
                  type="number" 
                  min={1} 
                  value={stock} 
                  onChange={(e)=>setStock(Number(e.target.value))}
                  placeholder="1"
                  className={errors.stock ? 'error' : ''}
                />
                <span className="unit-symbol">units</span>
              </div>
              {errors.stock && <span className="error-message">{errors.stock}</span>}
            </div>
          </div>

          {/* Preview Card */}
          <div className="preview-card">
            <div className="preview-header">
              <Star size={16} color="#FFD700" />
              <span>Live Preview</span>
            </div>
            <div className="preview-content">
              <div className="preview-image">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" />
                ) : (
                  <div className="preview-placeholder">
                    <Image size={24} color="#DEB887" />
                  </div>
                )}
              </div>
              <div className="preview-details">
                <h4>{name || 'Product Name'}</h4>
                <div className="preview-category">
                  <span>{currentCategory?.icon}</span>
                  <span>{currentCategory?.name}</span>
                </div>
                <p className="preview-price">EGP {price || '0'}</p>
                <div className="preview-stock">
                  <span className={`stock-badge ${stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="buttons-row">
          <button 
            className="btn-primary" 
            onClick={save}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader size={18} className="spinner" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Save Changes</span>
              </>
            )}
          </button>
          <button 
            className="btn-secondary" 
            onClick={()=>navigate('/seller/listings')}
            disabled={saving}
          >
            <X size={18} />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Creative CSS styles
const styles = `
  .main-area {
    padding: 2rem;
    background: linear-gradient(135deg, #f8f5ec 0%, #f0e9db 100%);
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  /* Loading Animation */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
  }

  .loading-spinner {
    animation: float 3s infinite ease-in-out;
  }

  .spinner {
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  /* Success Overlay */
  .success-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }

  .success-modal {
    background: white;
    padding: 2rem;
    border-radius: 1.5rem;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    animation: slideUp 0.3s ease;
  }

  .success-icon {
    width: 80px;
    height: 80px;
    background: #ECFDF5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    animation: pulse 2s infinite;
  }

  .success-modal h2 {
    color: #10B981;
    margin-bottom: 0.5rem;
  }

  .success-modal .progress-bar {
    width: 200px;
    height: 4px;
    background: #E5E7EB;
    border-radius: 2px;
    margin-top: 1rem;
    overflow: hidden;
  }

  .success-modal .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #10B981, #34D399);
    animation: progress 1.5s linear forwards;
  }

  @keyframes progress {
    0% { width: 0%; }
    100% { width: 100%; }
  }

  /* Header Styles */
  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: white;
    border-radius: 1.5rem;
    box-shadow: 0 10px 30px rgba(139,69,19,0.1);
    position: relative;
    overflow: hidden;
  }

  .header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #D2691E, #8B4513, #D2691E);
  }

  .back-button {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: none;
    background: #F5F5DC;
    color: #8B4513;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .back-button:hover {
    transform: translateX(-3px);
    background: #DEB887;
    color: white;
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
  }

  .header-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #D2691E, #8B4513);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-content h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #654321;
    margin-bottom: 0.25rem;
  }

  .header-content p {
    color: #A0522D;
    font-size: 0.9rem;
  }

  .header-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #FEF3C7, #FDE68A);
    border-radius: 2rem;
    color: #92400E;
    font-size: 0.85rem;
    font-weight: 600;
    animation: glow 2s infinite;
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 10px rgba(245,158,11,0.3); }
    50% { box-shadow: 0 0 20px rgba(245,158,11,0.5); }
  }

  /* Form Card */
  .form-card {
    background: white;
    border-radius: 2rem;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(139,69,19,0.15);
    animation: slideUp 0.5s ease;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }

  /* Image Section */
  .image-section {
    margin-bottom: 2rem;
  }

  .image-uploader {
    width: 100%;
    height: 240px;
    border: 2px dashed #DEB887;
    border-radius: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    background: #FDF6E3;
  }

  .image-uploader:hover {
    border-color: #D2691E;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(210,105,30,0.2);
  }

  .image-uploader.has-image {
    border: none;
    padding: 0;
  }

  .image-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .image-uploader:hover .image-overlay {
    opacity: 1;
  }

  .upload-placeholder {
    text-align: center;
    color: #A0522D;
  }

  .upload-placeholder p {
    margin: 0.5rem 0 0.25rem;
    font-weight: 600;
  }

  .upload-placeholder small {
    font-size: 0.75rem;
    opacity: 0.7;
  }

  .image-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .image-action-btn {
    padding: 0.5rem 1rem;
    background: #FEE2E2;
    border: none;
    border-radius: 2rem;
    color: #DC2626;
    font-size: 0.85rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .image-action-btn:hover {
    background: #FECACA;
    transform: translateY(-2px);
  }

  /* Form Fields */
  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    transition: all 0.3s ease;
  }

  .form-group.hovered {
    transform: translateX(5px);
  }

  .form-group.error label {
    color: #DC2626;
  }

  .form-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: #654321;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .required {
    color: #DC2626;
    margin-left: 0.25rem;
  }

  .input-wrapper {
    position: relative;
  }

  .input-wrapper input,
  .textarea-wrapper textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #F0EDE4;
    border-radius: 1rem;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    background: white;
  }

  .input-wrapper input:focus,
  .textarea-wrapper textarea:focus {
    outline: none;
    border-color: #D2691E;
    box-shadow: 0 0 0 3px rgba(210,105,30,0.1);
  }

  .input-wrapper input.error,
  .textarea-wrapper textarea.error {
    border-color: #DC2626;
  }

  .input-success {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    animation: popIn 0.3s ease;
  }

  @keyframes popIn {
    0% { transform: translateY(-50%) scale(0); }
    50% { transform: translateY(-50%) scale(1.2); }
    100% { transform: translateY(-50%) scale(1); }
  }

  .currency-symbol,
  .unit-symbol {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #8B4513;
    font-weight: 600;
  }

  .input-wrapper input[type="number"] {
    padding-left: 3rem;
  }

  .unit-symbol {
    left: auto;
    right: 1rem;
    color: #A0522D;
    font-size: 0.85rem;
  }

  .error-message {
    display: block;
    margin-top: 0.5rem;
    color: #DC2626;
    font-size: 0.8rem;
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Category Selector */
  .category-selector {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .category-option {
    padding: 0.75rem;
    border-radius: 1rem;
    border: 2px solid transparent;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }

  .category-option:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  .category-option.selected {
    border-color: #D2691E;
    box-shadow: 0 5px 15px rgba(210,105,30,0.2);
  }

  .category-icon {
    font-size: 1.2rem;
  }

  .category-name {
    font-size: 0.85rem;
  }

  /* Preview Card */
  .preview-card {
    background: #FDF6E3;
    border-radius: 1.5rem;
    padding: 1.5rem;
    border: 2px solid #F0EDE4;
    transition: all 0.3s ease;
  }

  .preview-card:hover {
    border-color: #DEB887;
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(139,69,19,0.1);
  }

  .preview-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #F0EDE4;
    color: #8B4513;
    font-weight: 600;
  }

  .preview-content {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .preview-image {
    width: 80px;
    height: 80px;
    border-radius: 1rem;
    overflow: hidden;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .preview-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .preview-placeholder {
    color: #DEB887;
  }

  .preview-details {
    flex: 1;
  }

  .preview-details h4 {
    color: #654321;
    margin-bottom: 0.25rem;
  }

  .preview-category {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.85rem;
    color: #A0522D;
    margin-bottom: 0.25rem;
  }

  .preview-price {
    font-size: 1.1rem;
    font-weight: 700;
    color: #D2691E;
    margin-bottom: 0.25rem;
  }

  .preview-stock {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .stock-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 2rem;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .stock-badge.in-stock {
    background: #ECFDF5;
    color: #10B981;
  }

  .stock-badge.out-of-stock {
    background: #FEF2F2;
    color: #DC2626;
  }

  /* Form Row */
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group.small {
    flex: 1;
  }

  /* Buttons Row */
  .buttons-row {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid #F0EDE4;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.9rem 2rem;
    border: none;
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
    justify-content: center;
  }

  .btn-primary {
    background: linear-gradient(135deg, #D2691E, #8B4513);
    color: white;
    position: relative;
    overflow: hidden;
  }

  .btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  .btn-primary:hover::before {
    left: 100%;
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(210,105,30,0.4);
  }

  .btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .btn-secondary {
    background: #F5F5DC;
    color: #8B4513;
    border: 2px solid #DEB887;
  }

  .btn-secondary:hover {
    background: #DEB887;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(139,69,19,0.2);
  }

  .btn-secondary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .main-area {
      padding: 1rem;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .category-selector {
      grid-template-columns: 1fr 1fr;
    }

    .preview-content {
      flex-direction: column;
      text-align: center;
    }

    .buttons-row {
      flex-direction: column;
    }

    .header {
      flex-direction: column;
      text-align: center;
    }

    .header-content {
      flex-direction: column;
    }
  }

  /* Fade In Animation */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;