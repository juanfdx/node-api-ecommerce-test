import { useState, useMemo } from 'react';

export default function ProductPage({ product }) {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState('');


  // Get unique colors
  const colors = useMemo(() => {
    return [...new Set(product.variants.map((v) => v.color))];
  }, [product.variants]);


  // Sizes available for the selected color
  const sizes = useMemo(() => {
    if (!selectedColor) return [];
    return product.variants
      .filter((v) => v.color === selectedColor)
      .map((v) => v.size);
  }, [selectedColor, product.variants]);


  // Find the selected variant
  const selectedVariant = useMemo(() => {
    return product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );
  }, [selectedColor, selectedSize, product.variants]);


  // Get images for selected color (first variant with that color)
  const colorImages = useMemo(() => {
    const variant = product.variants.find((v) => v.color === selectedColor);
    return variant ? variant.images : [];
  }, [selectedColor, product.variants]);


  // Update mainImage when color changes
  useMemo(() => {
    if (colorImages.length > 0) setMainImage(colorImages[0]);
    else setMainImage('');
  }, [colorImages]);


  // Check if a color is out of stock entirely
  const isColorOutOfStock = (color) => {
    return !product.variants.some((v) => v.color === color && v.stock > 0);
  };


  // Check if a size for selected color is out of stock
  const isSizeOutOfStock = (size) => {
    return !product.variants.some(
      (v) => v.color === selectedColor && v.size === size && v.stock > 0
    );
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto' }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>
        <strong>Brand:</strong> {product.brand}
      </p>

      {/* MAIN IMAGE */}
      {mainImage && (
        <img
          src={mainImage}
          alt={product.name}
          style={{ width: '100%', maxWidth: '400px', marginBottom: '10px' }}
        />
      )}

      {/* IMAGE THUMBNAILS */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {colorImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${product.name} ${selectedColor}`}
            style={{
              width: '60px',
              cursor: 'pointer',
              border: img === mainImage ? '2px solid black' : '1px solid #ccc',
            }}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>

      {/* COLOR OPTIONS */}
      <h3>Select Color:</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {colors.map((color) => {
          const outOfStock = isColorOutOfStock(color);
          return (
            <button
              key={color}
              onClick={() => {
                if (!outOfStock) {
                  setSelectedColor(color);
                  setSelectedSize(''); // reset size
                }
              }}
              disabled={outOfStock}
              style={{
                padding: '10px',
                background: selectedColor === color ? '#333' : '#eee',
                color: outOfStock
                  ? '#aaa'
                  : selectedColor === color
                  ? 'white'
                  : 'black',
                cursor: outOfStock ? 'not-allowed' : 'pointer',
                textDecoration: outOfStock ? 'line-through' : 'none',
              }}
            >
              {color} {outOfStock && '(Out of stock)'}
            </button>
          );
        })}
      </div>

      {/* SIZE OPTIONS */}
      {selectedColor && (
        <>
          <h3>Select Size:</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {sizes.map((size) => {
              const outOfStock = isSizeOutOfStock(size);
              return (
                <button
                  key={size}
                  onClick={() => {
                    if (!outOfStock) setSelectedSize(size);
                  }}
                  disabled={outOfStock}
                  style={{
                    padding: '10px',
                    background: selectedSize === size ? '#333' : '#eee',
                    color: outOfStock
                      ? '#aaa'
                      : selectedSize === size
                      ? 'white'
                      : 'black',
                    cursor: outOfStock ? 'not-allowed' : 'pointer',
                    textDecoration: outOfStock ? 'line-through' : 'none',
                  }}
                >
                  {size} {outOfStock && '(Out of stock)'}
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
              marginTop: '10px',
              padding: '12px',
              background: selectedVariant.stock === 0 ? '#ccc' : 'black',
              color: selectedVariant.stock === 0 ? '#666' : 'white',
              border: 'none',
              cursor: selectedVariant.stock === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            {selectedVariant.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      )}
    </div>
  );
}


// 🧠 How this works
// ✔ 1. Extract unique colors
// const colors = [...new Set(product.variants.map(v => v.color))];

// ✔ 2. When a color is selected → load only the sizes for that color
// product.variants.filter(v => v.color === selectedColor)

// ✔ 3. When both color + size selected → find matching variant
// product.variants.find(
//   v => v.color === selectedColor && v.size === selectedSize
// );



// ✅ What changed

// Colors and sizes check stock:

// const isColorOutOfStock = (color) => ...
// const isSizeOutOfStock = (size) => ...


// Disabled buttons & styling:

// Greyed out, line-through, not-allowed cursor.

// Adds (Out of stock) label automatically.

// Add to Cart button:

// Disabled if selectedVariant.stock === 0.

// Changes style & text to Out of Stock.

// This now behaves like professional e-commerce stores:

// Users cannot select out-of-stock colors or sizes.

// The UI clearly indicates which options are unavailable.