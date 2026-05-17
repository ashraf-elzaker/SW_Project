import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { apiService } from "../Services/api";

export default function AddListing({ onListingAdded }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(1);
  const [images, setImages] = useState([]);

  
  const handleImages = (event) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...previews]);
  };

  
  const publishListing = async () => {
    if (!name || !description || !price || !stock) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      
      
      const form = new FormData();
      form.append('name', name);
      form.append('description', description);
      form.append('price', price);
      form.append('stock', stock);
      form.append('category', category || 'uncategorized');
      if (images && images.length && images[0].file) {
        form.append('image', images[0].file);
      }

      await apiService.createListing(form);

      alert("Listing Published!");

      
      setName("");
      setCategory("");
      setDescription("");
      setPrice("");
      setStock(1);
      setImages([]);

      
      if (onListingAdded) onListingAdded();
    } catch (err) {
      console.error('Error details:', err);
      const errorMsg = err.response?.data?.detail || err.response?.data?.error || JSON.stringify(err.response?.data) || err.message;
      alert(`Error publishing listing: ${errorMsg}`);
    }
  };
  return (
    <div className="main-area">
      <div className="header">
        <h1>Create a New Listing</h1>
      </div>

      <div className="form-card">
        <div className="form-row">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="e.g. Reclaimed Oak Beams"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
          <textarea
            placeholder="Describe the product’s condition, dimensions, and origin…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group small">
          <label>Price</label>
          <input
            type="number"
            placeholder="$ 0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group small">
          <label>Stock</label>
          <input
            type="number"
            min={1}
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Product Photos</label>
          <label className="upload-box">
            <FiUpload className="upload-icon" />
            <div>Click to upload or drag and drop</div>
            <small>PNG, JPG, SVG (max 800x400px)</small>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
              hidden
            />
          </label>

          <div className="preview-row">
            {images.map((img, index) => (
              <img key={index} src={img.preview} alt="" className="preview-img" />
            ))}
          </div>
        </div>

        <div className="buttons-row">
          <button className="btn-secondary">Save as Draft</button>
          <button className="btn-primary" onClick={publishListing}>
            Publish Listing
          </button>
        </div>
      </div>
    </div>
  );
}
