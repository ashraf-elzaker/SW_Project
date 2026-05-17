import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../Services/api';

export default function EditListing(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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
      }catch(e){ console.error('Failed to fetch listing', e); }
      finally{ if(mounted) setLoading(false); }
    })();
    return () => { mounted = false };
  }, [id]);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if(!f) return;
    setImageFile(f);
    setImagePreview(URL.createObjectURL(f));
  }

  const save = async () => {
    try{
      const form = new FormData();
      form.append('name', name);
      form.append('description', description);
      form.append('price', price);
      form.append('stock', stock);
      form.append('category', category || 'uncategorized');
      if(imageFile) form.append('image', imageFile);
      await apiService.updateListing(id, form);
      alert('Listing updated');
      navigate('/seller/listings');
    }catch(e){
      console.error('Save error', e);
      alert('Failed to update listing: ' + (e.response?.data?.detail || e.message));
    }
  }

  if(loading) return <div className="main-area">Loading...</div>;

  return (
    <div className="main-area">
      <div className="header">
        <h1>Edit Listing</h1>
      </div>

      <div className="form-card">
        <div className="form-row">
          <div className="form-group">
            <label>Product Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={(e)=>setCategory(e.target.value)}>
              <option value="">Select a category</option>
              <option value="wood">Wood</option>
              <option value="metal">Metal</option>
              <option value="furniture">Furniture</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Detailed Description</label>
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} />
        </div>

        <div className="form-group small">
          <label>Price</label>
          <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} />
        </div>

        <div className="form-group small">
          <label>Stock</label>
          <input type="number" min={1} value={stock} onChange={(e)=>setStock(Number(e.target.value))} />
        </div>

        <div className="form-group">
          <label>Product Photo</label>
          <input type="file" accept="image/*" onChange={handleFile} />
          {imagePreview && <div style={{marginTop:12}}><img src={imagePreview} alt="preview" style={{width:160, height:120, objectFit:'cover', borderRadius:8}}/></div>}
        </div>

        <div className="buttons-row">
          <button className="btn-primary" onClick={save}>Save Changes</button>
          <button className="btn-secondary" onClick={()=>navigate('/seller/listings')}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
