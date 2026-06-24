import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);
