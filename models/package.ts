import mongoose, { Schema } from "mongoose";

const packageSchema = new Schema<IPackageModel>(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Object, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    customItem: { type: [Object], default: [], required: true },
  },
  {
    timestamps: true,
  }
);

const Package =
  mongoose.models.Package ||
  mongoose.model<IPackageModel>("Package", packageSchema);

export default Package;
