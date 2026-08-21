"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm() {

  const router =
    useRouter();


  const [
    imagePreview,
    setImagePreview
  ] = useState(null);


  const [
    imageData,
    setImageData
  ] = useState("");


  const [
    product,
    setProduct
  ] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });


  const [
    loading,
    setLoading
  ] = useState(false);


  const [
    error,
    setError
  ] = useState("");


  /*
  |--------------------------------------------------------------------------
  | HANDLE TEXT INPUT
  |--------------------------------------------------------------------------
  */

  function handleChange(event) {

    const {
      name,
      value,
    } = event.target;


    setProduct(
      (current) => ({
        ...current,

        [name]:
          value,
      })
    );
  }


  /*
  |--------------------------------------------------------------------------
  | HANDLE IMAGE
  |--------------------------------------------------------------------------
  */

  function handleImageChange(event) {

    const file =
      event.target.files?.[0];


    if (!file) {
      return;
    }


    /*
     * Maximum 2 MB
     */

    if (
      file.size >
      2 * 1024 * 1024
    ) {

      setError(
        "Ukuran gambar maksimal 2 MB."
      );

      event.target.value =
        "";

      return;
    }


    /*
     * Check format
     */

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];


    if (
      !allowedTypes.includes(
        file.type
      )
    ) {

      setError(
        "Format gambar harus JPG, PNG atau WEBP."
      );

      event.target.value =
        "";

      return;
    }


    setError("");


    /*
     * Preview
     */

    const previewUrl =
      URL.createObjectURL(
        file
      );

    setImagePreview(
      previewUrl
    );


    /*
     * Convert image →
     * Base64
     */

    const reader =
      new FileReader();


    reader.onload =
      () => {

        setImageData(
          reader.result
        );
      };


    reader.onerror =
      () => {

        setError(
          "Gagal membaca gambar."
        );

      };


    reader.readAsDataURL(
      file
    );
  }


  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

  async function handleSubmit(
    event
  ) {

    event.preventDefault();


    setLoading(true);
    setError("");


    try {

      const response =
        await fetch(
          "/api/products",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({

                name:
                  product.name,

                price:
                  product.price,

                category:
                  product.category,

                stock:
                  product.stock,

                description:
                  product.description,

                image:
                  imageData,
              }),
          }
        );


      const data =
        await response.json();


      if (
        !response.ok
      ) {

        throw new Error(
          data.error ||
          "Gagal menyimpan produk."
        );
      }


      alert(
        "Produk dan gambar berhasil disimpan ke GitHub."
      );


      router.push(
        "/admin/products"
      );

      router.refresh();


    } catch (error) {

      console.error(
        error
      );


      setError(
        error.message ||
        "Gagal menyimpan produk."
      );


    } finally {

      setLoading(false);

    }
  }


  return (

    <form
      className="product-form"
      onSubmit={
        handleSubmit
      }
    >


      {/* ERROR */}

      {error && (

        <div className="login-error">
          {error}
        </div>

      )}


      <div
        className="product-form-grid"
      >


        {/* =====================================================
            IMAGE
        ====================================================== */}

        <div
          className="product-form-section"
        >

          <div
            className="form-section-heading"
          >

            <p>
              PRODUCT IMAGE
            </p>

            <h2>
              Product Photo
            </h2>

          </div>


          <label
            htmlFor="product-image"
            className={`image-upload ${
              imagePreview
                ? "has-image"
                : ""
            }`}
          >

            {imagePreview ? (

              <img
                src={
                  imagePreview
                }
                alt="Product preview"
              />

            ) : (

              <>

                <div
                  className="upload-icon"
                >
                  ↑
                </div>

                <strong>
                  Upload Product Image
                </strong>

                <span>
                  JPG, PNG or WEBP
                </span>

                <small>
                  Maximum 2 MB
                </small>

              </>

            )}

          </label>


          <input
            id="product-image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={
              handleImageChange
            }
            hidden
          />

        </div>


        {/* =====================================================
            PRODUCT INFORMATION
        ====================================================== */}

        <div
          className="product-form-section"
        >

          <div
            className="form-section-heading"
          >

            <p>
              PRODUCT INFORMATION
            </p>

            <h2>
              Details
            </h2>

          </div>


          {/* NAME */}

          <div
            className="form-field"
          >

            <label htmlFor="name">
              Product Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Example: Essential Black Hoodie"
              value={
                product.name
              }
              onChange={
                handleChange
              }
              required
            />

          </div>


          {/* PRICE + STOCK */}

          <div
            className="form-row"
          >

            <div
              className="form-field"
            >

              <label htmlFor="price">
                Price
              </label>

              <div
                className="price-input"
              >

                <span>
                  Rp
                </span>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  placeholder="249000"
                  value={
                    product.price
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

            </div>


            <div
              className="form-field"
            >

              <label htmlFor="stock">
                Stock
              </label>

              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                placeholder="20"
                value={
                  product.stock
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>

          </div>


          {/* CATEGORY */}

          <div
            className="form-field"
          >

            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              name="category"
              value={
                product.category
              }
              onChange={
                handleChange
              }
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


          {/* DESCRIPTION */}

          <div
            className="form-field"
          >

            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="6"
              placeholder="Describe your product..."
              value={
                product.description
              }
              onChange={
                handleChange
              }
            />

          </div>

        </div>

      </div>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div
        className="product-form-footer"
      >

        <button
          type="button"
          className="form-cancel-button"
          onClick={() =>
            router.back()
          }
          disabled={
            loading
          }
        >
          Cancel
        </button>


        <button
          type="submit"
          className="form-save-button"
          disabled={
            loading
          }
        >

          {loading
            ? "Uploading..."
            : "Save Product →"}

        </button>

      </div>

    </form>
  );
}