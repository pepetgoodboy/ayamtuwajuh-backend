import foodDrinkModel from "../models/foodDrinkModel.js";
import fs from "fs";

// Add Food or Drink Item
const addFoodDrink = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const { name, description, price, category } = req.body;

  const existingFoodDrink = await foodDrinkModel.findOne({ name: name });
  if (existingFoodDrink) {
    return res
      .status(400)
      .json({ success: false, message: "Makanan atau minuman sudah ada" });
  }

  const foodDrink = new foodDrinkModel({
    name: name,
    description: description,
    price: price,
    image: image_filename,
    category: category,
  });

  try {
    await foodDrink.save();
    res.status(201).json({ success: true, message: "Berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

// All Food List
const listFoodDrink = async (req, res) => {
  try {
    const foodDrinks = await foodDrinkModel.find();
    res.status(200).json({ success: true, data: foodDrinks });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

// Remove Food
const removeFoodDrink = async (req, res) => {
  try {
    const foodDrink = await foodDrinkModel.findByIdAndDelete(req.body.id);
    if (!foodDrink) {
      return res
        .status(400)
        .json({ success: false, message: "Makanan atau minuman tidak ada" });
    }
    fs.unlinkSync(`./uploads/${foodDrink.image}`);

    await foodDrinkModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

export { addFoodDrink, listFoodDrink, removeFoodDrink };
