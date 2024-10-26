import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  imagePublicId:string
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imagePublicId: {type : String, require: true }// add this field
});

export default mongoose.model<IProduct>('Product', ProductSchema);
