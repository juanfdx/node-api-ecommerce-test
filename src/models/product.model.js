import { Schema, model, mongoose } from 'mongoose';

const VariationSchema = new mongoose.Schema({
  cod: {
    type: String,
    trim: true,
    required: [true, 'Must provide a variation code'],
    maxlength: [10, 'Variation code must be less than 10 characters.'],
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Must provide a variation name'],
    maxlength: [100, 'Variation name must be less than 100 characters.'],
    lowercase: true,
  },
  slug: {
    type: String,
    trim: true,
    required: [true, 'Must provide a variation slug'],
    lowercase: true,
    unique: true,
  },
  color: {
    type: String,
    trim: true,
    required: [true, 'Must provide a variation color'],
    lowercase: true,
  },
  hex: {
    type: String,
    trim: true,
    required: [true, 'Must provide a variation hex'],
    lowercase: true,
    match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i,
  },
  price: {
    type: Number,
    required: [true, 'Must provide a variation price'],
    min: [0, 'Price must be greater than or equal to 0.'],
    max: [1000000, 'Price must be less than or equal to 10,000.00.'],
    default: 0,
  },
  stock: {
    type: Number,
    required: [true, 'Must provide a variation stock'],
    min: [0, 'Stock must be greater than or equal to 0.'],
    max: [1000, 'Stock must be less than or equal to 1000.'],
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: [true, 'Must provide a product image public ID'],
      },
      url: {
        type: String,
        required: [true, 'Must provide a product image URL'],
      },
    },
  ],
});


const ProductSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Must provide a product name'],
      maxlength: [100, 'Name must be less than 100 characters.'],
      lowercase: true,
    },
    slug: {
      type: String,
      trim: true,
      required: [true, 'Must provide a product slug'],
      lowercase: true,
      unique: true,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Must provide a product summary'],
      lowercase: true,
      maxlength: [350, 'Summary must be less than 350 characters.'],
    },
    description: [
      {
        key: {
          type: String,
          trim: true,
          required: [true, 'Must provide a product description key'],
          lowercase: true,
        },
        value: {
          type: String,
          trim: true,
          required: [true, 'Must provide a product description value'],
          lowercase: true,
        },
      },
    ],
    category: {
      type: String,
      trim: true,
      required: [true, 'Must provide a product category'],
      lowercase: true,
    },
    specifications: [
      {
        key: {
          type: String,
          trim: true,
          required: [true, 'Must provide a product specification key'],
          lowercase: true,
        },
        value: {
          type: String,
          trim: true,
          required: [true, 'Must provide a product specification value'],
          lowercase: true,
        },
      },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
          required: true,
        },

        comment: {
          type: String,
          required: true,
          maxlength: [
            1000,
            'Review comment must be less than 1000 characters.',
          ],
        },
        rating: {
          type: Number,
          required: true,
          min: [1, 'Rating must be at least 1'],
          max: [5, 'Rating must be at most 5'],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    numOfReviews: {
      type: Number,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be greater than or equal to 0'],
      max: [5, 'Rating must be less than or equal to 5'],
    },
    variations: [VariationSchema],
    //user that has created this product (false at the beginning of the application)
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);


const Product = model('Product', ProductSchema);
export default Product;
