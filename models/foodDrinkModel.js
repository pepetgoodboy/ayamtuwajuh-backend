import mongoose from "mongoose";

const foodDrinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const foodDrinkModel =
  mongoose.models.foodDrink || mongoose.model("foodDrink", foodDrinkSchema);

export default foodDrinkModel;
