import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../../database/models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// api/my-hotels
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("city is required"),
    body("country").notEmpty().withMessage("country is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("pricePerNight is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("facilities is required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      //1. upload the image to cloudinary

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = `data:${image.mimetype};base64,${b64}`; // Added a comma here
        try {
          const res = await cloudinary.v2.uploader.upload(dataURI);
          return res.url;
        } catch (uploadError) {
          console.error("Cloudinary upload failed:", uploadError);
          throw new Error("Cloudinary upload failed");
        }
      });

      // 2.if upload was successful ,add the urls to the new hotel
      const imageUrls = await Promise.all(uploadPromises);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      // 3. save the new hotel in our database
      const hotel = new Hotel(newHotel);
      await hotel.save();
      // 4.return a 201 status
      res.status(201).send(hotel);
    } catch (error) {
      console.error("Error creating hotel:", error);

      // Type guard to check if error is an instance of Error
      const errorMessage =
        error instanceof Error ? error.message : "Something Went Wrong";

      res.status(500).json({ message: errorMessage });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Eror fetching hotels" });
  }
});

export default router;
