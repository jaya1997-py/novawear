"use client";

import { useState } from "react";

export default function ProductForm() {
  const [imagePreview, setImagePreview] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setProduct((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setImagePreview(imageUrl);
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Product:", product);

    alert(
      "Form produk berhasil dibuat. Penyimpanan online akan kita sambungkan pada tahap berikutnya."
    );
  }

  return (
    <form
      className="product-form"
      onSubmit={handleSubmit}
    >

      <div className="product-form-grid">

        {/* IMAGE */}
        <div className="product-form-section">

          <div className="form-section-heading">
            <p>PRODUCT IMAGE</p>
            <h2>Product Photo</h2>
          </div>

          <label
            htmlFor="product-image"
            className={`image-upload ${
              imagePreview ? "has-image" : ""
            }`}
          >

            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Product preview"
              />
            ) : (
              <>
                <div className="upload-icon">
                  ↑
                </div>

                <strong>
                  Upload Product Image
                </strong>

                <span>
                  JPG, PNG or WEBP
                </span>

                <small>
                  Click to select an image
                </small>
              </>
            )}

          </label>

          <input
            id="product-image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            hidden
          />

        </div>

        {/* INFORMATION */}
        <div className="product-form-section">

          <div className="form-section-heading">
            <p>PRODUCT INFORMATION</p>
            <h2>Details</h2>
          </div>

          <div className="form-field">
            <label htmlFor="name">
              Product Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Example: Essential Black Hoodie"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">

            <div className="form-field">
              <label htmlFor="price">
                Price
              </label>

              <div className="price-input">
                <span>Rp</span>

                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="249000"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="stock">
                Stock
              </label>

              <input
                id="stock"
                name="stock"
                type="number"
                placeholder="20"
                min="0"
                value={product.stock}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-field">
            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">
                Select category
              </option>

              <option value="T-Shirt">
                T-Shirt
              </option>

              <option value="Hoodie">
                Hoodie
              </option>

              <option value="Jacket">
                Jacket
              </option>

              <option value="Pants">
                Pants
              </option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="6"
              placeholder="Describe your product..."
              value={product.description}
              onChange={handleChange}
            />
          </div>

        </div>

      </div>

      <div className="product-form-footer">

        <button
          type="button"
          className="form-cancel-button"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="form-save-button"
        >
          Save Product →
        </button>

      </div>

    </form>
  );
}