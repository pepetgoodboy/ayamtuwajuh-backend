import express from "express";
import {
  addFoodDrink,
  listFoodDrink,
  removeFoodDrink,
} from "../controllers/foodDrinkController.js";
import multer from "multer";

const foodDrinkRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

foodDrinkRouter.post("/add", upload.single("image"), addFoodDrink);
foodDrinkRouter.get("/list", listFoodDrink);
foodDrinkRouter.post("/remove", removeFoodDrink);

export default foodDrinkRouter;
