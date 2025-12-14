
```js
import { useState, useMemo } from "react";

export default function ProductPage({ product }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");

  // Get unique colors
  const colors = useMemo(() => {
    return [...new Set(product.variants.map(v => v.color))];
  }, [product.variants]);

  // Sizes available for the selected color
  const sizes = useMemo(() => {
    if (!selectedColor) return [];
    return product.variants
      .filter(v => v.color === selectedColor)
      .map(v => v.size);
  }, [selectedColor, product.variants]);

  // Find the selected variant
  const selectedVariant = useMemo(() => {
    return product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );
  }, [selectedColor, selectedSize, product.variants]);

  // Get images for selected color (first variant with that color)
  const colorImages = useMemo(() => {
    const variant = product.variants.find(v => v.color === selectedColor);
    return variant ? variant.images : [];
  }, [selectedColor, product.variants]);

  // Update mainImage when color changes
  useMemo(() => {
    if (colorImages.length > 0) setMainImage(colorImages[0]);
    else setMainImage("");
  }, [colorImages]);

  // Check if a color is out of stock entirely
  const isColorOutOfStock = (color) => {
    return !product.variants.some(v => v.color === color && v.stock > 0);
  };

  // Check if a size for selected color is out of stock
  const isSizeOutOfStock = (size) => {
    return !product.variants.some(v => v.color === selectedColor && v.size === size && v.stock > 0);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto" }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Brand:</strong> {product.brand}</p>

      {/* MAIN IMAGE */}
      {mainImage && (
        <img
          src={mainImage}
          alt={product.name}
          style={{ width: "100%", maxWidth: "400px", marginBottom: "10px" }}
        />
      )}

      {/* IMAGE THUMBNAILS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {colorImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${product.name} ${selectedColor}`}
            style={{
              width: "60px",
              cursor: "pointer",
              border: img === mainImage ? "2px solid black" : "1px solid #ccc"
            }}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>

      {/* COLOR OPTIONS */}
      <h3>Select Color:</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {colors.map(color => {
          const outOfStock = isColorOutOfStock(color);
          return (
            <button
              key={color}
              onClick={() => {
                if (!outOfStock) {
                  setSelectedColor(color);
                  setSelectedSize(""); // reset size
                }
              }}
              disabled={outOfStock}
              style={{
                padding: "10px",
                background: selectedColor === color ? "#333" : "#eee",
                color: outOfStock ? "#aaa" : selectedColor === color ? "white" : "black",
                cursor: outOfStock ? "not-allowed" : "pointer",
                textDecoration: outOfStock ? "line-through" : "none"
              }}
            >
              {color} {outOfStock && "(Out of stock)"}
            </button>
          );
        })}
      </div>

      {/* SIZE OPTIONS */}
      {selectedColor && (
        <>
          <h3>Select Size:</h3>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {sizes.map(size => {
              const outOfStock = isSizeOutOfStock(size);
              return (
                <button
                  key={size}
                  onClick={() => {
                    if (!outOfStock) setSelectedSize(size);
                  }}
                  disabled={outOfStock}
                  style={{
                    padding: "10px",
                    background: selectedSize === size ? "#333" : "#eee",
                    color: outOfStock ? "#aaa" : selectedSize === size ? "white" : "black",
                    cursor: outOfStock ? "not-allowed" : "pointer",
                    textDecoration: outOfStock ? "line-through" : "none"
                  }}
                >
                  {size} {outOfStock && "(Out of stock)"}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* VARIANT INFO */}
      {selectedVariant && (
        <div>
          <h2>${selectedVariant.price.toFixed(2)}</h2>
          <p>Stock: {selectedVariant.stock}</p>
          <button
            disabled={selectedVariant.stock === 0}
            style={{
              marginTop: "10px",
              padding: "12px",
              background: selectedVariant.stock === 0 ? "#ccc" : "black",
              color: selectedVariant.stock === 0 ? "#666" : "white",
              border: "none",
              cursor: selectedVariant.stock === 0 ? "not-allowed" : "pointer"
            }}
          >
            {selectedVariant.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      )}
    </div>
  );
}

```

<!-- other way adding material -->

```js
import { useState, useMemo } from "react";

const SingleProduct = ({ product }) => {
  const { name, description, brand, options, variants } = product;

  // Extract unique option values from variants
  const colors = [...new Set(variants.map(v => v.color))];
  const sizes = [...new Set(variants.map(v => v.size))];
  const materials = [...new Set(variants.map(v => v.material))];

  // Default selections
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);

  // Find matching variant
  const selectedVariant = useMemo(() => {
    return variants.find(
      v =>
        v.color === selectedColor &&
        v.size === selectedSize &&
        v.material === selectedMaterial
    );
  }, [selectedColor, selectedSize, selectedMaterial, variants]);

  return (
    <div style={{ maxWidth: 400, border: "1px solid #ddd", padding: 20, borderRadius: 8 }}>
      <h2>{name}</h2>
      <p>{description}</p>
      <p><strong>Brand:</strong> {brand}</p>

      {/* ----- COLOR SELECTOR ----- */}
      <div style={{ marginBottom: 10 }}>
        <label><strong>Color:</strong></label>
        <select
          value={selectedColor}
          onChange={e => setSelectedColor(e.target.value)}
        >
          {colors.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* ----- SIZE SELECTOR ----- */}
      <div style={{ marginBottom: 10 }}>
        <label><strong>Size:</strong></label>
        <select
          value={selectedSize}
          onChange={e => setSelectedSize(e.target.value)}
        >
          {sizes.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* ----- MATERIAL SELECTOR ----- */}
      <div style={{ marginBottom: 10 }}>
        <label><strong>Material:</strong></label>
        <select
          value={selectedMaterial}
          onChange={e => setSelectedMaterial(e.target.value)}
        >
          {materials.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* ----- SELECTED VARIANT DETAILS ----- */}
      {selectedVariant ? (
        <>
          <h3>Price: ${selectedVariant.price}</h3>
          <p><strong>SKU:</strong> {selectedVariant.sku}</p>
          <p><strong>In Stock:</strong> {selectedVariant.stock}</p>

          <div>
            <strong>Images:</strong>
            {selectedVariant.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="product"
                style={{ width: 80, marginRight: 10, marginTop: 10 }}
              />
            ))}
          </div>

          <button
            style={{
              marginTop: 15,
              padding: "10px 20px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer"
            }}
            disabled={selectedVariant.stock === 0}
          >
            Add to Cart
          </button>
        </>
      ) : (
        <p style={{ color: "red" }}>This combination is unavailable.</p>
      )}
    </div>
  );
};

export default SingleProduct;
```
