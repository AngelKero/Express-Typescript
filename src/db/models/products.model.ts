import mongoose from 'mongoose';
import { Product } from 'src/interfaces/product.interface';
const { Schema } = mongoose;

const productSchema = new Schema<Product>({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  image: {type: String, required: true},
  description: {type: String, required: false},
  authorId: {type: Schema.Types.ObjectId, required: true},
  vendor: {type: String, required: false},
  isBlock: {type: Boolean, required: true},
}, {timestamps: true});

export default mongoose.model('product', productSchema);
